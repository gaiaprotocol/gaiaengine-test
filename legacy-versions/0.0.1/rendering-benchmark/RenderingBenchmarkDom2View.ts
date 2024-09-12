import { BodyNode, DomNode, el, View, ViewParams } from "@common-module/app";

export default class RenderingBenchmarkDom2View extends View {
  private particles: {
    x: number;
    y: number;
    size: number;
    dx: number;
    dy: number;
    cat: DomNode;
  }[] = [];
  private beforeTime = 0;

  private fpsDisplay: DomNode;
  private animationInterval: number;

  constructor(params: ViewParams) {
    super();

    let screen;
    BodyNode.append(
      this.fpsDisplay = el(".fps-display", "FPS: 0", {
        style: {
          fontSize: 25,
          color: "#fff",
        },
      }),
      screen = el(".screen", {
        style: {
          position: "relative",
          width: 1024,
          height: 480,
          backgroundColor: "#bfbfbf",
          overflow: "hidden",
        },
      }),
    );

    this.particles = new Array(10000);
    const rnd = [1, -1];
    for (let i = 0; i < 10000; i++) {
      const size = 10 + Math.random() * 80 * 2;
      const x = Math.random() * 1024;
      const y = Math.random() * (480 - size);
      const [dx, dy] = [
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
        3 * Math.random() * rnd[Math.floor(Math.random() * 2)],
      ];

      const cat = el("img.cat", {
        src: "/assets/cat.png",
        style: {
          position: "absolute",
          transform: `translate(${x - 32}px, ${y - 32}px)`,
        },
      });
      screen.append(cat);
      this.particles[i] = { x, y, size: size, dx, dy, cat };
    }

    this.animationInterval = requestAnimationFrame(this._animate);
  }

  private _animate = (now: number) => {
    const particles = this.particles;
    for (let i = 0; i < 10000; i++) {
      const p = particles[i];
      p.x -= p.dx;
      p.y -= p.dy;
      if (p.x + p.size < 0) p.dx *= -1;
      else if (p.y + p.size < 0) p.dy *= -1;
      if (p.x > 1024) p.dx *= -1;
      else if (p.y > 480) p.dy *= -1;
      p.cat.style({ transform: `translate(${p.x - 32}px, ${p.y - 32}px)` });
    }

    this.fpsDisplay.text = `FPS: ${Math.floor(1000 / (now - this.beforeTime))}`;
    this.beforeTime = now;

    this.animationInterval = requestAnimationFrame(this._animate);
  };

  public close() {
    cancelAnimationFrame(this.animationInterval);
    super.close();
  }
}
