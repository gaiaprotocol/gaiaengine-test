import {
  Texture,
  TextureFilter,
  TextureWrap,
} from "@esotericsoftware/spine-core";

export class BabylonJsTexture extends Texture {
  constructor(image: HTMLImageElement | ImageBitmap, pma = false) {
    super(image);
  }

  setFilters(minFilter: TextureFilter, magFilter: TextureFilter) {
    //TODO: implement
  }

  setWraps(uWrap: TextureWrap, vWrap: TextureWrap) {
    //TODO: implement
  }

  dispose() {
    //TODO: implement
  }
}
