import { AppRoot, el, View } from "@commonmodule/app";
import { IntegerUtils } from "@commonmodule/ts";
import {
  AssetManager,
  AtlasAttachmentLoader,
  SkeletonJson,
  SkeletonMesh,
} from "@esotericsoftware/spine-threejs";
import Stats from "stats.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class SpinePerformanceTest extends View {
  private static readonly INSTANCE_COUNT = 100;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private stats!: Stats;

  private assetManager!: AssetManager;
  private skeletonMeshes: SkeletonMesh[] = [];

  private lastFrameTime = 0;
  private animationRequestId = 0;

  constructor() {
    super();

    this.container = el("").appendTo(AppRoot);

    this.initThree();
    this.initStats();
    this.loadAssets();

    window.addEventListener("resize", this.handleResize);
  }

  private initThree() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(75, w / h, 1, 5000);
    this.camera.position.set(0, 0, 1500);

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(w, h);
    this.container.htmlElement.append(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  }

  private initStats() {
    this.stats = new Stats();
    this.stats.showPanel(0); // 0 = FPS
    // Position top‑left and keep above any HTML canvas.
    this.stats.dom.style.position = "fixed";
    this.stats.dom.style.left = "0px";
    this.stats.dom.style.top = "0px";
    document.body.appendChild(this.stats.dom);
  }

  private loadAssets() {
    const baseUrl = "/assets/spine/";
    const skeletonFile = "swordsman.json"; // text skeleton
    const atlasFile = "swordsman.atlas";

    this.assetManager = new AssetManager(baseUrl);
    this.assetManager.loadText(skeletonFile);
    this.assetManager.loadTextureAtlas(atlasFile);

    const poll = () => {
      if (this.assetManager.isLoadingComplete()) {
        this.buildSkeletons(skeletonFile, atlasFile);
        this.lastFrameTime = Date.now() / 1000;
        this.animate();
      } else {
        requestAnimationFrame(poll);
      }
    };

    requestAnimationFrame(poll);
  }

  private buildSkeletons(skeletonFile: string, atlasFile: string) {
    const atlas = this.assetManager.require(atlasFile);
    const atlasLoader = new AtlasAttachmentLoader(atlas);

    const skeletonJson = new SkeletonJson(atlasLoader);
    const skelText = this.assetManager.require(skeletonFile);
    const skeletonData = skeletonJson.readSkeletonData(JSON.parse(skelText));

    for (let i = 0; i < SpinePerformanceTest.INSTANCE_COUNT; i++) {
      const mesh = new SkeletonMesh({ skeletonData });
      mesh.state.setAnimation(0, "idle", true);

      // Random placement roughly matching the original Full HD logical coords
      mesh.position.set(
        IntegerUtils.random(-1280, 1280),
        IntegerUtils.random(-720, 720),
        IntegerUtils.random(-400, 400), // give a bit of depth randomness
      );

      mesh.scale.set(3, 3, 3);

      this.scene.add(mesh);
      this.skeletonMeshes.push(mesh);
    }

    // Optional: add a dim ambient light so meshes are visible if they have
    // lighting‑dependent materials.
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  }

  private animate = () => {
    this.animationRequestId = requestAnimationFrame(this.animate);

    this.stats.begin();

    const now = Date.now() / 1000;
    const delta = now - this.lastFrameTime;
    this.lastFrameTime = now;

    // Advance each skeleton state.
    for (let i = 0, n = this.skeletonMeshes.length; i < n; i++) {
      this.skeletonMeshes[i].update(delta);
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);

    this.stats.end();
  };

  private handleResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  public close(): void {
    cancelAnimationFrame(this.animationRequestId);
    window.removeEventListener("resize", this.handleResize);

    document.body.removeChild(this.stats.dom);

    this.container.htmlElement.removeChild(this.renderer.domElement);
    this.renderer.dispose();
  }
}
