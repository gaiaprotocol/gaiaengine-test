import { BodyNode, el, View, ViewParams } from "@common-module/app";

export default class PlatformerView extends View {
  constructor(params: ViewParams) {
    super();
    BodyNode.append(
      this.container = el(
        ".platformer-view",
        "Platformer View",
      ),
    );
  }
}
