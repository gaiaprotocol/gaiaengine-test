import { AppRoot, View } from "@commonmodule/app";
import { DomTextNode, Fullscreen } from "@gaiaengine/2d";

export default class DomTextTest extends View<{}, Fullscreen> {
  constructor() {
    super();

    this.container = new Fullscreen({}).appendTo(AppRoot);
    this.container.root.append(
      new DomTextNode(0, 0, "Test Text", {
        fontFamily: "Trajan Pro",
        fontSize: "24px",
        color: "white",
      }),
    );
  }
}
