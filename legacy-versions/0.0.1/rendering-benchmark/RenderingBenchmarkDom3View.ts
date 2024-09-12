import { BodyNode, DomNode, el, View, ViewParams } from "@common-module/app";

export default class RenderingBenchmarkDom3View extends View {
  private fpsDisplay: DomNode;

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

    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);

    const rnd = [1, -1];
    for (let i = 0; i < 10000; i++) {
      const size = 10 + Math.random() * 80 * 2;
      const x = Math.random() * 1024;
      const y = Math.random() * (480 - size);
      const dx = 150 * rnd[Math.floor(Math.random() * 2)];
      const dy = 150 * rnd[Math.floor(Math.random() * 2)];

      const keyframes = `
        @keyframes move${i} {
          from {
            transform: translate(${x}px, ${y}px);
          }
          to {
            transform: translate(${x + dx}px, ${y + dy}px);
          }
        }
      `;
      styleElement.sheet!.insertRule(
        keyframes,
        styleElement.sheet!.cssRules.length,
      );

      const cat = el("img.cat", {
        src: "/assets/cat.png",
        style: {
          position: "absolute",
          animation: `move${i} 5s linear infinite`,
        },
      });
      screen.append(cat);
    }
  }

  public close() {
    super.close();
  }
}
