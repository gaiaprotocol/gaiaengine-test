import { BodyNode, View, ViewParams } from "@common-module/app";
import { AnimatedSprite, Fullscreen } from "@gaiaengine/2d";

export default class AnimatedSpriteTestView extends View {
  constructor(params: ViewParams) {
    super();

    BodyNode.append(
      new Fullscreen(
        new AnimatedSprite(
          0,
          0,
          "/assets/run.png",
          {
            frames: {
              run1: {
                frame: { x: 0, y: 0, w: 48, h: 93 },
              },
              run2: {
                frame: { x: 48, y: 0, w: 48, h: 93 },
              },
              run3: {
                frame: { x: 96, y: 0, w: 48, h: 93 },
              },
              run4: {
                frame: { x: 144, y: 0, w: 48, h: 93 },
              },
              run5: {
                frame: { x: 192, y: 0, w: 48, h: 93 },
              },
              run6: {
                frame: { x: 240, y: 0, w: 48, h: 93 },
              },
            },
            meta: { scale: 1 },
            animations: {
              run: ["run1", "run2", "run3", "run4", "run5", "run6"],
            },
          },
          "run",
          10,
        ),
      ),
    );
  }
}
