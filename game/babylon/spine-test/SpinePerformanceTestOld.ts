import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  Matrix,
  Scene,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import { AppRoot, el, View } from "@commonmodule/app";
import {
  AnimationState,
  AnimationStateData,
  AssetManager,
  AtlasAttachmentLoader,
  Matrix4,
  Physics,
  PolygonBatcher,
  Shader,
  Skeleton,
  SkeletonJson,
  SkeletonRenderer,
} from "@esotericsoftware/spine-webgl";

/**
 * Babylon.js + spine-webgl performance stress-test.
 * Renders thousands of Spine skeletons while preserving Babylon's depth
 * buffer. A live FPS counter is displayed in the upper-left corner.
 */
export default class SpinePerformanceTestBabylon extends View {
  private static readonly SKELETON_COUNT = 10_000;
  private static readonly BOUND_X = 640;
  private static readonly BOUND_Y = 360;

  private engine!: Engine;
  private scene!: Scene;

  private assetManager!: AssetManager;
  private shader?: Shader;
  private batcher?: PolygonBatcher;
  private renderer?: SkeletonRenderer;

  private skeletons: Skeleton[] = [];
  private states: AnimationState[] = [];
  private rootNode!: TransformNode; // shared scaling transform

  private spineReady = false;

  private fpsDiv!: HTMLDivElement;
  private fpsUpdateAccum = 0;

  constructor() {
    super();

    /* ----- Canvas & Babylon bootstrap ----- */
    this.container = el("div").appendTo(AppRoot);
    const canvas = el("canvas#spinePerfCanvas").appendTo(this.container);
    Object.assign(canvas.htmlElement.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
    });

    this.engine = new Engine(canvas.htmlElement, true);
    this.scene = new Scene(this.engine);

    // Orthographic camera centred at (0, 0)
    const camera = new ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 2,
      1000,
      Vector3.ZeroReadOnly,
      this.scene,
    );
    camera.mode = ArcRotateCamera.ORTHOGRAPHIC_CAMERA;
    camera.orthoLeft = -SpinePerformanceTestBabylon.BOUND_X;
    camera.orthoRight = SpinePerformanceTestBabylon.BOUND_X;
    camera.orthoTop = SpinePerformanceTestBabylon.BOUND_Y;
    camera.orthoBottom = -SpinePerformanceTestBabylon.BOUND_Y;
    camera.minZ = 0.1;
    camera.maxZ = 2000;
    camera.attachControl(canvas.htmlElement, true);

    new HemisphericLight("hemi", new Vector3(0, 1, 0), this.scene);

    /* Overlay FPS counter */
    this.fpsDiv = document.createElement("div");
    Object.assign(this.fpsDiv.style, {
      position: "absolute",
      top: "4px",
      left: "8px",
      padding: "2px 6px",
      background: "rgba(0,0,0,0.4)",
      color: "#0f0",
      fontFamily: "monospace",
      fontSize: "12px",
      pointerEvents: "none",
    });
    this.fpsDiv.textContent = "FPS: --";
    this.container.htmlElement.appendChild(this.fpsDiv);

    /* Root transform to scale all skeletons */
    this.rootNode = new TransformNode("spineRoot", this.scene);
    this.rootNode.scaling = new Vector3(1, 1, 1);

    /* ----- Spine asset loading ----- */
    const gl = this.engine._gl;
    this.assetManager = new AssetManager(gl);
    this.assetManager.loadText("/assets/spine/swordsman.json");
    this.assetManager.loadTextureAtlas("/assets/spine/swordsman.atlas");

    /* ----- Main loop ----- */
    this.engine.runRenderLoop(() => this.renderFrame());
    AppRoot.on("resize", () => this.engine.resize());
  }

  /* ----- Spine setup (called once after assets finish loading) ----- */
  private initSpine(gl: WebGLRenderingContext): void {
    const atlas = this.assetManager.require("/assets/spine/swordsman.atlas");
    const atlasLoader = new AtlasAttachmentLoader(atlas);

    const jsonText = this.assetManager.require(
      "/assets/spine/swordsman.json",
    ) as string;
    const json = new SkeletonJson(atlasLoader);
    json.scale = 1;
    const skeletonData = json.readSkeletonData(JSON.parse(jsonText));

    // Shared renderer / batching objects
    this.shader = Shader.newTwoColoredTextured(gl);
    this.batcher = new PolygonBatcher(gl);
    this.renderer = new SkeletonRenderer(gl as any);
    this.renderer.premultipliedAlpha = false;

    // Create skeleton instances
    for (let i = 0; i < SpinePerformanceTestBabylon.SKELETON_COUNT; i++) {
      const skel = new Skeleton(skeletonData);
      skel.x = randomRange(
        -SpinePerformanceTestBabylon.BOUND_X,
        SpinePerformanceTestBabylon.BOUND_X,
      );
      skel.y = randomRange(
        -SpinePerformanceTestBabylon.BOUND_Y,
        SpinePerformanceTestBabylon.BOUND_Y,
      );
      skel.updateWorldTransform(Physics.update);

      const stateData = new AnimationStateData(skeletonData);
      const state = new AnimationState(stateData);
      state.setAnimation(0, "idle", true);

      this.skeletons.push(skel);
      this.states.push(state);
    }

    this.spineReady = true;
  }

  /* Babylon (column-major) → Spine (row-major) */
  private copyMatrix(src: Matrix, dst: Matrix4): void {
    const m = src.m;
    const v = dst.values;
    v[0] = m[0];
    v[1] = m[4];
    v[2] = m[8];
    v[3] = m[12];
    v[4] = m[1];
    v[5] = m[5];
    v[6] = m[9];
    v[7] = m[13];
    v[8] = m[2];
    v[9] = m[6];
    v[10] = m[10];
    v[11] = m[14];
    v[12] = m[3];
    v[13] = m[7];
    v[14] = m[11];
    v[15] = m[15];
  }

  /* ----- Per-frame draw ----- */
  private renderFrame(): void {
    this.scene.render();

    if (!this.spineReady && this.assetManager.isLoadingComplete()) {
      this.initSpine(this.engine._gl);
    }
    if (!this.spineReady) return;

    const gl = this.engine._gl;
    this.engine.wipeCaches(true);

    const dt = this.engine.getDeltaTime() / 1000;

    // Build MVP matrix once (shared scaling root * view * projection)
    const mvpBabylon = this.rootNode
      .getWorldMatrix()
      .multiply(this.scene.getTransformMatrix());
    const mvp = new Matrix4();
    this.copyMatrix(mvpBabylon, mvp);

    // Prepare GL state for straight-alpha blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.depthMask(false);

    // Bind shader & uniforms
    this.shader!.bind();
    this.shader!.setUniformi(Shader.SAMPLER, 0);
    this.shader!.setUniform4x4f(Shader.MVP_MATRIX, mvp.values);

    // Begin batch – draw all skeletons
    this.batcher!.begin(this.shader!);
    for (let i = 0; i < this.skeletons.length; i++) {
      const state = this.states[i];
      const skel = this.skeletons[i];

      state.update(dt);
      state.apply(skel);
      skel.updateWorldTransform(Physics.update);

      this.renderer!.draw(this.batcher!, skel);
    }
    this.batcher!.end();
    this.shader!.unbind();

    // Restore GL state
    gl.depthMask(true);
    gl.disable(gl.BLEND);

    /* FPS counter refresh (every ~0.25s) */
    this.fpsUpdateAccum += dt;
    if (this.fpsUpdateAccum >= 0.25) {
      this.fpsUpdateAccum = 0;
      this.fpsDiv.textContent = `FPS: ${this.engine.getFps().toFixed(1)}`;
    }
  }

  public close(): void {
    this.engine.stopRenderLoop();
    this.engine.dispose();
  }
}

/* Utility */
function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
