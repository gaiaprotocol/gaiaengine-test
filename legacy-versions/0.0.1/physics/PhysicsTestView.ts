import { BodyNode, View, ViewParams } from "@common-module/app";
import { ColliderType, FpsDisplay, Fullscreen, Sprite } from "@gaiaengine/2d";
import { PhysicsNode, PhysicsWorld } from "@gaiaengine/2d-physics";

class Ground extends PhysicsNode {
  constructor(x: number, y: number) {
    super(x, y, {
      type: ColliderType.Rect,
      x: 0,
      y: 0,
      width: 640,
      height: 123,
    }, true);
    this.append(new Sprite(0, 0, "/assets/ground.png"));
  }
}

class StaticCat extends PhysicsNode {
  constructor(x: number, y: number) {
    super(x, y, {
      type: ColliderType.Circle,
      x: 0,
      y: 0,
      radius: 32,
    }, true);
    this.append(new Sprite(0, 0, "/assets/cat.png"));
  }
}

class Cat extends PhysicsNode {
  constructor(x: number, y: number) {
    super(x, y, {
      type: ColliderType.Circle,
      x: 0,
      y: 0,
      radius: 32,
    });
    this.append(new Sprite(0, 0, "/assets/cat.png"));
  }
}

export default class PhysicsTestView extends View {
  constructor(params: ViewParams) {
    super();

    BodyNode.append(
      new Fullscreen(
        new PhysicsWorld(
          0,
          0,
          new Cat(0, 0),
          new StaticCat(0, 136),
          new Ground(0, 230),
        ),
        new FpsDisplay(),
      ),
    );
  }
}
