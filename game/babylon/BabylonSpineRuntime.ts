import {
  AnimationState,
  AnimationStateData,
  AssetManagerBase,
  BlendMode,
  ClippingAttachment,
  Color,
  Downloader,
  MeshAttachment,
  NumberArrayLike,
  Physics,
  RegionAttachment,
  Skeleton,
  SkeletonClipping,
  SkeletonData,
  Texture,
  TextureFilter,
  TextureWrap,
  Utils,
} from "@esotericsoftware/spine-core";

import * as BABYLON from "@babylonjs/core";
const {
  Engine,
  Mesh,
  Scene,
  ShaderMaterial,
  Texture: BabylonTex,
  VertexBuffer,
  VertexData,
  Color4,
  MultiMaterial,
  SubMesh,
  Constants,
} = BABYLON as any;

//--------------------------------- Texture ---------------------------------
export class BabylonJsTexture extends Texture {
  /** Babylon texture kept in sync with the Spine texture wrapper. */
  texture: BABYLON.Texture;

  constructor(
    image: HTMLImageElement | ImageBitmap,
    scene: BABYLON.Scene,
    pma = false,
  ) {
    super(image);
    const engine = scene.getEngine();
    // Babylon texture from raw image source. We pass the HTML element directly to avoid an extra request.
    this.texture = new BabylonTex(
      "",
      scene,
      false,
      false,
      Constants.TEXTURE_TRILINEAR_SAMPLINGMODE,
      undefined,
      undefined,
      image,
    );
    this.texture.hasAlpha = true;
    //this.texture.invertY = false;
    // Spine atlas is already premultiplied -> disable automatic PMA in Babylon (default: false).
    //this.texture._preMultiplyAlpha = pma;
    this.texture.updateSamplingMode(Constants.TEXTURE_TRILINEAR_SAMPLINGMODE);
  }

  setFilters(minFilter: TextureFilter, magFilter: TextureFilter) {
    const toSampling = BabylonJsTexture.toSamplingMode;
    this.texture.updateSamplingMode(toSampling(minFilter, magFilter));
  }
  setWraps(uWrap: TextureWrap, vWrap: TextureWrap) {
    this.texture.wrapU = BabylonJsTexture.toWrap(uWrap);
    this.texture.wrapV = BabylonJsTexture.toWrap(vWrap);
  }
  dispose() {
    this.texture.dispose();
  }

  // ---------------------------------------------------------------------
  private static toSamplingMode(min: TextureFilter, mag: TextureFilter) {
    // Simplified mapping. Babylon has a single enum incorporating min/mag.
    if (min === TextureFilter.Nearest || mag === TextureFilter.Nearest) {
      return Constants.TEXTURE_NEAREST_NEAREST_MIPNEAREST;
    }
    if (min === TextureFilter.MipMapNearestNearest) {
      return Constants.TEXTURE_NEAREST_NEAREST_MIPNEAREST;
    }
    if (min === TextureFilter.MipMapLinearNearest) {
      return Constants.TEXTURE_NEAREST_LINEAR_MIPNEAREST;
    }
    if (min === TextureFilter.MipMapNearestLinear) {
      return Constants.TEXTURE_LINEAR_NEAREST_MIPNEAREST;
    }
    // Default – trilinear
    return Constants.TEXTURE_TRILINEAR_SAMPLINGMODE;
  }

  private static toWrap(wrap: TextureWrap) {
    switch (wrap) {
      case TextureWrap.ClampToEdge:
        return Constants.TEXTURE_CLAMP_ADDRESSMODE;
      case TextureWrap.MirroredRepeat:
        return Constants.TEXTURE_MIRROR_ADDRESSMODE;
      case TextureWrap.Repeat:
        return Constants.TEXTURE_WRAP_ADDRESSMODE;
      default:
        throw new Error(`Unknown texture wrap: ${wrap}`);
    }
  }
}

//-------------------------------- Asset‑Manager ----------------------------
export class AssetManager extends AssetManagerBase {
  constructor(
    pathPrefix = "",
    downloader: Downloader = new Downloader(),
    private scene: BABYLON.Scene,
    pma = false,
  ) {
    super(
      (img) => new BabylonJsTexture(img, scene, pma),
      pathPrefix,
      downloader,
    );
  }
}

//-------------------------------- Skeleton‑Material ------------------------
export class SkeletonMeshMaterial extends ShaderMaterial {
  constructor(
    name: string,
    scene: BABYLON.Scene,
    twoColorTint: boolean,
    alphaTest = 0.001,
  ) {
    const defines = [twoColorTint ? "#define USE_SPINE_DARK_TINT" : ""].join(
      "\n",
    );
    const uniforms = { map: BabylonTex, alphaTest: alphaTest } as any;

    const vertex = /* glsl */ `
      precision highp float;
      attribute vec3 position;
      attribute vec4 color;
      attribute vec2 uv;
      #ifdef USE_SPINE_DARK_TINT
      attribute vec3 darkcolor;
      varying vec3 vDark;
      #endif
      varying vec2 vUv;
      varying vec4 vColor;
      uniform mat4 worldViewProjection;
      void main() {
        vUv = uv;
        vColor = color;
        #ifdef USE_SPINE_DARK_TINT
        vDark = darkcolor;
        #endif
        gl_Position = worldViewProjection * vec4(position, 1.0);
      }
    `;

    const fragment = /* glsl */ `
      precision highp float;
      varying vec2 vUv;
      varying vec4 vColor;
      #ifdef USE_SPINE_DARK_TINT
      varying vec3 vDark;
      #endif
      uniform sampler2D map;
      uniform float alphaTest;
      void main() {
        vec4 tex = texture2D(map, vUv);
        vec4 sampled = tex * vColor;
        #ifdef USE_SPINE_DARK_TINT
          sampled.rgb = (sampled.a - sampled.rgb) * vDark + sampled.rgb;
        #endif
        if (sampled.a < alphaTest) discard;
        gl_FragColor = sampled;
      }
    `;

    super(name, scene, {
      vertex,
      fragment,
      attributes: twoColorTint
        ? ["position", "color", "uv", "darkcolor"]
        : ["position", "color", "uv"],
      uniforms: ["worldViewProjection", "map", "alphaTest"],
      needAlphaBlending: true,
      defines,
    });
    this.alphaMode = Constants.ALPHA_PREMULTIPLIED_PORTERDUFF;
    this.backFaceCulling = false;
  }
}

//-------------------------------- Mesh‑Batcher -----------------------------

/*
 * MeshBatcher owns a vertex + index buffer pair big enough for a single
 * Babylon Mesh (max 10920 triangles like reference).  Whenever we encounter
 * a texture / blend‑mode change we *finish* the current batch and start a new
 * MeshBatcher via SkeletonMesh.nextBatch().
 */
export class MeshBatcher extends Mesh {
  static readonly MAX_VERTICES = 10920;

  private vertexSize: number;
  private twoColorTint: boolean;

  // Raw typed‑arrays grow once and are reused each frame (just like in the
  // Three.js runtime).  We update them via bindVertexBuffer()
  private vertices: Float32Array;
  private indices: Uint16Array;

  private verticesLength = 0;
  private indicesLength = 0;

  materialTexture: BabylonJsTexture | null = null; // current texture bound on the material
  blendMode: BlendMode = BlendMode.Normal;

  constructor(name: string, scene: BABYLON.Scene, twoColorTint: boolean) {
    super(name, scene);
    this.twoColorTint = twoColorTint;
    this.vertexSize = twoColorTint ? 12 : 9; // xyz rgba uv ( + dark rgb )

    this.vertices = new Float32Array(
      MeshBatcher.MAX_VERTICES * this.vertexSize,
    );
    this.indices = new Uint16Array(MeshBatcher.MAX_VERTICES * 3);

    // Prepare VertexData/Buffer placeholders – real data is uploaded in end()
    const vd = new VertexData();
    vd.positions = [];
    vd.colors = [];
    vd.uvs = [];
    vd.indices = [];
    vd.applyToMesh(this, true);
  }

  clear() {
    this.verticesLength = 0;
    this.indicesLength = 0;
  }
  begin() {
    this.clear();
  }

  canBatch(numVertices: number, numIndices: number) {
    return (
      this.verticesLength / this.vertexSize + numVertices <
        MeshBatcher.MAX_VERTICES &&
      this.indicesLength + numIndices < this.indices.length
    );
  }

  batch(
    vertices: ArrayLike<number>,
    verticesLength: number,
    indices: ArrayLike<number>,
    indicesLength: number,
    z: number = 0,
  ) {
    const startVertex = this.verticesLength / this.vertexSize;

    // copy vertex data with z injection
    for (let v = 0; v < verticesLength;) {
      this.vertices[this.verticesLength++] = vertices[v++]; // x
      this.vertices[this.verticesLength++] = vertices[v++]; // y
      this.vertices[this.verticesLength++] = z; // z

      // copy rgba
      //this.vertices.set(vertices.subarray(v, v + 4), this.verticesLength);
      this.verticesLength += 4;
      v += 4;

      // copy uv
      this.vertices[this.verticesLength++] = vertices[v++];
      this.vertices[this.verticesLength++] = vertices[v++];

      if (this.twoColorTint) {
        // dark rgb – assume opaque dark (alpha = 1) so skip 4th component
        //this.vertices.set(vertices.subarray(v, v + 3), this.verticesLength);
        this.verticesLength += 3;
        v += 4; // skip dark.a as in reference impl
      }
    }

    // copy indices with base offset
    for (let i = 0; i < indicesLength; ++i) {
      this.indices[this.indicesLength++] = indices[i] + startVertex;
    }
  }

  /** Upload typed‑arrays into Babylon buffers and assign sub‑meshes */
  end(
    texture: BabylonJsTexture,
    blend: BlendMode,
    material: SkeletonMeshMaterial,
  ) {
    if (this.indicesLength === 0) return;

    this.materialTexture = texture;
    this.blendMode = blend;

    // Update material texture only once
    if (!material.hasTexture(texture)) {
      material.setTexture("map", texture);
    }
    this.material = material;

    // Upload positions, colors, uvs into the mesh geometry
    const vd = new VertexData();

    // Split the interleaved array into separate attribute arrays
    const positions = new Array<number>();
    const colors = new Array<number>();
    const uvs = new Array<number>();
    const darks = new Array<number>();

    const stride = this.vertexSize;
    for (let i = 0; i < this.verticesLength; i += stride) {
      positions.push(
        this.vertices[i],
        this.vertices[i + 1],
        this.vertices[i + 2],
      );
      colors.push(
        this.vertices[i + 3],
        this.vertices[i + 4],
        this.vertices[i + 5],
        this.vertices[i + 6],
      );
      uvs.push(this.vertices[i + 7], this.vertices[i + 8]);
      if (this.twoColorTint) {
        darks.push(
          this.vertices[i + 9],
          this.vertices[i + 10],
          this.vertices[i + 11],
        );
      }
    }
    vd.positions = positions;
    vd.colors = colors;
    vd.uvs = uvs;
    vd.indices = Array.from(this.indices.subarray(0, this.indicesLength));
    vd.applyToMesh(this, true);

    // Add darkcolor buffer if needed – Babylon requires manual buffer
    if (this.twoColorTint) {
      const engine = this.getScene().getEngine();
      const darkFloatArray = new Float32Array(darks);
      const darkVB = new VertexBuffer(
        engine,
        darkFloatArray,
        "darkcolor",
        false,
        false,
        3,
        true,
      ); // 3‑component
      this.setVerticesBuffer(darkVB);
    }

    // Alpha blending mode mapping
    switch (blend) {
      case BlendMode.Additive:
        material.alphaMode = Constants.ALPHA_ADD;
        break;
      case BlendMode.Multiply:
        material.alphaMode = Constants.ALPHA_MULTIPLY;
        break;
      case BlendMode.Screen:
        material.alphaMode = Constants.ALPHA_SCREENMODE;
        break;
      default:
        material.alphaMode = Constants.ALPHA_PREMULTIPLIED_PORTERDUFF;
    }
  }
}

//-------------------------------- Skeleton‑Mesh ---------------------------
export interface SkeletonMeshConfiguration {
  skeletonData: SkeletonData;
  twoColorTint?: boolean;
  materialFactory?: (
    scene: BABYLON.Scene,
    twoColorTint: boolean,
  ) => SkeletonMeshMaterial;
}

export class SkeletonMesh extends BABYLON.TransformNode {
  skeleton: Skeleton;
  state: any;
  zOffset = 0.1;

  private twoColorTint: boolean;
  private batches: MeshBatcher[] = [];
  private nextBatchIndex = 0;
  private clipper = new SkeletonClipping();

  private vertices = Utils.newFloatArray(1024);
  private tempColor = new Color();
  private tempDarkColor = new Color();

  private materialFactory: (
    scene: BABYLON.Scene,
    twoColorTint: boolean,
  ) => SkeletonMeshMaterial;

  constructor(
    name: string,
    public scene: BABYLON.Scene,
    config: SkeletonMeshConfiguration,
  ) {
    super(name, scene);

    this.twoColorTint = config.twoColorTint ?? true;

    this.materialFactory = config.materialFactory ??
      ((scn, tint) => new SkeletonMeshMaterial(`${name}_mat`, scn, tint));

    this.skeleton = new Skeleton(config.skeletonData);
    this.state = new AnimationState(
      new AnimationStateData(config.skeletonData),
    );
  }

  //-------------------------------- update loop --------------------------
  update(deltaTime: number) {
    const state = this.state;
    const skeleton = this.skeleton;

    state.update(deltaTime);
    state.apply(skeleton);
    skeleton.update(deltaTime);
    skeleton.updateWorldTransform(Physics.update);

    this.updateGeometry();
  }

  dispose() {
    this.batches.forEach((b) => b.dispose());
  }

  //-------------------------------- batching helpers ---------------------
  private clearBatches() {
    this.batches.forEach((b) => {
      b.clear();
      b.setEnabled(false);
    });
    this.nextBatchIndex = 0;
  }
  private nextBatch() {
    if (this.batches.length === this.nextBatchIndex) {
      const batch = new MeshBatcher(
        `${this.name}_batch${this.nextBatchIndex}`,
        this.scene,
        this.twoColorTint,
      );
      batch.parent = this; // honor node transform
      this.batches.push(batch);
    }
    const result = this.batches[this.nextBatchIndex++];
    result.setEnabled(true);
    return result;
  }

  //-------------------------------- geometry build -----------------------
  private updateGeometry() {
    this.clearBatches();

    const clipper = this.clipper;

    let vertices: NumberArrayLike = this.vertices;
    let triangles: number[] | null = null;
    let uvs: NumberArrayLike | null = null;

    const drawOrder = this.skeleton.drawOrder;
    let batch = this.nextBatch();
    batch.begin();
    let z = 0;

    const vertexSize = this.twoColorTint ? 10 : 8; // world verts filled w/out dark alpha

    for (let i = 0, n = drawOrder.length; i < n; i++) {
      const slot = drawOrder[i];
      if (!slot.bone.active) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      const attachment = slot.getAttachment();
      let attachmentColor: Color | null;
      let babylonTexture: BabylonJsTexture | null = null;
      let numFloats = 0;

      if (attachment instanceof RegionAttachment) {
        const region = attachment as RegionAttachment;
        attachmentColor = region.color;
        vertices = this.vertices;
        numFloats = vertexSize * 4;
        region.computeWorldVertices(slot, vertices, 0, vertexSize);
        triangles = [0, 1, 2, 2, 3, 0];
        uvs = region.uvs;
        babylonTexture = region.region!.texture as unknown as BabylonJsTexture;
      } else if (attachment instanceof MeshAttachment) {
        const mesh = attachment as MeshAttachment;
        attachmentColor = mesh.color;
        vertices = this.vertices;
        numFloats = (mesh.worldVerticesLength >> 1) * vertexSize;
        if (numFloats > vertices.length) {
          vertices = this.vertices = Utils.newFloatArray(numFloats);
        }
        mesh.computeWorldVertices(
          slot,
          0,
          mesh.worldVerticesLength,
          vertices,
          0,
          vertexSize,
        );
        triangles = mesh.triangles;
        uvs = mesh.uvs;
        babylonTexture = mesh.region!.texture as unknown as BabylonJsTexture;
      } else if (attachment instanceof ClippingAttachment) {
        clipper.clipStart(slot, attachment as ClippingAttachment);
        continue;
      } else {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      if (!babylonTexture) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      const skeleton = slot.bone.skeleton;
      const skeletonColor = skeleton.color;
      const slotColor = slot.color;
      const alpha = skeletonColor.a * slotColor.a * attachmentColor!.a;
      const color = this.tempColor;
      color.set(
        skeletonColor.r * slotColor.r * attachmentColor!.r * alpha,
        skeletonColor.g * slotColor.g * attachmentColor!.g * alpha,
        skeletonColor.b * slotColor.b * attachmentColor!.b * alpha,
        alpha,
      );

      const dark = this.tempDarkColor;
      if (!slot.darkColor) dark.set(0, 0, 0, 1);
      else {
        dark.r = slot.darkColor.r * alpha;
        dark.g = slot.darkColor.g * alpha;
        dark.b = slot.darkColor.b * alpha;
        dark.a = 1;
      }

      let finalVertices: NumberArrayLike;
      let finalVerticesLength: number;
      let finalIndices: NumberArrayLike;
      let finalIndicesLength: number;

      if (clipper.isClipping()) {
        clipper.clipTriangles(
          vertices,
          triangles!,
          triangles!.length,
          uvs!,
          color,
          dark,
          this.twoColorTint,
        );
        const cv = clipper.clippedVertices;
        const ci = clipper.clippedTriangles;
        finalVertices = cv;
        finalVerticesLength = cv.length;
        finalIndices = ci;
        finalIndicesLength = ci.length;
      } else {
        const verts = vertices as any as number[];
        if (!this.twoColorTint) {
          for (
            let v = 2, u = 0, n = numFloats;
            v < n;
            v += vertexSize, u += 2
          ) {
            verts[v] = color.r;
            verts[v + 1] = color.g;
            verts[v + 2] = color.b;
            verts[v + 3] = color.a;
            verts[v + 4] = uvs![u];
            verts[v + 5] = uvs![u + 1];
          }
        } else {
          for (
            let v = 2, u = 0, n = numFloats;
            v < n;
            v += vertexSize, u += 2
          ) {
            verts[v] = color.r;
            verts[v + 1] = color.g;
            verts[v + 2] = color.b;
            verts[v + 3] = color.a;
            verts[v + 4] = uvs![u];
            verts[v + 5] = uvs![u + 1];
            verts[v + 6] = dark.r;
            verts[v + 7] = dark.g;
            verts[v + 8] = dark.b;
            verts[v + 9] = dark.a;
          }
        }
        finalVertices = vertices;
        finalVerticesLength = numFloats;
        finalIndices = triangles!;
        finalIndicesLength = triangles!.length;
      }

      if (finalVerticesLength === 0 || finalIndicesLength === 0) {
        clipper.clipEndWithSlot(slot);
        continue;
      }

      // texture / blend change → finish current batch if needed
      const slotBlend = slot.data.blendMode as BlendMode;
      const material = this.materialFactory(this.scene, this.twoColorTint);
      if (
        !batch.canBatch(finalVerticesLength / vertexSize, finalIndicesLength) ||
        batch.materialTexture &&
          batch.materialTexture !== babylonTexture.texture as any ||
        batch.blendMode !== slotBlend
      ) {
        // finalize old batch
        batch.end(batch.materialTexture!, batch.blendMode, material);
        batch = this.nextBatch();
        batch.begin();
      }
      batch.batch(
        finalVertices,
        finalVerticesLength,
        finalIndices,
        finalIndicesLength,
        z,
      );
      batch.materialTexture = babylonTexture.texture as any;
      batch.blendMode = slotBlend;

      z += this.zOffset;
      clipper.clipEndWithSlot(slot);
    }
    clipper.clipEnd();
    // flush last batch
    const mat = this.materialFactory(this.scene, this.twoColorTint);
    batch.end(batch.materialTexture!, batch.blendMode, mat);
  }
}
