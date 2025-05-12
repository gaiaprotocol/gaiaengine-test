/* SpineTest.ts ----------------------------------------------------------- */
import {
  Color3,
  CubeTexture,
  Engine,
  FreeCamera,
  HemisphericLight,
  Mesh,
  PBRMaterial,
  Scene,
  Vector3,
} from "@babylonjs/core";

import { AppRoot, el, View } from "@commonmodule/app";
import {
  AtlasAttachmentLoader,
  SkeletonBinary,
  Spine as PixiSpine,
  SpineTexture,
  TextureAtlas,
} from "@esotericsoftware/spine-pixi-v8";
import {
  Assets,
  Container,
  Renderer as PixiRenderer,
  Sprite,
  Texture,
  WebGLRenderer,
} from "pixi.js";

export default class SpineTest extends View {
  private engine!: Engine;
  private scene!: Scene;
  private pixi!: PixiRenderer;
  private stage!: Container;
  private spine!: PixiSpine; // 나중에 로딩 완료 후 할당
  private canvas!: HTMLCanvasElement;

  constructor() {
    super();
    this.container = el("").appendTo(AppRoot);
    this.canvas = el("canvas#spineCanvas").appendTo(this.container).htmlElement;
    this.init(this.canvas);
  }

  private async init(canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, true);
    this.scene = new Scene(this.engine);

    const camera = new FreeCamera(
      "camera1",
      new Vector3(0, 5, -10),
      this.scene,
    );
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);

    const light = new HemisphericLight(
      "light1",
      new Vector3(0, 1, 0),
      this.scene,
    );
    light.intensity = 0.7;
    const sphere = Mesh.CreateSphere("sphere1", 16, 2, this.scene);
    sphere.position.y = 1;
    const ground = Mesh.CreateGround("ground1", 6, 6, 2, this.scene);

    const hdrTexture = new CubeTexture(
      "https://playground.babylonjs.com/textures/environment.dds",
      this.scene,
    );

    const envir = new PBRMaterial("envir", this.scene);
    envir.albedoColor = new Color3(1.0, 0.766, 0.336);
    envir.reflectivityColor = new Color3(1.0, 0.766, 0.336);
    envir.microSurface = 1.0; // Let the texture controls the value
    envir.reflectionTexture = hdrTexture.clone();

    envir.useMicroSurfaceFromReflectivityMapAlpha = true;

    sphere.material = envir;
    ground.material = envir;

    /* ── Pixi ─────────────────────────────────── */
    this.pixi = new WebGLRenderer();
    await this.pixi.init({
      context: this.engine._gl,
      canvas: this.engine.getRenderingCanvas()!,
      backgroundAlpha: 0,
      clearBeforeRender: false,
      roundPixels: true,
    });

    this.stage = new Container();

    /*const sprite = Sprite.from("https://i.imgur.com/FjeLbo3.jpg");
    sprite.position.set(0, 0);
    sprite.width = canvas.width;
    sprite.height = canvas.height;
    this.stage.addChild(sprite);*/

    /*this.loadSpine("/assets/spine/hellboy").then(() => {
      this.spine.state.setAnimation(0, "idle", true);

      setTimeout(() => {
        this.spine.state.setAnimation(0, "run", true);
      }, 1000);
    });*/

    /* ── 렌더 루프 ────────────────────────────── */
    this.engine.runRenderLoop(() => {
      /* 1) 3D */
      this.scene.render();
      this.engine.wipeCaches(true); // 공유 컨텍스트 안정

      /* 2) 2D */
      this.pixi.render(this.stage);
    });

    /* 리사이즈 대응 */
    window.addEventListener("resize", () => {
      this.engine.resize();
      this.pixi.resize(canvas.width, canvas.height);
    });
  }

  /** Spine 애셋(.atlas, .skel, .png) 로드 & Spine 객체 생성 */
  private async loadSpine(basePath: string) {
    /* 1) 원본 텍스처 로드 */
    const texture: Texture = await Assets.load(`${basePath}.png`);

    /* 2) 텍스처 아틀라스 텍스트 로드 */
    const atlasText = await (await fetch(`${basePath}.atlas`)).text();
    const atlas = new TextureAtlas(atlasText);
    atlas.pages.forEach((page) => {
      page.setTexture(SpineTexture.from(texture.source));
    });

    /* 3) 스켈레톤 바이너리(.skel) 로드 */
    const skelBuffer = await (await fetch(`${basePath}.skel`)).arrayBuffer();
    const attachmentLoader = new AtlasAttachmentLoader(atlas);
    const skelBinary = new SkeletonBinary(attachmentLoader);
    const skeletonData = skelBinary.readSkeletonData(
      new Uint8Array(skelBuffer),
    );

    /* 4) PixiSpine 인스턴스 생성 */
    this.spine = new PixiSpine(skeletonData);
    this.spine.scale.set(0.5);
    this.spine.x = this.canvas.width * 0.5;
    this.spine.y = this.canvas.height * 0.8;

    this.stage.addChild(this.spine);
  }
}
