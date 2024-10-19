import { BodyNode, View } from "@common-module/app";
import { Fullscreen, Sprite } from "@gaiaengine/dom";

export default class SpriteTest extends View {
  constructor() {
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
