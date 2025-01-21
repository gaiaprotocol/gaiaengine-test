import { BodyNode, View } from "@common-module/app";
import { Fullscreen, TextNode } from "@gaiaengine/2d";

export default class TextTest extends View<{}, Fullscreen> {
  constructor() {
    super();

    this.container = new Fullscreen({}).appendTo(BodyNode);
    this.container.root.append(
      new TextNode(0, 0, "Test Text", {
        fontFamily: "Trajan Pro",
        fontSize: 24,
        fill: "white",
      }),
    );
  }
}
