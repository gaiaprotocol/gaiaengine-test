import { BodyNode, View, ViewParams } from "@common-module/app";
import { LetterboxedScreen } from "@gaiaengine/2d";

export default class LetterboxedScreenTestView extends View {
  constructor(params: ViewParams) {
    super();
    BodyNode.append(
      new LetterboxedScreen(360, 640),
    );
  }
}
