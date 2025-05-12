import { AssetManagerBase, Downloader } from "@esotericsoftware/spine-core";
import { BabylonJsTexture } from "./BabylonJsTexture.js";

export class AssetManager extends AssetManagerBase {
  constructor(
    pathPrefix: string = "",
    downloader: Downloader = new Downloader(),
    pma = false,
  ) {
    super(
      (image: HTMLImageElement | ImageBitmap) => {
        return new BabylonJsTexture(image, pma);
      },
      pathPrefix,
      downloader,
    );
  }
}
