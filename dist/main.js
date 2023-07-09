/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
  function processOrRejectGridPicked([r, c]) {
    if (!isGameEnded) _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('gridPickedBeforeEnd', [r, c]);
  }
  function reset() {
    isCrossTurn = true;
    isGameEnded = false;
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
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('gameEnded', displayResult);
})();

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




})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNwQyxNQUFNekUsQ0FBQyxHQUFHc0UsR0FBRyxDQUFDRyxZQUFZLENBQUMsUUFBUSxDQUFDO01BQ3BDcEYsK0NBQU0sQ0FBQ1ksT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDRSxDQUFDLEVBQUVILENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7RUFDSCxDQUFDLENBQUM7O0VBRUY7RUFDQVgsK0NBQU0sQ0FBQzJCLFNBQVMsQ0FBQyxhQUFhLEVBQUVELEtBQUssQ0FBQztFQUN0QzFCLCtDQUFNLENBQUMyQixTQUFTLENBQUMsa0JBQWtCLEVBQUVKLFVBQVUsQ0FBQztFQUNoRHZCLCtDQUFNLENBQUMyQixTQUFTLENBQUMsV0FBVyxFQUFFeUMsYUFBYSxDQUFDO0FBQzlDLENBQUMsRUFBRSxDQUFDOzs7Ozs7Ozs7OztBQzFHSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xCcUI7QUFDSjtBQUNIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvbG9naWMuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL3B1YlN1Yi5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvdWkuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xyXG5cclxuKCgpID0+IHtcclxuICBjb25zdCBsZW4gPSAzO1xyXG4gIGxldCBib2FyZE1hdCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IGxlbiB9LCAoKSA9PiBuZXcgQXJyYXkobGVuKS5maWxsKCcuJykpO1xyXG5cclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICAvLyBmdW5jdGlvbiBleHBvc2VHcmlkKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVELCBGT1IgREVCVUdHSU5HXHJcbiAgLy8gICBsZXQgb3V0cHV0U3RyID0gJyc7XHJcbiAgLy8gICBib2FyZE1hdC5mb3JFYWNoKChyb3cpID0+IHtcclxuICAvLyAgICAgb3V0cHV0U3RyID0gYCR7b3V0cHV0U3RyfSR7SlNPTi5zdHJpbmdpZnkocm93KX1cXG5gO1xyXG4gIC8vICAgfSk7XHJcbiAgLy8gICByZXR1cm4gYm9hcmRNYXQ7XHJcbiAgLy8gfVxyXG5cclxuICBmdW5jdGlvbiBnZXRSZXN1bHQobWF0KSB7IC8vIElNUFVSRSwgUEFTU0VEIFdJVEggTU9DSyBQVUJTVUJcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgLy8gUm93LXdpc2VcclxuICAgICAgY29uc3Qgcm93UmVmID0gbWF0W2ldWzBdO1xyXG4gICAgICBpZiAocm93UmVmICE9PSAnLicpIHtcclxuICAgICAgICBmb3IgKGxldCBjID0gMTsgYyA8IGxlbjsgYyArPSAxKSB7XHJcbiAgICAgICAgICBpZiAobWF0W2ldW2NdICE9PSByb3dSZWYpIGJyZWFrO1xyXG4gICAgICAgICAgaWYgKGMgPT09IGxlbiAtIDEpIHtcclxuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3dpbm5lckRlY2lkZWQnLCByb3dSZWYpO1xyXG4gICAgICAgICAgICByZXR1cm4gcm93UmVmO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyBDb2x1bW4td2lzZVxyXG4gICAgICBjb25zdCBjb2xSZWYgPSBtYXRbMF1baV07XHJcbiAgICAgIGlmIChjb2xSZWYgIT09ICcuJykge1xyXG4gICAgICAgIGZvciAobGV0IHIgPSAxOyByIDwgbGVuOyByICs9IDEpIHtcclxuICAgICAgICAgIGlmIChtYXRbcl1baV0gIT09IGNvbFJlZikgYnJlYWs7XHJcbiAgICAgICAgICBpZiAociA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnd2lubmVyRGVjaWRlZCcsIGNvbFJlZik7XHJcbiAgICAgICAgICAgIHJldHVybiBjb2xSZWY7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBEaWFnb25hbHNcclxuICAgIGlmIChtYXRbMF1bMF0gIT09ICcuJykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgICAgaWYgKG1hdFtpXVtpXSAhPT0gbWF0WzBdWzBdKSBicmVhaztcclxuICAgICAgICBpZiAoaSA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3dpbm5lckRlY2lkZWQnLCBtYXRbMF1bMF0pO1xyXG4gICAgICAgICAgcmV0dXJuIG1hdFswXVswXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChtYXRbMF1bbGVuIC0gMV0gIT09ICcuJykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgICAgaWYgKG1hdFtpXVtsZW4gLSAxIC0gaV0gIT09IG1hdFswXVtsZW4gLSAxXSkgYnJlYWs7XHJcbiAgICAgICAgaWYgKGkgPT09IGxlbiAtIDEpIHtcclxuICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd3aW5uZXJEZWNpZGVkJywgbWF0WzBdW2xlbiAtIDFdKTtcclxuICAgICAgICAgIHJldHVybiBtYXRbMF1bbGVuIC0gMV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpc0Z1bGwobWF0KSB7IC8vIFBVUkUsIFVOVEVTVEVEXHJcbiAgICBmb3IgKGxldCByID0gMDsgciA8IGxlbjsgciArPSAxKSB7XHJcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgbGVuOyBjICs9IDEpIHtcclxuICAgICAgICBpZiAobWF0W3JdW2NdID09PSAnLicpIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwcm9jZXNzT3JSZWplY3RHcmlkUGlja2VkKFtyLCBjXSkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBpZiAoYm9hcmRNYXRbcl1bY10gPT09ICcuJykgcHViU3ViLnB1Ymxpc2goJ2dyaWRQaWNrZWRBY2NlcHRlZCcsIFtyLCBjXSk7XHJcbiAgICBlbHNlIHB1YlN1Yi5wdWJsaXNoKCdncmlkUGlja2VkUmVqZWN0ZWQnLCBudWxsKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHBpY2tHcmlkKG1hdCwgciwgYywgc3ltYikgeyAvLyBJTVBVUkUsIFBBU1NFRCBXSVRIIE1PQ0sgUFVCU1VCXHJcbiAgICBpZiAociA8IDAgfHwgciA+PSBsZW4gfHwgYyA8IDAgfHwgYyA+PSBsZW4pIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChtYXRbcl1bY10gIT09ICcuJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgbmV3TWF0ID0gbmV3IEFycmF5KGxlbik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgIG5ld01hdFtpXSA9IG1hdFtpXS5zbGljZSgpO1xyXG4gICAgfVxyXG4gICAgbmV3TWF0W3JdW2NdID0gc3ltYjtcclxuICAgIHJldHVybiBuZXdNYXQ7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkZWNpZGVJZkVuZGVkKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBjb25zdCByZXMgPSBnZXRSZXN1bHQoYm9hcmRNYXQpO1xyXG4gICAgaWYgKHJlcyA9PT0gZmFsc2UpIHtcclxuICAgICAgaWYgKGlzRnVsbChib2FyZE1hdCkpIHB1YlN1Yi5wdWJsaXNoKCdnYW1lRW5kZWQnLCAnZHJhdycpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwdWJTdWIucHVibGlzaCgnZ2FtZUVuZGVkJywgcmVzKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVwZGF0ZUdyaWQoW3IsIGMsIHN5bWJvbF0pIHsgLy8gSU1QVVJFLCBVTlRFU1RFRFxyXG4gICAgY29uc3QgdXBkYXRlZE1hdHJpeCA9IHBpY2tHcmlkKGJvYXJkTWF0LCByLCBjLCBzeW1ib2wpO1xyXG4gICAgYm9hcmRNYXQgPSB1cGRhdGVkTWF0cml4O1xyXG4gICAgZGVjaWRlSWZFbmRlZCgpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzZXQoKSB7IC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGZvciAobGV0IHIgPSAwOyByIDwgbGVuOyByICs9IDEpIHtcclxuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBsZW47IGMgKz0gMSkge1xyXG4gICAgICAgIGJvYXJkTWF0W3JdW2NdID0gJy4nO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBFdmVudCBzdWJzY3JpcHRpb25cclxuICBwdWJTdWIuc3Vic2NyaWJlKCdyZXN0YXJ0R2FtZScsIHJlc2V0KTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdncmlkUGlja2VkQmVmb3JlRW5kJywgcHJvY2Vzc09yUmVqZWN0R3JpZFBpY2tlZCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgndXBkYXRlR3JpZFBpY2tlZCcsIHVwZGF0ZUdyaWQpO1xyXG59KSgpO1xyXG4iLCJpbXBvcnQgcHViU3ViIGZyb20gJy4vcHViU3ViJztcclxuXHJcbigoKSA9PiB7XHJcbiAgLy8gTG9naWMgdmFyaWFibGVcclxuICBsZXQgaXNDcm9zc1R1cm4gPSB0cnVlO1xyXG4gIGxldCBpc0dhbWVFbmRlZCA9IGZhbHNlO1xyXG5cclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICAvLyBmdW5jdGlvbiBleHBvc2VJc0Nyb3NzVHVybigpIHsgLy8gSU1QVVJFLCBVTlRFU1RFRCwgRk9FIERFQlVHR0lOR1xyXG4gIC8vICAgcmV0dXJuIGlzQ3Jvc3NUdXJuO1xyXG4gIC8vIH1cclxuXHJcbiAgZnVuY3Rpb24gY2hhbmdlVHVybigpIHsgLy8gSU1QVVJFLCBVTlRFU1RFRFxyXG4gICAgaXNDcm9zc1R1cm4gPSAhaXNDcm9zc1R1cm47XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBlbmRHYW1lKCkge1xyXG4gICAgaXNHYW1lRW5kZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHJvY2Vzc09yUmVqZWN0R3JpZFBpY2tlZChbciwgY10pIHtcclxuICAgIGlmICghaXNHYW1lRW5kZWQpIHB1YlN1Yi5wdWJsaXNoKCdncmlkUGlja2VkQmVmb3JlRW5kJywgW3IsIGNdKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc2V0KCkge1xyXG4gICAgaXNDcm9zc1R1cm4gPSB0cnVlO1xyXG4gICAgaXNHYW1lRW5kZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc29sdmVBY2NlcHRlZEdyaWRQaWNrZWQoW3IsIGNdKSB7XHJcbiAgICBjb25zdCBzeW1ib2wgPSBpc0Nyb3NzVHVybiA/ICd4JyA6ICdvJztcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCd1cGRhdGVHcmlkUGlja2VkJywgW3IsIGMsIHN5bWJvbF0pO1xyXG4gIH1cclxuXHJcbiAgLy8gRXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgcHViU3ViLnN1YnNjcmliZSgncmVzdGFydEdhbWUnLCByZXNldCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ3JpZFBpY2tlZCcsIHByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dyaWRQaWNrZWRBY2NlcHRlZCcsIHJlc29sdmVBY2NlcHRlZEdyaWRQaWNrZWQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3VwZGF0ZUdyaWRQaWNrZWQnLCBjaGFuZ2VUdXJuKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdnYW1lRW5kZWQnLCBlbmRHYW1lKTtcclxufSkoKTtcclxuIiwiY29uc3QgcHViU3ViID0gKCgpID0+IHtcclxuICBjb25zdCBtYXAgPSB7fTtcclxuXHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgZnVuY3Rpb24gc3Vic2NyaWJlKGV2ZW50LCBmbikge1xyXG4gICAgaWYgKCFtYXBbZXZlbnRdKSBtYXBbZXZlbnRdID0gW107XHJcbiAgICBtYXBbZXZlbnRdLnB1c2goZm4pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHVibGlzaChldmVudCwgZGF0YSkge1xyXG4gICAgaWYgKG1hcFtldmVudF0pIHtcclxuICAgICAgbWFwW2V2ZW50XS5mb3JFYWNoKChmbikgPT4ge1xyXG4gICAgICAgIGZuKGRhdGEpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKGV2ZW50LCBmbikge1xyXG4gICAgaWYgKG1hcFtldmVudF0pIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXBbZXZlbnRdLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgaWYgKG1hcFtldmVudF1baV0gPT09IGZuKSB7XHJcbiAgICAgICAgICBtYXBbZXZlbnRdLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHsgc3Vic2NyaWJlLCBwdWJsaXNoLCB1bnN1YnNjcmliZSB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHViU3ViO1xyXG4iLCJpbXBvcnQgcHViU3ViIGZyb20gJy4vcHViU3ViJztcclxuaW1wb3J0IHhTeW1ib2wgZnJvbSAnLi9pbWcveC5wbmcnO1xyXG5pbXBvcnQgb1N5bWJvbCBmcm9tICcuL2ltZy9vLnBuZyc7XHJcblxyXG4oKCkgPT4ge1xyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIHRvZ2dsZUVsZW1lbnQoaWQpIHtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgICBmb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY2xvc2VQb3B1cChldmVudCkge1xyXG4gICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xyXG4gICAgY29uc3QgcGFyZW50ID0gdGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZTtcclxuICAgIHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgIGlmIChwYXJlbnQuaWQgPT09ICdyZXN1bHQtZm9ybScpIHsgLy8gTmVlZCB0byBjbGVhciByZXN1bHQgYWRkZWRcclxuICAgICAgY29uc3QgcmVzSW1nV3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXMtaW1nLXdyYXBwZXInKTtcclxuICAgICAgd2hpbGUgKHJlc0ltZ1dyYXBwZXIuZmlyc3RDaGlsZCkgcmVzSW1nV3JhcHBlci5yZW1vdmVDaGlsZChyZXNJbWdXcmFwcGVyLmxhc3RDaGlsZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNldCgpIHtcclxuICAgIGNvbnN0IGltZ1MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCA+IGltZycpO1xyXG4gICAgaW1nUy5mb3JFYWNoKChpbWcpID0+IHtcclxuICAgICAgaW1nLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW1nKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdXBkYXRlR3JpZChbciwgYywgc3ltYm9sXSkge1xyXG4gICAgY29uc3QgaW1nID0gc3ltYm9sID09PSAneCcgPyB4U3ltYm9sIDogb1N5bWJvbDtcclxuICAgIGNvbnN0IGltZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIGltZ05vZGUuc3JjID0gaW1nO1xyXG4gICAgY29uc3QgY2VsbE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY2VsbFtkYXRhLXI9XCIke3J9XCJdW2RhdGEtYz1cIiR7Y31cIl1gKTtcclxuICAgIGNlbGxOb2RlLmFwcGVuZENoaWxkKGltZ05vZGUpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGlzcGxheVJlc3VsdCh3aW5uZXIpIHtcclxuICAgIGNvbnN0IHJlc0ltZ1dyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzLWltZy13cmFwcGVyJyk7XHJcbiAgICBjb25zdCByZXN1bHRUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdC10ZXh0Jyk7XHJcbiAgICBpZiAod2lubmVyID09PSAnZHJhdycpIHtcclxuICAgICAgY29uc3QgaW1nTm9kZTEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgY29uc3QgaW1nTm9kZTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgaW1nTm9kZTEuc3JjID0geFN5bWJvbDtcclxuICAgICAgaW1nTm9kZTIuc3JjID0gb1N5bWJvbDtcclxuICAgICAgcmVzSW1nV3JhcHBlci5hcHBlbmRDaGlsZChpbWdOb2RlMSk7XHJcbiAgICAgIHJlc0ltZ1dyYXBwZXIuYXBwZW5kQ2hpbGQoaW1nTm9kZTIpO1xyXG4gICAgICByZXN1bHRUZXh0LnRleHRDb250ZW50ID0gJ0RSQVchJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGltZyA9IHdpbm5lciA9PT0gJ3gnID8geFN5bWJvbCA6IG9TeW1ib2w7XHJcbiAgICAgIGNvbnN0IGltZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgaW1nTm9kZS5zcmMgPSBpbWc7XHJcbiAgICAgIHJlc0ltZ1dyYXBwZXIuYXBwZW5kQ2hpbGQoaW1nTm9kZSk7XHJcbiAgICAgIHJlc3VsdFRleHQudGV4dENvbnRlbnQgPSAnV0lOTkVSISc7XHJcbiAgICB9XHJcbiAgICB0b2dnbGVFbGVtZW50KCdyZXN1bHQtZm9ybScpO1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2FjaGUgRE9NIGFuZCBiaW5kIGV2ZW50c1xyXG4gIGNvbnN0IHJlc3RhcnRHYW1lQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhcnQtYnRuJyk7XHJcbiAgcmVzdGFydEdhbWVCdG4ub25jbGljayA9ICgpID0+IHtcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdyZXN0YXJ0R2FtZScsIG51bGwpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHBsYXlBZ2FpbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWFnYWluLWJ0bicpO1xyXG4gIHBsYXlBZ2FpbkJ0bi5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdvdmVybGF5Jyk7XHJcbiAgICBjbG9zZVBvcHVwKGV2ZW50KTtcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdyZXN0YXJ0R2FtZScsIG51bGwpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG1vZGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kZS1idG4nKTtcclxuICBtb2RlQnRuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdvdmVybGF5Jyk7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdtb2RlLWZvcm0nKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBpbmZvQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZm8tYnRuJyk7XHJcbiAgaW5mb0J0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnaW5mby1mb3JtJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaW5mb0Nyb3NzQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtLXdyYXBwZXI+c3Bhbi5pY29uLWNsb3NlJyk7XHJcbiAgaW5mb0Nyb3NzQnRucy5mb3JFYWNoKChidG4pID0+IHtcclxuICAgIGNvbnN0IG9wdCA9IGJ0bjsgLy8gQ2Fubm90IG1vZGlmeSBmdW5jdGlvbiBwYXJhbSBkaXJlY3RseVxyXG4gICAgb3B0Lm9uY2xpY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gICAgICBjbG9zZVBvcHVwKGV2ZW50KTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcclxuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICBjb25zdCBvcHQgPSBjZWxsO1xyXG4gICAgb3B0Lm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHIgPSBvcHQuZ2V0QXR0cmlidXRlKCdkYXRhLXInKTtcclxuICAgICAgY29uc3QgYyA9IG9wdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYycpO1xyXG4gICAgICBwdWJTdWIucHVibGlzaCgnZ3JpZFBpY2tlZCcsIFtyLCBjXSk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICAvLyBFdmVudCBzdWJzY3JpcHRpb25cclxuICBwdWJTdWIuc3Vic2NyaWJlKCdyZXN0YXJ0R2FtZScsIHJlc2V0KTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCd1cGRhdGVHcmlkUGlja2VkJywgdXBkYXRlR3JpZCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ2FtZUVuZGVkJywgZGlzcGxheVJlc3VsdCk7XHJcbn0pKCk7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgJy4vZ2FtZUJvYXJkJztcbmltcG9ydCAnLi9sb2dpYyc7XG5pbXBvcnQgJy4vdWknO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG4iXSwibmFtZXMiOlsicHViU3ViIiwibGVuIiwiYm9hcmRNYXQiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJmaWxsIiwiZ2V0UmVzdWx0IiwibWF0IiwiaSIsInJvd1JlZiIsImMiLCJwdWJsaXNoIiwiY29sUmVmIiwiciIsImlzRnVsbCIsInByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQiLCJwaWNrR3JpZCIsInN5bWIiLCJuZXdNYXQiLCJzbGljZSIsImRlY2lkZUlmRW5kZWQiLCJyZXMiLCJ1cGRhdGVHcmlkIiwic3ltYm9sIiwidXBkYXRlZE1hdHJpeCIsInJlc2V0Iiwic3Vic2NyaWJlIiwiaXNDcm9zc1R1cm4iLCJpc0dhbWVFbmRlZCIsImNoYW5nZVR1cm4iLCJlbmRHYW1lIiwicmVzb2x2ZUFjY2VwdGVkR3JpZFBpY2tlZCIsIm1hcCIsImV2ZW50IiwiZm4iLCJwdXNoIiwiZGF0YSIsImZvckVhY2giLCJ1bnN1YnNjcmliZSIsInNwbGljZSIsInhTeW1ib2wiLCJvU3ltYm9sIiwidG9nZ2xlRWxlbWVudCIsImlkIiwiZm9ybSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJjbG9zZVBvcHVwIiwidGFyZ2V0IiwicGFyZW50IiwicGFyZW50Tm9kZSIsInJlbW92ZSIsInJlc0ltZ1dyYXBwZXIiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJsYXN0Q2hpbGQiLCJpbWdTIiwicXVlcnlTZWxlY3RvckFsbCIsImltZyIsImltZ05vZGUiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwiY2VsbE5vZGUiLCJxdWVyeVNlbGVjdG9yIiwiYXBwZW5kQ2hpbGQiLCJkaXNwbGF5UmVzdWx0Iiwid2lubmVyIiwicmVzdWx0VGV4dCIsImltZ05vZGUxIiwiaW1nTm9kZTIiLCJ0ZXh0Q29udGVudCIsInJlc3RhcnRHYW1lQnRuIiwib25jbGljayIsInBsYXlBZ2FpbkJ0biIsIm1vZGVCdG4iLCJpbmZvQnRuIiwiaW5mb0Nyb3NzQnRucyIsImJ0biIsIm9wdCIsImNlbGxzIiwiY2VsbCIsImdldEF0dHJpYnV0ZSJdLCJzb3VyY2VSb290IjoiIn0=