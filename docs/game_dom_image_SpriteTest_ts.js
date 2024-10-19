"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk"] = self["webpackChunk"] || []).push([["game_dom_image_SpriteTest_ts"],{

/***/ "./game/dom/image/SpriteTest.ts":
/*!**************************************!*\
  !*** ./game/dom/image/SpriteTest.ts ***!
  \**************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SpriteTest)\n/* harmony export */ });\n/* harmony import */ var _common_module_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @common-module/app */ \"../app-module/lib/index.js\");\n/* harmony import */ var _gaiaengine_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @gaiaengine/dom */ \"../gaiaengine-dom/lib/index.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_common_module_app__WEBPACK_IMPORTED_MODULE_0__, _gaiaengine_dom__WEBPACK_IMPORTED_MODULE_1__]);\n([_common_module_app__WEBPACK_IMPORTED_MODULE_0__, _gaiaengine_dom__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\nclass SpriteTest extends _common_module_app__WEBPACK_IMPORTED_MODULE_0__.View {\n    constructor() {\n        super();\n        _common_module_app__WEBPACK_IMPORTED_MODULE_0__.BodyNode.append(new _gaiaengine_dom__WEBPACK_IMPORTED_MODULE_1__.Fullscreen(new _gaiaengine_dom__WEBPACK_IMPORTED_MODULE_1__.Sprite(0, 0, \"/assets/run.png\", {\n            frames: {\n                run: {\n                    frame: { x: 0, y: 0, w: 48, h: 93 },\n                },\n            },\n            meta: { scale: 1 },\n        }, \"run\")));\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack:///./game/dom/image/SpriteTest.ts?");

/***/ }),

/***/ "../gaiaengine-dom/lib/core/DisplayNode.js":
/*!*************************************************!*\
  !*** ../gaiaengine-dom/lib/core/DisplayNode.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DisplayNode)\n/* harmony export */ });\n/* harmony import */ var _TransformableNode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TransformableNode.js */ \"../gaiaengine-dom/lib/core/TransformableNode.js\");\n\nclass DisplayNode extends _TransformableNode_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    container;\n    constructor(container) {\n        super(container.offsetLeft || 0, container.offsetTop || 0);\n        this.container = container;\n        this.updateTransform();\n    }\n    updateTransform() {\n        const { x, y, scaleX, scaleY } = this.transform;\n        this.container.style.transform =\n            `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`;\n    }\n    set x(x) {\n        this.transform.x = x;\n        this.updateTransform();\n    }\n    get x() {\n        return this.transform.x;\n    }\n    set y(y) {\n        this.transform.y = y;\n        this.updateTransform();\n    }\n    get y() {\n        return this.transform.y;\n    }\n    setPosition(x, y) {\n        this.transform.x = x;\n        this.transform.y = y;\n        this.updateTransform();\n        return this;\n    }\n    set zIndex(zIndex) {\n        this.container.style.zIndex = `${zIndex}`;\n    }\n    get zIndex() {\n        return parseInt(this.container.style.zIndex || \"0\", 10);\n    }\n    set scaleX(scaleX) {\n        this.transform.scaleX = scaleX;\n        this.updateTransform();\n    }\n    get scaleX() {\n        return this.transform.scaleX;\n    }\n    set scaleY(scaleY) {\n        this.transform.scaleY = scaleY;\n        this.updateTransform();\n    }\n    get scaleY() {\n        return this.transform.scaleY;\n    }\n    set scale(scale) {\n        this.transform.scaleX = scale;\n        this.transform.scaleY = scale;\n        this.updateTransform();\n    }\n    get scale() {\n        return this.transform.scaleX;\n    }\n    appendTo(parent, index) {\n        if (parent instanceof DisplayNode) {\n            if (index !== undefined) {\n                parent.container.insertBefore(this.container, parent.container.children[index] || null);\n            }\n            else {\n                parent.container.appendChild(this.container);\n            }\n        }\n        return super.appendTo(parent, index);\n    }\n    remove() {\n        this.container.parentNode?.removeChild(this.container);\n        super.remove();\n    }\n    hide() {\n        this.container.style.display = \"none\";\n    }\n    show() {\n        this.container.style.display = \"\";\n    }\n}\n//# sourceMappingURL=DisplayNode.js.map\n\n//# sourceURL=webpack:///../gaiaengine-dom/lib/core/DisplayNode.js?");

/***/ }),

/***/ "../gaiaengine-dom/lib/core/GameNode.js":
/*!**********************************************!*\
  !*** ../gaiaengine-dom/lib/core/GameNode.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ GameNode)\n/* harmony export */ });\n/* harmony import */ var _common_module_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @common-module/ts */ \"../gaiaengine-dom/node_modules/@common-module/ts/lib/index.js\");\n\nclass GameNode extends _common_module_ts__WEBPACK_IMPORTED_MODULE_0__.TreeNode {\n    _screen;\n    set screen(screen) {\n        this._screen = screen;\n        for (const child of this.children) {\n            child.screen = screen;\n        }\n    }\n    get screen() {\n        return this._screen;\n    }\n    append(...children) {\n        for (const child of children) {\n            if (child === undefined)\n                continue;\n            else\n                child.appendTo(this);\n        }\n    }\n    appendTo(parent, index) {\n        this.screen = parent.screen;\n        return super.appendTo(parent, index);\n    }\n    update(deltaTime) {\n        if (!this.removed) {\n            for (const child of this.children) {\n                child.update(deltaTime);\n            }\n        }\n    }\n}\n//# sourceMappingURL=GameNode.js.map\n\n//# sourceURL=webpack:///../gaiaengine-dom/lib/core/GameNode.js?");

/***/ }),

/***/ "../gaiaengine-dom/lib/core/GameObject.js":
/*!************************************************!*\
  !*** ../gaiaengine-dom/lib/core/GameObject.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ GameObject)\n/* harmony export */ });\n/* harmony import */ var _DisplayNode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DisplayNode.js */ \"../gaiaengine-dom/lib/core/DisplayNode.js\");\n\nclass GameObject extends _DisplayNode_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(x, y) {\n        super(document.createElement(\"div\"));\n        this.setPosition(x, y);\n    }\n}\n//# sourceMappingURL=GameObject.js.map\n\n//# sourceURL=webpack:///../gaiaengine-dom/lib/core/GameObject.js?");

/***/ }),

/***/ "../gaiaengine-dom/lib/core/TransformableNode.js":
/*!*******************************************************!*\
  !*** ../gaiaengine-dom/lib/core/TransformableNode.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TransformableNode)\n/* harmony export */ });\n/* harmony import */ var _GameNode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameNode.js */ \"../gaiaengine-dom/lib/core/GameNode.js\");\n\nclass TransformableNode extends _GameNode_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(x, y) {\n        super();\n        this.transform.x = x;\n        this.transform.y = y;\n    }\n    transform = {\n        x: Number.NEGATIVE_INFINITY,\n        y: Number.NEGATIVE_INFINITY,\n        scaleX: 1,\n        scaleY: 1,\n        rotation: 0,\n    };\n    absoluteTransform = {\n        x: Number.NEGATIVE_INFINITY,\n        y: Number.NEGATIVE_INFINITY,\n        scaleX: 1,\n        scaleY: 1,\n        rotation: 0,\n    };\n    update(deltaTime) {\n        const parent = this.parent;\n        const parentTransform = parent?.absoluteTransform;\n        if (parentTransform) {\n            this.absoluteTransform.x = this.transform.x + parentTransform.x;\n            this.absoluteTransform.y = this.transform.y + parentTransform.y;\n            this.absoluteTransform.scaleX = this.transform.scaleX *\n                parentTransform.scaleX;\n            this.absoluteTransform.scaleY = this.transform.scaleY *\n                parentTransform.scaleY;\n            this.absoluteTransform.rotation = this.transform.rotation +\n                parentTransform.rotation;\n        }\n        super.update(deltaTime);\n    }\n}\n//# sourceMappingURL=TransformableNode.js.map\n\n//# sourceURL=webpack:///../gaiaengine-dom/lib/core/TransformableNode.js?");

/***/ }),

/***/ "../gaiaengine-dom/lib/image/AnimatedSprite.js":
/*!*****************************************************!*\
  !*** ../gaiaengine-dom/lib/image/AnimatedSprite.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AnimatedSprite)\n/* harmony export */ });\n/* harmony import */ var _loaders_TextureLoader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../loaders/TextureLoader.js */ \"../gaiaengine-dom/lib/loaders/TextureLoader.js\");\n/* harmony import */ var _BaseSprite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseSprite.js */ \"../gaiaengine-dom/lib/image/BaseSprite.js\");\n\n\nclass AnimatedSprite extends _BaseSprite_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n    atlas;\n    animation;\n    fps;\n    frames;\n    frameDuration;\n    textureScale = 1;\n    elapsedTime = 0;\n    currentFrameIndex = 0;\n    constructor(x, y, src, atlas, animation, fps) {\n        super(x, y);\n        this.atlas = atlas;\n        this.animation = animation;\n        this.fps = fps;\n        this.src = src;\n        const frames = this.atlas.animations?.[this.animation];\n        if (!frames || frames.length === 0) {\n            throw new Error(`Animation '${this.animation}' not found or has no frames`);\n        }\n        this.frames = frames;\n        this.frameDuration = 1 / this.fps;\n    }\n    async loadTexture(src) {\n        const texture = await _loaders_TextureLoader_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].load(src);\n        if (!texture || this.removed)\n            return;\n        const frameName = this.frames[this.currentFrameIndex];\n        const frameData = this.atlas.frames[frameName].frame;\n        this.container.style.backgroundImage = `url(${src})`;\n        this.container.style.width = `${frameData.w}px`;\n        this.container.style.height = `${frameData.h}px`;\n        this.textureScale = this.atlas.meta.scale === \"auto\"\n            ? 1\n            : Number(this.atlas.meta.scale);\n        this.container.style.backgroundSize = `${texture.width * this.textureScale}px ${texture.height * this.textureScale}px`;\n        this.container.style.backgroundPosition = `-${frameData.x * this.textureScale}px -${frameData.y * this.textureScale}px`;\n    }\n    releaseTexture(src) {\n        _loaders_TextureLoader_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].release(src);\n    }\n    update(deltaTime) {\n        super.update(deltaTime);\n        this.elapsedTime += deltaTime;\n        if (this.elapsedTime >= this.frameDuration) {\n            this.elapsedTime -= this.frameDuration;\n            this.currentFrameIndex = (this.currentFrameIndex + 1) %\n                this.frames.length;\n            const frameName = this.frames[this.currentFrameIndex];\n            const frameData = this.atlas.frames[frameName].frame;\n            this.container.style.backgroundPosition = `-${frameData.x * this.textureScale}px -${frameData.y * this.textureScale}px`;\n            this.container.style.width = `${frameData.w}px`;\n            this.container.style.height = `${frameData.h}px`;\n        }\n    }\n}\n//# sourceMappingURL=AnimatedSprite.js.map\n\n//# sourceURL=webpack:///../gaiaengine-dom/lib/image/AnimatedSprite.js?");

/***/ }),

/***/ "../gaiaengine-dom/lib/image/BaseSprite.js":
/*!*************************************************!*\
  !*** ../gaiaengine-dom/lib/image/BaseSprite.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ BaseSprite)\n/* harmony export */ });\n/* harmony import */ var _core_GameObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/GameObject.js */ \"../gaiaengine-dom/lib/core/GameObject.js\");\n\nclass BaseSprite extends _core_GameObject_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    _src;\n    set src(src) {\n        if (this._src === src)\n            return;\n        if (this._src)\n            this.releaseTexture(this._src);\n        this._src = src;\n        this.loadTexture(src);\n    }\n    get src() {\n        return this._src ?? \"\";\n    }\n    remove() {\n        if (this._src)\n            this.releaseTexture(this._src);\n        super.remove();\n    }\n}\n//# sourceMappingURL=BaseSprite.js.map\n\n//# sourceURL=webpack:///../gaiaengine-dom/lib/image/BaseSprite.js?");

/***/ }),

/***/ "../gaiaengine-dom/lib/image/Sprite.js":
/*!*********************************************!*\
  !*** ../gaiaengine-dom/lib/image/Sprite.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Sprite)\n/* harmony export */ });\n/* harmony import */ var _loaders_TextureLoader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../loaders/TextureLoader.js */ \"../gaiaengine-dom/lib/loaders/TextureLoader.js\");\n/* harmony import */ var _BaseSprite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseSprite.js */ \"../gaiaengine-dom/lib/image/BaseSprite.js\");\n\n\nclass Sprite extends _BaseSprite_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n    atlas;\n    frame;\n    constructor(x, y, src, atlas, frame) {\n        super(x, y);\n        this.atlas = atlas;\n        this.frame = frame;\n        this.src = src;\n    }\n    async loadTexture(src) {\n        if (this.atlas) {\n            if (!this.frame)\n                throw new Error(\"Frame not found\");\n            const texture = await _loaders_TextureLoader_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].load(src);\n            if (!texture || this.removed)\n                return;\n            const frameData = this.atlas.frames[this.frame].frame;\n            this.container.style.backgroundImage = `url(${src})`;\n            this.container.style.width = `${frameData.w}px`;\n            this.container.style.height = `${frameData.h}px`;\n            const textureScale = this.atlas.meta.scale === \"auto\"\n                ? 1\n                : Number(this.atlas.meta.scale);\n            this.container.style.backgroundSize = `${texture.width * textureScale}px ${texture.height * textureScale}px`;\n            this.container.style.backgroundPosition = `-${frameData.x * textureScale}px -${frameData.y * textureScale}px`;\n        }\n        else {\n            const texture = await _loaders_TextureLoader_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].load(src);\n            if (!texture || this.removed)\n                return;\n            this.container.style.backgroundImage = `url(${src})`;\n            this.container.style.width = `${texture.width}px`;\n            this.container.style.height = `${texture.height}px`;\n        }\n    }\n    releaseTexture(src) {\n        _loaders_TextureLoader_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].release(src);\n    }\n}\n//# sourceMappingURL=Sprite.js.map\n\n//# sourceURL=webpack:///../gaiaengine-dom/lib/image/Sprite.js?");

/***/ }),

/***/ "../gaiaengine-dom/lib/index.js":
/*!**************************************!*\
  !*** ../gaiaengine-dom/lib/index.js ***!
  \**************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AnimatedSprite: () => (/* reexport safe */ _image_AnimatedSprite_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   Fullscreen: () => (/* reexport safe */ _screen_Fullscreen_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n/* harmony export */   Sprite: () => (/* reexport safe */ _image_Sprite_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _image_AnimatedSprite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image/AnimatedSprite.js */ \"../gaiaengine-dom/lib/image/AnimatedSprite.js\");\n/* harmony import */ var _image_Sprite_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image/Sprite.js */ \"../gaiaengine-dom/lib/image/Sprite.js\");\n/* harmony import */ var _screen_Fullscreen_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./screen/Fullscreen.js */ \"../gaiaengine-dom/lib/screen/Fullscreen.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_screen_Fullscreen_js__WEBPACK_IMPORTED_MODULE_2__]);\n_screen_Fullscreen_js__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n//# sourceMappingURL=index.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack:///../gaiaengine-dom/lib/index.js?");

/***/ }),

/***/ "../gaiaengine-dom/lib/loaders/ResourceLoader.js":
/*!*******************************************************!*\
  !*** ../gaiaengine-dom/lib/loaders/ResourceLoader.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ResourceLoader)\n/* harmony export */ });\nclass ResourceLoader {\n    resources = new Map();\n    pendingLoads = new Map();\n    refCount = new Map();\n    isResourceInUse(path) {\n        return this.refCount.has(path) && this.refCount.get(path) > 0;\n    }\n    incrementRefCount(path) {\n        this.refCount.set(path, (this.refCount.get(path) || 0) + 1);\n    }\n    async load(path, ...args) {\n        this.incrementRefCount(path);\n        if (this.resources.has(path))\n            return this.resources.get(path);\n        if (this.pendingLoads.has(path))\n            return await this.pendingLoads.get(path);\n        return await this.loadFromPath(path, ...args);\n    }\n    release(path) {\n        const refCount = this.refCount.get(path);\n        if (refCount === undefined)\n            throw new Error(`Resource not found: ${path}`);\n        if (refCount === 1) {\n            this.refCount.delete(path);\n            const resource = this.resources.get(path);\n            if (resource) {\n                this.cleanup(resource, path);\n                this.resources.delete(path);\n            }\n        }\n        else {\n            this.refCount.set(path, refCount - 1);\n        }\n    }\n}\n//# sourceMappingURL=ResourceLoader.js.map\n\n//# sourceURL=webpack:///../gaiaengine-dom/lib/loaders/ResourceLoader.js?");

/***/ }),

/***/ "../gaiaengine-dom/lib/loaders/TextureLoader.js":
/*!******************************************************!*\
  !*** ../gaiaengine-dom/lib/loaders/TextureLoader.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ResourceLoader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResourceLoader.js */ \"../gaiaengine-dom/lib/loaders/ResourceLoader.js\");\n\nclass TextureLoader extends _ResourceLoader_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    async loadFromPath(src) {\n        const loadPromise = new Promise((resolve, reject) => {\n            const image = new Image();\n            image.src = src;\n            image.crossOrigin = \"anonymous\";\n            image.onload = () => {\n                if (this.isResourceInUse(src)) {\n                    if (this.resources.has(src)) {\n                        reject(new Error(`Texture already exists: ${src}`));\n                    }\n                    else {\n                        this.resources.set(src, image);\n                        resolve(image);\n                    }\n                }\n                else {\n                    resolve(undefined);\n                }\n                this.pendingLoads.delete(src);\n            };\n            image.onerror = (event) => {\n                console.error(`Failed to load texture: ${src}`);\n                reject(event);\n                this.pendingLoads.delete(src);\n            };\n        });\n        this.pendingLoads.set(src, loadPromise);\n        return await loadPromise;\n    }\n    cleanup(texture) {\n        texture.remove();\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new TextureLoader());\n//# sourceMappingURL=TextureLoader.js.map\n\n//# sourceURL=webpack:///../gaiaengine-dom/lib/loaders/TextureLoader.js?");

/***/ }),

/***/ "../gaiaengine-dom/lib/screen/Camera.js":
/*!**********************************************!*\
  !*** ../gaiaengine-dom/lib/screen/Camera.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Camera)\n/* harmony export */ });\nclass Camera {\n    screen;\n    _x = 0;\n    _y = 0;\n    _scale = 1;\n    constructor(screen) {\n        this.screen = screen;\n    }\n    get x() {\n        return this._x;\n    }\n    get y() {\n        return this._y;\n    }\n    setPosition(x, y) {\n        this._x = x;\n        this._y = y;\n        this.screen.updateRootNodePosition();\n    }\n    set scale(value) {\n        this._scale = value;\n        this.screen.updateRootNodePosition();\n    }\n    get scale() {\n        return this._scale;\n    }\n}\n//# sourceMappingURL=Camera.js.map\n\n//# sourceURL=webpack:///../gaiaengine-dom/lib/screen/Camera.js?");

/***/ }),

/***/ "../gaiaengine-dom/lib/screen/Fullscreen.js":
/*!**************************************************!*\
  !*** ../gaiaengine-dom/lib/screen/Fullscreen.js ***!
  \**************************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Fullscreen)\n/* harmony export */ });\n/* harmony import */ var _common_module_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @common-module/app */ \"../app-module/lib/index.js\");\n/* harmony import */ var _GameScreen_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameScreen.js */ \"../gaiaengine-dom/lib/screen/GameScreen.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_common_module_app__WEBPACK_IMPORTED_MODULE_0__, _GameScreen_js__WEBPACK_IMPORTED_MODULE_1__]);\n([_common_module_app__WEBPACK_IMPORTED_MODULE_0__, _GameScreen_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\nclass Fullscreen extends _GameScreen_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\n    constructor(...gameNodes) {\n        super(document.documentElement.clientWidth, window.innerHeight, ...gameNodes);\n        this.appendTo(_common_module_app__WEBPACK_IMPORTED_MODULE_0__.BodyNode);\n    }\n}\n//# sourceMappingURL=Fullscreen.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack:///../gaiaengine-dom/lib/screen/Fullscreen.js?");

/***/ }),

/***/ "../gaiaengine-dom/lib/screen/GameScreen.js":
/*!**************************************************!*\
  !*** ../gaiaengine-dom/lib/screen/GameScreen.js ***!
  \**************************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ GameScreen)\n/* harmony export */ });\n/* harmony import */ var _common_module_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @common-module/app */ \"../app-module/lib/index.js\");\n/* harmony import */ var _Camera_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Camera.js */ \"../gaiaengine-dom/lib/screen/Camera.js\");\n/* harmony import */ var _RootNode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RootNode.js */ \"../gaiaengine-dom/lib/screen/RootNode.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_common_module_app__WEBPACK_IMPORTED_MODULE_0__]);\n_common_module_app__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nclass GameScreen extends _common_module_app__WEBPACK_IMPORTED_MODULE_0__.DomNode {\n    width;\n    height;\n    animationInterval;\n    targetFPS;\n    actualFPS;\n    root = new _RootNode_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n    camera = new _Camera_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this);\n    ratio = 1;\n    constructor(width, height, ...gameNodes) {\n        super();\n        this.width = width;\n        this.height = height;\n        this.root.setScreen(this).append(...gameNodes);\n        this.createRenderer();\n        this.onWindow(\"blur\", () => this.actualFPS = 6);\n        this.onWindow(\"focus\", () => this.actualFPS = this.targetFPS);\n    }\n    resize(width, height, ratio = 1) {\n        this.width = width;\n        this.height = height;\n        this.ratio = ratio;\n        this.style({\n            width: `${this.width * this.ratio}px`,\n            height: `${this.height * this.ratio}px`,\n        });\n    }\n    async createRenderer() {\n        this.root.setPosition(this.width / 2 - this.camera.x * this.camera.scale, this.height / 2 - this.camera.y * this.camera.scale);\n        this.resize(this.width, this.height, this.ratio);\n        this.htmlElement.appendChild(this.root.getContainer());\n        this.animationInterval = requestAnimationFrame(this.animate);\n        this.updateRootNodePosition();\n    }\n    updateRootNodePosition() {\n        this.root.scale = this.camera.scale;\n        this.root.setPosition(this.width / 2 - this.camera.x * this.camera.scale, this.height / 2 - this.camera.y * this.camera.scale);\n    }\n    update(deltaTime) {\n        this.root.update(deltaTime);\n    }\n    lastFrameTime = 0;\n    accumulatedTime = 0;\n    animate = (currentTime) => {\n        const elapsedTime = (currentTime - this.lastFrameTime) / 1000;\n        if (elapsedTime > 0) {\n            if (this.actualFPS !== undefined && this.actualFPS > 0) {\n                this.accumulatedTime += elapsedTime;\n                const frameDuration = 1 / this.actualFPS;\n                if (this.accumulatedTime >= frameDuration) {\n                    this.update(frameDuration);\n                    this.accumulatedTime -= frameDuration;\n                }\n            }\n            else {\n                this.update(elapsedTime);\n            }\n            this.lastFrameTime = currentTime;\n        }\n        this.animationInterval = requestAnimationFrame(this.animate);\n    };\n    remove() {\n        if (this.animationInterval) {\n            cancelAnimationFrame(this.animationInterval);\n            this.animationInterval = undefined;\n        }\n        super.remove();\n    }\n}\n//# sourceMappingURL=GameScreen.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack:///../gaiaengine-dom/lib/screen/GameScreen.js?");

/***/ }),

/***/ "../gaiaengine-dom/lib/screen/RootNode.js":
/*!************************************************!*\
  !*** ../gaiaengine-dom/lib/screen/RootNode.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ RootNode)\n/* harmony export */ });\n/* harmony import */ var _core_GameObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/GameObject.js */ \"../gaiaengine-dom/lib/core/GameObject.js\");\n\nclass RootNode extends _core_GameObject_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor() {\n        super(0, 0);\n        this.absoluteTransform.x = 0;\n        this.absoluteTransform.y = 0;\n    }\n    setScreen(screen) {\n        this.screen = screen;\n        return this;\n    }\n    getContainer() {\n        return this.container;\n    }\n    update(deltaTime) {\n        super.update(deltaTime);\n    }\n}\n//# sourceMappingURL=RootNode.js.map\n\n//# sourceURL=webpack:///../gaiaengine-dom/lib/screen/RootNode.js?");

/***/ }),

/***/ "../gaiaengine-dom/node_modules/@common-module/ts/lib/event/EventContainer.js":
/*!************************************************************************************!*\
  !*** ../gaiaengine-dom/node_modules/@common-module/ts/lib/event/EventContainer.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EventContainer)\n/* harmony export */ });\nclass EventContainer {\n    events = {};\n    on(eventName, eventHandler) {\n        if (!this.events[eventName])\n            this.events[eventName] = [];\n        this.events[eventName].push(eventHandler);\n        return this;\n    }\n    off(eventName, eventHandler) {\n        if (!this.events[eventName])\n            return this;\n        const index = this.events[eventName].indexOf(eventHandler);\n        if (index !== -1)\n            this.events[eventName].splice(index, 1);\n        return this;\n    }\n    emit(eventName, ...args) {\n        if (!this.events[eventName])\n            return [];\n        return this.events[eventName].map((handler) => handler(...args));\n    }\n}\n//# sourceMappingURL=EventContainer.js.map\n\n//# sourceURL=webpack:///../gaiaengine-dom/node_modules/@common-module/ts/lib/event/EventContainer.js?");

/***/ }),

/***/ "../gaiaengine-dom/node_modules/@common-module/ts/lib/index.js":
/*!*********************************************************************!*\
  !*** ../gaiaengine-dom/node_modules/@common-module/ts/lib/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ArrayUtils: () => (/* reexport safe */ _utils_ArrayUtils_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n/* harmony export */   EventContainer: () => (/* reexport safe */ _event_EventContainer_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   EventTreeNode: () => (/* reexport safe */ _tree_EventTreeNode_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   IntegerUtils: () => (/* reexport safe */ _utils_IntegerUtils_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]),\n/* harmony export */   JsonUtils: () => (/* reexport safe */ _utils_JsonUtils_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"]),\n/* harmony export */   StringUtils: () => (/* reexport safe */ _utils_StringUtils_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]),\n/* harmony export */   TreeNode: () => (/* reexport safe */ _tree_TreeNode_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _event_EventContainer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event/EventContainer.js */ \"../gaiaengine-dom/node_modules/@common-module/ts/lib/event/EventContainer.js\");\n/* harmony import */ var _tree_EventTreeNode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tree/EventTreeNode.js */ \"../gaiaengine-dom/node_modules/@common-module/ts/lib/tree/EventTreeNode.js\");\n/* harmony import */ var _tree_TreeNode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tree/TreeNode.js */ \"../gaiaengine-dom/node_modules/@common-module/ts/lib/tree/TreeNode.js\");\n/* harmony import */ var _utils_ArrayUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/ArrayUtils.js */ \"../gaiaengine-dom/node_modules/@common-module/ts/lib/utils/ArrayUtils.js\");\n/* harmony import */ var _utils_IntegerUtils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/IntegerUtils.js */ \"../gaiaengine-dom/node_modules/@common-module/ts/lib/utils/IntegerUtils.js\");\n/* harmony import */ var _utils_JsonUtils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/JsonUtils.js */ \"../gaiaengine-dom/node_modules/@common-module/ts/lib/utils/JsonUtils.js\");\n/* harmony import */ var _utils_StringUtils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/StringUtils.js */ \"../gaiaengine-dom/node_modules/@common-module/ts/lib/utils/StringUtils.js\");\n\n\n\n\n\n\n\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack:///../gaiaengine-dom/node_modules/@common-module/ts/lib/index.js?");

/***/ }),

/***/ "../gaiaengine-dom/node_modules/@common-module/ts/lib/tree/EventTreeNode.js":
/*!**********************************************************************************!*\
  !*** ../gaiaengine-dom/node_modules/@common-module/ts/lib/tree/EventTreeNode.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EventTreeNode)\n/* harmony export */ });\n/* harmony import */ var _event_EventContainer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../event/EventContainer.js */ \"../gaiaengine-dom/node_modules/@common-module/ts/lib/event/EventContainer.js\");\n\nclass EventTreeNode extends _event_EventContainer_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    parent;\n    children = [];\n    removed = false;\n    appendTo(parent, index) {\n        if (this.parent === parent) {\n            const currentIndex = this.parent.children.indexOf(this);\n            if (index !== undefined && index > currentIndex) {\n                index--;\n            }\n            this.parent.children.splice(currentIndex, 1);\n        }\n        else if (this.parent) {\n            this.remove();\n        }\n        this.parent = parent;\n        if (index !== undefined && index >= 0 && index < parent.children.length) {\n            parent.children.splice(index, 0, this);\n        }\n        else {\n            parent.children.push(this);\n        }\n        return this;\n    }\n    remove() {\n        if (this.removed)\n            return;\n        this.removed = true;\n        if (this.parent) {\n            const index = this.parent.children.indexOf(this);\n            if (index > -1)\n                this.parent.children.splice(index, 1);\n            this.parent = undefined;\n        }\n        while (this.children.length > 0) {\n            this.children[0].remove();\n        }\n    }\n}\n//# sourceMappingURL=EventTreeNode.js.map\n\n//# sourceURL=webpack:///../gaiaengine-dom/node_modules/@common-module/ts/lib/tree/EventTreeNode.js?");

/***/ }),

/***/ "../gaiaengine-dom/node_modules/@common-module/ts/lib/tree/TreeNode.js":
/*!*****************************************************************************!*\
  !*** ../gaiaengine-dom/node_modules/@common-module/ts/lib/tree/TreeNode.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TreeNode)\n/* harmony export */ });\nclass TreeNode {\n    parent;\n    children = [];\n    removed = false;\n    appendTo(parent, index) {\n        if (this.parent === parent) {\n            const currentIndex = this.parent.children.indexOf(this);\n            if (index !== undefined && index > currentIndex) {\n                index--;\n            }\n            this.parent.children.splice(currentIndex, 1);\n        }\n        else if (this.parent) {\n            this.remove();\n        }\n        this.parent = parent;\n        if (index !== undefined && index >= 0 && index < parent.children.length) {\n            parent.children.splice(index, 0, this);\n        }\n        else {\n            parent.children.push(this);\n        }\n        return this;\n    }\n    remove() {\n        if (this.removed)\n            return;\n        this.removed = true;\n        if (this.parent) {\n            const index = this.parent.children.indexOf(this);\n            if (index > -1)\n                this.parent.children.splice(index, 1);\n            this.parent = undefined;\n        }\n        while (this.children.length > 0) {\n            this.children[0].remove();\n        }\n    }\n}\n//# sourceMappingURL=TreeNode.js.map\n\n//# sourceURL=webpack:///../gaiaengine-dom/node_modules/@common-module/ts/lib/tree/TreeNode.js?");

/***/ }),

/***/ "../gaiaengine-dom/node_modules/@common-module/ts/lib/utils/ArrayUtils.js":
/*!********************************************************************************!*\
  !*** ../gaiaengine-dom/node_modules/@common-module/ts/lib/utils/ArrayUtils.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass ArrayUtils {\n    pull(array, ...removeList) {\n        for (const remove of removeList) {\n            const index = array.indexOf(remove);\n            if (index !== -1)\n                array.splice(index, 1);\n        }\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new ArrayUtils());\n//# sourceMappingURL=ArrayUtils.js.map\n\n//# sourceURL=webpack:///../gaiaengine-dom/node_modules/@common-module/ts/lib/utils/ArrayUtils.js?");

/***/ }),

/***/ "../gaiaengine-dom/node_modules/@common-module/ts/lib/utils/IntegerUtils.js":
/*!**********************************************************************************!*\
  !*** ../gaiaengine-dom/node_modules/@common-module/ts/lib/utils/IntegerUtils.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass IntegerUtils {\n    random(min, max) {\n        return Math.floor(Math.random() * (max - min + 1) + min);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new IntegerUtils());\n//# sourceMappingURL=IntegerUtils.js.map\n\n//# sourceURL=webpack:///../gaiaengine-dom/node_modules/@common-module/ts/lib/utils/IntegerUtils.js?");

/***/ }),

/***/ "../gaiaengine-dom/node_modules/@common-module/ts/lib/utils/JsonUtils.js":
/*!*******************************************************************************!*\
  !*** ../gaiaengine-dom/node_modules/@common-module/ts/lib/utils/JsonUtils.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass JsonUtils {\n    parseWithUndefined(data) {\n        return JSON.parse(data, (_, v) => v === null ? undefined : v);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new JsonUtils());\n//# sourceMappingURL=JsonUtils.js.map\n\n//# sourceURL=webpack:///../gaiaengine-dom/node_modules/@common-module/ts/lib/utils/JsonUtils.js?");

/***/ }),

/***/ "../gaiaengine-dom/node_modules/@common-module/ts/lib/utils/StringUtils.js":
/*!*********************************************************************************!*\
  !*** ../gaiaengine-dom/node_modules/@common-module/ts/lib/utils/StringUtils.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass StringUtils {\n    capitalize(input) {\n        const words = input.split(\" \");\n        const capitalizedWords = words.map((word) => {\n            if (word.length === 0)\n                return word;\n            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();\n        });\n        return capitalizedWords.join(\" \");\n    }\n    isKebabCase(str) {\n        return /^[a-z]+(-[a-z]+)*$/.test(str);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new StringUtils());\n//# sourceMappingURL=StringUtils.js.map\n\n//# sourceURL=webpack:///../gaiaengine-dom/node_modules/@common-module/ts/lib/utils/StringUtils.js?");

/***/ })

}]);