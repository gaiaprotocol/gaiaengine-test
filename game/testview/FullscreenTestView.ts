import { BodyNode, View, ViewParams } from "@common-module/app";
import { Fullscreen } from "@gaiaengine/2d";

export default class FullscreenTestView extends View {
  constructor(params: ViewParams) {
    super();
    BodyNode.append(
      new Fullscreen(),
    );
  }
}
