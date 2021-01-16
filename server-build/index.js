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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ModelDesigner; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Model */ \"./src/utils/Model.js\");\n/* harmony import */ var _utils_Layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Layer */ \"./src/utils/Layer.js\");\n/* harmony import */ var _testing_library_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @testing-library/react */ \"@testing-library/react\");\n/* harmony import */ var _testing_library_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_testing_library_react__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nconst getPos = (index, i, length, maxx, maxy, w, h) => {\n  const minx = 100 * index;\n  const height = 200 * length - 100;\n  const y = (100 * (2 * maxy - 1) - height) / 2;\n  const miny = 200 * i + y;\n  const offx = (w - 50 * (2 * maxx - 1)) / 2;\n  const offy = (h - 100 * (2 * maxy - 1)) / 2;\n  const retx = minx + offx;\n  const rety = miny + offy;\n  return {\n    x: retx,\n    y: rety\n  };\n};\n\nconst pointAboveLine = (slope, base, x, y) => {\n  if (y <= slope * x + base) {\n    return 1;\n  }\n\n  return 0;\n};\n\nconst pointBetweenLine = (l0, l1, p) => {\n  if (l0.y === l1.y) {\n    return p.x >= l0.x && p.x <= l1.x;\n  }\n\n  const perp = -(l1.x - l0.x) / (l1.y - l0.y);\n  const b0 = l0.y - perp * l0.x;\n  const b1 = l1.y - perp * l1.x;\n  return pointAboveLine(perp, b0, p.x, p.y) + pointAboveLine(perp, b1, p.x, p.y) === 1;\n};\n\nconst rectContainsPoint = (p, r, w, h) => {\n  return p.x >= r.x && p.x <= r.x + w && p.y >= r.y && p.y <= r.y + h;\n};\n\nconst rectContainsLine = (l0, l1, r, w, h) => {\n  return rectContainsPoint(l0, r, w, h) || rectContainsPoint(l1, r, w, h);\n};\n\nconst lineContainsRect = (l0, l1, r, w, h) => {\n  return pointBetweenLine(l0, l1, r) || pointBetweenLine(l0, l1, {\n    x: r.x + w,\n    y: r.y\n  }) || pointBetweenLine(l0, l1, {\n    x: r.x,\n    y: r.y + h\n  }) || pointBetweenLine(l0, l1, {\n    x: r.x + w,\n    y: r.y + h\n  });\n};\n\nclass ModelDesigner extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      zoomPerc: 1.0,\n      width: props.width,\n      height: props.height,\n      ratio: props.width / props.height,\n      zoomheight: props.height,\n      x: 0,\n      y: 0,\n      model: new _utils_Model__WEBPACK_IMPORTED_MODULE_1__[\"default\"]([new _utils_Layer__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n        type: 'input',\n        units: 4\n      })], [new _utils_Layer__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n        type: 'dense',\n        units: 4\n      })]),\n      canvas: null,\n      ctx: null\n    };\n  }\n\n  initialDraw() {\n    const toDraw = this.state.model;\n    toDraw.render();\n    this.setState({\n      model: toDraw\n    });\n    let width = toDraw.renderOrder.length;\n    let height = 0;\n    toDraw.renderOrder.forEach(item => {\n      if (item.length > height) {\n        height = item.length;\n      }\n    });\n    height = 100 * (2 * height - 1); //100 units per layer + 100 between each layer\n\n    width = 50 * (2 * width - 1); //50 units per layer + 50 between each layer\n\n    const ratio = width / height;\n\n    if (ratio >= this.state.ratio) {\n      this.setState({\n        zoomheight: width / this.state.ratio\n      });\n    } else {\n      this.setState({\n        zoomheight: height\n      });\n    }\n  }\n\n  draw() {\n    const width = this.state.ratio * this.state.zoomheight / this.state.zoomPerc;\n    const height = this.state.zoomheight / this.state.zoomPerc;\n    const ctx = this.state.ctx;\n    ctx.fillStyle = '#FFFFFF';\n    ctx.fillRect(0, 0, this.state.width, this.state.height); // Determine what model layers/connections will need to be drawn\n\n    const renderOrder = this.state.model.renderOrder;\n    let max = 0;\n    renderOrder.forEach(i => {\n      if (i.length > max) {\n        max = i.length;\n      }\n    }); // We map to isolate the horizontally visible connections, then filter out\n    // the vertically visible connections.\n\n    const toRender = renderOrder.map((item, index, arr) => {\n      return item.filter((element, i) => {\n        const pos = getPos(index, i, item.length, renderOrder.length, max, width, height);\n        return this.layerFits(pos) || this.connectionFits(element, pos, arr, index, max);\n      });\n    }); // Now we take each net piece and find its position on the canvas\n\n    toRender.forEach((layer, i) => {\n      let index = -1;\n      const size = renderOrder[i].length;\n\n      if (size === layer.length) {\n        index = 0;\n      }\n\n      layer.forEach((conn, j) => {\n        if (index === -1) {\n          const id = conn.id;\n          renderOrder[i].forEach((match, k) => {\n            if (match.id === id) {\n              index = k;\n            }\n          });\n        }\n\n        this.drawNet(this.getCoords(getPos(i, index + j, size, renderOrder.length, max, width, height)), conn, max, width, height);\n      });\n    });\n  }\n\n  layerFits(pos) {\n    const minx = pos.x;\n    const miny = pos.y;\n    const maxx = minx + 50;\n    const maxy = miny + 100;\n    const x = this.state.x; // x position of top left of view rectangle in units\n\n    const y = this.state.y; // y position of top left of view rectangle in units\n\n    const width = this.state.ratio * this.state.zoomheight / this.state.zoomPerc;\n    const height = this.state.zoomheight / this.state.zoomPerc;\n    return (minx >= x && minx <= x + width || maxx >= x && maxx <= x + width) && (miny >= y && miny <= y + height || maxy >= y && maxy <= y + height);\n  }\n\n  connectionFits(element, pos, renderOrder, index, max) {\n    const x = this.state.x; // x position of top left of view rectangle in units\n\n    const y = this.state.y; // y position of top left of view rectangle in units\n\n    const width = this.state.ratio * this.state.zoomheight / this.state.zoomPerc;\n    const height = this.state.zoomheight / this.state.zoomPerc;\n    const x0 = pos.x + 50;\n    const y0 = pos.y + 50;\n    let toRet = false;\n    element.next.forEach(item => {\n      if (!toRet) {\n        const id = item.id;\n\n        for (let i = index + 1; i <= renderOrder.length; i++) {\n          if (!toRet) {\n            renderOrder[i].forEach((elem, j) => {\n              if (!toRet && elem.id == id) {\n                const pos2 = getPos(i, j, renderOrder[i].length, renderOrder.length, max, width, height);\n                const x1 = pos2.x;\n                const y1 = pos2.y + 50;\n                const slope = (y1 - y0) / (x1 - x0);\n                const base = y0 - slope * x0;\n                let count = 0;\n                count += pointAboveLine(slope, base, x, y);\n                count += pointAboveLine(slope, base, x + width, y);\n                count += pointAboveLine(slope, base, x, y + height);\n                count += pointAboveLine(slope, base, x + width, y + height);\n\n                if (count > 0 && count < 4) {\n                  toRet = rectContainsLine({\n                    x: x0,\n                    y: y0\n                  }, {\n                    x: x1,\n                    y: y1\n                  }, {\n                    x: x,\n                    y: y\n                  }, width, height) || lineContainsRect({\n                    x: x0,\n                    y: y0\n                  }, {\n                    x: x1,\n                    y: y1\n                  }, {\n                    x: x,\n                    y: y\n                  }, width, height);\n                }\n              }\n            });\n          }\n        }\n      }\n    });\n    return toRet;\n  }\n\n  getCoords(pos) {\n    const x = this.state.x; // x position of top left of view rectangle in units\n\n    const y = this.state.y; // y position of top left of view rectangle in units\n\n    const width = this.state.ratio * this.state.zoomheight / this.state.zoomPerc;\n    const height = this.state.zoomheight / this.state.zoomPerc;\n    const rx = (pos.x - x) * (this.state.width / width);\n    const ry = (pos.y - y) * (this.state.height / height);\n    const cx = rx + 50 * (this.state.width / width);\n    const cy = ry + 50 * (this.state.height / height);\n    return {\n      rx: rx,\n      ry: ry,\n      cx: cx,\n      cy: cy\n    };\n  }\n\n  drawNet(pos, layer, max, w, h) {\n    const renderOrder = this.state.model.renderOrder;\n    const ctx = this.state.ctx;\n    ctx.fillStyle = '#000000';\n    ctx.rect(pos.rx, pos.ry, pos.cx - pos.rx, 2 * (pos.cy - pos.ry));\n    ctx.stroke();\n    layer.next.forEach(item => {\n      ctx.beginPath();\n      ctx.moveTo(pos.cx, pos.cy);\n      const id = item.id;\n      let indexx = -1;\n      let indexy = -1;\n      renderOrder.forEach((lay, i) => {\n        if (indexx === -1) {\n          lay.forEach((el, j) => {\n            if (el.id === id) {\n              indexx = i;\n              indexy = j;\n            }\n          });\n        }\n      });\n      const conpos = this.getCoords(getPos(indexx, indexy, renderOrder[indexx].length, renderOrder.length, max, w, h));\n      ctx.lineTo(conpos.rx, conpos.cy);\n      ctx.stroke();\n    });\n  }\n\n  componentDidMount() {\n    const canvas = this.refs.modelView;\n    const ctx = canvas.getContext('2d');\n    this.setState({\n      canvas: canvas,\n      ctx: ctx\n    });\n    this.initialDraw();\n  }\n\n  componentDidUpdate() {\n    this.draw();\n  }\n\n  render() {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"canvas\", {\n      ref: \"modelView\",\n      width: this.state.width,\n      height: this.state.height\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./src/components/ModelDesigner.js?");

/***/ }),

/***/ "./src/utils/Layer.js":
/*!****************************!*\
  !*** ./src/utils/Layer.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Layer; });\nvar __count = 0;\nclass Layer {\n  constructor(config) {\n    this.config = config;\n    this.prev = [];\n    this.next = [];\n    this.id = __count++;\n    this.maxDist = 0;\n  }\n\n  addPrev(layer) {\n    const ids = this.prev.map(el => el.id);\n\n    if (ids.indexOf(layer.id) === -1) {\n      this.prev.push(layer);\n    }\n  }\n\n  addNext(layer) {\n    const ids = this.next.map(el => el.id);\n\n    if (ids.indexOf(layer.id) === -1) {\n      this.next.push(layer);\n    }\n  }\n\n  reach(dist) {\n    if (dist > this.maxDist || this.maxDist === 0) {\n      this.maxDist = dist;\n      let max = dist;\n      this.next.forEach(i => {\n        let temp = i.reach(dist + 1);\n\n        if (temp > max) {\n          max = temp;\n        }\n      });\n      return max;\n    }\n\n    return dist;\n  }\n\n}\n\n//# sourceURL=webpack:///./src/utils/Layer.js?");

/***/ }),

/***/ "./src/utils/Model.js":
/*!****************************!*\
  !*** ./src/utils/Model.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Model; });\nclass Model {\n  constructor(input, output) {\n    this.input = input;\n    this.output = output;\n    this.layers = [...input, ...output];\n    this.renderOrder = [];\n  }\n\n  addNext(layerNum, layer) {\n    layer.addPrev(this.layers[layerNum]);\n    this.layers[layerNum].addNext(layer);\n    this.layers.push(layer);\n  }\n\n  addAdjacent(layerNum, layer) {\n    // For every layer that connects to the layer we add an adjacency to,\n    // append the adjacency.\n    const id = this.layers[layerNum].id;\n    this.layers = this.layers.map(item => {\n      item.next.forEach(element => {\n        if (element.id === id) {\n          layer.addPrev(element);\n          item.addNext(layer);\n        }\n      });\n      return item;\n    });\n    this.layers.push(layer);\n    const inIDs = [...this.input.id];\n    const outIDs = [...this.output.id];\n    const ini = inIDs.indexOf(id);\n    const outi = outIDs.indexOf(id);\n\n    if (ini !== -1) {\n      this.input.push(layer);\n    }\n\n    if (outi !== -1) {\n      this.output.push(layer);\n    }\n  }\n\n  removeLayer(layerNum) {\n    // Every layer that the removed layer connects to is connected to\n    // the previous layer.\n    const layer = this.layers[layerNum];\n    layer.next.map(item => {\n      item.prev.filter(elem => elem.id !== layer.id);\n      layer.prev.forEach(prev => item.addPrev(prev));\n      return item;\n    });\n    layer.prev.map(item => {\n      item.next.filter(elem => elem.id !== layer.id);\n      layer.next.forEach(next => item.addnext(next));\n      return item;\n    });\n    const inIDs = [...this.input.id];\n    const outIDs = [...this.output.id];\n    const ini = inIDs.indexOf(layer.id);\n    const outi = outIDs.indexOf(layer.id);\n\n    if (ini !== -1) {\n      layer.next.forEach(next => {\n        if (next.prev.length === 0 && outIDs.indexOf(next.id) === -1 && inIDs.indexOf(next.id) === -1) {\n          this.input.push(next);\n        }\n      });\n    }\n\n    if (outi !== -1) {\n      layer.prev.forEach(prev => {\n        if (prev.next.length === 0 && outIDs.indexOf(prev.id) === -1 && inIDs.indexOf(prev.id) === -1) {\n          this.output.push(prev);\n        }\n      });\n    }\n  }\n\n  connect(prev, next) {\n    prev.addNext(next);\n    next.addPrev(prev);\n\n    if (this.causesCycle(prev.id, next)) {\n      this.disconnect(prev, next);\n    }\n  }\n\n  disconnect(prev, next) {\n    prev.next.filter(item => item.id !== next.id);\n    next.prev.filter(item => item.id !== prev.id);\n  }\n\n  causesCycle(id, item) {\n    if (item.id === id) {\n      return true;\n    }\n\n    for (let i = 0; i < item.next.length; i++) {\n      if (this.causesCycle(id, item.next[i])) {\n        return true;\n      }\n    }\n\n    return false;\n  }\n\n  addInput(layer) {\n    this.input.push(layer);\n  }\n\n  addOutput(layer) {\n    this.output.push(layer);\n  }\n\n  makeOutput(layerNum) {\n    const inIDs = [...this.input.id];\n    const ini = inIDs.indexOf(this.layers[layerNum].id);\n\n    if (this.layers[layerNum].next.length === 0 && ini === -1) {\n      this.output.push(this.layers[layerNum]);\n    }\n  }\n\n  outNotMax(max) {\n    let toRet = false;\n    this.layers.forEach(layer => {\n      if (!toRet) {\n        if (layer.maxDist > max) {\n          toRet = true;\n        }\n\n        if (layer.maxDist === max) {\n          if (!toRet) {\n            let match = false;\n            this.output.forEach(out => {\n              if (layer.id === out.id) {\n                match = true;\n              }\n            });\n\n            if (!match) {\n              toRet = true;\n            }\n          }\n        }\n      }\n    });\n    return toRet;\n  }\n\n  render() {\n    this.renderOrder = [];\n    this.layers.forEach(i => {\n      i.maxDist = 0;\n    });\n    let max = 0;\n    this.input.forEach(i => {\n      let temp = i.reach(0);\n\n      if (temp > max) {\n        max = temp;\n      }\n    });\n\n    for (let i = 0; i <= max; i++) {\n      this.renderOrder.push([]);\n    }\n\n    const outputNM = this.outNotMax(max);\n    this.output.forEach(i => {\n      i.maxDist = max;\n\n      if (outputNM) {\n        i.maxDist += 1;\n      }\n    });\n\n    if (outputNM) {\n      this.renderOrder.push([]);\n    }\n\n    this.layers.forEach(i => {\n      this.renderOrder[i.maxDist].push(i);\n    });\n  }\n\n}\n\n//# sourceURL=webpack:///./src/utils/Model.js?");

/***/ }),

/***/ "@testing-library/react":
/*!*****************************************!*\
  !*** external "@testing-library/react" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@testing-library/react\");\n\n//# sourceURL=webpack:///external_%22@testing-library/react%22?");

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