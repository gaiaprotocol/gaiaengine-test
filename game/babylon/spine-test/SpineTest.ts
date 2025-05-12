import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  Matrix,
  MeshBuilder,
  Scene,
  StandardMaterial,
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
  SkeletonBinary,
  SkeletonRenderer,
} from "@esotericsoftware/spine-webgl";

/**
 * Babylon.js + spine‑webgl demo that keeps the Babylon depth buffer intact and
 * renders the Spine skeleton with correct alpha so the wire‑frame cube remains
 * visible through the transparent regions.
 */
export default class SpineTestBabylon extends View {
  private engine!: Engine;
  private scene!: Scene;

  private assetManager!: AssetManager;
  private skeleton?: Skeleton;
  private state?: AnimationState;
  private shader?: Shader;
  private batcher?: PolygonBatcher;
  private renderer?: SkeletonRenderer;

  private spineReady = false;
  private rootNode!: TransformNode;

  constructor() {
    super();

    /* ----- Canvas & Babylon bootstrap ----- */
    this.container = el("div").appendTo(AppRoot);
    const canvas = el("canvas#spineBabylonCanvas").appendTo(this.container);
    Object.assign(canvas.htmlElement.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
    });

    this.engine = new Engine(canvas.htmlElement, true);
    this.scene = new Scene(this.engine);

    const camera = new ArcRotateCamera(
      "camera",
      Math.PI / 4,
      Math.PI / 3,
      1000,
      Vector3.ZeroReadOnly,
      this.scene,
    );
    camera.attachControl(canvas.htmlElement, true);
    camera.minZ = 0.1;

    new HemisphericLight("hemi", new Vector3(0, 1, 0), this.scene);

    /* Wire‑frame cube */
    const cube = MeshBuilder.CreateBox("cube", { size: 400 }, this.scene);
    const cubeMat = new StandardMaterial("cubeMat", this.scene);
    cubeMat.wireframe = true;
    cube.material = cubeMat;
    cube.position.y = 200;

    /* Root transform for the Spine skeleton */
    this.rootNode = new TransformNode("spineRoot", this.scene);
    this.rootNode.scaling = new Vector3(0.5, 0.5, 0.5);

    /* ----- Spine asset loading ----- */
    const gl = this.engine._gl;
    this.assetManager = new AssetManager(gl);
    this.assetManager.loadBinary("/assets/spine/hellboy.skel");
    this.assetManager.loadTextureAtlas("/assets/spine/hellboy.atlas");

    /* ----- Main loop ----- */
    this.engine.runRenderLoop(() => this.renderFrame());
    AppRoot.on("resize", () => this.engine.resize());
  }

  /* ----- Spine setup (called once after assets finish loading) ----- */
  private initSpine(gl: WebGLRenderingContext): void {
    const atlas = this.assetManager.require("/assets/spine/hellboy.atlas");
    const atlasLoader = new AtlasAttachmentLoader(atlas);

    // Inform Spine that atlas textures are NOT premultiplied.
    //atlas.pages.forEach((p: any) => p.setPremultipliedAlpha(false));

    const bin = new SkeletonBinary(atlasLoader);
    bin.scale = 1;
    const skelBytes = new Uint8Array(
      this.assetManager.require("/assets/spine/hellboy.skel"),
    );
    const data = bin.readSkeletonData(skelBytes);

    this.skeleton = new Skeleton(data);
    const stateData = new AnimationStateData(data);
    this.state = new AnimationState(stateData);

    this.state.setAnimation(0, "idle", true);
    this.state.addListener({
      complete: (e) => {
        if (e.animation?.name === "run") {
          this.state!.setAnimation(0, "idle", true);
        }
      },
    });
    setTimeout(() => this.state!.setAnimation(0, "run", false), 1000);

    this.shader = Shader.newTwoColoredTextured(gl);
    this.batcher = new PolygonBatcher(gl);
    this.renderer = new SkeletonRenderer(gl as any);
    this.renderer.premultipliedAlpha = false; // ✨ key change

    this.spineReady = true;
  }

  /* Babylon (column‑major) → Spine (row‑major) */
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

  /* ----- Per‑frame draw ----- */
  private renderFrame(): void {
    this.scene.render();

    if (!this.spineReady && this.assetManager.isLoadingComplete()) {
      this.initSpine(this.engine._gl);
    }
    if (!this.spineReady) return;

    this.engine.wipeCaches(true);

    const gl = this.engine._gl;
    const dt = this.engine.getDeltaTime() / 1000;
    this.state!.update(dt);
    this.state!.apply(this.skeleton!);
    this.skeleton!.updateWorldTransform(Physics.update);

    /* MVP = WORLD * VIEW * PROJECTION */
    const mvpBabylon = this.rootNode
      .getWorldMatrix()
      .multiply(this.scene.getTransformMatrix());
    const mvp = new Matrix4();
    this.copyMatrix(mvpBabylon, mvp);

    /* Draw Spine with straight‑alpha blending */
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.depthMask(false); // don't disturb depth buffer

    this.shader!.bind();
    this.shader!.setUniformi(Shader.SAMPLER, 0);
    this.shader!.setUniform4x4f(Shader.MVP_MATRIX, mvp.values);

    this.batcher!.begin(this.shader!);
    this.renderer!.draw(this.batcher!, this.skeleton!);
    this.batcher!.end();
    this.shader!.unbind();

    gl.depthMask(true);
    gl.disable(gl.BLEND);
  }

  public close(): void {
    this.engine.stopRenderLoop();
    this.engine.dispose();
  }
}
