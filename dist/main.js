/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar gameBoard = function () {\n  var len = 3;\n  var matrix = Array.from({\n    length: len\n  }, function () {\n    return new Array(len).fill('.');\n  });\n  var isCrossTurn = true;\n\n  // Methods declaration\n  function logGrid() {\n    console.log(matrix);\n  }\n  function pickGrid(r, c) {\n    var mat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : matrix;\n    if (r < 0 || r >= len || c < 0 || c >= len) {\n      console.log('Row number or col number out of range!');\n    } else if (mat[r][c] !== '.') {\n      console.log('Grid chosen has been occupied!');\n    } else {\n      var ref = mat;\n      ref[r][c] = isCrossTurn ? 'X' : 'O';\n      isCrossTurn = !isCrossTurn;\n    }\n  }\n  function getResult(mat) {\n    for (var i = 0; i < len; i += 1) {\n      // Row-wise\n      var rowRef = mat[i][0];\n      if (rowRef !== '.') {\n        for (var c = 1; c < len; c += 1) {\n          if (mat[i][c] !== rowRef) break;\n          if (c === len - 1) return rowRef;\n        }\n      }\n      // Col-wise\n      var colRef = mat[0][i];\n      if (colRef !== '.') {\n        for (var r = 1; r < len; r += 1) {\n          if (mat[r][i] !== colRef) break;\n          if (r === len - 1) return colRef;\n        }\n      }\n    }\n    // Diagonals\n    if (mat[0][0] !== '.') {\n      for (var _i = 1; _i < len; _i += 1) {\n        if (mat[_i][_i] !== mat[0][0]) break;\n        if (_i === len - 1) return mat[0][0];\n      }\n    }\n    if (mat[0][len - 1] !== '.') {\n      for (var _i2 = 1; _i2 < len; _i2 += 1) {\n        if (mat[_i2][len - 1 - _i2] !== mat[0][len - 1]) break;\n        if (_i2 === len - 1) return mat[0][len - 1];\n      }\n    }\n    return false;\n  }\n  return {\n    logGrid: logGrid,\n    pickGrid: pickGrid,\n    getResult: getResult\n  };\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameBoard);\n\n//# sourceURL=webpack://my-webpack-project/./src/gameBoard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gameBoard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard.js */ \"./src/gameBoard.js\");\n/* eslint-disable import/extensions */\n\nvar mat = [['0', 2, '2'], ['.', '2', '.'], ['2', '0', '1']];\nconsole.log(_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getResult(mat));\n_gameBoard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].logGrid();\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;