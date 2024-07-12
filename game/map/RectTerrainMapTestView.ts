import { BodyNode, el, Input, Store, View } from "@common-module/app";
import { RectTerrainMap, Screen } from "@gaiaengine/2d";
import mapData from "./map.json" assert { type: "json" };
import spritesheetWithAlphaData from "./spritesheet-with-alpha.json" assert {
  type: "json",
};
import spritesheetWithoutAlphaData from "./spritesheet-without-alpha.json" assert {
  type: "json",
};

export default class RectTerrainMapTestView extends View {
  private transformStore = new Store("map-test-view-transform");
  private x = 0;
  private y = 0;
  private zoom = 1;

  private dragging = false;
  private dragX = 0;
  private dragY = 0;

  private screen: Screen;
  private xInput: Input;
  private yInput: Input;
  private zoomInput: Input;

  constructor() {
    super();

    this.x = this.transformStore.get("x") ?? 0;
    this.y = this.transformStore.get("y") ?? 0;
    this.zoom = this.transformStore.get("zoom") ?? 1;

    BodyNode.append(el(
      ".map-test-view",
      this.screen = new Screen(
        1024,
        480,
        new RectTerrainMap(
          256,
          {
            "spritesheet-with-alpha": {
              src: "/assets/map/spritesheet-with-alpha.png",
              atlas: spritesheetWithAlphaData,
            },
            "spritesheet-without-alpha": {
              src: "/assets/map/spritesheet-without-alpha.jpg",
              atlas: spritesheetWithoutAlphaData,
            },
          },
          mapData.terrains,
          mapData.objects,
          mapData.terrainMap,
          mapData.mapObjects,
        ),
      ),
      el(
        "footer",
        this.xInput = new Input({ label: "X", value: this.x.toString() }),
        this.yInput = new Input({ label: "Y", value: this.y.toString() }),
        this.zoomInput = new Input({
          label: "Zoom",
          value: this.zoom.toString(),
        }),
      ),
    ));

    this.screen.backgroundColor = 0xbfbfbf;

    this.screen.camera.setPosition(-this.x, -this.y);
    this.screen.camera.scale = this.zoom;

    this.screen.onDom("mousedown", (event: MouseEvent) => {
      this.dragging = true;
      this.dragX = event.clientX;
      this.dragY = event.clientY;
    });

    this.screen.onDom("mousemove", (event: MouseEvent) => {
      if (this.dragging) {
        this.x += (event.clientX - this.dragX) / this.zoom;
        this.y += (event.clientY - this.dragY) / this.zoom;
        this.dragX = event.clientX;
        this.dragY = event.clientY;
        this.xInput.value = this.x.toString();
        this.yInput.value = this.y.toString();
        this.screen.camera.setPosition(-this.x, -this.y);
        this.transformStore.set("x", this.x);
        this.transformStore.set("y", this.y);
      }
    });

    this.screen.onDom("mouseup", () => this.dragging = false);

    this.screen.onDom("wheel", (event: WheelEvent) => {
      event.preventDefault();
      this.zoom += event.deltaY / 1000;
      if (this.zoom < 0.2) this.zoom = 0.2;
      if (this.zoom > 10) this.zoom = 10;
      this.screen.camera.scale = this.zoom;
      this.zoomInput.value = this.zoom.toString();
      this.transformStore.set("zoom", this.zoom);
    });

    this.xInput.on("change", () => {
      this.x = parseFloat(this.xInput.value);
      this.screen.camera.setPosition(-this.x, -this.y);
      this.transformStore.set("x", this.x);
    });

    this.yInput.on("change", () => {
      this.y = parseFloat(this.yInput.value);
      this.screen.camera.setPosition(-this.x, -this.y);
      this.transformStore.set("y", this.y);
    });

    this.zoomInput.on("change", () => {
      this.zoom = parseFloat(this.zoomInput.value);
      this.screen.camera.scale = this.zoom;
      this.transformStore.set("zoom", this.zoom);
    });
  }
}
