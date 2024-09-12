import { BodyNode, View } from "@common-module/app";
import {
  CollisionChecker,
  FPSDisplay,
  Fullscreen,
  GameObject,
  Interval,
  Sprite,
} from "@gaiaengine/2d";
import { AnalogJoystick } from "@gaiaengine/2d-joystick";
import { IntegerUtil } from "../../../ts-module/lib/index.js";

class Hero extends GameObject {
  constructor(x: number, y: number) {
    super(x, y);
    this.append(new Sprite(0, 0, "/assets/cat.png"));
  }
}

class Bullet extends GameObject {
  constructor(x: number, y: number) {
    super(x, y);
    this.append(new Sprite(0, 0, "/assets/bullet.png"));
  }
}

export default class CollisionTest extends View<Fullscreen> {
  private hero: Hero;
  private heros: Hero[] = [];
  private bullets: Bullet[] = [];

  constructor() {
    super();
    this.container = new Fullscreen().appendTo(BodyNode);

    this.heros = Array.from({ length: 10 }, () =>
      new Hero(
        IntegerUtil.random(0, this.container.width),
        IntegerUtil.random(0, this.container.height),
      ));

    this.hero = new Hero(this.container.width / 2, this.container.height / 2);
    this.heros.push(this.hero);

    this.container.root.append(
      ...this.heros,
      new Interval(100, () => this.createBullet()),
      new AnalogJoystick(
        (angle) => {
          console.log("onMove", angle);
        },
        () => {
          console.log("onRelease");
        },
      ),
      new CollisionChecker(this.heros, this.bullets, (hero) => {
        if (hero === this.hero) {
          console.log("hero hit");
        } else {
          console.log("dummy hero hit");
        }
      }),
      new FPSDisplay(),
    );
  }

  private createBullet() {
    const bullet = new Bullet(
      IntegerUtil.random(0, this.container.width),
      IntegerUtil.random(0, this.container.height),
    );
    this.bullets.push(bullet);
    this.container.root.append(bullet);
  }
}
