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

const gameBoard = (() => {
  const len = 3;
  const boardMat = Array.from({
    length: len
  }, () => new Array(len).fill('.'));

  // Method declaration
  function exposeGrid() {
    // IMPURE, UNTESTED
    let outputStr = '';
    boardMat.forEach(row => {
      outputStr = `${outputStr}${JSON.stringify(row)}\n`;
    });
    return boardMat;
  }
  function getResult(mat) {
    // IMPURE, PASSED WITH MOCK PUBSUB
    for (let i = 0; i < len; i += 1) {
      // Row-wise
      const rowRef = mat[i][0];
      if (rowRef !== '.') {
        for (let c = 1; c < len; c += 1) {
          if (mat[i][c] !== rowRef) break;
          if (c === len - 1) {
            _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('winnerDecided', rowRef);
            return rowRef;
          }
        }
      }
      // Column-wise
      const colRef = mat[0][i];
      if (colRef !== '.') {
        for (let r = 1; r < len; r += 1) {
          if (mat[r][i] !== colRef) break;
          if (r === len - 1) {
            _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('winnerDecided', colRef);
            return colRef;
          }
        }
      }
    }
    // Diagonals
    if (mat[0][0] !== '.') {
      for (let i = 1; i < len; i += 1) {
        if (mat[i][i] !== mat[0][0]) break;
        if (i === len - 1) {
          _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('winnerDecided', mat[0][0]);
          return mat[0][0];
        }
      }
    }
    if (mat[0][len - 1] !== '.') {
      for (let i = 1; i < len; i += 1) {
        if (mat[i][len - 1 - i] !== mat[0][len - 1]) break;
        if (i === len - 1) {
          _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('winnerDecided', mat[0][len - 1]);
          return mat[0][len - 1];
        }
      }
    }
    return false;
  }
  function pickGrid(mat, r, c, symb) {
    // IMPURE, PASSED WITH MOCK PUBSUB
    if (r < 0 || r >= len || c < 0 || c >= len) return false;
    if (mat[r][c] !== '.') return false;
    const newMat = new Array(len);
    for (let i = 0; i < len; i += 1) {
      newMat[i] = mat[i].slice();
    }
    newMat[r][c] = symb;
    _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('gridPicked', [r, c]);
    return newMat;
  }
  function resetGrid() {
    // IMPURE, UNTESTED
    for (let r = 0; r < len; r += 1) {
      for (let c = 0; c < len; c += 1) {
        boardMat[r][c] = 0;
      }
    }
  }

  // Event subscription
  // None

  return {
    exposeGrid,
    pickGrid,
    getResult,
    resetGrid
  };
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameBoard);

/***/ }),

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubSub */ "./src/pubSub.js");

const logic = (() => {
  // Logic variables
  let isCrossTurn = true;

  // Method declaration
  function exposeIsCrossTurn() {
    // IMPURE, UNTESTED
    return isCrossTurn;
  }
  function changeTurn() {
    // IMPURE, UNTESTED
    isCrossTurn = !isCrossTurn;
  }
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('gridPicked', changeTurn);
  return {
    exposeIsCrossTurn,
    changeTurn
  };
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (logic);

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
const pubSub = (() => {
  const map = {};

  // Method declaration
  function subscribe(event, fn) {
    if (!map[event]) map[event] = [];
    map[event].push(fn);
  }
  function publish(event, data) {
    if (map[event]) {
      map[event].forEach(fn => {
        fn(data);
      });
    }
  }
  function unsubscribe(event, fn) {
    if (map[event]) {
      for (let i = 0; i < map[event].length; i += 1) {
        if (map[event][i] === fn) {
          map[event].splice(i, 1);
          return true;
        }
      }
    }
    return false;
  }
  return {
    subscribe,
    publish,
    unsubscribe
  };
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pubSub);

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.css */ "./src/style.css");



_gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"].exposeGrid();

// Expose interface functions
window.gameBoard = {
  pickGrid: _gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"].pickGrid,
  resetGrid: _gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"].resetGrid
};
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsRUFBRSxDQUFDO0FBRUosaUVBQWVyQyxNQUFNOzs7Ozs7Ozs7OztBQ2hDckI7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOb0M7QUFDUjtBQUNQO0FBRXJCQyxrREFBUyxDQUFDTyxVQUFVLENBQUMsQ0FBQzs7QUFFdEI7QUFDQStCLE1BQU0sQ0FBQ3RDLFNBQVMsR0FBRztFQUFFcUIsUUFBUSxFQUFFckIsa0RBQVMsQ0FBQ3FCLFFBQVE7RUFBRUksU0FBUyxFQUFFekIsa0RBQVMsQ0FBQ3lCO0FBQVUsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvbG9naWMuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL3B1YlN1Yi5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvc3R5bGUuY3NzP2UzMjAiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xyXG5cclxuY29uc3QgZ2FtZUJvYXJkID0gKCgpID0+IHtcclxuICBjb25zdCBsZW4gPSAzO1xyXG4gIGNvbnN0IGJvYXJkTWF0ID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogbGVuIH0sICgpID0+IG5ldyBBcnJheShsZW4pLmZpbGwoJy4nKSk7XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIGV4cG9zZUdyaWQoKSB7IC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGxldCBvdXRwdXRTdHIgPSAnJztcclxuICAgIGJvYXJkTWF0LmZvckVhY2goKHJvdykgPT4ge1xyXG4gICAgICBvdXRwdXRTdHIgPSBgJHtvdXRwdXRTdHJ9JHtKU09OLnN0cmluZ2lmeShyb3cpfVxcbmA7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBib2FyZE1hdDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldFJlc3VsdChtYXQpIHsgLy8gSU1QVVJFLCBQQVNTRUQgV0lUSCBNT0NLIFBVQlNVQlxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xyXG4gICAgICAvLyBSb3ctd2lzZVxyXG4gICAgICBjb25zdCByb3dSZWYgPSBtYXRbaV1bMF07XHJcbiAgICAgIGlmIChyb3dSZWYgIT09ICcuJykge1xyXG4gICAgICAgIGZvciAobGV0IGMgPSAxOyBjIDwgbGVuOyBjICs9IDEpIHtcclxuICAgICAgICAgIGlmIChtYXRbaV1bY10gIT09IHJvd1JlZikgYnJlYWs7XHJcbiAgICAgICAgICBpZiAoYyA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnd2lubmVyRGVjaWRlZCcsIHJvd1JlZik7XHJcbiAgICAgICAgICAgIHJldHVybiByb3dSZWY7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIENvbHVtbi13aXNlXHJcbiAgICAgIGNvbnN0IGNvbFJlZiA9IG1hdFswXVtpXTtcclxuICAgICAgaWYgKGNvbFJlZiAhPT0gJy4nKSB7XHJcbiAgICAgICAgZm9yIChsZXQgciA9IDE7IHIgPCBsZW47IHIgKz0gMSkge1xyXG4gICAgICAgICAgaWYgKG1hdFtyXVtpXSAhPT0gY29sUmVmKSBicmVhaztcclxuICAgICAgICAgIGlmIChyID09PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd3aW5uZXJEZWNpZGVkJywgY29sUmVmKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbFJlZjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIERpYWdvbmFsc1xyXG4gICAgaWYgKG1hdFswXVswXSAhPT0gJy4nKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgICBpZiAobWF0W2ldW2ldICE9PSBtYXRbMF1bMF0pIGJyZWFrO1xyXG4gICAgICAgIGlmIChpID09PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICBwdWJTdWIucHVibGlzaCgnd2lubmVyRGVjaWRlZCcsIG1hdFswXVswXSk7XHJcbiAgICAgICAgICByZXR1cm4gbWF0WzBdWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG1hdFswXVtsZW4gLSAxXSAhPT0gJy4nKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgICBpZiAobWF0W2ldW2xlbiAtIDEgLSBpXSAhPT0gbWF0WzBdW2xlbiAtIDFdKSBicmVhaztcclxuICAgICAgICBpZiAoaSA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3dpbm5lckRlY2lkZWQnLCBtYXRbMF1bbGVuIC0gMV0pO1xyXG4gICAgICAgICAgcmV0dXJuIG1hdFswXVtsZW4gLSAxXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHBpY2tHcmlkKG1hdCwgciwgYywgc3ltYikgeyAvLyBJTVBVUkUsIFBBU1NFRCBXSVRIIE1PQ0sgUFVCU1VCXHJcbiAgICBpZiAociA8IDAgfHwgciA+PSBsZW4gfHwgYyA8IDAgfHwgYyA+PSBsZW4pIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChtYXRbcl1bY10gIT09ICcuJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgbmV3TWF0ID0gbmV3IEFycmF5KGxlbik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgIG5ld01hdFtpXSA9IG1hdFtpXS5zbGljZSgpO1xyXG4gICAgfVxyXG4gICAgbmV3TWF0W3JdW2NdID0gc3ltYjtcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdncmlkUGlja2VkJywgW3IsIGNdKTtcclxuICAgIHJldHVybiBuZXdNYXQ7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNldEdyaWQoKSB7IC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGZvciAobGV0IHIgPSAwOyByIDwgbGVuOyByICs9IDEpIHtcclxuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBsZW47IGMgKz0gMSkge1xyXG4gICAgICAgIGJvYXJkTWF0W3JdW2NdID0gMDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gRXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgLy8gTm9uZVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZXhwb3NlR3JpZCwgcGlja0dyaWQsIGdldFJlc3VsdCwgcmVzZXRHcmlkLFxyXG4gIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnYW1lQm9hcmQ7XHJcbiIsImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xyXG5cclxuY29uc3QgbG9naWMgPSAoKCkgPT4ge1xyXG4gIC8vIExvZ2ljIHZhcmlhYmxlc1xyXG4gIGxldCBpc0Nyb3NzVHVybiA9IHRydWU7XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIGV4cG9zZUlzQ3Jvc3NUdXJuKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICByZXR1cm4gaXNDcm9zc1R1cm47XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjaGFuZ2VUdXJuKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBpc0Nyb3NzVHVybiA9ICFpc0Nyb3NzVHVybjtcclxuICB9XHJcblxyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dyaWRQaWNrZWQnLCBjaGFuZ2VUdXJuKTtcclxuXHJcbiAgcmV0dXJuIHsgZXhwb3NlSXNDcm9zc1R1cm4sIGNoYW5nZVR1cm4gfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxvZ2ljO1xyXG4iLCJjb25zdCBwdWJTdWIgPSAoKCkgPT4ge1xyXG4gIGNvbnN0IG1hcCA9IHt9O1xyXG5cclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICBmdW5jdGlvbiBzdWJzY3JpYmUoZXZlbnQsIGZuKSB7XHJcbiAgICBpZiAoIW1hcFtldmVudF0pIG1hcFtldmVudF0gPSBbXTtcclxuICAgIG1hcFtldmVudF0ucHVzaChmbik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwdWJsaXNoKGV2ZW50LCBkYXRhKSB7XHJcbiAgICBpZiAobWFwW2V2ZW50XSkge1xyXG4gICAgICBtYXBbZXZlbnRdLmZvckVhY2goKGZuKSA9PiB7XHJcbiAgICAgICAgZm4oZGF0YSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdW5zdWJzY3JpYmUoZXZlbnQsIGZuKSB7XHJcbiAgICBpZiAobWFwW2V2ZW50XSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcFtldmVudF0ubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICBpZiAobWFwW2V2ZW50XVtpXSA9PT0gZm4pIHtcclxuICAgICAgICAgIG1hcFtldmVudF0uc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4geyBzdWJzY3JpYmUsIHB1Ymxpc2gsIHVuc3Vic2NyaWJlIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwdWJTdWI7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGdhbWVCb2FyZCBmcm9tICcuL2dhbWVCb2FyZCc7XG5pbXBvcnQgbG9naWMgZnJvbSAnLi9sb2dpYyc7XG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcblxuZ2FtZUJvYXJkLmV4cG9zZUdyaWQoKTtcblxuLy8gRXhwb3NlIGludGVyZmFjZSBmdW5jdGlvbnNcbndpbmRvdy5nYW1lQm9hcmQgPSB7IHBpY2tHcmlkOiBnYW1lQm9hcmQucGlja0dyaWQsIHJlc2V0R3JpZDogZ2FtZUJvYXJkLnJlc2V0R3JpZCB9O1xuIl0sIm5hbWVzIjpbInB1YlN1YiIsImdhbWVCb2FyZCIsImxlbiIsImJvYXJkTWF0IiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiZmlsbCIsImV4cG9zZUdyaWQiLCJvdXRwdXRTdHIiLCJmb3JFYWNoIiwicm93IiwiSlNPTiIsInN0cmluZ2lmeSIsImdldFJlc3VsdCIsIm1hdCIsImkiLCJyb3dSZWYiLCJjIiwicHVibGlzaCIsImNvbFJlZiIsInIiLCJwaWNrR3JpZCIsInN5bWIiLCJuZXdNYXQiLCJzbGljZSIsInJlc2V0R3JpZCIsImxvZ2ljIiwiaXNDcm9zc1R1cm4iLCJleHBvc2VJc0Nyb3NzVHVybiIsImNoYW5nZVR1cm4iLCJzdWJzY3JpYmUiLCJtYXAiLCJldmVudCIsImZuIiwicHVzaCIsImRhdGEiLCJ1bnN1YnNjcmliZSIsInNwbGljZSIsIndpbmRvdyJdLCJzb3VyY2VSb290IjoiIn0=