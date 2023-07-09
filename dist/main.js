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
  let boardMat = Array.from({
    length: len
  }, () => new Array(len).fill('.'));

  // Method declaration
  function exposeGrid() {
    // IMPURE, UNTESTED, FOR DEBUGGING
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
  function processOrRejectGridPicked([r, c]) {
    // IMPURE, UNTESTED
    if (boardMat[r][c] === '.') _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('gridPickedAccepted', [r, c]);else _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('gridPickedRejected', null);
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
    return newMat;
  }
  function decideIfEnded() {
    // IMPURE, UNTESTED
    const res = getResult(boardMat);
    if (res === false) return;
    _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('gameEnded', res);
  }
  function updateGrid([r, c, symbol]) {
    // IMPURE, UNTESTED
    const updatedMatrix = pickGrid(boardMat, r, c, symbol);
    boardMat = updatedMatrix;
    decideIfEnded();
  }
  function reset() {
    // IMPURE, UNTESTED
    for (let r = 0; r < len; r += 1) {
      for (let c = 0; c < len; c += 1) {
        boardMat[r][c] = '.';
      }
    }
  }

  // Event subscription
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('restartGame', reset);
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('gridPicked', processOrRejectGridPicked);
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('updateGridPicked', updateGrid);
  return {
    exposeGrid,
    pickGrid,
    getResult,
    reset
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
  function reset() {
    isCrossTurn = true;
  }
  function resolveAcceptedGridPicked([r, c]) {
    const symbol = isCrossTurn ? 'x' : 'o';
    _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('updateGridPicked', [r, c, symbol]);
  }

  // Event subscription
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('restartGame', reset);
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('gridPickedAccepted', resolveAcceptedGridPicked);
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('updateGridPicked', changeTurn);
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('gameEnded', reset);
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

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubSub */ "./src/pubSub.js");
/* harmony import */ var _img_x_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./img/x.png */ "./src/img/x.png");
/* harmony import */ var _img_o_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/o.png */ "./src/img/o.png");



const ui = (() => {
  // Method declaration
  function toggleElement(id) {
    const form = document.getElementById(id);
    form.classList.toggle('active');
  }
  function closePopup(event) {
    const {
      target
    } = event;
    const parent = target.parentNode.parentNode;
    parent.classList.remove('active');
    if (parent.id === 'result-form') {
      // Need to clear result added
      const resImgWrapper = document.getElementById('res-img-wrapper');
      while (resImgWrapper.firstChild) resImgWrapper.removeChild(resImgWrapper.lastChild);
    }
  }
  function reset() {
    const imgS = document.querySelectorAll('.cell > img');
    imgS.forEach(img => {
      img.parentNode.removeChild(img);
    });
  }
  function updateGrid([r, c, symbol]) {
    const img = symbol === 'x' ? _img_x_png__WEBPACK_IMPORTED_MODULE_1__ : _img_o_png__WEBPACK_IMPORTED_MODULE_2__;
    const imgNode = document.createElement('img');
    imgNode.src = img;
    const cellNode = document.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
    cellNode.appendChild(imgNode);
  }
  function displayResult(winner) {
    const img = winner === 'x' ? _img_x_png__WEBPACK_IMPORTED_MODULE_1__ : _img_o_png__WEBPACK_IMPORTED_MODULE_2__;
    const imgNode = document.createElement('img');
    imgNode.src = img;
    const resImgWrapper = document.getElementById('res-img-wrapper');
    resImgWrapper.appendChild(imgNode);
    toggleElement('result-form');
    toggleElement('overlay');
  }

  // Cache DOM and bind events
  const restartGameBtn = document.getElementById('restart-btn');
  restartGameBtn.onclick = () => {
    _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('restartGame', null);
  };
  const playAgainBtn = document.getElementById('play-again-btn');
  playAgainBtn.onclick = event => {
    toggleElement('overlay');
    closePopup(event);
    _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('restartGame', null);
  };
  const infoBtn = document.getElementById('info-btn');
  infoBtn.onclick = () => {
    toggleElement('overlay');
    toggleElement('info-form');
  };
  const infoCrossBtns = document.querySelectorAll('.form-wrapper>span.icon-close');
  infoCrossBtns.forEach(btn => {
    const opt = btn; // Cannot modify function param directly
    opt.onclick = event => {
      toggleElement('overlay');
      closePopup(event);
    };
  });
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    const opt = cell;
    opt.onclick = () => {
      const r = opt.getAttribute('data-r');
      const c = opt.getAttribute('data-c');
      _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('gridPicked', [r, c]);
    };
  });

  // Event subscription
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('restartGame', reset);
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('updateGridPicked', updateGrid);
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('gameEnded', displayResult);
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ui);

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/img/o.png":
/*!***********************!*\
  !*** ./src/img/o.png ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "89fcdb057fecbfe7b7f3.png";

/***/ }),

/***/ "./src/img/x.png":
/*!***********************!*\
  !*** ./src/img/x.png ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "96d43856a7f63bb75055.png";

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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
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
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui */ "./src/ui.js");




_gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"].exposeGrid();

// Expose interface functions
window.gameBoard = {
  pickGrid: _gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"].pickGrid,
  resetGrid: _gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"].resetGrid
};
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRXRCO0FBQ0E4RSxNQUFNLENBQUNyRixTQUFTLEdBQUc7RUFBRXNCLFFBQVEsRUFBRXRCLGtEQUFTLENBQUNzQixRQUFRO0VBQUVnRSxTQUFTLEVBQUV0RixrREFBUyxDQUFDc0Y7QUFBVSxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9sb2dpYy5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvcHViU3ViLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy91aS5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHB1YlN1YiBmcm9tICcuL3B1YlN1Yic7XHJcblxyXG5jb25zdCBnYW1lQm9hcmQgPSAoKCkgPT4ge1xyXG4gIGNvbnN0IGxlbiA9IDM7XHJcbiAgbGV0IGJvYXJkTWF0ID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogbGVuIH0sICgpID0+IG5ldyBBcnJheShsZW4pLmZpbGwoJy4nKSk7XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIGV4cG9zZUdyaWQoKSB7IC8vIElNUFVSRSwgVU5URVNURUQsIEZPUiBERUJVR0dJTkdcclxuICAgIGxldCBvdXRwdXRTdHIgPSAnJztcclxuICAgIGJvYXJkTWF0LmZvckVhY2goKHJvdykgPT4ge1xyXG4gICAgICBvdXRwdXRTdHIgPSBgJHtvdXRwdXRTdHJ9JHtKU09OLnN0cmluZ2lmeShyb3cpfVxcbmA7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBib2FyZE1hdDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldFJlc3VsdChtYXQpIHsgLy8gSU1QVVJFLCBQQVNTRUQgV0lUSCBNT0NLIFBVQlNVQlxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xyXG4gICAgICAvLyBSb3ctd2lzZVxyXG4gICAgICBjb25zdCByb3dSZWYgPSBtYXRbaV1bMF07XHJcbiAgICAgIGlmIChyb3dSZWYgIT09ICcuJykge1xyXG4gICAgICAgIGZvciAobGV0IGMgPSAxOyBjIDwgbGVuOyBjICs9IDEpIHtcclxuICAgICAgICAgIGlmIChtYXRbaV1bY10gIT09IHJvd1JlZikgYnJlYWs7XHJcbiAgICAgICAgICBpZiAoYyA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnd2lubmVyRGVjaWRlZCcsIHJvd1JlZik7XHJcbiAgICAgICAgICAgIHJldHVybiByb3dSZWY7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIENvbHVtbi13aXNlXHJcbiAgICAgIGNvbnN0IGNvbFJlZiA9IG1hdFswXVtpXTtcclxuICAgICAgaWYgKGNvbFJlZiAhPT0gJy4nKSB7XHJcbiAgICAgICAgZm9yIChsZXQgciA9IDE7IHIgPCBsZW47IHIgKz0gMSkge1xyXG4gICAgICAgICAgaWYgKG1hdFtyXVtpXSAhPT0gY29sUmVmKSBicmVhaztcclxuICAgICAgICAgIGlmIChyID09PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd3aW5uZXJEZWNpZGVkJywgY29sUmVmKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbFJlZjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIERpYWdvbmFsc1xyXG4gICAgaWYgKG1hdFswXVswXSAhPT0gJy4nKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgICBpZiAobWF0W2ldW2ldICE9PSBtYXRbMF1bMF0pIGJyZWFrO1xyXG4gICAgICAgIGlmIChpID09PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICBwdWJTdWIucHVibGlzaCgnd2lubmVyRGVjaWRlZCcsIG1hdFswXVswXSk7XHJcbiAgICAgICAgICByZXR1cm4gbWF0WzBdWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG1hdFswXVtsZW4gLSAxXSAhPT0gJy4nKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgICBpZiAobWF0W2ldW2xlbiAtIDEgLSBpXSAhPT0gbWF0WzBdW2xlbiAtIDFdKSBicmVhaztcclxuICAgICAgICBpZiAoaSA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3dpbm5lckRlY2lkZWQnLCBtYXRbMF1bbGVuIC0gMV0pO1xyXG4gICAgICAgICAgcmV0dXJuIG1hdFswXVtsZW4gLSAxXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQoW3IsIGNdKSB7IC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGlmIChib2FyZE1hdFtyXVtjXSA9PT0gJy4nKSBwdWJTdWIucHVibGlzaCgnZ3JpZFBpY2tlZEFjY2VwdGVkJywgW3IsIGNdKTtcclxuICAgIGVsc2UgcHViU3ViLnB1Ymxpc2goJ2dyaWRQaWNrZWRSZWplY3RlZCcsIG51bGwpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcGlja0dyaWQobWF0LCByLCBjLCBzeW1iKSB7IC8vIElNUFVSRSwgUEFTU0VEIFdJVEggTU9DSyBQVUJTVUJcclxuICAgIGlmIChyIDwgMCB8fCByID49IGxlbiB8fCBjIDwgMCB8fCBjID49IGxlbikgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKG1hdFtyXVtjXSAhPT0gJy4nKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBuZXdNYXQgPSBuZXcgQXJyYXkobGVuKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgbmV3TWF0W2ldID0gbWF0W2ldLnNsaWNlKCk7XHJcbiAgICB9XHJcbiAgICBuZXdNYXRbcl1bY10gPSBzeW1iO1xyXG4gICAgcmV0dXJuIG5ld01hdDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRlY2lkZUlmRW5kZWQoKSB7IC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGNvbnN0IHJlcyA9IGdldFJlc3VsdChib2FyZE1hdCk7XHJcbiAgICBpZiAocmVzID09PSBmYWxzZSkgcmV0dXJuO1xyXG4gICAgcHViU3ViLnB1Ymxpc2goJ2dhbWVFbmRlZCcsIHJlcyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1cGRhdGVHcmlkKFtyLCBjLCBzeW1ib2xdKSB7IC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGNvbnN0IHVwZGF0ZWRNYXRyaXggPSBwaWNrR3JpZChib2FyZE1hdCwgciwgYywgc3ltYm9sKTtcclxuICAgIGJvYXJkTWF0ID0gdXBkYXRlZE1hdHJpeDtcclxuICAgIGRlY2lkZUlmRW5kZWQoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc2V0KCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBmb3IgKGxldCByID0gMDsgciA8IGxlbjsgciArPSAxKSB7XHJcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgbGVuOyBjICs9IDEpIHtcclxuICAgICAgICBib2FyZE1hdFtyXVtjXSA9ICcuJztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gRXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgcHViU3ViLnN1YnNjcmliZSgncmVzdGFydEdhbWUnLCByZXNldCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ3JpZFBpY2tlZCcsIHByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3VwZGF0ZUdyaWRQaWNrZWQnLCB1cGRhdGVHcmlkKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGV4cG9zZUdyaWQsIHBpY2tHcmlkLCBnZXRSZXN1bHQsIHJlc2V0LFxyXG4gIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnYW1lQm9hcmQ7XHJcbiIsImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xyXG5cclxuY29uc3QgbG9naWMgPSAoKCkgPT4ge1xyXG4gIC8vIExvZ2ljIHZhcmlhYmxlc1xyXG4gIGxldCBpc0Nyb3NzVHVybiA9IHRydWU7XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIGV4cG9zZUlzQ3Jvc3NUdXJuKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICByZXR1cm4gaXNDcm9zc1R1cm47XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjaGFuZ2VUdXJuKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBpc0Nyb3NzVHVybiA9ICFpc0Nyb3NzVHVybjtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc2V0KCkge1xyXG4gICAgaXNDcm9zc1R1cm4gPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzb2x2ZUFjY2VwdGVkR3JpZFBpY2tlZChbciwgY10pIHtcclxuICAgIGNvbnN0IHN5bWJvbCA9IGlzQ3Jvc3NUdXJuID8gJ3gnIDogJ28nO1xyXG4gICAgcHViU3ViLnB1Ymxpc2goJ3VwZGF0ZUdyaWRQaWNrZWQnLCBbciwgYywgc3ltYm9sXSk7XHJcbiAgfVxyXG5cclxuICAvLyBFdmVudCBzdWJzY3JpcHRpb25cclxuICBwdWJTdWIuc3Vic2NyaWJlKCdyZXN0YXJ0R2FtZScsIHJlc2V0KTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdncmlkUGlja2VkQWNjZXB0ZWQnLCByZXNvbHZlQWNjZXB0ZWRHcmlkUGlja2VkKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCd1cGRhdGVHcmlkUGlja2VkJywgY2hhbmdlVHVybik7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ2FtZUVuZGVkJywgcmVzZXQpO1xyXG5cclxuICByZXR1cm4geyBleHBvc2VJc0Nyb3NzVHVybiwgY2hhbmdlVHVybiB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbG9naWM7XHJcbiIsImNvbnN0IHB1YlN1YiA9ICgoKSA9PiB7XHJcbiAgY29uc3QgbWFwID0ge307XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShldmVudCwgZm4pIHtcclxuICAgIGlmICghbWFwW2V2ZW50XSkgbWFwW2V2ZW50XSA9IFtdO1xyXG4gICAgbWFwW2V2ZW50XS5wdXNoKGZuKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHB1Ymxpc2goZXZlbnQsIGRhdGEpIHtcclxuICAgIGlmIChtYXBbZXZlbnRdKSB7XHJcbiAgICAgIG1hcFtldmVudF0uZm9yRWFjaCgoZm4pID0+IHtcclxuICAgICAgICBmbihkYXRhKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1bnN1YnNjcmliZShldmVudCwgZm4pIHtcclxuICAgIGlmIChtYXBbZXZlbnRdKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFwW2V2ZW50XS5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIGlmIChtYXBbZXZlbnRdW2ldID09PSBmbikge1xyXG4gICAgICAgICAgbWFwW2V2ZW50XS5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7IHN1YnNjcmliZSwgcHVibGlzaCwgdW5zdWJzY3JpYmUgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHB1YlN1YjtcclxuIiwiaW1wb3J0IHB1YlN1YiBmcm9tICcuL3B1YlN1Yic7XHJcbmltcG9ydCB4U3ltYm9sIGZyb20gJy4vaW1nL3gucG5nJztcclxuaW1wb3J0IG9TeW1ib2wgZnJvbSAnLi9pbWcvby5wbmcnO1xyXG5cclxuY29uc3QgdWkgPSAoKCkgPT4ge1xyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIHRvZ2dsZUVsZW1lbnQoaWQpIHtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgICBmb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY2xvc2VQb3B1cChldmVudCkge1xyXG4gICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xyXG4gICAgY29uc3QgcGFyZW50ID0gdGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZTtcclxuICAgIHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgIGlmIChwYXJlbnQuaWQgPT09ICdyZXN1bHQtZm9ybScpIHsgLy8gTmVlZCB0byBjbGVhciByZXN1bHQgYWRkZWRcclxuICAgICAgY29uc3QgcmVzSW1nV3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXMtaW1nLXdyYXBwZXInKTtcclxuICAgICAgd2hpbGUgKHJlc0ltZ1dyYXBwZXIuZmlyc3RDaGlsZCkgcmVzSW1nV3JhcHBlci5yZW1vdmVDaGlsZChyZXNJbWdXcmFwcGVyLmxhc3RDaGlsZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNldCgpIHtcclxuICAgIGNvbnN0IGltZ1MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCA+IGltZycpO1xyXG4gICAgaW1nUy5mb3JFYWNoKChpbWcpID0+IHtcclxuICAgICAgaW1nLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW1nKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdXBkYXRlR3JpZChbciwgYywgc3ltYm9sXSkge1xyXG4gICAgY29uc3QgaW1nID0gc3ltYm9sID09PSAneCcgPyB4U3ltYm9sIDogb1N5bWJvbDtcclxuICAgIGNvbnN0IGltZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIGltZ05vZGUuc3JjID0gaW1nO1xyXG4gICAgY29uc3QgY2VsbE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY2VsbFtkYXRhLXI9XCIke3J9XCJdW2RhdGEtYz1cIiR7Y31cIl1gKTtcclxuICAgIGNlbGxOb2RlLmFwcGVuZENoaWxkKGltZ05vZGUpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGlzcGxheVJlc3VsdCh3aW5uZXIpIHtcclxuICAgIGNvbnN0IGltZyA9IHdpbm5lciA9PT0gJ3gnID8geFN5bWJvbCA6IG9TeW1ib2w7XHJcbiAgICBjb25zdCBpbWdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICBpbWdOb2RlLnNyYyA9IGltZztcclxuICAgIGNvbnN0IHJlc0ltZ1dyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzLWltZy13cmFwcGVyJyk7XHJcbiAgICByZXNJbWdXcmFwcGVyLmFwcGVuZENoaWxkKGltZ05vZGUpO1xyXG4gICAgdG9nZ2xlRWxlbWVudCgncmVzdWx0LWZvcm0nKTtcclxuICAgIHRvZ2dsZUVsZW1lbnQoJ292ZXJsYXknKTtcclxuICB9XHJcblxyXG4gIC8vIENhY2hlIERPTSBhbmQgYmluZCBldmVudHNcclxuICBjb25zdCByZXN0YXJ0R2FtZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXJ0LWJ0bicpO1xyXG4gIHJlc3RhcnRHYW1lQnRuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICBwdWJTdWIucHVibGlzaCgncmVzdGFydEdhbWUnLCBudWxsKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBwbGF5QWdhaW5CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheS1hZ2Fpbi1idG4nKTtcclxuICBwbGF5QWdhaW5CdG4ub25jbGljayA9IChldmVudCkgPT4ge1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gICAgY2xvc2VQb3B1cChldmVudCk7XHJcbiAgICBwdWJTdWIucHVibGlzaCgncmVzdGFydEdhbWUnLCBudWxsKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBpbmZvQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZm8tYnRuJyk7XHJcbiAgaW5mb0J0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnaW5mby1mb3JtJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaW5mb0Nyb3NzQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtLXdyYXBwZXI+c3Bhbi5pY29uLWNsb3NlJyk7XHJcbiAgaW5mb0Nyb3NzQnRucy5mb3JFYWNoKChidG4pID0+IHtcclxuICAgIGNvbnN0IG9wdCA9IGJ0bjsgLy8gQ2Fubm90IG1vZGlmeSBmdW5jdGlvbiBwYXJhbSBkaXJlY3RseVxyXG4gICAgb3B0Lm9uY2xpY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gICAgICBjbG9zZVBvcHVwKGV2ZW50KTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcclxuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICBjb25zdCBvcHQgPSBjZWxsO1xyXG4gICAgb3B0Lm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHIgPSBvcHQuZ2V0QXR0cmlidXRlKCdkYXRhLXInKTtcclxuICAgICAgY29uc3QgYyA9IG9wdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYycpO1xyXG4gICAgICBwdWJTdWIucHVibGlzaCgnZ3JpZFBpY2tlZCcsIFtyLCBjXSk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICAvLyBFdmVudCBzdWJzY3JpcHRpb25cclxuICBwdWJTdWIuc3Vic2NyaWJlKCdyZXN0YXJ0R2FtZScsIHJlc2V0KTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCd1cGRhdGVHcmlkUGlja2VkJywgdXBkYXRlR3JpZCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ2FtZUVuZGVkJywgZGlzcGxheVJlc3VsdCk7XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1aTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCBnYW1lQm9hcmQgZnJvbSAnLi9nYW1lQm9hcmQnO1xuaW1wb3J0IGxvZ2ljIGZyb20gJy4vbG9naWMnO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgdWkgZnJvbSAnLi91aSc7XG5cbmdhbWVCb2FyZC5leHBvc2VHcmlkKCk7XG5cbi8vIEV4cG9zZSBpbnRlcmZhY2UgZnVuY3Rpb25zXG53aW5kb3cuZ2FtZUJvYXJkID0geyBwaWNrR3JpZDogZ2FtZUJvYXJkLnBpY2tHcmlkLCByZXNldEdyaWQ6IGdhbWVCb2FyZC5yZXNldEdyaWQgfTtcbiJdLCJuYW1lcyI6WyJwdWJTdWIiLCJnYW1lQm9hcmQiLCJsZW4iLCJib2FyZE1hdCIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsImZpbGwiLCJleHBvc2VHcmlkIiwib3V0cHV0U3RyIiwiZm9yRWFjaCIsInJvdyIsIkpTT04iLCJzdHJpbmdpZnkiLCJnZXRSZXN1bHQiLCJtYXQiLCJpIiwicm93UmVmIiwiYyIsInB1Ymxpc2giLCJjb2xSZWYiLCJyIiwicHJvY2Vzc09yUmVqZWN0R3JpZFBpY2tlZCIsInBpY2tHcmlkIiwic3ltYiIsIm5ld01hdCIsInNsaWNlIiwiZGVjaWRlSWZFbmRlZCIsInJlcyIsInVwZGF0ZUdyaWQiLCJzeW1ib2wiLCJ1cGRhdGVkTWF0cml4IiwicmVzZXQiLCJzdWJzY3JpYmUiLCJsb2dpYyIsImlzQ3Jvc3NUdXJuIiwiZXhwb3NlSXNDcm9zc1R1cm4iLCJjaGFuZ2VUdXJuIiwicmVzb2x2ZUFjY2VwdGVkR3JpZFBpY2tlZCIsIm1hcCIsImV2ZW50IiwiZm4iLCJwdXNoIiwiZGF0YSIsInVuc3Vic2NyaWJlIiwic3BsaWNlIiwieFN5bWJvbCIsIm9TeW1ib2wiLCJ1aSIsInRvZ2dsZUVsZW1lbnQiLCJpZCIsImZvcm0iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiY2xvc2VQb3B1cCIsInRhcmdldCIsInBhcmVudCIsInBhcmVudE5vZGUiLCJyZW1vdmUiLCJyZXNJbWdXcmFwcGVyIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwibGFzdENoaWxkIiwiaW1nUyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbWciLCJpbWdOb2RlIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsImNlbGxOb2RlIiwicXVlcnlTZWxlY3RvciIsImFwcGVuZENoaWxkIiwiZGlzcGxheVJlc3VsdCIsIndpbm5lciIsInJlc3RhcnRHYW1lQnRuIiwib25jbGljayIsInBsYXlBZ2FpbkJ0biIsImluZm9CdG4iLCJpbmZvQ3Jvc3NCdG5zIiwiYnRuIiwib3B0IiwiY2VsbHMiLCJjZWxsIiwiZ2V0QXR0cmlidXRlIiwid2luZG93IiwicmVzZXRHcmlkIl0sInNvdXJjZVJvb3QiOiIifQ==