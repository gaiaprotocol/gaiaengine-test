import { AppRoot, el, View } from "@commonmodule/app";

import {
  AssetManager,
  SkeletonMesh, // Babylon용 런타임에서 가져옵니다
} from "../BabylonSpineRuntime.js";

import {
  AtlasAttachmentLoader,
  SkeletonBinary,
} from "@esotericsoftware/spine-core";

import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders"; // (glTF 등 다른 로더를 쓰면)

//--------------------------------------------------------------
// SpineTest – Babylon JS 버전
//--------------------------------------------------------------
export default class SpineTest extends View {
  private engine!: BABYLON.Engine;
  private scene!: BABYLON.Scene;
  private camera!: BABYLON.ArcRotateCamera;

  private assetManager!: AssetManager;
  private skeletonMesh?: SkeletonMesh;

  private lastFrameTime = 0;
  private beforeRenderObserver?: BABYLON.Observer<BABYLON.Scene>;

  constructor() {
    super();
    this.container = el("").appendTo(AppRoot);

    this.initBabylon();
    this.loadAssets();

    window.addEventListener("resize", this.handleResize);
  }

  //--------------------------------------------------------------------------
  // Babylon 초기화
  //--------------------------------------------------------------------------
  private initBabylon() {
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    this.container.htmlElement.append(canvas);

    this.engine = new BABYLON.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      premultipliedAlpha: true,
    });

    const w = window.innerWidth;
    const h = window.innerHeight;

    this.scene = new BABYLON.Scene(this.engine);
    this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 0); // 투명 배경

    // Arc-Rotate Camera ≈ OrbitControls
    this.camera = new BABYLON.ArcRotateCamera(
      "arcCam",
      0, // alpha
      BABYLON.Tools.ToRadians(60), // beta
      800, // radius
      new BABYLON.Vector3(0, 200, 0),
      this.scene,
    );
    this.camera.attachControl(canvas, true);

    // 라이트(단순 Ambient)
    new BABYLON.HemisphericLight(
      "hemi",
      new BABYLON.Vector3(0, 1, 0),
      this.scene,
    );

    // 렌더 루프
    this.engine.runRenderLoop(() => this.scene.render());
  }

  //--------------------------------------------------------------------------
  // Spine 애셋 로드
  //--------------------------------------------------------------------------
  private loadAssets() {
    const baseUrl = "/assets/spine/";
    const skeletonFile = "hellboy.skel";
    const atlasFile = "hellboy.atlas";

    this.assetManager = new AssetManager(baseUrl, undefined, this.scene);
    this.assetManager.loadBinary(skeletonFile);
    this.assetManager.loadTextureAtlas(atlasFile);

    const poll = () => {
      if (this.assetManager.isLoadingComplete()) {
        this.buildSkeleton(skeletonFile, atlasFile);
        this.lastFrameTime = Date.now() / 1000;

        // 매 프레임 Spine 갱신
        this.beforeRenderObserver = this.scene.onBeforeRenderObservable.add(
          () => {
            const now = Date.now() / 1000;
            const delta = now - this.lastFrameTime;
            this.lastFrameTime = now;
            if (this.skeletonMesh) this.skeletonMesh.update(delta);
          },
        );
      } else {
        requestAnimationFrame(poll);
      }
    };
    requestAnimationFrame(poll);
  }

  //--------------------------------------------------------------------------
  // SkeletonMesh 생성
  //--------------------------------------------------------------------------
  private buildSkeleton(skel: string, atlasFile: string) {
    const atlas = this.assetManager.require(atlasFile);
    const atlasLoader = new AtlasAttachmentLoader(atlas);
    const skelBytes = new Uint8Array(this.assetManager.require(skel));

    const skeletonData = new SkeletonBinary(atlasLoader).readSkeletonData(
      skelBytes,
    );

    // Babylon Spine Runtime – 이름, scene, { skeletonData }
    this.skeletonMesh = new SkeletonMesh("hellboyMesh", this.scene, {
      skeletonData,
    });
    this.skeletonMesh.state.setAnimation(0, "idle", true);

    this.skeletonMesh.state.addListener({
      complete: (entry: any) => {
        if (entry.animation?.name === "run") {
          this.skeletonMesh!.state.setAnimation(0, "idle", true);
        }
      },
    });

    // 데모용 큐브(Three.js 예제 그대로)
    const cube = BABYLON.MeshBuilder.CreateBox(
      "cube",
      { size: 400 },
      this.scene,
    );
    const mat = new BABYLON.StandardMaterial("wire", this.scene);
    mat.wireframe = true;
    mat.diffuseColor.copyFromFloats(1, 0, 0); // 빨간 와이어프레임
    cube.material = mat;

    setTimeout(() => {
      this.skeletonMesh!.state.setAnimation(0, "run", false);
    }, 1000);
  }

  //--------------------------------------------------------------------------
  // 리사이즈
  //--------------------------------------------------------------------------
  private handleResize = () => {
    this.engine.resize();
  };

  //--------------------------------------------------------------------------
  // 정리
  //--------------------------------------------------------------------------
  public close(): void {
    window.removeEventListener("resize", this.handleResize);

    if (this.beforeRenderObserver) {
      this.scene.onBeforeRenderObservable.remove(this.beforeRenderObserver);
    }

    this.engine.stopRenderLoop();
    this.scene.dispose();
    this.engine.dispose();
  }
}
