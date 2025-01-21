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
          title: "Text Test (2D)",
          onClick: () => Router.go("/2d/text"),
        }),
        new Button({
          type: ButtonType.Outlined,
          title: "Dom Text Test (2D)",
          onClick: () => Router.go("/2d/text/dom"),
        }),
        new Button({
          type: ButtonType.Outlined,
          title: "Bitmap Text Test (2D)",
          onClick: () => Router.go("/2d/text/bitmap"),
        }),
        new Button({
          type: ButtonType.Outlined,
          title: "Collision Test (2D)",
          onClick: () => Router.go("/2d/collision"),
        }),
        new Button({
          type: ButtonType.Outlined,
          title: "Spine Test (2D)",
          onClick: () => Router.go("/2d/spine"),
        }),
        new Button({
          type: ButtonType.Outlined,
          title: "Spine Performance Test (2D)",
          onClick: () => Router.go("/2d/spine-performance"),
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
