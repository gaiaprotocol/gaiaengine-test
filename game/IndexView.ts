import { BodyNode, el, Router, View } from "@common-module/app";

export default class IndexView extends View {
  constructor() {
    super();
    this.container = el(
      "#index",
      el("a", "Collision Test", { onclick: () => Router.go("/collision") }),
    ).appendTo(BodyNode);
  }
}
