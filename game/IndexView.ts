import { BodyNode, el, Router, View } from "@common-module/app";
import { Button, ButtonGroup, ButtonType } from "@common-module/app-components";

export default class IndexView extends View {
  constructor() {
    super();
    this.container = el(
      "#index",
      new ButtonGroup(
        new Button({
          type: ButtonType.Outlined,
          title: "Collision Test (2D)",
          onClick: () => Router.go("/2d/collision"),
        }),
        new Button({
          type: ButtonType.Outlined,
          title: "Rect Terrain Map Test (2D)",
          onClick: () => Router.go("/2d/rect-terrain-map"),
        }),
        new Button({
          type: ButtonType.Outlined,
          title: "Sprite Test (DOM)",
          onClick: () => Router.go("/dom/image/sprite"),
        }),
        new Button({
          type: ButtonType.Outlined,
          title: "Animated Sprite Test (DOM)",
          onClick: () => Router.go("/dom/image/animated-sprite"),
        }),
      ),
    ).appendTo(BodyNode);
  }
}
