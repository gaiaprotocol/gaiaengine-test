import { AppRoot, View } from "@commonmodule/app";
import { Fullscreen } from "@gaiaengine/2d";
import DamageTextNode from "./DamageTextNode.js";

export default class DamageTextTest extends View<{}, Fullscreen> {
  constructor() {
    super();

    this.container = new Fullscreen({}).appendTo(AppRoot);
    this.container.root.append(
      new DamageTextNode(0, 0, 100),
    );

    AppRoot.bind(this.container, "mousemove", (event) => {
      const x = event.clientX - this.container.width / 2;
      const y = event.clientY - this.container.height / 2;
      this.container.root.append(
        new DamageTextNode(x, y, 100),
      );
    });

    AppRoot.bind(this.container, "touchmove", (event) => {
      const x = event.touches[0].clientX - this.container.width / 2;
      const y = event.touches[0].clientY - this.container.height / 2;
      this.container.root.append(
        new DamageTextNode(x, y, 100),
      );
    });
  }
}
