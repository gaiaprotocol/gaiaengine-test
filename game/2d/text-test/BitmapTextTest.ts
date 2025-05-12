import { AppRoot, View } from "@commonmodule/app";
import { BitmapTextNode, Fullscreen } from "@gaiaengine/2d";

export default class BitmapTextTest extends View<{}, Fullscreen> {
  constructor() {
    super();

    this.container = new Fullscreen({}).appendTo(AppRoot);
    this.container.root.append(
      new BitmapTextNode(0, 0, "Test Text", {
        fnt: "/assets/bitmap-fonts/white-peaberry.fnt",
        src: "/assets/bitmap-fonts/white-peaberry.png",
      }),
    );
  }
}
