import { BodyNode, View, ViewParams } from "@common-module/app";
import { Fullscreen, Sprite } from "@gaiaengine/2d";

export default class SpriteTestView extends View {
  constructor(params: ViewParams) {
    super();

    BodyNode.append(
      new Fullscreen(
        new Sprite(0, 0, "/assets/run.png", {
          frames: {
            run: {
              frame: { x: 0, y: 0, w: 48, h: 93 },
            },
          },
          meta: { scale: 1 },
        }, "run"),
      ),
    );
  }
}
