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
  // Cache and create DOM needed for background handling
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
    // Insert r by c motifs
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
  function insertBothMotif(activeImgSrc, activeClassNameList, inactiveImgSrc, inactiveClassNameList, r, c, width) {
    insertMotif(activeImgSrc, [...activeClassNameList, 'active'], r, c, width);
    insertMotif(inactiveImgSrc, inactiveClassNameList, r, c, width);
  }
  function deleteMotif() {
    while (background.lastChild) background.removeChild(background.firstChild);
  }
  function swapMotif() {
    const activeNodes = document.querySelectorAll('.background-wrapper img.active');
    const inactiveNodes = document.querySelectorAll('.background-wrapper img:not(.active)');
    activeNodes.forEach(node => {
      node.classList.remove('active');
    });
    inactiveNodes.forEach(node => {
      node.classList.add('active');
    });
  }
  if (getAspectRatio() > 3 / 4) {
    insertBothMotif(_img_x_png__WEBPACK_IMPORTED_MODULE_1__, ['xImg', 'active'], _img_o_png__WEBPACK_IMPORTED_MODULE_2__, ['oImg'], 4, 7, '10%');
  } else {
    insertBothMotif(_img_x_png__WEBPACK_IMPORTED_MODULE_1__, ['xImg', 'active'], _img_o_png__WEBPACK_IMPORTED_MODULE_2__, ['oImg'], 10, 4, '20%');
  }
  window.addEventListener('resize', () => {
    deleteMotif();
    if (getAspectRatio() > 3 / 4) {
      insertBothMotif(_img_x_png__WEBPACK_IMPORTED_MODULE_1__, ['xImg', 'active'], _img_o_png__WEBPACK_IMPORTED_MODULE_2__, ['oImg'], 4, 7, '10%');
    } else {
      insertBothMotif(_img_x_png__WEBPACK_IMPORTED_MODULE_1__, ['xImg', 'active'], _img_o_png__WEBPACK_IMPORTED_MODULE_2__, ['oImg'], 10, 4, '20%');
    }
  });
  body.appendChild(background);
  window.good = swapMotif;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TSxDQUFDVSxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUN2QyxDQUFDLEVBQUVDLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7RUFDSCxDQUFDLENBQUM7O0VBRUY7RUFDQTRCLCtDQUFNLENBQUN3QixTQUFTLENBQUMsYUFBYSxFQUFFUCxLQUFLLENBQUM7RUFDdENqQiwrQ0FBTSxDQUFDd0IsU0FBUyxDQUFDLGtCQUFrQixFQUFFSCxVQUFVLENBQUM7RUFDaERyQiwrQ0FBTSxDQUFDd0IsU0FBUyxDQUFDLG9CQUFvQixFQUFFeUMsU0FBUyxDQUFDO0VBQ2pEakUsK0NBQU0sQ0FBQ3dCLFNBQVMsQ0FBQyxXQUFXLEVBQUU0QixhQUFhLENBQUM7QUFDOUMsQ0FBQyxFQUFFLENBQUM7Ozs7Ozs7Ozs7O0FDN0hKOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQnFCO0FBQ0o7QUFDSDtBQUNPO0FBQ3JCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2JhY2tncm91bmQuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvbG9naWMuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL3B1YlN1Yi5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvdWkuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2JhY2tncm91bmQuY3NzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vYmFja2dyb3VuZC5jc3MnO1xyXG5pbXBvcnQgeEltZyBmcm9tICcuL2ltZy94LnBuZyc7XHJcbmltcG9ydCBvSW1nIGZyb20gJy4vaW1nL28ucG5nJztcclxuXHJcbigoKSA9PiB7XHJcbiAgLy8gQ2FjaGUgYW5kIGNyZWF0ZSBET00gbmVlZGVkIGZvciBiYWNrZ3JvdW5kIGhhbmRsaW5nXHJcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuXHJcbiAgY29uc3QgYmFja2dyb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGJhY2tncm91bmQuY2xhc3NMaXN0LmFkZCgnYmFja2dyb3VuZC13cmFwcGVyJyk7XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIGdldEFzcGVjdFJhdGlvKCkge1xyXG4gICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlSW1nTm9kZShpbWdTcmMsIGNsYXNzTmFtZUxpc3QpIHtcclxuICAgIGNvbnN0IGltZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIGltZ05vZGUuc3JjID0gaW1nU3JjO1xyXG4gICAgY2xhc3NOYW1lTGlzdC5mb3JFYWNoKChjbGFzc05hbWUpID0+IHtcclxuICAgICAgaW1nTm9kZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbWdOb2RlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5zZXJ0TW90aWYoaW1nU3JjLCBjbGFzc05hbWVMaXN0LCByLCBjLCB3aWR0aCkge1xyXG4gICAgLy8gSW5zZXJ0IHIgYnkgYyBtb3RpZnNcclxuICAgIGNvbnN0IHZlcnRpY2FsR2FwID0gMTAwIC8gcjtcclxuICAgIGNvbnN0IGhvcml6b250YWxHYXAgPSAxMDAgLyBjO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByOyBpICs9IDEpIHtcclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjOyBqICs9IDEpIHtcclxuICAgICAgICBjb25zdCBub2RlID0gY3JlYXRlSW1nTm9kZShpbWdTcmMsIGNsYXNzTmFtZUxpc3QpO1xyXG4gICAgICAgIG5vZGUuc3R5bGUud2lkdGggPSB3aWR0aDtcclxuICAgICAgICBub2RlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgICBub2RlLnN0eWxlLnRvcCA9IGAke3ZlcnRpY2FsR2FwICogaX0lYDtcclxuICAgICAgICBub2RlLnN0eWxlLmxlZnQgPSBgJHtob3Jpem9udGFsR2FwICogKGogKyAoaSAlIDIgPyAwLjUgOiAwKSl9JWA7XHJcbiAgICAgICAgYmFja2dyb3VuZC5hcHBlbmRDaGlsZChub2RlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5zZXJ0Qm90aE1vdGlmKFxyXG4gICAgYWN0aXZlSW1nU3JjLFxyXG4gICAgYWN0aXZlQ2xhc3NOYW1lTGlzdCxcclxuICAgIGluYWN0aXZlSW1nU3JjLFxyXG4gICAgaW5hY3RpdmVDbGFzc05hbWVMaXN0LFxyXG4gICAgcixcclxuICAgIGMsXHJcbiAgICB3aWR0aCxcclxuICApIHtcclxuICAgIGluc2VydE1vdGlmKGFjdGl2ZUltZ1NyYywgWy4uLmFjdGl2ZUNsYXNzTmFtZUxpc3QsICdhY3RpdmUnXSwgciwgYywgd2lkdGgpO1xyXG4gICAgaW5zZXJ0TW90aWYoaW5hY3RpdmVJbWdTcmMsIGluYWN0aXZlQ2xhc3NOYW1lTGlzdCwgciwgYywgd2lkdGgpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGVsZXRlTW90aWYoKSB7XHJcbiAgICB3aGlsZSAoYmFja2dyb3VuZC5sYXN0Q2hpbGQpIGJhY2tncm91bmQucmVtb3ZlQ2hpbGQoYmFja2dyb3VuZC5maXJzdENoaWxkKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHN3YXBNb3RpZigpIHtcclxuICAgIGNvbnN0IGFjdGl2ZU5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJhY2tncm91bmQtd3JhcHBlciBpbWcuYWN0aXZlJyk7XHJcbiAgICBjb25zdCBpbmFjdGl2ZU5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJhY2tncm91bmQtd3JhcHBlciBpbWc6bm90KC5hY3RpdmUpJyk7XHJcbiAgICBhY3RpdmVOb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7IG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7IH0pO1xyXG4gICAgaW5hY3RpdmVOb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7IG5vZGUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7IH0pO1xyXG4gIH1cclxuXHJcbiAgaWYgKGdldEFzcGVjdFJhdGlvKCkgPiAzIC8gNCkge1xyXG4gICAgaW5zZXJ0Qm90aE1vdGlmKHhJbWcsIFsneEltZycsICdhY3RpdmUnXSwgb0ltZywgWydvSW1nJ10sIDQsIDcsICcxMCUnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaW5zZXJ0Qm90aE1vdGlmKHhJbWcsIFsneEltZycsICdhY3RpdmUnXSwgb0ltZywgWydvSW1nJ10sIDEwLCA0LCAnMjAlJyk7XHJcbiAgfVxyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgZGVsZXRlTW90aWYoKTtcclxuICAgIGlmIChnZXRBc3BlY3RSYXRpbygpID4gMyAvIDQpIHtcclxuICAgICAgaW5zZXJ0Qm90aE1vdGlmKHhJbWcsIFsneEltZycsICdhY3RpdmUnXSwgb0ltZywgWydvSW1nJ10sIDQsIDcsICcxMCUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGluc2VydEJvdGhNb3RpZih4SW1nLCBbJ3hJbWcnLCAnYWN0aXZlJ10sIG9JbWcsIFsnb0ltZyddLCAxMCwgNCwgJzIwJScpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBib2R5LmFwcGVuZENoaWxkKGJhY2tncm91bmQpO1xyXG4gIHdpbmRvdy5nb29kID0gc3dhcE1vdGlmO1xyXG59KSgpO1xyXG4iLCJpbXBvcnQgcHViU3ViIGZyb20gJy4vcHViU3ViJztcclxuXHJcbigoKSA9PiB7XHJcbiAgY29uc3QgbGVuID0gMztcclxuICBsZXQgYm9hcmRNYXQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBsZW4gfSwgKCkgPT4gbmV3IEFycmF5KGxlbikuZmlsbCgnLicpKTtcclxuXHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgLy8gZnVuY3Rpb24gZXhwb3NlR3JpZCgpIHsgLy8gSU1QVVJFLCBVTlRFU1RFRCwgRk9SIERFQlVHR0lOR1xyXG4gIC8vICAgbGV0IG91dHB1dFN0ciA9ICcnO1xyXG4gIC8vICAgYm9hcmRNYXQuZm9yRWFjaCgocm93KSA9PiB7XHJcbiAgLy8gICAgIG91dHB1dFN0ciA9IGAke291dHB1dFN0cn0ke0pTT04uc3RyaW5naWZ5KHJvdyl9XFxuYDtcclxuICAvLyAgIH0pO1xyXG4gIC8vICAgcmV0dXJuIGJvYXJkTWF0O1xyXG4gIC8vIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0UmVzdWx0KG1hdCkgeyAvLyBJTVBVUkUsIFBBU1NFRCBXSVRIIE1PQ0sgUFVCU1VCXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgIC8vIFJvdy13aXNlXHJcbiAgICAgIGNvbnN0IHJvd1JlZiA9IG1hdFtpXVswXTtcclxuICAgICAgaWYgKHJvd1JlZiAhPT0gJy4nKSB7XHJcbiAgICAgICAgZm9yIChsZXQgYyA9IDE7IGMgPCBsZW47IGMgKz0gMSkge1xyXG4gICAgICAgICAgaWYgKG1hdFtpXVtjXSAhPT0gcm93UmVmKSBicmVhaztcclxuICAgICAgICAgIGlmIChjID09PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd3aW5uZXJEZWNpZGVkJywgcm93UmVmKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJvd1JlZjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy8gQ29sdW1uLXdpc2VcclxuICAgICAgY29uc3QgY29sUmVmID0gbWF0WzBdW2ldO1xyXG4gICAgICBpZiAoY29sUmVmICE9PSAnLicpIHtcclxuICAgICAgICBmb3IgKGxldCByID0gMTsgciA8IGxlbjsgciArPSAxKSB7XHJcbiAgICAgICAgICBpZiAobWF0W3JdW2ldICE9PSBjb2xSZWYpIGJyZWFrO1xyXG4gICAgICAgICAgaWYgKHIgPT09IGxlbiAtIDEpIHtcclxuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3dpbm5lckRlY2lkZWQnLCBjb2xSZWYpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29sUmVmO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gRGlhZ29uYWxzXHJcbiAgICBpZiAobWF0WzBdWzBdICE9PSAnLicpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW47IGkgKz0gMSkge1xyXG4gICAgICAgIGlmIChtYXRbaV1baV0gIT09IG1hdFswXVswXSkgYnJlYWs7XHJcbiAgICAgICAgaWYgKGkgPT09IGxlbiAtIDEpIHtcclxuICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd3aW5uZXJEZWNpZGVkJywgbWF0WzBdWzBdKTtcclxuICAgICAgICAgIHJldHVybiBtYXRbMF1bMF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobWF0WzBdW2xlbiAtIDFdICE9PSAnLicpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW47IGkgKz0gMSkge1xyXG4gICAgICAgIGlmIChtYXRbaV1bbGVuIC0gMSAtIGldICE9PSBtYXRbMF1bbGVuIC0gMV0pIGJyZWFrO1xyXG4gICAgICAgIGlmIChpID09PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICBwdWJTdWIucHVibGlzaCgnd2lubmVyRGVjaWRlZCcsIG1hdFswXVtsZW4gLSAxXSk7XHJcbiAgICAgICAgICByZXR1cm4gbWF0WzBdW2xlbiAtIDFdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaXNGdWxsKG1hdCkgeyAvLyBQVVJFLCBVTlRFU1RFRFxyXG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCBsZW47IHIgKz0gMSkge1xyXG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGxlbjsgYyArPSAxKSB7XHJcbiAgICAgICAgaWYgKG1hdFtyXVtjXSA9PT0gJy4nKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcGlja0dyaWQobWF0LCByLCBjLCBzeW1iKSB7XHJcbiAgICAvLyBJTVBVUkUsIFBBU1NFRCBXSVRIIE1PQ0sgUFVCU1VCXHJcbiAgICBpZiAociA8IDAgfHwgciA+PSBsZW4gfHwgYyA8IDAgfHwgYyA+PSBsZW4pIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChtYXRbcl1bY10gIT09ICcuJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgbmV3TWF0ID0gbmV3IEFycmF5KGxlbik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgIG5ld01hdFtpXSA9IG1hdFtpXS5zbGljZSgpO1xyXG4gICAgfVxyXG4gICAgbmV3TWF0W3JdW2NdID0gc3ltYjtcclxuICAgIHJldHVybiBuZXdNYXQ7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNldCgpIHtcclxuICAgIC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGZvciAobGV0IHIgPSAwOyByIDwgbGVuOyByICs9IDEpIHtcclxuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBsZW47IGMgKz0gMSkge1xyXG4gICAgICAgIGJvYXJkTWF0W3JdW2NdID0gJy4nO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwcm9jZXNzT3JSZWplY3RHcmlkUGlja2VkKFtyLCBjXSkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBpZiAoYm9hcmRNYXRbcl1bY10gPT09ICcuJykgcHViU3ViLnB1Ymxpc2goJ2dyaWRQaWNrZWRBY2NlcHRlZCcsIFtyLCBjXSk7XHJcbiAgICBlbHNlIHB1YlN1Yi5wdWJsaXNoKCdncmlkUGlja2VkUmVqZWN0ZWQnLCBbciwgY10pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGVjaWRlSWZFbmRlZCgpIHsgLy8gSU1QVVJFLCBVTlRFU1RFRFxyXG4gICAgY29uc3QgcmVzID0gZ2V0UmVzdWx0KGJvYXJkTWF0KTtcclxuICAgIGlmIChyZXMgPT09IGZhbHNlKSB7XHJcbiAgICAgIGlmIChpc0Z1bGwoYm9hcmRNYXQpKSBwdWJTdWIucHVibGlzaCgnZ2FtZUVuZGVkJywgJ2RyYXcnKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcHViU3ViLnB1Ymxpc2goJ2dhbWVFbmRlZCcsIHJlcyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1cGRhdGVHcmlkKFtyLCBjLCBzeW1ib2xdKSB7IC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGNvbnN0IHVwZGF0ZWRNYXRyaXggPSBwaWNrR3JpZChib2FyZE1hdCwgciwgYywgc3ltYm9sKTtcclxuICAgIGJvYXJkTWF0ID0gdXBkYXRlZE1hdHJpeDtcclxuICAgIGRlY2lkZUlmRW5kZWQoKTtcclxuICB9XHJcblxyXG4gIC8vIEV2ZW50IHN1YnNjcmlwdGlvblxyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3Jlc3RhcnRHYW1lJywgcmVzZXQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dyaWRQaWNrZWRCZWZvcmVFbmQnLCBwcm9jZXNzT3JSZWplY3RHcmlkUGlja2VkKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCd1cGRhdGVHcmlkUGlja2VkJywgdXBkYXRlR3JpZCk7XHJcbn0pKCk7XHJcbiIsImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xyXG5cclxuKCgpID0+IHtcclxuICAvLyBMb2dpYyB2YXJpYWJsZVxyXG4gIGxldCBpc0Nyb3NzVHVybiA9IHRydWU7XHJcbiAgbGV0IGlzR2FtZUVuZGVkID0gZmFsc2U7XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIC8vIGZ1bmN0aW9uIGV4cG9zZUlzQ3Jvc3NUdXJuKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVELCBGT0UgREVCVUdHSU5HXHJcbiAgLy8gICByZXR1cm4gaXNDcm9zc1R1cm47XHJcbiAgLy8gfVxyXG5cclxuICBmdW5jdGlvbiBjaGFuZ2VUdXJuKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBpc0Nyb3NzVHVybiA9ICFpc0Nyb3NzVHVybjtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGVuZEdhbWUoKSB7XHJcbiAgICBpc0dhbWVFbmRlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNldCgpIHtcclxuICAgIGlzQ3Jvc3NUdXJuID0gdHJ1ZTtcclxuICAgIGlzR2FtZUVuZGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwcm9jZXNzT3JSZWplY3RHcmlkUGlja2VkKFtyLCBjXSkge1xyXG4gICAgaWYgKCFpc0dhbWVFbmRlZCkgcHViU3ViLnB1Ymxpc2goJ2dyaWRQaWNrZWRCZWZvcmVFbmQnLCBbciwgY10pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzb2x2ZUFjY2VwdGVkR3JpZFBpY2tlZChbciwgY10pIHtcclxuICAgIGNvbnN0IHN5bWJvbCA9IGlzQ3Jvc3NUdXJuID8gJ3gnIDogJ28nO1xyXG4gICAgcHViU3ViLnB1Ymxpc2goJ3VwZGF0ZUdyaWRQaWNrZWQnLCBbciwgYywgc3ltYm9sXSk7XHJcbiAgfVxyXG5cclxuICAvLyBFdmVudCBzdWJzY3JpcHRpb25cclxuICBwdWJTdWIuc3Vic2NyaWJlKCdyZXN0YXJ0R2FtZScsIHJlc2V0KTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdncmlkUGlja2VkJywgcHJvY2Vzc09yUmVqZWN0R3JpZFBpY2tlZCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ3JpZFBpY2tlZEFjY2VwdGVkJywgcmVzb2x2ZUFjY2VwdGVkR3JpZFBpY2tlZCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgndXBkYXRlR3JpZFBpY2tlZCcsIGNoYW5nZVR1cm4pO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dhbWVFbmRlZCcsIGVuZEdhbWUpO1xyXG59KSgpO1xyXG4iLCJjb25zdCBwdWJTdWIgPSAoKCkgPT4ge1xyXG4gIGNvbnN0IG1hcCA9IHt9O1xyXG5cclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICBmdW5jdGlvbiBzdWJzY3JpYmUoZXZlbnQsIGZuKSB7XHJcbiAgICBpZiAoIW1hcFtldmVudF0pIG1hcFtldmVudF0gPSBbXTtcclxuICAgIG1hcFtldmVudF0ucHVzaChmbik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwdWJsaXNoKGV2ZW50LCBkYXRhKSB7XHJcbiAgICBpZiAobWFwW2V2ZW50XSkge1xyXG4gICAgICBtYXBbZXZlbnRdLmZvckVhY2goKGZuKSA9PiB7XHJcbiAgICAgICAgZm4oZGF0YSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdW5zdWJzY3JpYmUoZXZlbnQsIGZuKSB7XHJcbiAgICBpZiAobWFwW2V2ZW50XSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcFtldmVudF0ubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICBpZiAobWFwW2V2ZW50XVtpXSA9PT0gZm4pIHtcclxuICAgICAgICAgIG1hcFtldmVudF0uc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4geyBzdWJzY3JpYmUsIHB1Ymxpc2gsIHVuc3Vic2NyaWJlIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwdWJTdWI7XHJcbiIsImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xyXG5pbXBvcnQgeFN5bWJvbCBmcm9tICcuL2ltZy94LnBuZyc7XHJcbmltcG9ydCBvU3ltYm9sIGZyb20gJy4vaW1nL28ucG5nJztcclxuXHJcbigoKSA9PiB7XHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgZnVuY3Rpb24gdG9nZ2xlRWxlbWVudChpZCkge1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuICAgIGZvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjbG9zZVBvcHVwKGV2ZW50KSB7XHJcbiAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQ7XHJcbiAgICBjb25zdCBwYXJlbnQgPSB0YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xyXG4gICAgcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgaWYgKHBhcmVudC5pZCA9PT0gJ3Jlc3VsdC1mb3JtJykgeyAvLyBOZWVkIHRvIGNsZWFyIHJlc3VsdCBhZGRlZFxyXG4gICAgICBjb25zdCByZXNJbWdXcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlcy1pbWctd3JhcHBlcicpO1xyXG4gICAgICB3aGlsZSAocmVzSW1nV3JhcHBlci5maXJzdENoaWxkKSByZXNJbWdXcmFwcGVyLnJlbW92ZUNoaWxkKHJlc0ltZ1dyYXBwZXIubGFzdENoaWxkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc2V0KCkge1xyXG4gICAgY29uc3QgaW1nUyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsID4gaW1nJyk7XHJcbiAgICBpbWdTLmZvckVhY2goKGltZykgPT4ge1xyXG4gICAgICBpbWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbWcpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1cGRhdGVHcmlkKFtyLCBjLCBzeW1ib2xdKSB7XHJcbiAgICBjb25zdCBpbWcgPSBzeW1ib2wgPT09ICd4JyA/IHhTeW1ib2wgOiBvU3ltYm9sO1xyXG4gICAgY29uc3QgaW1nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgaW1nTm9kZS5zcmMgPSBpbWc7XHJcbiAgICBjb25zdCBjZWxsTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jZWxsW2RhdGEtcj1cIiR7cn1cIl1bZGF0YS1jPVwiJHtjfVwiXWApO1xyXG4gICAgY2VsbE5vZGUuYXBwZW5kQ2hpbGQoaW1nTm9kZSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkaXNwbGF5UmVzdWx0KHdpbm5lcikge1xyXG4gICAgY29uc3QgcmVzSW1nV3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXMtaW1nLXdyYXBwZXInKTtcclxuICAgIGNvbnN0IHJlc3VsdFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0LXRleHQnKTtcclxuICAgIGlmICh3aW5uZXIgPT09ICdkcmF3Jykge1xyXG4gICAgICBjb25zdCBpbWdOb2RlMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICBjb25zdCBpbWdOb2RlMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICBpbWdOb2RlMS5zcmMgPSB4U3ltYm9sO1xyXG4gICAgICBpbWdOb2RlMi5zcmMgPSBvU3ltYm9sO1xyXG4gICAgICByZXNJbWdXcmFwcGVyLmFwcGVuZENoaWxkKGltZ05vZGUxKTtcclxuICAgICAgcmVzSW1nV3JhcHBlci5hcHBlbmRDaGlsZChpbWdOb2RlMik7XHJcbiAgICAgIHJlc3VsdFRleHQudGV4dENvbnRlbnQgPSAnRFJBVyEnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgaW1nID0gd2lubmVyID09PSAneCcgPyB4U3ltYm9sIDogb1N5bWJvbDtcclxuICAgICAgY29uc3QgaW1nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICBpbWdOb2RlLnNyYyA9IGltZztcclxuICAgICAgcmVzSW1nV3JhcHBlci5hcHBlbmRDaGlsZChpbWdOb2RlKTtcclxuICAgICAgcmVzdWx0VGV4dC50ZXh0Q29udGVudCA9ICdXSU5ORVIhJztcclxuICAgIH1cclxuICAgIHRvZ2dsZUVsZW1lbnQoJ3Jlc3VsdC1mb3JtJyk7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdvdmVybGF5Jyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkZWJvdW5jZShmbiwgdCkge1xyXG4gICAgbGV0IHRpbWVJZDtcclxuICAgIHJldHVybiBmdW5jdGlvbiBkZWJvdW5jZWQoLi4uYXJncykge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGltZUlkKTtcclxuICAgICAgdGltZUlkID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZm4oLi4uYXJncyk7XHJcbiAgICAgIH0sIHQpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNoYWtlQ2VsbChbciwgY10pIHtcclxuICAgIGNvbnN0IGNlbGxOb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNlbGxbZGF0YS1yPVwiJHtyfVwiXVtkYXRhLWM9XCIke2N9XCJdYCk7XHJcbiAgICBjZWxsTm9kZS5jbGFzc0xpc3QuYWRkKCdzaGFrZScpO1xyXG4gICAgZGVib3VuY2UoKCkgPT4ge1xyXG4gICAgICBjZWxsTm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdzaGFrZScpO1xyXG4gICAgfSwgMTAwMCkoKTtcclxuICB9XHJcblxyXG4gIC8vIENhY2hlIERPTSBhbmQgYmluZCBldmVudHNcclxuICBjb25zdCByZXN0YXJ0R2FtZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXJ0LWJ0bicpO1xyXG4gIHJlc3RhcnRHYW1lQnRuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICBwdWJTdWIucHVibGlzaCgncmVzdGFydEdhbWUnLCBudWxsKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBwbGF5QWdhaW5CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheS1hZ2Fpbi1idG4nKTtcclxuICBwbGF5QWdhaW5CdG4ub25jbGljayA9IChldmVudCkgPT4ge1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gICAgY2xvc2VQb3B1cChldmVudCk7XHJcbiAgICBwdWJTdWIucHVibGlzaCgncmVzdGFydEdhbWUnLCBudWxsKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBtb2RlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGUtYnRuJyk7XHJcbiAgbW9kZUJ0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnbW9kZS1mb3JtJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaW5mb0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmZvLWJ0bicpO1xyXG4gIGluZm9CdG4ub25jbGljayA9ICgpID0+IHtcclxuICAgIHRvZ2dsZUVsZW1lbnQoJ292ZXJsYXknKTtcclxuICAgIHRvZ2dsZUVsZW1lbnQoJ2luZm8tZm9ybScpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGluZm9Dcm9zc0J0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9ybS13cmFwcGVyPnNwYW4uaWNvbi1jbG9zZScpO1xyXG4gIGluZm9Dcm9zc0J0bnMuZm9yRWFjaCgoYnRuKSA9PiB7XHJcbiAgICBjb25zdCBvcHQgPSBidG47IC8vIENhbm5vdCBtb2RpZnkgZnVuY3Rpb24gcGFyYW0gZGlyZWN0bHlcclxuICAgIG9wdC5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRvZ2dsZUVsZW1lbnQoJ292ZXJsYXknKTtcclxuICAgICAgY2xvc2VQb3B1cChldmVudCk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XHJcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgY29uc3Qgb3B0ID0gY2VsbDtcclxuICAgIG9wdC5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCByID0gb3B0LmdldEF0dHJpYnV0ZSgnZGF0YS1yJyk7XHJcbiAgICAgIGNvbnN0IGMgPSBvcHQuZ2V0QXR0cmlidXRlKCdkYXRhLWMnKTtcclxuICAgICAgcHViU3ViLnB1Ymxpc2goJ2dyaWRQaWNrZWQnLCBbciwgY10pO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgLy8gRXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgcHViU3ViLnN1YnNjcmliZSgncmVzdGFydEdhbWUnLCByZXNldCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgndXBkYXRlR3JpZFBpY2tlZCcsIHVwZGF0ZUdyaWQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dyaWRQaWNrZWRSZWplY3RlZCcsIHNoYWtlQ2VsbCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ2FtZUVuZGVkJywgZGlzcGxheVJlc3VsdCk7XHJcbn0pKCk7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgJy4vZ2FtZUJvYXJkJztcbmltcG9ydCAnLi9sb2dpYyc7XG5pbXBvcnQgJy4vdWknO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG4vLyBPcHRpb25hbCBtb2R1bGVcbmltcG9ydCAnLi9iYWNrZ3JvdW5kJztcbiJdLCJuYW1lcyI6WyJ4SW1nIiwib0ltZyIsImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJiYWNrZ3JvdW5kIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImdldEFzcGVjdFJhdGlvIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiY3JlYXRlSW1nTm9kZSIsImltZ1NyYyIsImNsYXNzTmFtZUxpc3QiLCJpbWdOb2RlIiwic3JjIiwiZm9yRWFjaCIsImNsYXNzTmFtZSIsImluc2VydE1vdGlmIiwiciIsImMiLCJ3aWR0aCIsInZlcnRpY2FsR2FwIiwiaG9yaXpvbnRhbEdhcCIsImkiLCJqIiwibm9kZSIsInN0eWxlIiwicG9zaXRpb24iLCJ0b3AiLCJsZWZ0IiwiYXBwZW5kQ2hpbGQiLCJpbnNlcnRCb3RoTW90aWYiLCJhY3RpdmVJbWdTcmMiLCJhY3RpdmVDbGFzc05hbWVMaXN0IiwiaW5hY3RpdmVJbWdTcmMiLCJpbmFjdGl2ZUNsYXNzTmFtZUxpc3QiLCJkZWxldGVNb3RpZiIsImxhc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiZmlyc3RDaGlsZCIsInN3YXBNb3RpZiIsImFjdGl2ZU5vZGVzIiwicXVlcnlTZWxlY3RvckFsbCIsImluYWN0aXZlTm9kZXMiLCJyZW1vdmUiLCJhZGRFdmVudExpc3RlbmVyIiwiZ29vZCIsInB1YlN1YiIsImxlbiIsImJvYXJkTWF0IiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiZmlsbCIsImdldFJlc3VsdCIsIm1hdCIsInJvd1JlZiIsInB1Ymxpc2giLCJjb2xSZWYiLCJpc0Z1bGwiLCJwaWNrR3JpZCIsInN5bWIiLCJuZXdNYXQiLCJzbGljZSIsInJlc2V0IiwicHJvY2Vzc09yUmVqZWN0R3JpZFBpY2tlZCIsImRlY2lkZUlmRW5kZWQiLCJyZXMiLCJ1cGRhdGVHcmlkIiwic3ltYm9sIiwidXBkYXRlZE1hdHJpeCIsInN1YnNjcmliZSIsImlzQ3Jvc3NUdXJuIiwiaXNHYW1lRW5kZWQiLCJjaGFuZ2VUdXJuIiwiZW5kR2FtZSIsInJlc29sdmVBY2NlcHRlZEdyaWRQaWNrZWQiLCJtYXAiLCJldmVudCIsImZuIiwicHVzaCIsImRhdGEiLCJ1bnN1YnNjcmliZSIsInNwbGljZSIsInhTeW1ib2wiLCJvU3ltYm9sIiwidG9nZ2xlRWxlbWVudCIsImlkIiwiZm9ybSIsImdldEVsZW1lbnRCeUlkIiwidG9nZ2xlIiwiY2xvc2VQb3B1cCIsInRhcmdldCIsInBhcmVudCIsInBhcmVudE5vZGUiLCJyZXNJbWdXcmFwcGVyIiwiaW1nUyIsImltZyIsImNlbGxOb2RlIiwiZGlzcGxheVJlc3VsdCIsIndpbm5lciIsInJlc3VsdFRleHQiLCJpbWdOb2RlMSIsImltZ05vZGUyIiwidGV4dENvbnRlbnQiLCJkZWJvdW5jZSIsInQiLCJ0aW1lSWQiLCJkZWJvdW5jZWQiLCJhcmdzIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInNoYWtlQ2VsbCIsInJlc3RhcnRHYW1lQnRuIiwib25jbGljayIsInBsYXlBZ2FpbkJ0biIsIm1vZGVCdG4iLCJpbmZvQnRuIiwiaW5mb0Nyb3NzQnRucyIsImJ0biIsIm9wdCIsImNlbGxzIiwiY2VsbCIsImdldEF0dHJpYnV0ZSJdLCJzb3VyY2VSb290IjoiIn0=