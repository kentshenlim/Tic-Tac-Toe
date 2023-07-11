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
/* harmony import */ var _img_x_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./img/x.png */ "./src/img/x.png");
/* harmony import */ var _img_o_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/o.png */ "./src/img/o.png");



(() => {
  // Cache DOM
  const body = document.querySelector('body');
  const background = document.createElement('div');
  background.classList.add('background-wrapper');

  // Method declaration
  function getAspectRatio() {
    return window.innerWidth / window.innerHeight;
  }
  function createImgNode(imgSrc, classNameList) {
    const imgNode = document.createElement('img');
    imgNode.src = imgSrc;
    classNameList.forEach(className => {
      imgNode.classList.add(className);
    });
    return imgNode;
  }
  function insertMotif(imgSrc, classNameList, r, c, width) {
    // Insert r by c
    const verticalGap = 100 / r;
    const horizontalGap = 100 / c;
    for (let i = 0; i < r; i += 1) {
      for (let j = 0; j < c; j += 1) {
        const node = createImgNode(imgSrc, classNameList);
        node.style.width = width;
        node.style.position = 'absolute';
        node.style.top = `${verticalGap * i}%`;
        node.style.left = `${horizontalGap * (j + (i % 2 ? 0.5 : 0))}%`;
        background.appendChild(node);
      }
    }
  }
  function deleteMotif() {
    while (background.lastChild) background.removeChild(background.firstChild);
  }
  function swapMotif() {
    const nodes = document.querySelectorAll('.background-wrapper img');
    const [newImg, newClass] = nodes[0].classList.contains('xImg') ? [_img_o_png__WEBPACK_IMPORTED_MODULE_2__, 'oImg'] : [_img_x_png__WEBPACK_IMPORTED_MODULE_1__, 'xImg'];
    const oldClass = newClass === 'xImg' ? 'oImg' : 'xImg';
    nodes.forEach(node => {
      const p = node;
      p.classList.replace(oldClass, newClass);
      p.src = newImg;
    });
  }
  if (getAspectRatio() > 3 / 4) {
    insertMotif(_img_x_png__WEBPACK_IMPORTED_MODULE_1__, ['xImg'], 4, 7, '10%');
  } else {
    insertMotif(_img_x_png__WEBPACK_IMPORTED_MODULE_1__, ['xImg'], 10, 4, '20%');
  }
  window.addEventListener('resize', () => {
    deleteMotif();
    if (getAspectRatio() > 3 / 4) {
      insertMotif(_img_x_png__WEBPACK_IMPORTED_MODULE_1__, ['xImg'], 4, 7, '10%');
    } else {
      insertMotif(_img_x_png__WEBPACK_IMPORTED_MODULE_1__, ['xImg'], 10, 4, '20%');
    }
  });
  body.appendChild(background);
  window.test = swapMotif;
})();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7QUM3SEo7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCcUI7QUFDSjtBQUNIO0FBQ087QUFDckIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9sb2dpYy5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvcHViU3ViLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy91aS5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvYmFja2dyb3VuZC5jc3MiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9iYWNrZ3JvdW5kLmNzcyc7XHJcbmltcG9ydCB4SW1nIGZyb20gJy4vaW1nL3gucG5nJztcclxuaW1wb3J0IG9JbWcgZnJvbSAnLi9pbWcvby5wbmcnO1xyXG5cclxuKCgpID0+IHtcclxuICAvLyBDYWNoZSBET01cclxuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG5cclxuICBjb25zdCBiYWNrZ3JvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgYmFja2dyb3VuZC5jbGFzc0xpc3QuYWRkKCdiYWNrZ3JvdW5kLXdyYXBwZXInKTtcclxuXHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgZnVuY3Rpb24gZ2V0QXNwZWN0UmF0aW8oKSB7XHJcbiAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVJbWdOb2RlKGltZ1NyYywgY2xhc3NOYW1lTGlzdCkge1xyXG4gICAgY29uc3QgaW1nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgaW1nTm9kZS5zcmMgPSBpbWdTcmM7XHJcbiAgICBjbGFzc05hbWVMaXN0LmZvckVhY2goKGNsYXNzTmFtZSkgPT4ge1xyXG4gICAgICBpbWdOb2RlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGltZ05vZGU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbnNlcnRNb3RpZihpbWdTcmMsIGNsYXNzTmFtZUxpc3QsIHIsIGMsIHdpZHRoKSB7XHJcbiAgICAvLyBJbnNlcnQgciBieSBjXHJcbiAgICBjb25zdCB2ZXJ0aWNhbEdhcCA9IDEwMCAvIHI7XHJcbiAgICBjb25zdCBob3Jpem9udGFsR2FwID0gMTAwIC8gYztcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcjsgaSArPSAxKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYzsgaiArPSAxKSB7XHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IGNyZWF0ZUltZ05vZGUoaW1nU3JjLCBjbGFzc05hbWVMaXN0KTtcclxuICAgICAgICBub2RlLnN0eWxlLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgbm9kZS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgICAgbm9kZS5zdHlsZS50b3AgPSBgJHt2ZXJ0aWNhbEdhcCAqIGl9JWA7XHJcbiAgICAgICAgbm9kZS5zdHlsZS5sZWZ0ID0gYCR7aG9yaXpvbnRhbEdhcCAqIChqICsgKGkgJSAyID8gMC41IDogMCkpfSVgO1xyXG4gICAgICAgIGJhY2tncm91bmQuYXBwZW5kQ2hpbGQobm9kZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRlbGV0ZU1vdGlmKCkge1xyXG4gICAgd2hpbGUgKGJhY2tncm91bmQubGFzdENoaWxkKSBiYWNrZ3JvdW5kLnJlbW92ZUNoaWxkKGJhY2tncm91bmQuZmlyc3RDaGlsZCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzd2FwTW90aWYoKSB7XHJcbiAgICBjb25zdCBub2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iYWNrZ3JvdW5kLXdyYXBwZXIgaW1nJyk7XHJcbiAgICBjb25zdCBbbmV3SW1nLCBuZXdDbGFzc10gPSAobm9kZXNbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCd4SW1nJykpID8gW29JbWcsICdvSW1nJ10gOiBbeEltZywgJ3hJbWcnXTtcclxuICAgIGNvbnN0IG9sZENsYXNzID0gbmV3Q2xhc3MgPT09ICd4SW1nJyA/ICdvSW1nJyA6ICd4SW1nJztcclxuICAgIG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgY29uc3QgcCA9IG5vZGU7XHJcbiAgICAgIHAuY2xhc3NMaXN0LnJlcGxhY2Uob2xkQ2xhc3MsIG5ld0NsYXNzKTtcclxuICAgICAgcC5zcmMgPSBuZXdJbWc7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGlmIChnZXRBc3BlY3RSYXRpbygpID4gMyAvIDQpIHtcclxuICAgIGluc2VydE1vdGlmKHhJbWcsIFsneEltZyddLCA0LCA3LCAnMTAlJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGluc2VydE1vdGlmKHhJbWcsIFsneEltZyddLCAxMCwgNCwgJzIwJScpO1xyXG4gIH1cclxuXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgIGRlbGV0ZU1vdGlmKCk7XHJcbiAgICBpZiAoZ2V0QXNwZWN0UmF0aW8oKSA+IDMgLyA0KSB7XHJcbiAgICAgIGluc2VydE1vdGlmKHhJbWcsIFsneEltZyddLCA0LCA3LCAnMTAlJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpbnNlcnRNb3RpZih4SW1nLCBbJ3hJbWcnXSwgMTAsIDQsICcyMCUnKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgYm9keS5hcHBlbmRDaGlsZChiYWNrZ3JvdW5kKTtcclxuICB3aW5kb3cudGVzdCA9IHN3YXBNb3RpZjtcclxufSkoKTtcclxuIiwiaW1wb3J0IHB1YlN1YiBmcm9tICcuL3B1YlN1Yic7XHJcblxyXG4oKCkgPT4ge1xyXG4gIGNvbnN0IGxlbiA9IDM7XHJcbiAgbGV0IGJvYXJkTWF0ID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogbGVuIH0sICgpID0+IG5ldyBBcnJheShsZW4pLmZpbGwoJy4nKSk7XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIC8vIGZ1bmN0aW9uIGV4cG9zZUdyaWQoKSB7IC8vIElNUFVSRSwgVU5URVNURUQsIEZPUiBERUJVR0dJTkdcclxuICAvLyAgIGxldCBvdXRwdXRTdHIgPSAnJztcclxuICAvLyAgIGJvYXJkTWF0LmZvckVhY2goKHJvdykgPT4ge1xyXG4gIC8vICAgICBvdXRwdXRTdHIgPSBgJHtvdXRwdXRTdHJ9JHtKU09OLnN0cmluZ2lmeShyb3cpfVxcbmA7XHJcbiAgLy8gICB9KTtcclxuICAvLyAgIHJldHVybiBib2FyZE1hdDtcclxuICAvLyB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldFJlc3VsdChtYXQpIHsgLy8gSU1QVVJFLCBQQVNTRUQgV0lUSCBNT0NLIFBVQlNVQlxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xyXG4gICAgICAvLyBSb3ctd2lzZVxyXG4gICAgICBjb25zdCByb3dSZWYgPSBtYXRbaV1bMF07XHJcbiAgICAgIGlmIChyb3dSZWYgIT09ICcuJykge1xyXG4gICAgICAgIGZvciAobGV0IGMgPSAxOyBjIDwgbGVuOyBjICs9IDEpIHtcclxuICAgICAgICAgIGlmIChtYXRbaV1bY10gIT09IHJvd1JlZikgYnJlYWs7XHJcbiAgICAgICAgICBpZiAoYyA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnd2lubmVyRGVjaWRlZCcsIHJvd1JlZik7XHJcbiAgICAgICAgICAgIHJldHVybiByb3dSZWY7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIENvbHVtbi13aXNlXHJcbiAgICAgIGNvbnN0IGNvbFJlZiA9IG1hdFswXVtpXTtcclxuICAgICAgaWYgKGNvbFJlZiAhPT0gJy4nKSB7XHJcbiAgICAgICAgZm9yIChsZXQgciA9IDE7IHIgPCBsZW47IHIgKz0gMSkge1xyXG4gICAgICAgICAgaWYgKG1hdFtyXVtpXSAhPT0gY29sUmVmKSBicmVhaztcclxuICAgICAgICAgIGlmIChyID09PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd3aW5uZXJEZWNpZGVkJywgY29sUmVmKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbFJlZjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIERpYWdvbmFsc1xyXG4gICAgaWYgKG1hdFswXVswXSAhPT0gJy4nKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgICBpZiAobWF0W2ldW2ldICE9PSBtYXRbMF1bMF0pIGJyZWFrO1xyXG4gICAgICAgIGlmIChpID09PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICBwdWJTdWIucHVibGlzaCgnd2lubmVyRGVjaWRlZCcsIG1hdFswXVswXSk7XHJcbiAgICAgICAgICByZXR1cm4gbWF0WzBdWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG1hdFswXVtsZW4gLSAxXSAhPT0gJy4nKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgICBpZiAobWF0W2ldW2xlbiAtIDEgLSBpXSAhPT0gbWF0WzBdW2xlbiAtIDFdKSBicmVhaztcclxuICAgICAgICBpZiAoaSA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3dpbm5lckRlY2lkZWQnLCBtYXRbMF1bbGVuIC0gMV0pO1xyXG4gICAgICAgICAgcmV0dXJuIG1hdFswXVtsZW4gLSAxXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzRnVsbChtYXQpIHsgLy8gUFVSRSwgVU5URVNURURcclxuICAgIGZvciAobGV0IHIgPSAwOyByIDwgbGVuOyByICs9IDEpIHtcclxuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBsZW47IGMgKz0gMSkge1xyXG4gICAgICAgIGlmIChtYXRbcl1bY10gPT09ICcuJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHBpY2tHcmlkKG1hdCwgciwgYywgc3ltYikge1xyXG4gICAgLy8gSU1QVVJFLCBQQVNTRUQgV0lUSCBNT0NLIFBVQlNVQlxyXG4gICAgaWYgKHIgPCAwIHx8IHIgPj0gbGVuIHx8IGMgPCAwIHx8IGMgPj0gbGVuKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAobWF0W3JdW2NdICE9PSAnLicpIHJldHVybiBmYWxzZTtcclxuICAgIGNvbnN0IG5ld01hdCA9IG5ldyBBcnJheShsZW4pO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xyXG4gICAgICBuZXdNYXRbaV0gPSBtYXRbaV0uc2xpY2UoKTtcclxuICAgIH1cclxuICAgIG5ld01hdFtyXVtjXSA9IHN5bWI7XHJcbiAgICByZXR1cm4gbmV3TWF0O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzZXQoKSB7XHJcbiAgICAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBmb3IgKGxldCByID0gMDsgciA8IGxlbjsgciArPSAxKSB7XHJcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgbGVuOyBjICs9IDEpIHtcclxuICAgICAgICBib2FyZE1hdFtyXVtjXSA9ICcuJztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHJvY2Vzc09yUmVqZWN0R3JpZFBpY2tlZChbciwgY10pIHsgLy8gSU1QVVJFLCBVTlRFU1RFRFxyXG4gICAgaWYgKGJvYXJkTWF0W3JdW2NdID09PSAnLicpIHB1YlN1Yi5wdWJsaXNoKCdncmlkUGlja2VkQWNjZXB0ZWQnLCBbciwgY10pO1xyXG4gICAgZWxzZSBwdWJTdWIucHVibGlzaCgnZ3JpZFBpY2tlZFJlamVjdGVkJywgW3IsIGNdKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRlY2lkZUlmRW5kZWQoKSB7IC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGNvbnN0IHJlcyA9IGdldFJlc3VsdChib2FyZE1hdCk7XHJcbiAgICBpZiAocmVzID09PSBmYWxzZSkge1xyXG4gICAgICBpZiAoaXNGdWxsKGJvYXJkTWF0KSkgcHViU3ViLnB1Ymxpc2goJ2dhbWVFbmRlZCcsICdkcmF3Jyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdnYW1lRW5kZWQnLCByZXMpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdXBkYXRlR3JpZChbciwgYywgc3ltYm9sXSkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBjb25zdCB1cGRhdGVkTWF0cml4ID0gcGlja0dyaWQoYm9hcmRNYXQsIHIsIGMsIHN5bWJvbCk7XHJcbiAgICBib2FyZE1hdCA9IHVwZGF0ZWRNYXRyaXg7XHJcbiAgICBkZWNpZGVJZkVuZGVkKCk7XHJcbiAgfVxyXG5cclxuICAvLyBFdmVudCBzdWJzY3JpcHRpb25cclxuICBwdWJTdWIuc3Vic2NyaWJlKCdyZXN0YXJ0R2FtZScsIHJlc2V0KTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdncmlkUGlja2VkQmVmb3JlRW5kJywgcHJvY2Vzc09yUmVqZWN0R3JpZFBpY2tlZCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgndXBkYXRlR3JpZFBpY2tlZCcsIHVwZGF0ZUdyaWQpO1xyXG59KSgpO1xyXG4iLCJpbXBvcnQgcHViU3ViIGZyb20gJy4vcHViU3ViJztcclxuXHJcbigoKSA9PiB7XHJcbiAgLy8gTG9naWMgdmFyaWFibGVcclxuICBsZXQgaXNDcm9zc1R1cm4gPSB0cnVlO1xyXG4gIGxldCBpc0dhbWVFbmRlZCA9IGZhbHNlO1xyXG5cclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICAvLyBmdW5jdGlvbiBleHBvc2VJc0Nyb3NzVHVybigpIHsgLy8gSU1QVVJFLCBVTlRFU1RFRCwgRk9FIERFQlVHR0lOR1xyXG4gIC8vICAgcmV0dXJuIGlzQ3Jvc3NUdXJuO1xyXG4gIC8vIH1cclxuXHJcbiAgZnVuY3Rpb24gY2hhbmdlVHVybigpIHsgLy8gSU1QVVJFLCBVTlRFU1RFRFxyXG4gICAgaXNDcm9zc1R1cm4gPSAhaXNDcm9zc1R1cm47XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBlbmRHYW1lKCkge1xyXG4gICAgaXNHYW1lRW5kZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzZXQoKSB7XHJcbiAgICBpc0Nyb3NzVHVybiA9IHRydWU7XHJcbiAgICBpc0dhbWVFbmRlZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHJvY2Vzc09yUmVqZWN0R3JpZFBpY2tlZChbciwgY10pIHtcclxuICAgIGlmICghaXNHYW1lRW5kZWQpIHB1YlN1Yi5wdWJsaXNoKCdncmlkUGlja2VkQmVmb3JlRW5kJywgW3IsIGNdKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc29sdmVBY2NlcHRlZEdyaWRQaWNrZWQoW3IsIGNdKSB7XHJcbiAgICBjb25zdCBzeW1ib2wgPSBpc0Nyb3NzVHVybiA/ICd4JyA6ICdvJztcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCd1cGRhdGVHcmlkUGlja2VkJywgW3IsIGMsIHN5bWJvbF0pO1xyXG4gIH1cclxuXHJcbiAgLy8gRXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgcHViU3ViLnN1YnNjcmliZSgncmVzdGFydEdhbWUnLCByZXNldCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ3JpZFBpY2tlZCcsIHByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dyaWRQaWNrZWRBY2NlcHRlZCcsIHJlc29sdmVBY2NlcHRlZEdyaWRQaWNrZWQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3VwZGF0ZUdyaWRQaWNrZWQnLCBjaGFuZ2VUdXJuKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdnYW1lRW5kZWQnLCBlbmRHYW1lKTtcclxufSkoKTtcclxuIiwiY29uc3QgcHViU3ViID0gKCgpID0+IHtcclxuICBjb25zdCBtYXAgPSB7fTtcclxuXHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgZnVuY3Rpb24gc3Vic2NyaWJlKGV2ZW50LCBmbikge1xyXG4gICAgaWYgKCFtYXBbZXZlbnRdKSBtYXBbZXZlbnRdID0gW107XHJcbiAgICBtYXBbZXZlbnRdLnB1c2goZm4pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHVibGlzaChldmVudCwgZGF0YSkge1xyXG4gICAgaWYgKG1hcFtldmVudF0pIHtcclxuICAgICAgbWFwW2V2ZW50XS5mb3JFYWNoKChmbikgPT4ge1xyXG4gICAgICAgIGZuKGRhdGEpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKGV2ZW50LCBmbikge1xyXG4gICAgaWYgKG1hcFtldmVudF0pIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXBbZXZlbnRdLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgaWYgKG1hcFtldmVudF1baV0gPT09IGZuKSB7XHJcbiAgICAgICAgICBtYXBbZXZlbnRdLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHsgc3Vic2NyaWJlLCBwdWJsaXNoLCB1bnN1YnNjcmliZSB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHViU3ViO1xyXG4iLCJpbXBvcnQgcHViU3ViIGZyb20gJy4vcHViU3ViJztcclxuaW1wb3J0IHhTeW1ib2wgZnJvbSAnLi9pbWcveC5wbmcnO1xyXG5pbXBvcnQgb1N5bWJvbCBmcm9tICcuL2ltZy9vLnBuZyc7XHJcblxyXG4oKCkgPT4ge1xyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIHRvZ2dsZUVsZW1lbnQoaWQpIHtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgICBmb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY2xvc2VQb3B1cChldmVudCkge1xyXG4gICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xyXG4gICAgY29uc3QgcGFyZW50ID0gdGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZTtcclxuICAgIHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgIGlmIChwYXJlbnQuaWQgPT09ICdyZXN1bHQtZm9ybScpIHsgLy8gTmVlZCB0byBjbGVhciByZXN1bHQgYWRkZWRcclxuICAgICAgY29uc3QgcmVzSW1nV3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXMtaW1nLXdyYXBwZXInKTtcclxuICAgICAgd2hpbGUgKHJlc0ltZ1dyYXBwZXIuZmlyc3RDaGlsZCkgcmVzSW1nV3JhcHBlci5yZW1vdmVDaGlsZChyZXNJbWdXcmFwcGVyLmxhc3RDaGlsZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNldCgpIHtcclxuICAgIGNvbnN0IGltZ1MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCA+IGltZycpO1xyXG4gICAgaW1nUy5mb3JFYWNoKChpbWcpID0+IHtcclxuICAgICAgaW1nLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW1nKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdXBkYXRlR3JpZChbciwgYywgc3ltYm9sXSkge1xyXG4gICAgY29uc3QgaW1nID0gc3ltYm9sID09PSAneCcgPyB4U3ltYm9sIDogb1N5bWJvbDtcclxuICAgIGNvbnN0IGltZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIGltZ05vZGUuc3JjID0gaW1nO1xyXG4gICAgY29uc3QgY2VsbE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY2VsbFtkYXRhLXI9XCIke3J9XCJdW2RhdGEtYz1cIiR7Y31cIl1gKTtcclxuICAgIGNlbGxOb2RlLmFwcGVuZENoaWxkKGltZ05vZGUpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGlzcGxheVJlc3VsdCh3aW5uZXIpIHtcclxuICAgIGNvbnN0IHJlc0ltZ1dyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzLWltZy13cmFwcGVyJyk7XHJcbiAgICBjb25zdCByZXN1bHRUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdC10ZXh0Jyk7XHJcbiAgICBpZiAod2lubmVyID09PSAnZHJhdycpIHtcclxuICAgICAgY29uc3QgaW1nTm9kZTEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgY29uc3QgaW1nTm9kZTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgaW1nTm9kZTEuc3JjID0geFN5bWJvbDtcclxuICAgICAgaW1nTm9kZTIuc3JjID0gb1N5bWJvbDtcclxuICAgICAgcmVzSW1nV3JhcHBlci5hcHBlbmRDaGlsZChpbWdOb2RlMSk7XHJcbiAgICAgIHJlc0ltZ1dyYXBwZXIuYXBwZW5kQ2hpbGQoaW1nTm9kZTIpO1xyXG4gICAgICByZXN1bHRUZXh0LnRleHRDb250ZW50ID0gJ0RSQVchJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGltZyA9IHdpbm5lciA9PT0gJ3gnID8geFN5bWJvbCA6IG9TeW1ib2w7XHJcbiAgICAgIGNvbnN0IGltZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgaW1nTm9kZS5zcmMgPSBpbWc7XHJcbiAgICAgIHJlc0ltZ1dyYXBwZXIuYXBwZW5kQ2hpbGQoaW1nTm9kZSk7XHJcbiAgICAgIHJlc3VsdFRleHQudGV4dENvbnRlbnQgPSAnV0lOTkVSISc7XHJcbiAgICB9XHJcbiAgICB0b2dnbGVFbGVtZW50KCdyZXN1bHQtZm9ybScpO1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGVib3VuY2UoZm4sIHQpIHtcclxuICAgIGxldCB0aW1lSWQ7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gZGVib3VuY2VkKC4uLmFyZ3MpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVJZCk7XHJcbiAgICAgIHRpbWVJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGZuKC4uLmFyZ3MpO1xyXG4gICAgICB9LCB0KTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzaGFrZUNlbGwoW3IsIGNdKSB7XHJcbiAgICBjb25zdCBjZWxsTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jZWxsW2RhdGEtcj1cIiR7cn1cIl1bZGF0YS1jPVwiJHtjfVwiXWApO1xyXG4gICAgY2VsbE5vZGUuY2xhc3NMaXN0LmFkZCgnc2hha2UnKTtcclxuICAgIGRlYm91bmNlKCgpID0+IHtcclxuICAgICAgY2VsbE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnc2hha2UnKTtcclxuICAgIH0sIDEwMDApKCk7XHJcbiAgfVxyXG5cclxuICAvLyBDYWNoZSBET00gYW5kIGJpbmQgZXZlbnRzXHJcbiAgY29uc3QgcmVzdGFydEdhbWVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGFydC1idG4nKTtcclxuICByZXN0YXJ0R2FtZUJ0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgcHViU3ViLnB1Ymxpc2goJ3Jlc3RhcnRHYW1lJywgbnVsbCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcGxheUFnYWluQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktYWdhaW4tYnRuJyk7XHJcbiAgcGxheUFnYWluQnRuLm9uY2xpY2sgPSAoZXZlbnQpID0+IHtcclxuICAgIHRvZ2dsZUVsZW1lbnQoJ292ZXJsYXknKTtcclxuICAgIGNsb3NlUG9wdXAoZXZlbnQpO1xyXG4gICAgcHViU3ViLnB1Ymxpc2goJ3Jlc3RhcnRHYW1lJywgbnVsbCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbW9kZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RlLWJ0bicpO1xyXG4gIG1vZGVCdG4ub25jbGljayA9ICgpID0+IHtcclxuICAgIHRvZ2dsZUVsZW1lbnQoJ292ZXJsYXknKTtcclxuICAgIHRvZ2dsZUVsZW1lbnQoJ21vZGUtZm9ybScpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGluZm9CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5mby1idG4nKTtcclxuICBpbmZvQnRuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdvdmVybGF5Jyk7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdpbmZvLWZvcm0nKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBpbmZvQ3Jvc3NCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvcm0td3JhcHBlcj5zcGFuLmljb24tY2xvc2UnKTtcclxuICBpbmZvQ3Jvc3NCdG5zLmZvckVhY2goKGJ0bikgPT4ge1xyXG4gICAgY29uc3Qgb3B0ID0gYnRuOyAvLyBDYW5ub3QgbW9kaWZ5IGZ1bmN0aW9uIHBhcmFtIGRpcmVjdGx5XHJcbiAgICBvcHQub25jbGljayA9IChldmVudCkgPT4ge1xyXG4gICAgICB0b2dnbGVFbGVtZW50KCdvdmVybGF5Jyk7XHJcbiAgICAgIGNsb3NlUG9wdXAoZXZlbnQpO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xyXG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgIGNvbnN0IG9wdCA9IGNlbGw7XHJcbiAgICBvcHQub25jbGljayA9ICgpID0+IHtcclxuICAgICAgY29uc3QgciA9IG9wdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcicpO1xyXG4gICAgICBjb25zdCBjID0gb3B0LmdldEF0dHJpYnV0ZSgnZGF0YS1jJyk7XHJcbiAgICAgIHB1YlN1Yi5wdWJsaXNoKCdncmlkUGlja2VkJywgW3IsIGNdKTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIC8vIEV2ZW50IHN1YnNjcmlwdGlvblxyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3Jlc3RhcnRHYW1lJywgcmVzZXQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3VwZGF0ZUdyaWRQaWNrZWQnLCB1cGRhdGVHcmlkKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdncmlkUGlja2VkUmVqZWN0ZWQnLCBzaGFrZUNlbGwpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dhbWVFbmRlZCcsIGRpc3BsYXlSZXN1bHQpO1xyXG59KSgpO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0ICcuL2dhbWVCb2FyZCc7XG5pbXBvcnQgJy4vbG9naWMnO1xuaW1wb3J0ICcuL3VpJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuLy8gT3B0aW9uYWwgbW9kdWxlXG5pbXBvcnQgJy4vYmFja2dyb3VuZCc7XG4iXSwibmFtZXMiOlsieEltZyIsIm9JbWciLCJib2R5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYmFja2dyb3VuZCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJnZXRBc3BlY3RSYXRpbyIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsImNyZWF0ZUltZ05vZGUiLCJpbWdTcmMiLCJjbGFzc05hbWVMaXN0IiwiaW1nTm9kZSIsInNyYyIsImZvckVhY2giLCJjbGFzc05hbWUiLCJpbnNlcnRNb3RpZiIsInIiLCJjIiwid2lkdGgiLCJ2ZXJ0aWNhbEdhcCIsImhvcml6b250YWxHYXAiLCJpIiwiaiIsIm5vZGUiLCJzdHlsZSIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsImFwcGVuZENoaWxkIiwiZGVsZXRlTW90aWYiLCJsYXN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImZpcnN0Q2hpbGQiLCJzd2FwTW90aWYiLCJub2RlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJuZXdJbWciLCJuZXdDbGFzcyIsImNvbnRhaW5zIiwib2xkQ2xhc3MiLCJwIiwicmVwbGFjZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0ZXN0IiwicHViU3ViIiwibGVuIiwiYm9hcmRNYXQiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJmaWxsIiwiZ2V0UmVzdWx0IiwibWF0Iiwicm93UmVmIiwicHVibGlzaCIsImNvbFJlZiIsImlzRnVsbCIsInBpY2tHcmlkIiwic3ltYiIsIm5ld01hdCIsInNsaWNlIiwicmVzZXQiLCJwcm9jZXNzT3JSZWplY3RHcmlkUGlja2VkIiwiZGVjaWRlSWZFbmRlZCIsInJlcyIsInVwZGF0ZUdyaWQiLCJzeW1ib2wiLCJ1cGRhdGVkTWF0cml4Iiwic3Vic2NyaWJlIiwiaXNDcm9zc1R1cm4iLCJpc0dhbWVFbmRlZCIsImNoYW5nZVR1cm4iLCJlbmRHYW1lIiwicmVzb2x2ZUFjY2VwdGVkR3JpZFBpY2tlZCIsIm1hcCIsImV2ZW50IiwiZm4iLCJwdXNoIiwiZGF0YSIsInVuc3Vic2NyaWJlIiwic3BsaWNlIiwieFN5bWJvbCIsIm9TeW1ib2wiLCJ0b2dnbGVFbGVtZW50IiwiaWQiLCJmb3JtIiwiZ2V0RWxlbWVudEJ5SWQiLCJ0b2dnbGUiLCJjbG9zZVBvcHVwIiwidGFyZ2V0IiwicGFyZW50IiwicGFyZW50Tm9kZSIsInJlbW92ZSIsInJlc0ltZ1dyYXBwZXIiLCJpbWdTIiwiaW1nIiwiY2VsbE5vZGUiLCJkaXNwbGF5UmVzdWx0Iiwid2lubmVyIiwicmVzdWx0VGV4dCIsImltZ05vZGUxIiwiaW1nTm9kZTIiLCJ0ZXh0Q29udGVudCIsImRlYm91bmNlIiwidCIsInRpbWVJZCIsImRlYm91bmNlZCIsImFyZ3MiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0Iiwic2hha2VDZWxsIiwicmVzdGFydEdhbWVCdG4iLCJvbmNsaWNrIiwicGxheUFnYWluQnRuIiwibW9kZUJ0biIsImluZm9CdG4iLCJpbmZvQ3Jvc3NCdG5zIiwiYnRuIiwib3B0IiwiY2VsbHMiLCJjZWxsIiwiZ2V0QXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==