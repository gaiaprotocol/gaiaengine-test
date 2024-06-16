import { BodyNode, View, ViewParams } from "@common-module/app";
import { Image, Node, Screen } from "@gaiaengine/2d";

export default class DeleteTextureTestView extends View {
  constructor(params: ViewParams) {
    super();

    let container;
    BodyNode.append(
      new Screen(500, 500, container = new Node(0, 0)),
    );

    setInterval(() => {
      for (let i = 0; i < 100; i++) {
        Math.random() < 0.5
          ? container.empty()
          : container.append(new Image(0, 0, "/assets/cat.png"));
      }
    }, 100);
  }
}
