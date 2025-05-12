import { AppRoot, View } from "@commonmodule/app";
import { IntegerUtils } from "@commonmodule/ts";
import { DebugDisplay, Fullscreen } from "@gaiaengine/2d";
import { Spine } from "@gaiaengine/2d-spine";

export default class SpinePerformanceTest extends View<{}, Fullscreen> {
  constructor() {
    super();

    this.container = new Fullscreen({}).appendTo(AppRoot);
    this.container.root.append(new DebugDisplay());

    for (let i = 0; i < 10000; i++) {
      const x = IntegerUtils.random(-640, 640);
      const y = IntegerUtils.random(-360, 360);

      const spine = new Spine(x, y, {
        atlas: "/assets/spine/swordsman.atlas",
        json: "/assets/spine/swordsman.json",
        texture: "/assets/spine/swordsman.png",
        skins: ["green"],
        animation: "idle",
      }).appendTo(this.container.root);

      spine.scale = 0.3;
    }
  }
}
