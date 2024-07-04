import { BodyNode, View, ViewParams } from "@common-module/app";
import { FpsDisplay, Node, Screen, Sprite } from "@gaiaengine/2d";

class Cat extends Node {
  constructor(x: number, y: number) {
    super(x, y);
    this.append(new Sprite(0, 0, "/assets/cat.png"));
  }
}

class RenderingBenchmark extends Node {
  private particles: {
    x: number;
    y: number;
    size: number;
    dx: number;
    dy: number;
    cat: Cat;
  }[] = [];

  constructor() {
    super(0, 0);
    this.append(new FpsDisplay());

    const rnd = [1, -1];
    for (let i = 0; i < 10000; i++) {
      const size = 10 + Math.random() * 80;
      const x = Math.random() * 1024;
      const y = Math.random() * (480 - size);
      const cat = new Cat(x - 512, y - 240).appendTo(this);
      const [dx, dy] = [
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
      ];
      this.particles.push({ x, y, size, dx, dy, cat });
    }
  }

  public update(deltaTime: number) {
    super.update(deltaTime);

    const particles = this.particles;
    for (let i = 0; i < 10000; i++) {
      const r = particles[i];
      r.x -= r.dx;
      r.y -= r.dy;
      if (r.x + r.size < 0) r.dx *= -1;
      else if (r.y + r.size < 0) r.dy *= -1;
      if (r.x > 1024) r.dx *= -1;
      else if (r.y > 480) r.dy *= -1;
      r.cat.setPosition(r.x - 512, r.y - 240);
    }
  }
}

export default class RenderingBenchmarkView extends View {
  constructor(params: ViewParams) {
    super();
    BodyNode.append(new Screen(1024, 480, new RenderingBenchmark()));
  }
}
