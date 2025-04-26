import { BodyNode, View } from "@common-module/app";
import { Fullscreen } from "@gaiaengine/2d";
import { Spine } from "@gaiaengine/2d-spine";

export default class SpineTest extends View<{}, Fullscreen> {
  constructor() {
    super();

    let spine: Spine;

    this.container = new Fullscreen({}).appendTo(BodyNode);
    this.container.root.append(
      spine = new Spine(0, 159, {
        atlas: "/assets/spine/hellboy.atlas",
        skel: "/assets/spine/hellboy.skel",
        texture: "/assets/spine/hellboy.png",
        animation: "idle",
        onAnimationEnd: (animation) => {
          if (animation === "run") spine.animation = "idle";
        },
      }),
    );

    spine.scale = 0.5;

    setTimeout(() => {
      spine.animation = "run";
    }, 1000);
  }
}
