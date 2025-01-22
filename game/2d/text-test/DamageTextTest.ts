import { BodyNode, View } from "@common-module/app";
import { Fullscreen } from "@gaiaengine/2d";
import DamageTextNode from "./DamageTextNode.js";

export default class DamageTextTest extends View<{}, Fullscreen> {
  constructor() {
    super();

    this.container = new Fullscreen({}).appendTo(BodyNode);
    this.container.root.append(
      new DamageTextNode(0, 0, 100),
    );

    this.container.onWindow("mousemove", (event) => {
      const x = event.clientX - this.container.width / 2;
      const y = event.clientY - this.container.height / 2;
      this.container.root.append(
        new DamageTextNode(x, y, 100),
      );
    });
  }
}
