import { BodyNode, View } from "@common-module/app";
import {
  Collidable,
  Collider,
  ColliderType,
  CollisionDetector,
  EllipseNode,
  FPSDisplay,
  Fullscreen,
  Interval,
  Movable,
  Sprite,
} from "@gaiaengine/2d";
import { AnalogJoystick } from "@gaiaengine/2d-joystick";
import { IntegerUtils } from "../../../ts-module/lib/index.js";

class Hero extends Movable implements Collidable {
  public colliders: Collider[] = [{
    type: ColliderType.Ellipse,
    x: 0,
    y: 0,
    width: 64,
    height: 64,
  }];

  constructor(x: number, y: number) {
    super(x, y);
    this.append(new Sprite(0, 0, "/assets/cat.png"));

    this.append(
      new EllipseNode(0, 0, 64, 64, undefined, { width: 2, color: 0xff0000 }),
    );
  }
}

class Bullet extends Movable implements Collidable {
  public colliders: Collider[] = [{
    type: ColliderType.Ellipse,
    x: 0,
    y: 0,
    width: 40,
    height: 40,
  }];

  constructor(x: number, y: number) {
    super(x, y);
    this.append(new Sprite(0, 0, "/assets/bullet.png"));
    this.speedX = -1000;

    this.append(
      new EllipseNode(0, 0, 40, 40, undefined, { width: 2, color: 0xff0000 }),
    );
  }

  public update(delta: number) {
    super.update(delta);
    if (this.screen && this.x < -this.screen.width / 2) {
      this.remove();
    }
  }
}

export default class CollisionTest extends View<Fullscreen> {
  private hero: Hero;
  private heros: Hero[] = [];
  private bullets: Bullet[] = [];

  constructor() {
    super();
    this.container = new Fullscreen().appendTo(BodyNode);

    this.heros = Array.from({ length: 100 }, () =>
      new Hero(
        IntegerUtils.random(
          -this.container.width / 2,
          this.container.width / 2,
        ),
        IntegerUtils.random(
          -this.container.height / 2,
          this.container.height / 2,
        ),
      ));

    this.hero = new Hero(0, 0);
    this.heros.push(this.hero);

    this.container.root.append(
      ...this.heros,
      new Interval(0.1, () => this.createBullet()),
      new AnalogJoystick(
        (angle) => this.hero.move(angle, 200),
        () => this.hero.stop(),
      ),
      new CollisionDetector(this.heros, this.bullets, (hero, bullet) => {
        if (hero === this.hero) {
          console.log(hero.absoluteTransform, bullet.absoluteTransform);
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
      this.container.width / 2,
      IntegerUtils.random(-this.container.height, this.container.height / 2),
    );
    this.bullets.push(bullet);
    this.container.root.append(bullet);
  }
}
