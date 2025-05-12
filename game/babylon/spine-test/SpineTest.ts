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
 * Babylon.js + spine‑webgl runtime demo similar to SpineTestThree.
 * Renders a spinning cube in the Babylon scene and a Spine skeleton
 * using the raw WebGL context provided by Babylon.
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

  /** Babylon bootstrapping */
  constructor() {
    super();

    // Create a simple container for the canvas.
    this.container = el("div").appendTo(AppRoot);
    const canvas = el("canvas#spineBabylonCanvas").appendTo(this.container);

    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.htmlElement.style.position = "absolute";
    canvas.htmlElement.style.top = "0";
    canvas.htmlElement.style.left = "0";
    canvas.htmlElement.width = w;
    canvas.htmlElement.height = h;

    // Babylon engine & scene.
    this.engine = new Engine(canvas.htmlElement, true);
    this.scene = new Scene(this.engine);

    // Arc‑rotate camera for easy inspection.
    const camera = new ArcRotateCamera(
      "camera",
      Math.PI / 4,
      Math.PI / 3,
      1000,
      Vector3.ZeroReadOnly,
      this.scene,
    );
    camera.attachControl(canvas.htmlElement, true);

    // Basic lighting.
    new HemisphericLight("hemi", new Vector3(0, 1, 0), this.scene);

    // Wireframe cube (mirrors SpineTestThree).
    const cube = MeshBuilder.CreateBox("cube", { size: 400 }, this.scene);
    const cubeMat = new StandardMaterial("cubeMat", this.scene);
    cubeMat.wireframe = true;
    cube.material = cubeMat;
    cube.position.y = 200;

    // Root transform that we can move / scale if desired.
    this.rootNode = new TransformNode("spineRoot", this.scene);
    this.rootNode.scaling = new Vector3(0.5, 0.5, 0.5);

    // Spine asset loading via spine‑webgl AssetManager (uses Babylon GL context).
    const gl = this.engine._gl;
    this.assetManager = new AssetManager(gl);
    this.assetManager.loadBinary("/assets/spine/hellboy.skel");
    this.assetManager.loadTextureAtlas("/assets/spine/hellboy.atlas");
    this.assetManager.loadTexture("/assets/spine/hellboy.png");

    // Main render loop — both Babylon and Spine.
    this.engine.runRenderLoop(() => this.renderFrame());

    // Handle resizes.
    AppRoot.on("resize", () => this.engine.resize());
  }

  /**
   * Once assets are loaded, build the skeleton & state machine.
   */
  private initSpine(gl: WebGLRenderingContext): void {
    const atlas = this.assetManager.require("/assets/spine/hellboy.atlas");
    const atlasLoader = new AtlasAttachmentLoader(atlas);
    const bin = new SkeletonBinary(atlasLoader);
    bin.scale = 1;

    const data = bin.readSkeletonData(
      this.assetManager.require("/assets/spine/hellboy.skel"),
    );

    this.skeleton = new Skeleton(data);
    const stateData = new AnimationStateData(data);
    this.state = new AnimationState(stateData);

    // Idle by default.
    this.state.setAnimation(0, "idle", true);

    // Swap to "run" after a second, then return to idle on completion.
    this.state.addListener({
      complete: (entry) => {
        if (entry.animation?.name === "run") {
          this.state!.setAnimation(0, "idle", true);
        }
      },
    });
    setTimeout(() => {
      this.state!.setAnimation(0, "run", false);
    }, 1000);

    // Renderer helpers.
    this.shader = Shader.newTwoColoredTextured(gl);
    this.batcher = new PolygonBatcher(gl);
    this.renderer = new SkeletonRenderer(gl as any);
    this.renderer.premultipliedAlpha = true;

    this.spineReady = true;
  }

  /** Utility: copy a Babylon Matrix to a spine Matrix4 (column‑major → row‑major). */
  private copyBabylonToSpine(src: Matrix, dst: Matrix4): void {
    const m = src.m;
    const d = dst.values;
    d[0] = m[0];
    d[1] = m[4];
    d[2] = m[8];
    d[3] = m[12];
    d[4] = m[1];
    d[5] = m[5];
    d[6] = m[9];
    d[7] = m[13];
    d[8] = m[2];
    d[9] = m[6];
    d[10] = m[10];
    d[11] = m[14];
    d[12] = m[3];
    d[13] = m[7];
    d[14] = m[11];
    d[15] = m[15];
  }

  /** Single frame of both Babylon and spine‑webgl. */
  private renderFrame(): void {
    // Babylon draw.
    this.scene.render();

    // Spine asset load‑check.
    if (!this.spineReady && this.assetManager.isLoadingComplete()) {
      this.initSpine(this.engine._gl);
    }
    if (!this.spineReady) return;

    this.engine.wipeCaches(true);

    // ----- Spine update & draw -----
    const gl = this.engine._gl;
    const dt = this.engine.getDeltaTime() / 1000;
    this.state!.update(dt);
    this.state!.apply(this.skeleton!);
    this.skeleton!.updateWorldTransform(Physics.update);

    const mvp = new Matrix4();
    this.copyBabylonToSpine(this.rootNode.getWorldMatrix(), mvp);

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this.shader!.bind();
    this.shader!.setUniformi(Shader.SAMPLER, 0);
    this.shader!.setUniform4x4f(Shader.MVP_MATRIX, mvp.values);

    this.batcher!.begin(this.shader!);
    this.renderer!.draw(this.batcher!, this.skeleton!);
    this.batcher!.end();
    this.shader!.unbind();

    gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
  }

  /** Clean‑up when the view is closed. */
  public close(): void {
    this.engine.stopRenderLoop();
    this.engine.dispose();
  }
}
