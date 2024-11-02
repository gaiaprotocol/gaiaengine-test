import { BodyNode, Store, View } from "@common-module/app";
import { Fullscreen, RectTerrainMap } from "@gaiaengine/2d";
import mapData from "./map.json" with { type: "json" };
import spritesheetWithAlphaData from "./spritesheet-with-alpha.json" with {
  type: "json",
};
import spritesheetWithoutAlphaData from "./spritesheet-without-alpha.json" with {
  type: "json",
};

export default class RectTerrainMapTest extends View<{}, Fullscreen> {
  private transformStore = new Store("rect-terrain-map-test-transform");

  private zoom = 1;

  constructor() {
    super();

    this.zoom = this.transformStore.get("zoom") ?? 1;

    this.container = new Fullscreen(
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
    ).appendTo(BodyNode);

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
