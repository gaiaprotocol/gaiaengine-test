import { Router, SPAInitializer } from "@commonmodule/app";
import CollisionTest2D from "./2d/collision-test/CollisionTest.js";
import SpinePerformanceTest2D from "./2d/spine-test/SpinePerformanceTest.js";
import SpineTest2D from "./2d/spine-test/SpineTest.js";
import BitmapTextTest2D from "./2d/text-test/BitmapTextTest.js";
import DamageTextTest2D from "./2d/text-test/DamageTextTest.js";
import DomTextTest2D from "./2d/text-test/DomTextTest.js";
import TextTest2D from "./2d/text-test/TextTest.js";
import SpinePerformanceTestBabylon from "./babylon/spine-test/SpinePerformanceTest.js";
import SpineTestBabylon from "./babylon/spine-test/SpineTest.js";
import SpineTestBabylonOld from "./babylon/spine-test/SpineTestOld.js";
import AnimatedSpriteTestDom from "./dom/image/AnimatedSpriteTest.js";
import SpriteTestDom from "./dom/image/SpriteTest.js";
import IndexView from "./IndexView.js";
import SpinePerformanceTestThree from "./three/spine-test/SpinePerformanceTest.js";
import SpineTestThree from "./three/spine-test/SpineTest.js";

(() => {
  SPAInitializer.init();

  Router.add("/", IndexView);

  Router
    .add("/2d/text", TextTest2D)
    .add("/2d/text/dom", DomTextTest2D)
    .add("/2d/text/bitmap", BitmapTextTest2D)
    .add("/2d/text/damage", DamageTextTest2D)
    .add("/2d/collision", CollisionTest2D)
    .add("/2d/spine", SpineTest2D)
    .add("/2d/spine-performance", SpinePerformanceTest2D);

  Router
    .add("/dom/image/sprite", SpriteTestDom)
    .add("/dom/image/animated-sprite", AnimatedSpriteTestDom);

  Router
    .add("/three/spine", SpineTestThree)
    .add("/three/spine-performance", SpinePerformanceTestThree);

  Router
    .add("/babylon/spine", SpineTestBabylon)
    .add("/babylon/spine-old", SpineTestBabylonOld)
    .add("/babylon/spine-performance", SpinePerformanceTestBabylon);
})();
