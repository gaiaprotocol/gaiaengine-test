import { BodyNode, View, ViewParams } from "@common-module/app";
import { Fullscreen } from "@gaiaengine/2d";
import { Spine } from "@gaiaengine/2d-spine";

export default class SpineTestView extends View {
  constructor(params: ViewParams) {
    super();

    let spine: Spine;
    BodyNode.append(
      new Fullscreen(
        spine = new Spine(0, 0, {
          atlas: "/assets/spine/hellboy.atlas",
          skel: "/assets/spine/hellboy.skel",
          png: "/assets/spine/hellboy.png",
          animation: "idle",
        }, (animation) => {
          if (animation === "run") spine.animation = "idle";
        }),
      ),
    );
    spine.scale = 0.5;

    setTimeout(() => {
      spine.animation = "run";
    }, 1000);
  }
}
