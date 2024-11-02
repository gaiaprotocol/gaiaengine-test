"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk"] = self["webpackChunk"] || []).push([["game_2d_spine-test_SpineTest_ts"],{

/***/ "./game/2d/spine-test/SpineTest.ts":
/*!*****************************************!*\
  !*** ./game/2d/spine-test/SpineTest.ts ***!
  \*****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SpineTest)\n/* harmony export */ });\n/* harmony import */ var _common_module_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @common-module/app */ \"../app-module/lib/index.js\");\n/* harmony import */ var _gaiaengine_2d__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @gaiaengine/2d */ \"../gaiaengine-2d/lib/index.js\");\n/* harmony import */ var _gaiaengine_2d_spine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @gaiaengine/2d-spine */ \"../gaiaengine-2d-spine/lib/index.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_common_module_app__WEBPACK_IMPORTED_MODULE_0__, _gaiaengine_2d__WEBPACK_IMPORTED_MODULE_1__, _gaiaengine_2d_spine__WEBPACK_IMPORTED_MODULE_2__]);\n([_common_module_app__WEBPACK_IMPORTED_MODULE_0__, _gaiaengine_2d__WEBPACK_IMPORTED_MODULE_1__, _gaiaengine_2d_spine__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\nclass SpineTest extends _common_module_app__WEBPACK_IMPORTED_MODULE_0__.View {\n    constructor() {\n        super();\n        let spine;\n        this.container = new _gaiaengine_2d__WEBPACK_IMPORTED_MODULE_1__.Fullscreen(spine = new _gaiaengine_2d_spine__WEBPACK_IMPORTED_MODULE_2__.Spine(0, 0, {\n            atlas: \"/assets/spine/hellboy.atlas\",\n            skel: \"/assets/spine/hellboy.skel\",\n            png: \"/assets/spine/hellboy.png\",\n            animation: \"idle\",\n        }, (animation) => {\n            if (animation === \"run\")\n                spine.animation = \"idle\";\n        })).appendTo(_common_module_app__WEBPACK_IMPORTED_MODULE_0__.BodyNode);\n        spine.scale = 0.5;\n        setTimeout(() => {\n            spine.animation = \"run\";\n        }, 1000);\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack:///./game/2d/spine-test/SpineTest.ts?");

/***/ }),

/***/ "../gaiaengine-2d-spine/lib/Spine.js":
/*!*******************************************!*\
  !*** ../gaiaengine-2d-spine/lib/Spine.js ***!
  \*******************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Spine)\n/* harmony export */ });\n/* harmony import */ var _gaiaengine_2d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @gaiaengine/2d */ \"../gaiaengine-2d/lib/index.js\");\n/* harmony import */ var _pixi_spine_pixi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pixi/spine-pixi */ \"../gaiaengine-2d-spine/node_modules/@pixi/spine-pixi/lib/index.mjs\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_gaiaengine_2d__WEBPACK_IMPORTED_MODULE_0__]);\n_gaiaengine_2d__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nclass Spine extends _gaiaengine_2d__WEBPACK_IMPORTED_MODULE_0__.GameObject {\n    options;\n    onAnimEnd;\n    pixiSpine;\n    _animation;\n    constructor(x, y, options, onAnimEnd) {\n        super(x, y);\n        this.options = options;\n        this.onAnimEnd = onAnimEnd;\n        this.load();\n    }\n    async load() {\n        let texture;\n        let atlasData;\n        let skeletonBynary;\n        await Promise.all([\n            (async () => texture = await _gaiaengine_2d__WEBPACK_IMPORTED_MODULE_0__.TextureLoader.load(this.options.png))(),\n            (async () => atlasData = await (await fetch(this.options.atlas)).text())(),\n            (async () => skeletonBynary = new Uint8Array(await (await fetch(this.options.skel)).arrayBuffer()))(),\n        ]);\n        if (!texture || this.removed)\n            return;\n        const atlas = new _pixi_spine_pixi__WEBPACK_IMPORTED_MODULE_1__.TextureAtlas(atlasData);\n        atlas.pages.forEach((page) => page.setTexture(_pixi_spine_pixi__WEBPACK_IMPORTED_MODULE_1__.SpineTexture.from(texture.source)));\n        const attachmentLoader = new _pixi_spine_pixi__WEBPACK_IMPORTED_MODULE_1__.AtlasAttachmentLoader(atlas);\n        const binaryLoader = new _pixi_spine_pixi__WEBPACK_IMPORTED_MODULE_1__.SkeletonBinary(attachmentLoader);\n        const skeletonData = binaryLoader.readSkeletonData(skeletonBynary);\n        this.pixiSpine = new _pixi_spine_pixi__WEBPACK_IMPORTED_MODULE_1__.Spine(skeletonData);\n        this.pixiSpine.pivot.y = -this.pixiSpine.getLocalBounds().height / 2;\n        this.pixiSpine.state.addListener({\n            complete: (entry) => this.onAnimEnd?.(entry.animation?.name ?? \"\"),\n        });\n        this.animation = this.options.animation;\n        this.container.addChild(this.pixiSpine);\n    }\n    set animation(animation) {\n        this._animation = animation;\n        if (this.pixiSpine && animation) {\n            this.pixiSpine.state.setAnimation(0, animation, this.options.loop ?? true);\n        }\n    }\n    get animation() {\n        return this._animation;\n    }\n    remove() {\n        _gaiaengine_2d__WEBPACK_IMPORTED_MODULE_0__.TextureLoader.release(this.options.png);\n        super.remove();\n    }\n}\n//# sourceMappingURL=Spine.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack:///../gaiaengine-2d-spine/lib/Spine.js?");

/***/ }),

/***/ "../gaiaengine-2d-spine/lib/index.js":
/*!*******************************************!*\
  !*** ../gaiaengine-2d-spine/lib/index.js ***!
  \*******************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Spine: () => (/* reexport safe */ _Spine_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _Spine_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Spine.js */ \"../gaiaengine-2d-spine/lib/Spine.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Spine_js__WEBPACK_IMPORTED_MODULE_0__]);\n_Spine_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n//# sourceMappingURL=index.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack:///../gaiaengine-2d-spine/lib/index.js?");

/***/ })

}]);