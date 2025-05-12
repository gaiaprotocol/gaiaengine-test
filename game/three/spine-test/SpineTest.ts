import { AppRoot, el, View } from "@commonmodule/app";
import {
  AssetManager,
  AtlasAttachmentLoader,
  SkeletonBinary,
  SkeletonMesh,
} from "@esotericsoftware/spine-threejs";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class SpineTest extends View {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;

  private assetManager!: AssetManager;
  private skeletonMesh?: SkeletonMesh;

  private lastFrameTime = 0;
  private animationRequestId = 0;

  constructor() {
    super();

    this.container = el("").appendTo(AppRoot);

    this.initThree();
    this.loadAssets();

    window.addEventListener("resize", this.handleResize);
  }

  private initThree() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(75, w / h, 1, 3000);
    this.camera.position.set(0, 200, 800);

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(w, h);
    this.container.htmlElement.append(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  private loadAssets() {
    const baseUrl = "/assets/spine/";
    const skeletonFile = "hellboy.skel";
    const atlasFile = "hellboy.atlas";

    this.assetManager = new AssetManager(baseUrl);
    this.assetManager.loadBinary(skeletonFile);
    this.assetManager.loadTextureAtlas(atlasFile);

    const poll = () => {
      if (this.assetManager.isLoadingComplete()) {
        this.buildSkeleton(skeletonFile, atlasFile);
        this.lastFrameTime = Date.now() / 1000;
        this.animate();
      } else {
        requestAnimationFrame(poll);
      }
    };

    requestAnimationFrame(poll);
  }

  private buildSkeleton(skel: string, atlasFile: string) {
    const atlas = this.assetManager.require(atlasFile);
    const atlasLoader = new AtlasAttachmentLoader(atlas);

    const skeletonBinary = new SkeletonBinary(atlasLoader);

    const skelBytes = new Uint8Array(this.assetManager.require(skel));
    const skeletonData = skeletonBinary.readSkeletonData(skelBytes);

    this.skeletonMesh = new SkeletonMesh({ skeletonData });
    this.skeletonMesh.state.setAnimation(0, "idle", true);

    this.skeletonMesh.state.addListener({
      complete: (entry) => {
        if (entry.animation?.name === "run") {
          this.skeletonMesh!.state.setAnimation(0, "idle", true);
        }
      },
    });

    this.scene.add(this.skeletonMesh);

    const geometry = new THREE.BoxGeometry(400, 400, 400);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff00,
      wireframe: true,
    });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);

    setTimeout(() => {
      this.skeletonMesh!.state.setAnimation(0, "run", false);
    }, 1000);
  }

  private animate = () => {
    this.animationRequestId = requestAnimationFrame(this.animate);

    const now = Date.now() / 1000;
    const delta = now - this.lastFrameTime;
    this.lastFrameTime = now;

    if (this.skeletonMesh) this.skeletonMesh.update(delta);

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
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

    this.container.htmlElement.removeChild(this.renderer.domElement);
    this.renderer.dispose();
  }
}
