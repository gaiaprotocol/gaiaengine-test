import { BodyNode, View, ViewParams } from "@common-module/app";
import { Image, Screen } from "@gaiaengine/gaiaengine";

export default class DeleteTextureTestView extends View {
  constructor(params: ViewParams) {
    super();

    let screen;
    BodyNode.append(
      screen = new Screen(500, 500, new Image(0, 0, "/assets/cat.png")),
    );

    setTimeout(() => {
      screen.root.empty();
      screen.root.append(new Image(0, 0, "/assets/cat.png"));
      screen.root.append(new Image(0, 0, "/assets/cat.png"));
      screen.root.empty();
      screen.root.append(new Image(0, 0, "/assets/cat.png"));
      screen.root.append(new Image(0, 0, "/assets/cat.png"));
      screen.root.append(new Image(0, 0, "/assets/cat.png"));
      screen.root.append(new Image(0, 0, "/assets/cat.png"));
      screen.root.empty();
      screen.root.append(new Image(0, 0, "/assets/cat.png"));
    }, 1000);
  }
}
