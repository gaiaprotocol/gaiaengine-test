import { AppInitializer, Router } from "@common-module/app";
import RectTerrainMapTestView from "./map/RectTerrainMapTestView.js";
import PhysicsTestView from "./physics/PhysicsTestView.js";
import PlatformerView from "./platformer/PlatformerView.js";
import RenderingBenchmarkDom2View from "./rendering-benchmark/RenderingBenchmarkDom2View.js";
import RenderingBenchmarkDom3View from "./rendering-benchmark/RenderingBenchmarkDom3View.js";
import RenderingBenchmarkDomView from "./rendering-benchmark/RenderingBenchmarkDomView.js";
import RenderingBenchmarkView from "./rendering-benchmark/RenderingBenchmarkView.js";
import SpineTestView from "./spine/SpineTestView.js";
import AnimatedSpriteTestView from "./sprite/AnimatedSpriteTestView.js";
import SpriteTestView from "./sprite/SpriteTestView.js";
import DeleteTextureTestView from "./testview/DeleteTextureTestView.js";
import FullscreenTestView from "./testview/FullscreenTestView.js";
import LetterboxedScreenTestView from "./testview/LetterboxedScreenTestView.js";

export default async function initialize() {
  AppInitializer.initialize(true);

  Router.route("fullscreen", FullscreenTestView);
  Router.route("letterboxed", LetterboxedScreenTestView);
  Router.route("platformer", PlatformerView);
  Router.route("rendering-benchmark", RenderingBenchmarkView);
  Router.route("rendering-benchmark-dom", RenderingBenchmarkDomView);
  Router.route("rendering-benchmark-dom2", RenderingBenchmarkDom2View);
  Router.route("rendering-benchmark-dom3", RenderingBenchmarkDom3View);
  Router.route("delete-texture", DeleteTextureTestView);
  Router.route("spine", SpineTestView);
  Router.route("physics", PhysicsTestView);
  Router.route("sprite", SpriteTestView);
  Router.route("animated-sprite", AnimatedSpriteTestView);
  Router.route("rect-terrain-map", RectTerrainMapTestView);
}
