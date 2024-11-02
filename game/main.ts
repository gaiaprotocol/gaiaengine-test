import { Router, SPAInitializer } from "@common-module/app";
import CollisionTest2D from "./2d/collision-test/CollisionTest.js";
import RectTerrainMapTest2D from "./2d/map-test/RectTerrainMapTest.js";
import SpineTest2D from "./2d/spine-test/SpineTest.js";
import AnimatedSpriteTestDom from "./dom/image/AnimatedSpriteTest.js";
import SpriteTestDom from "./dom/image/SpriteTest.js";
import IndexView from "./IndexView.js";

(() => {
  SPAInitializer.init();

  Router.add("/", IndexView);

  Router
    .add("/2d/collision", CollisionTest2D)
    .add("/2d/rect-terrain-map", RectTerrainMapTest2D)
    .add("/2d/spine", SpineTest2D);

  Router
    .add("/dom/image/sprite", SpriteTestDom)
    .add("/dom/image/animated-sprite", AnimatedSpriteTestDom);
})();
