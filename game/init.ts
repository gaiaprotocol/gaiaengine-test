import { Router, SPAInitializer } from "@common-module/app";
import CollisionTest from "./collision-test/CollisionTest.js";
import IndexView from "./IndexView.js";

export default async function init() {
  SPAInitializer.init();

  Router
    .add("/", IndexView)
    .add("/collision", CollisionTest);
}
