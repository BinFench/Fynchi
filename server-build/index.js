/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _src_App__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../src/App */ \"./src/App.js\");\n\n\n\n\n\n\n\nconst PORT = process.env.PORT || 3006;\nconst app = express__WEBPACK_IMPORTED_MODULE_3___default()();\napp.use(express__WEBPACK_IMPORTED_MODULE_3___default.a.static('./build'));\napp.get('/*', (req, res) => {\n  const context = {};\n  const app = react_dom_server__WEBPACK_IMPORTED_MODULE_4___default.a.renderToString( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__[\"StaticRouter\"], {\n    context: context,\n    location: req.url\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_src_App__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null)));\n  const indexFile = path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve('./build/index.html');\n  fs__WEBPACK_IMPORTED_MODULE_1___default.a.readFile(indexFile, 'utf8', (err, data) => {\n    if (err) {\n      console.error('Something went wrong:', err);\n      return res.status(500).send('Oops, better luck next time!');\n    }\n\n    return res.send(data.replace('<div id=\"root\"></div>', `<div id=\"root\">${app}</div>`));\n  });\n});\napp.listen(PORT, () => {\n  console.log(`Server is listening on port ${PORT}`);\n});\n\n//# sourceURL=webpack:///./server/index.js?");

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return App; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_ModelDesigner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/ModelDesigner */ \"./src/components/ModelDesigner.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nclass App extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Switch\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n      exact: true,\n      path: \"/\",\n      component: () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ModelDesigner__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        width: 900,\n        height: 500\n      })\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Route\"], {\n      component: () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", null, \"Error 404: Page not found\")\n    })));\n  }\n\n}\n\n//# sourceURL=webpack:///./src/App.js?");

/***/ }),

/***/ "./src/components/ModelDesigner.js":
/*!*****************************************!*\
  !*** ./src/components/ModelDesigner.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ModelDesigner; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Model */ \"./src/utils/Model.js\");\n/* harmony import */ var _utils_Layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Layer */ \"./src/utils/Layer.js\");\n\n\n\nclass ModelDesigner extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      zoomPerc: 1.0,\n      width: props.width,\n      height: props.height,\n      ratio: props.width / props.height,\n      zoomheight: props.height,\n      x: 0,\n      y: 0,\n      model: new _utils_Model__WEBPACK_IMPORTED_MODULE_1__[\"default\"]([new _utils_Layer__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n        type: 'input',\n        units: 4\n      })], [new _utils_Layer__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n        type: 'dense',\n        units: 4\n      })]),\n      canvas: null,\n      ctx: null\n    };\n  }\n\n  initialDraw() {\n    const toDraw = this.state.model;\n    toDraw.render();\n    this.setState({\n      model: toDraw\n    });\n    let width = toDraw.renderOrder.length;\n    let height = 0;\n    toDraw.renderOrder.forEach(item => {\n      if (item.length > height) {\n        height = item.length;\n      }\n    });\n    height = 100 * (2 * height - 1); //100 units per layer + 100 between each layer\n\n    width = 50 * (2 * width - 1); //50 units per layer + 50 between each layer\n\n    const ratio = width / height;\n\n    if (ratio >= 1) {\n      this.setState({\n        zoomheight: width / this.state.ratio\n      });\n    } else {\n      this.setState({\n        zoomheight: height\n      });\n    }\n  }\n\n  componentDidMount() {\n    const canvas = this.refs.modelView;\n    const ctx = canvas.getContext('2d');\n    this.setState({\n      canvas: canvas,\n      ctx: ctx\n    });\n    this.initialDraw();\n  }\n\n  componentDidUpdate() {}\n\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"canvas\", {\n      ref: \"modelView\",\n      width: this.state.width,\n      height: this.state.height\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./src/components/ModelDesigner.js?");

/***/ }),

/***/ "./src/utils/Layer.js":
/*!****************************!*\
  !*** ./src/utils/Layer.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Layer; });\nvar __count = 0;\nclass Layer {\n  constructor(config) {\n    this.config = config;\n    this.prev = [];\n    this.next = [];\n    this.id = __count++;\n    this.maxDist = 0;\n  }\n\n  addPrev(layer) {\n    const ids = [...this.prev.id];\n\n    if (ids.indexOf(layer.id) === -1) {\n      this.prev.push(layer);\n    }\n  }\n\n  addNext(layer) {\n    const ids = [...this.next.id];\n\n    if (ids.indexOf(layer.id) === -1) {\n      this.next.push(layer);\n    }\n  }\n\n  reach(dist) {\n    if (dist > this.maxDist || this.maxDist === 0) {\n      this.maxDist = dist;\n      let max = dist;\n      this.next.forEach(i => {\n        let temp = i.reach(dist + 1);\n\n        if (temp > max) {\n          max = temp;\n        }\n      });\n      return max;\n    }\n\n    return dist;\n  }\n\n}\n\n//# sourceURL=webpack:///./src/utils/Layer.js?");

/***/ }),

/***/ "./src/utils/Model.js":
/*!****************************!*\
  !*** ./src/utils/Model.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Model; });\nclass Model {\n  constructor(input, output) {\n    this.input = input;\n    this.output = output;\n    this.layers = [...input, ...output];\n    this.renderOrder = [];\n  }\n\n  addNext(layerNum, layer) {\n    layer.addPrev(this.layers[layerNum]);\n    this.layers[layerNum].addNext(layer);\n    this.layers.push(layer);\n  }\n\n  addAdjacent(layerNum, layer) {\n    // For every layer that connects to the layer we add an adjacency to,\n    // append the adjacency.\n    const id = this.layers[layerNum].id;\n    this.layers = this.layers.map(item => {\n      item.next.forEach(element => {\n        if (element.id === id) {\n          layer.addPrev(element);\n          item.addNext(layer);\n        }\n      });\n      return item;\n    });\n    this.layers.push(layer);\n    const inIDs = [...this.input.id];\n    const outIDs = [...this.output.id];\n    const ini = inIDs.indexOf(id);\n    const outi = outIDs.indexOf(id);\n\n    if (ini !== -1) {\n      this.input.push(layer);\n    }\n\n    if (outi !== -1) {\n      this.output.push(layer);\n    }\n  }\n\n  removeLayer(layerNum) {\n    // Every layer that the removed layer connects to is connected to\n    // the previous layer.\n    const layer = this.layers[layerNum];\n    layer.next.map(item => {\n      item.prev.filter(elem => elem.id !== layer.id);\n      layer.prev.forEach(prev => item.addPrev(prev));\n      return item;\n    });\n    layer.prev.map(item => {\n      item.next.filter(elem => elem.id !== layer.id);\n      layer.next.forEach(next => item.addnext(next));\n      return item;\n    });\n    const inIDs = [...this.input.id];\n    const outIDs = [...this.output.id];\n    const ini = inIDs.indexOf(layer.id);\n    const outi = outIDs.indexOf(layer.id);\n\n    if (ini !== -1) {\n      layer.next.forEach(next => {\n        if (next.prev.length === 0 && outIDs.indexOf(next.id) === -1 && inIDs.indexOf(next.id) === -1) {\n          this.input.push(next);\n        }\n      });\n    }\n\n    if (outi !== -1) {\n      layer.prev.forEach(prev => {\n        if (prev.next.length === 0 && outIDs.indexOf(prev.id) === -1 && inIDs.indexOf(prev.id) === -1) {\n          this.output.push(prev);\n        }\n      });\n    }\n  }\n\n  connect(prev, next) {\n    prev.addNext(next);\n    next.addPrev(prev);\n\n    if (this.causesCycle(prev.id, next)) {\n      this.disconnect(prev, next);\n    }\n  }\n\n  disconnect(prev, next) {\n    prev.next.filter(item => item.id !== next.id);\n    next.prev.filter(item => item.id !== prev.id);\n  }\n\n  causesCycle(id, item) {\n    if (item.id === id) {\n      return true;\n    }\n\n    for (let i = 0; i < item.next.length; i++) {\n      if (this.causesCycle(id, item.next[i])) {\n        return true;\n      }\n    }\n\n    return false;\n  }\n\n  addInput(layer) {\n    this.input.push(layer);\n  }\n\n  addOutput(layer) {\n    this.output.push(layer);\n  }\n\n  makeOutput(layerNum) {\n    const inIDs = [...this.input.id];\n    const ini = inIDs.indexOf(this.layers[layerNum].id);\n\n    if (this.layers[layerNum].next.length === 0 && ini === -1) {\n      this.output.push(this.layers[layerNum]);\n    }\n  }\n\n  render() {\n    this.renderOrder = [];\n    this.layers.forEach(i => {\n      i.maxDist = 0;\n    });\n    let max = 0;\n    this.input.forEach(i => {\n      let temp = i.reach(0);\n\n      if (temp > max) {\n        max = temp;\n      }\n    });\n\n    for (let i = 0; i <= max; i++) {\n      this.renderOrder.push([]);\n    }\n\n    this.output.forEach(i => {\n      i.maxDist = max;\n    });\n    this.layers.forEach(i => {\n      this.renderOrder[i.maxDist].push(i);\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./src/utils/Model.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ })

/******/ });