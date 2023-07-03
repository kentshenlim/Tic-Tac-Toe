/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubSub */ "./src/pubSub.js");

var gameBoard = function () {
  var len = 3;
  var boardMat = Array.from({
    length: len
  }, function () {
    return new Array(len).fill('.');
  });

  // Method declaration
  function getGrid() {
    var outputStr = '';
    boardMat.forEach(function (row) {
      outputStr = "".concat(outputStr).concat(JSON.stringify(row), "\n");
    });
    console.log(outputStr);
    return boardMat;
  }
  function getResult(mat) {
    // PURE
    for (var i = 0; i < len; i += 1) {
      // Row-wise
      var rowRef = mat[i][0];
      if (rowRef !== '.') {
        for (var c = 1; c < len; c += 1) {
          if (mat[i][c] !== rowRef) break;
          if (c === len - 1) return rowRef;
        }
      }
      // Column-wise
      var colRef = mat[0][i];
      if (colRef !== '.') {
        for (var r = 1; r < len; r += 1) {
          if (mat[r][i] !== colRef) break;
          if (r === len - 1) return colRef;
        }
      }
    }
    // Diagonals
    if (mat[0][0] !== '.') {
      for (var _i = 1; _i < len; _i += 1) {
        if (mat[_i][_i] !== mat[0][0]) break;
        if (_i === len - 1) return mat[0][0];
      }
    }
    if (mat[0][len - 1] !== '.') {
      for (var _i2 = 1; _i2 < len; _i2 += 1) {
        if (mat[_i2][len - 1 - _i2] !== mat[0][len - 1]) break;
        if (_i2 === len - 1) return mat[0][len - 1];
      }
    }
    return false;
  }
  function handleResult() {
    var res = getResult();
    if (res) _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('gameEnd', res);
  }
  function pickGrid(mat, r, c, symb) {
    var n = mat.length;
    if (r < 0 || r >= n || c < 0 || c >= n) return false;
    if (boardMat[r][c] !== '.') return false;
    boardMat[r][c] = symb;
    getGrid();
    _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('afterMove', null);
    return true;
  }
  function resetGrid() {
    for (var r = 0; r < len; r += 1) {
      for (var c = 0; c < len; c += 1) {
        boardMat[r][c] = 0;
      }
    }
  }

  // Event subscription
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('gameEnd', resetGrid);
  return {
    getGrid: getGrid,
    pickGrid: pickGrid,
    getResult: getResult,
    resetGrid: resetGrid
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameBoard);

/***/ }),

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameBoard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard.js */ "./src/gameBoard.js");
/* harmony import */ var _pubSub_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pubSub.js */ "./src/pubSub.js");
/* eslint-disable import/extensions */


var logic = function () {
  // Logic variables
  var isCrossTurn = true;

  // Method declaration
  function afterMove() {
    isCrossTurn = !isCrossTurn;
    var res = _gameBoard_js__WEBPACK_IMPORTED_MODULE_0__["default"].getResult();
    if (res) {
      console.log("%c".concat(res, " won!"), 'color: greenyellow;');
      _pubSub_js__WEBPACK_IMPORTED_MODULE_1__["default"].publish('gameEnd', null);
    }
  }
  _pubSub_js__WEBPACK_IMPORTED_MODULE_1__["default"].subscribe('afterMove', afterMove);
}();

/***/ }),

/***/ "./src/pubSub.js":
/*!***********************!*\
  !*** ./src/pubSub.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var pubSub = function () {
  var map = {};

  // Method declaration
  function subscribe(event, fn) {
    if (!map[event]) map[event] = [];
    map[event].push(fn);
  }
  function publish(event, data) {
    if (map[event]) {
      map[event].forEach(function (fn) {
        fn(data);
      });
    }
  }
  function unsubscribe(event, fn) {
    if (map[event]) {
      for (var i = 0; i < map[event].length; i += 1) {
        if (map[event][i] === fn) {
          map[event].splice(i, 1);
          return true;
        }
      }
    }
    return false;
  }
  return {
    subscribe: subscribe,
    publish: publish,
    unsubscribe: unsubscribe
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pubSub);

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ "./src/gameBoard.js");
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic */ "./src/logic.js");


_gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"].getGrid();

// Expose interface functions
window.gameBoard = {
  pickGrid: _gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"].pickGrid,
  resetGrid: _gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"].resetGrid
};
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOb0M7QUFDUjtBQUU1QkMsa0RBQVMsQ0FBQ08sT0FBTyxDQUFDLENBQUM7O0FBRW5CO0FBQ0FrQyxNQUFNLENBQUN6QyxTQUFTLEdBQUc7RUFBRTBCLFFBQVEsRUFBRTFCLGtEQUFTLENBQUMwQixRQUFRO0VBQUVHLFNBQVMsRUFBRTdCLGtEQUFTLENBQUM2QjtBQUFVLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2xvZ2ljLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9wdWJTdWIuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xyXG5cclxuY29uc3QgZ2FtZUJvYXJkID0gKCgpID0+IHtcclxuICBjb25zdCBsZW4gPSAzO1xyXG4gIGNvbnN0IGJvYXJkTWF0ID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogbGVuIH0sICgpID0+IG5ldyBBcnJheShsZW4pLmZpbGwoJy4nKSk7XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIGdldEdyaWQoKSB7XHJcbiAgICBsZXQgb3V0cHV0U3RyID0gJyc7XHJcbiAgICBib2FyZE1hdC5mb3JFYWNoKChyb3cpID0+IHtcclxuICAgICAgb3V0cHV0U3RyID0gYCR7b3V0cHV0U3RyfSR7SlNPTi5zdHJpbmdpZnkocm93KX1cXG5gO1xyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmxvZyhvdXRwdXRTdHIpO1xyXG4gICAgcmV0dXJuIGJvYXJkTWF0O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0UmVzdWx0KG1hdCkgeyAvLyBQVVJFXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgIC8vIFJvdy13aXNlXHJcbiAgICAgIGNvbnN0IHJvd1JlZiA9IG1hdFtpXVswXTtcclxuICAgICAgaWYgKHJvd1JlZiAhPT0gJy4nKSB7XHJcbiAgICAgICAgZm9yIChsZXQgYyA9IDE7IGMgPCBsZW47IGMgKz0gMSkge1xyXG4gICAgICAgICAgaWYgKG1hdFtpXVtjXSAhPT0gcm93UmVmKSBicmVhaztcclxuICAgICAgICAgIGlmIChjID09PSBsZW4gLSAxKSByZXR1cm4gcm93UmVmO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyBDb2x1bW4td2lzZVxyXG4gICAgICBjb25zdCBjb2xSZWYgPSBtYXRbMF1baV07XHJcbiAgICAgIGlmIChjb2xSZWYgIT09ICcuJykge1xyXG4gICAgICAgIGZvciAobGV0IHIgPSAxOyByIDwgbGVuOyByICs9IDEpIHtcclxuICAgICAgICAgIGlmIChtYXRbcl1baV0gIT09IGNvbFJlZikgYnJlYWs7XHJcbiAgICAgICAgICBpZiAociA9PT0gbGVuIC0gMSkgcmV0dXJuIGNvbFJlZjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIERpYWdvbmFsc1xyXG4gICAgaWYgKG1hdFswXVswXSAhPT0gJy4nKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgICBpZiAobWF0W2ldW2ldICE9PSBtYXRbMF1bMF0pIGJyZWFrO1xyXG4gICAgICAgIGlmIChpID09PSBsZW4gLSAxKSByZXR1cm4gbWF0WzBdWzBdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobWF0WzBdW2xlbiAtIDFdICE9PSAnLicpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW47IGkgKz0gMSkge1xyXG4gICAgICAgIGlmIChtYXRbaV1bbGVuIC0gMSAtIGldICE9PSBtYXRbMF1bbGVuIC0gMV0pIGJyZWFrO1xyXG4gICAgICAgIGlmIChpID09PSBsZW4gLSAxKSByZXR1cm4gbWF0WzBdW2xlbiAtIDFdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBoYW5kbGVSZXN1bHQoKSB7XHJcbiAgICBjb25zdCByZXMgPSBnZXRSZXN1bHQoKTtcclxuICAgIGlmIChyZXMpIHB1YlN1Yi5wdWJsaXNoKCdnYW1lRW5kJywgcmVzKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHBpY2tHcmlkKG1hdCwgciwgYywgc3ltYikge1xyXG4gICAgY29uc3QgbiA9IG1hdC5sZW5ndGg7XHJcbiAgICBpZiAociA8IDAgfHwgciA+PSBuIHx8IGMgPCAwIHx8IGMgPj0gbikgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKGJvYXJkTWF0W3JdW2NdICE9PSAnLicpIHJldHVybiBmYWxzZTtcclxuICAgIGJvYXJkTWF0W3JdW2NdID0gc3ltYjtcclxuICAgIGdldEdyaWQoKTtcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdhZnRlck1vdmUnLCBudWxsKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzZXRHcmlkKCkge1xyXG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCBsZW47IHIgKz0gMSkge1xyXG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGxlbjsgYyArPSAxKSB7XHJcbiAgICAgICAgYm9hcmRNYXRbcl1bY10gPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBFdmVudCBzdWJzY3JpcHRpb25cclxuICBwdWJTdWIuc3Vic2NyaWJlKCdnYW1lRW5kJywgcmVzZXRHcmlkKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGdldEdyaWQsIHBpY2tHcmlkLCBnZXRSZXN1bHQsIHJlc2V0R3JpZCxcclxuICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZUJvYXJkO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvZXh0ZW5zaW9ucyAqL1xyXG5pbXBvcnQgZ2FtZUJvYXJkIGZyb20gJy4vZ2FtZUJvYXJkLmpzJztcclxuaW1wb3J0IHB1YlN1YiBmcm9tICcuL3B1YlN1Yi5qcyc7XHJcblxyXG5jb25zdCBsb2dpYyA9ICgoKSA9PiB7XHJcbiAgLy8gTG9naWMgdmFyaWFibGVzXHJcbiAgbGV0IGlzQ3Jvc3NUdXJuID0gdHJ1ZTtcclxuXHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgZnVuY3Rpb24gYWZ0ZXJNb3ZlKCkge1xyXG4gICAgaXNDcm9zc1R1cm4gPSAhaXNDcm9zc1R1cm47XHJcbiAgICBjb25zdCByZXMgPSBnYW1lQm9hcmQuZ2V0UmVzdWx0KCk7XHJcbiAgICBpZiAocmVzKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGAlYyR7cmVzfSB3b24hYCwgJ2NvbG9yOiBncmVlbnllbGxvdzsnKTtcclxuICAgICAgcHViU3ViLnB1Ymxpc2goJ2dhbWVFbmQnLCBudWxsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2FmdGVyTW92ZScsIGFmdGVyTW92ZSk7XHJcbn0pKCk7XHJcbiIsImNvbnN0IHB1YlN1YiA9ICgoKSA9PiB7XHJcbiAgY29uc3QgbWFwID0ge307XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShldmVudCwgZm4pIHtcclxuICAgIGlmICghbWFwW2V2ZW50XSkgbWFwW2V2ZW50XSA9IFtdO1xyXG4gICAgbWFwW2V2ZW50XS5wdXNoKGZuKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHB1Ymxpc2goZXZlbnQsIGRhdGEpIHtcclxuICAgIGlmIChtYXBbZXZlbnRdKSB7XHJcbiAgICAgIG1hcFtldmVudF0uZm9yRWFjaCgoZm4pID0+IHtcclxuICAgICAgICBmbihkYXRhKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1bnN1YnNjcmliZShldmVudCwgZm4pIHtcclxuICAgIGlmIChtYXBbZXZlbnRdKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFwW2V2ZW50XS5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIGlmIChtYXBbZXZlbnRdW2ldID09PSBmbikge1xyXG4gICAgICAgICAgbWFwW2V2ZW50XS5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7IHN1YnNjcmliZSwgcHVibGlzaCwgdW5zdWJzY3JpYmUgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHB1YlN1YjtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZ2FtZUJvYXJkIGZyb20gJy4vZ2FtZUJvYXJkJztcbmltcG9ydCBsb2dpYyBmcm9tICcuL2xvZ2ljJztcblxuZ2FtZUJvYXJkLmdldEdyaWQoKTtcblxuLy8gRXhwb3NlIGludGVyZmFjZSBmdW5jdGlvbnNcbndpbmRvdy5nYW1lQm9hcmQgPSB7IHBpY2tHcmlkOiBnYW1lQm9hcmQucGlja0dyaWQsIHJlc2V0R3JpZDogZ2FtZUJvYXJkLnJlc2V0R3JpZCB9O1xuIl0sIm5hbWVzIjpbInB1YlN1YiIsImdhbWVCb2FyZCIsImxlbiIsImJvYXJkTWF0IiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiZmlsbCIsImdldEdyaWQiLCJvdXRwdXRTdHIiLCJmb3JFYWNoIiwicm93IiwiY29uY2F0IiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbnNvbGUiLCJsb2ciLCJnZXRSZXN1bHQiLCJtYXQiLCJpIiwicm93UmVmIiwiYyIsImNvbFJlZiIsInIiLCJoYW5kbGVSZXN1bHQiLCJyZXMiLCJwdWJsaXNoIiwicGlja0dyaWQiLCJzeW1iIiwibiIsInJlc2V0R3JpZCIsInN1YnNjcmliZSIsImxvZ2ljIiwiaXNDcm9zc1R1cm4iLCJhZnRlck1vdmUiLCJtYXAiLCJldmVudCIsImZuIiwicHVzaCIsImRhdGEiLCJ1bnN1YnNjcmliZSIsInNwbGljZSIsIndpbmRvdyJdLCJzb3VyY2VSb290IjoiIn0=