import { BodyNode, Store, View } from "@common-module/app";
import { Fullscreen, RectMap } from "@gaiaengine/2d";
import mapData from "./map.json" with { type: "json" };

export default class RectTerrainMapTest extends View<{}, Fullscreen> {
  private transformStore = new Store("rect-terrain-map-test-transform");

  private zoom = 1;

  constructor() {
    super();

    this.zoom = this.transformStore.get("zoom") ?? 1;

    this.container = new Fullscreen({}).appendTo(BodyNode);
    this.container.root.append(
      new RectMap(
        256,
        {
          "spritesheet-with-alpha": "/assets/map/spritesheet-with-alpha.png",
          "spritesheet-without-alpha":
            "/assets/map/spritesheet-without-alpha.jpg",
        },
        mapData,
      ),
    );

    this.container.camera.scale = this.zoom;

    this.container.onDom("wheel", (event: WheelEvent) => {
      event.preventDefault();
      this.zoom += event.deltaY / 1000;
      if (this.zoom < 0.2) this.zoom = 0.2;
      if (this.zoom > 10) this.zoom = 10;
      this.container.camera.scale = this.zoom;
      this.transformStore.setTemporary("zoom", this.zoom);
    });
  }
}
