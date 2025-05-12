import { AppRoot, el, View } from "@commonmodule/app";
import { AssetManager, SkeletonMesh } from "../BabylonSpineRuntime.js";
import {
  AtlasAttachmentLoader,
  SkeletonBinary,
} from "@esotericsoftware/spine-core";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

/**
 * Babylon.js + BabylonSpineRuntime performance stress-test.
 * Renders thousands of Spine skeletons while preserving Babylon's depth
 * buffer. A live FPS counter is displayed in the upper-left corner.
 */
export default class SpinePerformanceTestBabylon extends View {
  private static readonly SKELETON_COUNT = 100;
  private static readonly BOUND_X = 640;
  private static readonly BOUND_Y = 360;

  private engine!: BABYLON.Engine;
  private scene!: BABYLON.Scene;
  private camera!: BABYLON.ArcRotateCamera;

  private assetManager!: AssetManager;
  private skeletonMeshes: SkeletonMesh[] = [];

  private lastFrameTime = 0;
  private beforeRenderObserver?: BABYLON.Observer<BABYLON.Scene>;

  private fpsDiv!: HTMLDivElement;
  private fpsUpdateAccum = 0;

  constructor() {
    super();
    this.container = el("div").appendTo(AppRoot);

    this.initBabylon();
    this.loadAssets();

    window.addEventListener("resize", this.handleResize);
  }

  /* --------------------------------------------------------------------- */
  /* Babylon bootstrap                                                     */
  /* --------------------------------------------------------------------- */
  private initBabylon() {
    const canvas = document.createElement("canvas");
    Object.assign(canvas.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
    });
    this.container.htmlElement.append(canvas);

    this.engine = new BABYLON.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      premultipliedAlpha: true,
    });

    this.scene = new BABYLON.Scene(this.engine);
    this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    // Orthographic camera centred at the origin
    this.camera = new BABYLON.ArcRotateCamera(
      "arcCam",
      0,
      BABYLON.Tools.ToRadians(90),
      1000,
      BABYLON.Vector3.Zero(),
      this.scene,
    );
    this.camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
    this.camera.orthoLeft = -SpinePerformanceTestBabylon.BOUND_X;
    this.camera.orthoRight = SpinePerformanceTestBabylon.BOUND_X;
    this.camera.orthoTop = SpinePerformanceTestBabylon.BOUND_Y;
    this.camera.orthoBottom = -SpinePerformanceTestBabylon.BOUND_Y;
    this.camera.minZ = 0.1;
    this.camera.maxZ = 2000;
    this.camera.attachControl(canvas, true);

    new BABYLON.HemisphericLight(
      "hemi",
      new BABYLON.Vector3(0, 1, 0),
      this.scene,
    );

    /* FPS overlay */
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

    this.engine.runRenderLoop(() => this.scene.render());
  }

  /* --------------------------------------------------------------------- */
  /* Spine asset loading                                                   */
  /* --------------------------------------------------------------------- */
  private loadAssets() {
    const baseUrl = "/assets/spine/";
    const skeletonFile = "hellboy.skel";
    const atlasFile = "hellboy.atlas";

    this.assetManager = new AssetManager(baseUrl, undefined, this.scene);
    this.assetManager.loadBinary(skeletonFile);
    this.assetManager.loadTextureAtlas(atlasFile);

    const poll = () => {
      if (this.assetManager.isLoadingComplete()) {
        this.buildSkeletons(skeletonFile, atlasFile);
        this.lastFrameTime = Date.now() / 1000;

        this.beforeRenderObserver = this.scene.onBeforeRenderObservable.add(
          () => this.updateSpine(),
        );
      } else {
        requestAnimationFrame(poll);
      }
    };
    requestAnimationFrame(poll);
  }

  /* --------------------------------------------------------------------- */
  /* Skeleton creation                                                     */
  /* --------------------------------------------------------------------- */
  private buildSkeletons(skel: string, atlasFile: string) {
    const atlas = this.assetManager.require(atlasFile);
    const atlasLoader = new AtlasAttachmentLoader(atlas);
    const skelBytes = new Uint8Array(this.assetManager.require(skel));

    const skeletonData = new SkeletonBinary(atlasLoader).readSkeletonData(
      skelBytes,
    );

    for (let i = 0; i < SpinePerformanceTestBabylon.SKELETON_COUNT; i++) {
      const mesh = new SkeletonMesh(`skeletonMesh_${i}`, this.scene, {
        skeletonData,
      });
      mesh.state.setAnimation(0, "idle", true);

      mesh.position.x = randomRange(
        -SpinePerformanceTestBabylon.BOUND_X,
        SpinePerformanceTestBabylon.BOUND_X,
      );
      mesh.position.y = randomRange(
        -SpinePerformanceTestBabylon.BOUND_Y,
        SpinePerformanceTestBabylon.BOUND_Y,
      );
      mesh.position.z = 0;

      this.skeletonMeshes.push(mesh);
    }
  }

  /* --------------------------------------------------------------------- */
  /* Per-frame update                                                      */
  /* --------------------------------------------------------------------- */
  private updateSpine() {
    const now = Date.now() / 1000;
    const delta = now - this.lastFrameTime;
    this.lastFrameTime = now;

    for (const mesh of this.skeletonMeshes) mesh.update(delta);

    /* FPS overlay refresh (every ~0.25 s) */
    this.fpsUpdateAccum += delta;
    if (this.fpsUpdateAccum >= 0.25) {
      this.fpsUpdateAccum = 0;
      this.fpsDiv.textContent = `FPS: ${this.engine.getFps().toFixed(1)}`;
    }
  }

  /* --------------------------------------------------------------------- */
  /* Cleanup                                                               */
  /* --------------------------------------------------------------------- */
  private handleResize = () => {
    this.engine.resize();
  };

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

/* ----------------------------------------------------------------------- */
/* Utility                                                                 */
/* ----------------------------------------------------------------------- */
function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
