import { AppInitializer, Router } from "@common-module/app";
import PlatformerView from "./platformer/PlatformerView.js";
import RenderingBenchmarkView from "./rendering-benchmark/RenderingBenchmarkView.js";
import DeleteTextureTestView from "./testview/DeleteTextureTestView.js";
import FullscreenTestView from "./testview/FullscreenTestView.js";
import LetterboxedScreenTestView from "./testview/LetterboxedScreenTestView.js";

export default async function initialize() {
  AppInitializer.initialize(true);

  Router.route("fullscreen", FullscreenTestView);
  Router.route("letterboxed", LetterboxedScreenTestView);
  Router.route("platformer", PlatformerView);
  Router.route("rendering-benchmark", RenderingBenchmarkView);
  Router.route("delete-texture", DeleteTextureTestView);
}
