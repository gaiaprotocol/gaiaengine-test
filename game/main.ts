import { Router, SPAInitializer } from "@common-module/app";
import CollisionTest from "./collision-test/CollisionTest.js";
import IndexView from "./IndexView.js";
import RectTerrainMapTest from "./map-test/RectTerrainMapTest.js";

(() => {
  SPAInitializer.init();

  Router
    .add("/", IndexView)
    .add("/collision", CollisionTest)
    .add("/rect-terrain-map", RectTerrainMapTest);
})();
