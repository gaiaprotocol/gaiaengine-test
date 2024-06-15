import { BodyNode, View, ViewParams } from "@common-module/app";
import { Fullscreen } from "@gaiaengine/gaiaengine";

export default class SpineTestView extends View {
  constructor(params: ViewParams) {
    super();
    BodyNode.append(
      new Fullscreen(),
    );
  }
}
