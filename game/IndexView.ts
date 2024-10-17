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
          title: "Collision Test",
          onClick: () => Router.go("/collision"),
        }),
        new Button({
          type: ButtonType.Outlined,
          title: "Rect Terrain Map Test",
          onClick: () => Router.go("/rect-terrain-map"),
        }),
      ),
    ).appendTo(BodyNode);
  }
}
