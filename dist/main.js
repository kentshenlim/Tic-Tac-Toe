/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _background_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./background.css */ "./src/background.css");


/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubSub */ "./src/pubSub.js");

(() => {
  const len = 3;
  let boardMat = Array.from({
    length: len
  }, () => new Array(len).fill('.'));

  // Method declaration
  // function exposeGrid() { // IMPURE, UNTESTED, FOR DEBUGGING
  //   let outputStr = '';
  //   boardMat.forEach((row) => {
  //     outputStr = `${outputStr}${JSON.stringify(row)}\n`;
  //   });
  //   return boardMat;
  // }

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
  function isFull(mat) {
    // PURE, UNTESTED
    for (let r = 0; r < len; r += 1) {
      for (let c = 0; c < len; c += 1) {
        if (mat[r][c] === '.') return false;
      }
    }
    return true;
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
  function reset() {
    // IMPURE, UNTESTED
    for (let r = 0; r < len; r += 1) {
      for (let c = 0; c < len; c += 1) {
        boardMat[r][c] = '.';
      }
    }
  }
  function processOrRejectGridPicked([r, c]) {
    // IMPURE, UNTESTED
    if (boardMat[r][c] === '.') _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('gridPickedAccepted', [r, c]);else _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('gridPickedRejected', [r, c]);
  }
  function decideIfEnded() {
    // IMPURE, UNTESTED
    const res = getResult(boardMat);
    if (res === false) {
      if (isFull(boardMat)) _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('gameEnded', 'draw');
      return;
    }
    _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('gameEnded', res);
  }
  function updateGrid([r, c, symbol]) {
    // IMPURE, UNTESTED
    const updatedMatrix = pickGrid(boardMat, r, c, symbol);
    boardMat = updatedMatrix;
    decideIfEnded();
  }

  // Event subscription
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('restartGame', reset);
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('gridPickedBeforeEnd', processOrRejectGridPicked);
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('updateGridPicked', updateGrid);
})();

/***/ }),

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubSub */ "./src/pubSub.js");

(() => {
  // Logic variable
  let isCrossTurn = true;
  let isGameEnded = false;

  // Method declaration
  // function exposeIsCrossTurn() { // IMPURE, UNTESTED, FOE DEBUGGING
  //   return isCrossTurn;
  // }

  function changeTurn() {
    // IMPURE, UNTESTED
    isCrossTurn = !isCrossTurn;
  }
  function endGame() {
    isGameEnded = true;
  }
  function reset() {
    isCrossTurn = true;
    isGameEnded = false;
  }
  function processOrRejectGridPicked([r, c]) {
    if (!isGameEnded) _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('gridPickedBeforeEnd', [r, c]);
  }
  function resolveAcceptedGridPicked([r, c]) {
    const symbol = isCrossTurn ? 'x' : 'o';
    _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('updateGridPicked', [r, c, symbol]);
  }

  // Event subscription
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('restartGame', reset);
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('gridPicked', processOrRejectGridPicked);
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('gridPickedAccepted', resolveAcceptedGridPicked);
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('updateGridPicked', changeTurn);
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('gameEnded', endGame);
})();

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
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubSub */ "./src/pubSub.js");
/* harmony import */ var _img_x_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./img/x.png */ "./src/img/x.png");
/* harmony import */ var _img_o_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/o.png */ "./src/img/o.png");



(() => {
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
    const resImgWrapper = document.getElementById('res-img-wrapper');
    const resultText = document.getElementById('result-text');
    if (winner === 'draw') {
      const imgNode1 = document.createElement('img');
      const imgNode2 = document.createElement('img');
      imgNode1.src = _img_x_png__WEBPACK_IMPORTED_MODULE_1__;
      imgNode2.src = _img_o_png__WEBPACK_IMPORTED_MODULE_2__;
      resImgWrapper.appendChild(imgNode1);
      resImgWrapper.appendChild(imgNode2);
      resultText.textContent = 'DRAW!';
    } else {
      const img = winner === 'x' ? _img_x_png__WEBPACK_IMPORTED_MODULE_1__ : _img_o_png__WEBPACK_IMPORTED_MODULE_2__;
      const imgNode = document.createElement('img');
      imgNode.src = img;
      resImgWrapper.appendChild(imgNode);
      resultText.textContent = 'WINNER!';
    }
    toggleElement('result-form');
    toggleElement('overlay');
  }
  function debounce(fn, t) {
    let timeId;
    return function debounced(...args) {
      clearTimeout(timeId);
      timeId = setTimeout(() => {
        fn(...args);
      }, t);
    };
  }
  function shakeCell([r, c]) {
    const cellNode = document.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
    cellNode.classList.add('shake');
    debounce(() => {
      cellNode.classList.remove('shake');
    }, 1000)();
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
  const modeBtn = document.getElementById('mode-btn');
  modeBtn.onclick = () => {
    toggleElement('overlay');
    toggleElement('mode-form');
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
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('gridPickedRejected', shakeCell);
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('gameEnded', displayResult);
})();

/***/ }),

/***/ "./src/background.css":
/*!****************************!*\
  !*** ./src/background.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui */ "./src/ui.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _background__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./background */ "./src/background.js");




// Optional module

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q2pEakYsK0NBQU0sQ0FBQzJCLFNBQVMsQ0FBQyxXQUFXLEVBQUV5QyxhQUFhLENBQUM7QUFDOUMsQ0FBQyxFQUFFLENBQUM7Ozs7Ozs7Ozs7O0FDN0hKOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQnFCO0FBQ0o7QUFDSDtBQUNPO0FBQ3JCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2JhY2tncm91bmQuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvbG9naWMuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL3B1YlN1Yi5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvdWkuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2JhY2tncm91bmQuY3NzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9zdHlsZS5jc3M/ZTMyMCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9iYWNrZ3JvdW5kLmNzcyc7XHJcbiIsImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xyXG5cclxuKCgpID0+IHtcclxuICBjb25zdCBsZW4gPSAzO1xyXG4gIGxldCBib2FyZE1hdCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IGxlbiB9LCAoKSA9PiBuZXcgQXJyYXkobGVuKS5maWxsKCcuJykpO1xyXG5cclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICAvLyBmdW5jdGlvbiBleHBvc2VHcmlkKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVELCBGT1IgREVCVUdHSU5HXHJcbiAgLy8gICBsZXQgb3V0cHV0U3RyID0gJyc7XHJcbiAgLy8gICBib2FyZE1hdC5mb3JFYWNoKChyb3cpID0+IHtcclxuICAvLyAgICAgb3V0cHV0U3RyID0gYCR7b3V0cHV0U3RyfSR7SlNPTi5zdHJpbmdpZnkocm93KX1cXG5gO1xyXG4gIC8vICAgfSk7XHJcbiAgLy8gICByZXR1cm4gYm9hcmRNYXQ7XHJcbiAgLy8gfVxyXG5cclxuICBmdW5jdGlvbiBnZXRSZXN1bHQobWF0KSB7IC8vIElNUFVSRSwgUEFTU0VEIFdJVEggTU9DSyBQVUJTVUJcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgLy8gUm93LXdpc2VcclxuICAgICAgY29uc3Qgcm93UmVmID0gbWF0W2ldWzBdO1xyXG4gICAgICBpZiAocm93UmVmICE9PSAnLicpIHtcclxuICAgICAgICBmb3IgKGxldCBjID0gMTsgYyA8IGxlbjsgYyArPSAxKSB7XHJcbiAgICAgICAgICBpZiAobWF0W2ldW2NdICE9PSByb3dSZWYpIGJyZWFrO1xyXG4gICAgICAgICAgaWYgKGMgPT09IGxlbiAtIDEpIHtcclxuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3dpbm5lckRlY2lkZWQnLCByb3dSZWYpO1xyXG4gICAgICAgICAgICByZXR1cm4gcm93UmVmO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyBDb2x1bW4td2lzZVxyXG4gICAgICBjb25zdCBjb2xSZWYgPSBtYXRbMF1baV07XHJcbiAgICAgIGlmIChjb2xSZWYgIT09ICcuJykge1xyXG4gICAgICAgIGZvciAobGV0IHIgPSAxOyByIDwgbGVuOyByICs9IDEpIHtcclxuICAgICAgICAgIGlmIChtYXRbcl1baV0gIT09IGNvbFJlZikgYnJlYWs7XHJcbiAgICAgICAgICBpZiAociA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnd2lubmVyRGVjaWRlZCcsIGNvbFJlZik7XHJcbiAgICAgICAgICAgIHJldHVybiBjb2xSZWY7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBEaWFnb25hbHNcclxuICAgIGlmIChtYXRbMF1bMF0gIT09ICcuJykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgICAgaWYgKG1hdFtpXVtpXSAhPT0gbWF0WzBdWzBdKSBicmVhaztcclxuICAgICAgICBpZiAoaSA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3dpbm5lckRlY2lkZWQnLCBtYXRbMF1bMF0pO1xyXG4gICAgICAgICAgcmV0dXJuIG1hdFswXVswXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChtYXRbMF1bbGVuIC0gMV0gIT09ICcuJykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgICAgaWYgKG1hdFtpXVtsZW4gLSAxIC0gaV0gIT09IG1hdFswXVtsZW4gLSAxXSkgYnJlYWs7XHJcbiAgICAgICAgaWYgKGkgPT09IGxlbiAtIDEpIHtcclxuICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd3aW5uZXJEZWNpZGVkJywgbWF0WzBdW2xlbiAtIDFdKTtcclxuICAgICAgICAgIHJldHVybiBtYXRbMF1bbGVuIC0gMV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpc0Z1bGwobWF0KSB7IC8vIFBVUkUsIFVOVEVTVEVEXHJcbiAgICBmb3IgKGxldCByID0gMDsgciA8IGxlbjsgciArPSAxKSB7XHJcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgbGVuOyBjICs9IDEpIHtcclxuICAgICAgICBpZiAobWF0W3JdW2NdID09PSAnLicpIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwaWNrR3JpZChtYXQsIHIsIGMsIHN5bWIpIHtcclxuICAgIC8vIElNUFVSRSwgUEFTU0VEIFdJVEggTU9DSyBQVUJTVUJcclxuICAgIGlmIChyIDwgMCB8fCByID49IGxlbiB8fCBjIDwgMCB8fCBjID49IGxlbikgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKG1hdFtyXVtjXSAhPT0gJy4nKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBuZXdNYXQgPSBuZXcgQXJyYXkobGVuKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgbmV3TWF0W2ldID0gbWF0W2ldLnNsaWNlKCk7XHJcbiAgICB9XHJcbiAgICBuZXdNYXRbcl1bY10gPSBzeW1iO1xyXG4gICAgcmV0dXJuIG5ld01hdDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc2V0KCkge1xyXG4gICAgLy8gSU1QVVJFLCBVTlRFU1RFRFxyXG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCBsZW47IHIgKz0gMSkge1xyXG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGxlbjsgYyArPSAxKSB7XHJcbiAgICAgICAgYm9hcmRNYXRbcl1bY10gPSAnLic7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQoW3IsIGNdKSB7IC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGlmIChib2FyZE1hdFtyXVtjXSA9PT0gJy4nKSBwdWJTdWIucHVibGlzaCgnZ3JpZFBpY2tlZEFjY2VwdGVkJywgW3IsIGNdKTtcclxuICAgIGVsc2UgcHViU3ViLnB1Ymxpc2goJ2dyaWRQaWNrZWRSZWplY3RlZCcsIFtyLCBjXSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkZWNpZGVJZkVuZGVkKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBjb25zdCByZXMgPSBnZXRSZXN1bHQoYm9hcmRNYXQpO1xyXG4gICAgaWYgKHJlcyA9PT0gZmFsc2UpIHtcclxuICAgICAgaWYgKGlzRnVsbChib2FyZE1hdCkpIHB1YlN1Yi5wdWJsaXNoKCdnYW1lRW5kZWQnLCAnZHJhdycpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwdWJTdWIucHVibGlzaCgnZ2FtZUVuZGVkJywgcmVzKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVwZGF0ZUdyaWQoW3IsIGMsIHN5bWJvbF0pIHsgLy8gSU1QVVJFLCBVTlRFU1RFRFxyXG4gICAgY29uc3QgdXBkYXRlZE1hdHJpeCA9IHBpY2tHcmlkKGJvYXJkTWF0LCByLCBjLCBzeW1ib2wpO1xyXG4gICAgYm9hcmRNYXQgPSB1cGRhdGVkTWF0cml4O1xyXG4gICAgZGVjaWRlSWZFbmRlZCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gRXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgcHViU3ViLnN1YnNjcmliZSgncmVzdGFydEdhbWUnLCByZXNldCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ3JpZFBpY2tlZEJlZm9yZUVuZCcsIHByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3VwZGF0ZUdyaWRQaWNrZWQnLCB1cGRhdGVHcmlkKTtcclxufSkoKTtcclxuIiwiaW1wb3J0IHB1YlN1YiBmcm9tICcuL3B1YlN1Yic7XHJcblxyXG4oKCkgPT4ge1xyXG4gIC8vIExvZ2ljIHZhcmlhYmxlXHJcbiAgbGV0IGlzQ3Jvc3NUdXJuID0gdHJ1ZTtcclxuICBsZXQgaXNHYW1lRW5kZWQgPSBmYWxzZTtcclxuXHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgLy8gZnVuY3Rpb24gZXhwb3NlSXNDcm9zc1R1cm4oKSB7IC8vIElNUFVSRSwgVU5URVNURUQsIEZPRSBERUJVR0dJTkdcclxuICAvLyAgIHJldHVybiBpc0Nyb3NzVHVybjtcclxuICAvLyB9XHJcblxyXG4gIGZ1bmN0aW9uIGNoYW5nZVR1cm4oKSB7IC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGlzQ3Jvc3NUdXJuID0gIWlzQ3Jvc3NUdXJuO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZW5kR2FtZSgpIHtcclxuICAgIGlzR2FtZUVuZGVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc2V0KCkge1xyXG4gICAgaXNDcm9zc1R1cm4gPSB0cnVlO1xyXG4gICAgaXNHYW1lRW5kZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQoW3IsIGNdKSB7XHJcbiAgICBpZiAoIWlzR2FtZUVuZGVkKSBwdWJTdWIucHVibGlzaCgnZ3JpZFBpY2tlZEJlZm9yZUVuZCcsIFtyLCBjXSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNvbHZlQWNjZXB0ZWRHcmlkUGlja2VkKFtyLCBjXSkge1xyXG4gICAgY29uc3Qgc3ltYm9sID0gaXNDcm9zc1R1cm4gPyAneCcgOiAnbyc7XHJcbiAgICBwdWJTdWIucHVibGlzaCgndXBkYXRlR3JpZFBpY2tlZCcsIFtyLCBjLCBzeW1ib2xdKTtcclxuICB9XHJcblxyXG4gIC8vIEV2ZW50IHN1YnNjcmlwdGlvblxyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3Jlc3RhcnRHYW1lJywgcmVzZXQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dyaWRQaWNrZWQnLCBwcm9jZXNzT3JSZWplY3RHcmlkUGlja2VkKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdncmlkUGlja2VkQWNjZXB0ZWQnLCByZXNvbHZlQWNjZXB0ZWRHcmlkUGlja2VkKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCd1cGRhdGVHcmlkUGlja2VkJywgY2hhbmdlVHVybik7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ2FtZUVuZGVkJywgZW5kR2FtZSk7XHJcbn0pKCk7XHJcbiIsImNvbnN0IHB1YlN1YiA9ICgoKSA9PiB7XHJcbiAgY29uc3QgbWFwID0ge307XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShldmVudCwgZm4pIHtcclxuICAgIGlmICghbWFwW2V2ZW50XSkgbWFwW2V2ZW50XSA9IFtdO1xyXG4gICAgbWFwW2V2ZW50XS5wdXNoKGZuKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHB1Ymxpc2goZXZlbnQsIGRhdGEpIHtcclxuICAgIGlmIChtYXBbZXZlbnRdKSB7XHJcbiAgICAgIG1hcFtldmVudF0uZm9yRWFjaCgoZm4pID0+IHtcclxuICAgICAgICBmbihkYXRhKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1bnN1YnNjcmliZShldmVudCwgZm4pIHtcclxuICAgIGlmIChtYXBbZXZlbnRdKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFwW2V2ZW50XS5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIGlmIChtYXBbZXZlbnRdW2ldID09PSBmbikge1xyXG4gICAgICAgICAgbWFwW2V2ZW50XS5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7IHN1YnNjcmliZSwgcHVibGlzaCwgdW5zdWJzY3JpYmUgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHB1YlN1YjtcclxuIiwiaW1wb3J0IHB1YlN1YiBmcm9tICcuL3B1YlN1Yic7XHJcbmltcG9ydCB4U3ltYm9sIGZyb20gJy4vaW1nL3gucG5nJztcclxuaW1wb3J0IG9TeW1ib2wgZnJvbSAnLi9pbWcvby5wbmcnO1xyXG5cclxuKCgpID0+IHtcclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICBmdW5jdGlvbiB0b2dnbGVFbGVtZW50KGlkKSB7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgZm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNsb3NlUG9wdXAoZXZlbnQpIHtcclxuICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudDtcclxuICAgIGNvbnN0IHBhcmVudCA9IHRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XHJcbiAgICBwYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICBpZiAocGFyZW50LmlkID09PSAncmVzdWx0LWZvcm0nKSB7IC8vIE5lZWQgdG8gY2xlYXIgcmVzdWx0IGFkZGVkXHJcbiAgICAgIGNvbnN0IHJlc0ltZ1dyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzLWltZy13cmFwcGVyJyk7XHJcbiAgICAgIHdoaWxlIChyZXNJbWdXcmFwcGVyLmZpcnN0Q2hpbGQpIHJlc0ltZ1dyYXBwZXIucmVtb3ZlQ2hpbGQocmVzSW1nV3JhcHBlci5sYXN0Q2hpbGQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzZXQoKSB7XHJcbiAgICBjb25zdCBpbWdTID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwgPiBpbWcnKTtcclxuICAgIGltZ1MuZm9yRWFjaCgoaW1nKSA9PiB7XHJcbiAgICAgIGltZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGltZyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVwZGF0ZUdyaWQoW3IsIGMsIHN5bWJvbF0pIHtcclxuICAgIGNvbnN0IGltZyA9IHN5bWJvbCA9PT0gJ3gnID8geFN5bWJvbCA6IG9TeW1ib2w7XHJcbiAgICBjb25zdCBpbWdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICBpbWdOb2RlLnNyYyA9IGltZztcclxuICAgIGNvbnN0IGNlbGxOb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNlbGxbZGF0YS1yPVwiJHtyfVwiXVtkYXRhLWM9XCIke2N9XCJdYCk7XHJcbiAgICBjZWxsTm9kZS5hcHBlbmRDaGlsZChpbWdOb2RlKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRpc3BsYXlSZXN1bHQod2lubmVyKSB7XHJcbiAgICBjb25zdCByZXNJbWdXcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlcy1pbWctd3JhcHBlcicpO1xyXG4gICAgY29uc3QgcmVzdWx0VGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQtdGV4dCcpO1xyXG4gICAgaWYgKHdpbm5lciA9PT0gJ2RyYXcnKSB7XHJcbiAgICAgIGNvbnN0IGltZ05vZGUxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgIGNvbnN0IGltZ05vZGUyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgIGltZ05vZGUxLnNyYyA9IHhTeW1ib2w7XHJcbiAgICAgIGltZ05vZGUyLnNyYyA9IG9TeW1ib2w7XHJcbiAgICAgIHJlc0ltZ1dyYXBwZXIuYXBwZW5kQ2hpbGQoaW1nTm9kZTEpO1xyXG4gICAgICByZXNJbWdXcmFwcGVyLmFwcGVuZENoaWxkKGltZ05vZGUyKTtcclxuICAgICAgcmVzdWx0VGV4dC50ZXh0Q29udGVudCA9ICdEUkFXISc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBpbWcgPSB3aW5uZXIgPT09ICd4JyA/IHhTeW1ib2wgOiBvU3ltYm9sO1xyXG4gICAgICBjb25zdCBpbWdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgIGltZ05vZGUuc3JjID0gaW1nO1xyXG4gICAgICByZXNJbWdXcmFwcGVyLmFwcGVuZENoaWxkKGltZ05vZGUpO1xyXG4gICAgICByZXN1bHRUZXh0LnRleHRDb250ZW50ID0gJ1dJTk5FUiEnO1xyXG4gICAgfVxyXG4gICAgdG9nZ2xlRWxlbWVudCgncmVzdWx0LWZvcm0nKTtcclxuICAgIHRvZ2dsZUVsZW1lbnQoJ292ZXJsYXknKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRlYm91bmNlKGZuLCB0KSB7XHJcbiAgICBsZXQgdGltZUlkO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGRlYm91bmNlZCguLi5hcmdzKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lSWQpO1xyXG4gICAgICB0aW1lSWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBmbiguLi5hcmdzKTtcclxuICAgICAgfSwgdCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2hha2VDZWxsKFtyLCBjXSkge1xyXG4gICAgY29uc3QgY2VsbE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY2VsbFtkYXRhLXI9XCIke3J9XCJdW2RhdGEtYz1cIiR7Y31cIl1gKTtcclxuICAgIGNlbGxOb2RlLmNsYXNzTGlzdC5hZGQoJ3NoYWtlJyk7XHJcbiAgICBkZWJvdW5jZSgoKSA9PiB7XHJcbiAgICAgIGNlbGxOb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3NoYWtlJyk7XHJcbiAgICB9LCAxMDAwKSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2FjaGUgRE9NIGFuZCBiaW5kIGV2ZW50c1xyXG4gIGNvbnN0IHJlc3RhcnRHYW1lQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhcnQtYnRuJyk7XHJcbiAgcmVzdGFydEdhbWVCdG4ub25jbGljayA9ICgpID0+IHtcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdyZXN0YXJ0R2FtZScsIG51bGwpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHBsYXlBZ2FpbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWFnYWluLWJ0bicpO1xyXG4gIHBsYXlBZ2FpbkJ0bi5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdvdmVybGF5Jyk7XHJcbiAgICBjbG9zZVBvcHVwKGV2ZW50KTtcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdyZXN0YXJ0R2FtZScsIG51bGwpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG1vZGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kZS1idG4nKTtcclxuICBtb2RlQnRuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdvdmVybGF5Jyk7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdtb2RlLWZvcm0nKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBpbmZvQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZm8tYnRuJyk7XHJcbiAgaW5mb0J0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnaW5mby1mb3JtJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaW5mb0Nyb3NzQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtLXdyYXBwZXI+c3Bhbi5pY29uLWNsb3NlJyk7XHJcbiAgaW5mb0Nyb3NzQnRucy5mb3JFYWNoKChidG4pID0+IHtcclxuICAgIGNvbnN0IG9wdCA9IGJ0bjsgLy8gQ2Fubm90IG1vZGlmeSBmdW5jdGlvbiBwYXJhbSBkaXJlY3RseVxyXG4gICAgb3B0Lm9uY2xpY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gICAgICBjbG9zZVBvcHVwKGV2ZW50KTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcclxuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICBjb25zdCBvcHQgPSBjZWxsO1xyXG4gICAgb3B0Lm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHIgPSBvcHQuZ2V0QXR0cmlidXRlKCdkYXRhLXInKTtcclxuICAgICAgY29uc3QgYyA9IG9wdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYycpO1xyXG4gICAgICBwdWJTdWIucHVibGlzaCgnZ3JpZFBpY2tlZCcsIFtyLCBjXSk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICAvLyBFdmVudCBzdWJzY3JpcHRpb25cclxuICBwdWJTdWIuc3Vic2NyaWJlKCdyZXN0YXJ0R2FtZScsIHJlc2V0KTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCd1cGRhdGVHcmlkUGlja2VkJywgdXBkYXRlR3JpZCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ3JpZFBpY2tlZFJlamVjdGVkJywgc2hha2VDZWxsKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdnYW1lRW5kZWQnLCBkaXNwbGF5UmVzdWx0KTtcclxufSkoKTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCAnLi9nYW1lQm9hcmQnO1xuaW1wb3J0ICcuL2xvZ2ljJztcbmltcG9ydCAnLi91aSc7XG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcbi8vIE9wdGlvbmFsIG1vZHVsZVxuaW1wb3J0ICcuL2JhY2tncm91bmQnO1xuIl0sIm5hbWVzIjpbInB1YlN1YiIsImxlbiIsImJvYXJkTWF0IiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiZmlsbCIsImdldFJlc3VsdCIsIm1hdCIsImkiLCJyb3dSZWYiLCJjIiwicHVibGlzaCIsImNvbFJlZiIsInIiLCJpc0Z1bGwiLCJwaWNrR3JpZCIsInN5bWIiLCJuZXdNYXQiLCJzbGljZSIsInJlc2V0IiwicHJvY2Vzc09yUmVqZWN0R3JpZFBpY2tlZCIsImRlY2lkZUlmRW5kZWQiLCJyZXMiLCJ1cGRhdGVHcmlkIiwic3ltYm9sIiwidXBkYXRlZE1hdHJpeCIsInN1YnNjcmliZSIsImlzQ3Jvc3NUdXJuIiwiaXNHYW1lRW5kZWQiLCJjaGFuZ2VUdXJuIiwiZW5kR2FtZSIsInJlc29sdmVBY2NlcHRlZEdyaWRQaWNrZWQiLCJtYXAiLCJldmVudCIsImZuIiwicHVzaCIsImRhdGEiLCJmb3JFYWNoIiwidW5zdWJzY3JpYmUiLCJzcGxpY2UiLCJ4U3ltYm9sIiwib1N5bWJvbCIsInRvZ2dsZUVsZW1lbnQiLCJpZCIsImZvcm0iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiY2xvc2VQb3B1cCIsInRhcmdldCIsInBhcmVudCIsInBhcmVudE5vZGUiLCJyZW1vdmUiLCJyZXNJbWdXcmFwcGVyIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwibGFzdENoaWxkIiwiaW1nUyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbWciLCJpbWdOb2RlIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsImNlbGxOb2RlIiwicXVlcnlTZWxlY3RvciIsImFwcGVuZENoaWxkIiwiZGlzcGxheVJlc3VsdCIsIndpbm5lciIsInJlc3VsdFRleHQiLCJpbWdOb2RlMSIsImltZ05vZGUyIiwidGV4dENvbnRlbnQiLCJkZWJvdW5jZSIsInQiLCJ0aW1lSWQiLCJkZWJvdW5jZWQiLCJhcmdzIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInNoYWtlQ2VsbCIsImFkZCIsInJlc3RhcnRHYW1lQnRuIiwib25jbGljayIsInBsYXlBZ2FpbkJ0biIsIm1vZGVCdG4iLCJpbmZvQnRuIiwiaW5mb0Nyb3NzQnRucyIsImJ0biIsIm9wdCIsImNlbGxzIiwiY2VsbCIsImdldEF0dHJpYnV0ZSJdLCJzb3VyY2VSb290IjoiIn0=