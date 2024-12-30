import { BodyNode, View } from "@common-module/app";
import { FPSDisplay, Fullscreen } from "@gaiaengine/2d";
import { Spine } from "@gaiaengine/2d-spine";
import { IntegerUtils } from "@common-module/ts";

export default class SpinePerformanceTest extends View<{}, Fullscreen> {
  constructor() {
    super();

    this.container = new Fullscreen({}).appendTo(BodyNode);
    this.container.root.append(
      new FPSDisplay(),
    );

    for (let i = 0; i < 1000; i++) {
      const x = IntegerUtils.random(-640, 640);
      const y = IntegerUtils.random(-360, 360);

      const spine = new Spine(x, y, {
        atlas: "/assets/spine/swordsman.atlas",
        json: "/assets/spine/swordsman.json",
        png: "/assets/spine/swordsman.png",
        skins: ["green"],
        animation: "idle",
      }).appendTo(this.container.root);

      spine.scale = 0.3;
    }
  }
}
