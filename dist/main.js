/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubSub */ "./src/pubSub.js");
/* harmony import */ var _background_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./background.css */ "./src/background.css");
/* harmony import */ var _img_x_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/x.png */ "./src/img/x.png");
/* harmony import */ var _img_o_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./img/o.png */ "./src/img/o.png");




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
    insertBothMotif(_img_x_png__WEBPACK_IMPORTED_MODULE_2__, ['xImg', 'active'], _img_o_png__WEBPACK_IMPORTED_MODULE_3__, ['oImg'], 4, 7, '10%');
  } else {
    insertBothMotif(_img_x_png__WEBPACK_IMPORTED_MODULE_2__, ['xImg', 'active'], _img_o_png__WEBPACK_IMPORTED_MODULE_3__, ['oImg'], 10, 4, '20%');
  }
  window.addEventListener('resize', () => {
    // Need to get which motif is currently active first
    const xIsActive = document.querySelector('.background-wrapper img.xImg').classList.contains('active');
    deleteMotif();
    if (getAspectRatio() > 3 / 4) {
      if (xIsActive) {
        insertBothMotif(_img_x_png__WEBPACK_IMPORTED_MODULE_2__, ['xImg', 'active'], _img_o_png__WEBPACK_IMPORTED_MODULE_3__, ['oImg'], 4, 7, '10%');
      } else {
        insertBothMotif(_img_o_png__WEBPACK_IMPORTED_MODULE_3__, ['oImg', 'active'], _img_x_png__WEBPACK_IMPORTED_MODULE_2__, ['xImg'], 4, 7, '10%');
      }
    } else if (xIsActive) {
      insertBothMotif(_img_x_png__WEBPACK_IMPORTED_MODULE_2__, ['xImg', 'active'], _img_o_png__WEBPACK_IMPORTED_MODULE_3__, ['oImg'], 10, 4, '20%');
    } else {
      insertBothMotif(_img_o_png__WEBPACK_IMPORTED_MODULE_3__, ['oImg', 'active'], _img_x_png__WEBPACK_IMPORTED_MODULE_2__, ['xImg'], 10, 4, '20%');
    }
  });
  body.appendChild(background);
  window.good = swapMotif;
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('turnChanged', swapMotif);
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
    _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('turnChanged', null);
  }
  function endGame() {
    isGameEnded = true;
  }
  function reset() {
    isCrossTurn = true;
    isGameEnded = false;
    _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('turnChanged', null);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRW1ELGFBQWEsQ0FBQztBQUM5QyxDQUFDLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7QUM3SEo7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCcUI7QUFDSjtBQUNIO0FBQ087QUFDckIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9sb2dpYy5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvcHViU3ViLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy91aS5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvYmFja2dyb3VuZC5jc3MiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xyXG5pbXBvcnQgJy4vYmFja2dyb3VuZC5jc3MnO1xyXG5pbXBvcnQgeEltZyBmcm9tICcuL2ltZy94LnBuZyc7XHJcbmltcG9ydCBvSW1nIGZyb20gJy4vaW1nL28ucG5nJztcclxuXHJcbigoKSA9PiB7XHJcbiAgLy8gQ2FjaGUgYW5kIGNyZWF0ZSBET00gbmVlZGVkIGZvciBiYWNrZ3JvdW5kIGhhbmRsaW5nXHJcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuXHJcbiAgY29uc3QgYmFja2dyb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGJhY2tncm91bmQuY2xhc3NMaXN0LmFkZCgnYmFja2dyb3VuZC13cmFwcGVyJyk7XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIGdldEFzcGVjdFJhdGlvKCkge1xyXG4gICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlSW1nTm9kZShpbWdTcmMsIGNsYXNzTmFtZUxpc3QpIHtcclxuICAgIGNvbnN0IGltZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIGltZ05vZGUuc3JjID0gaW1nU3JjO1xyXG4gICAgY2xhc3NOYW1lTGlzdC5mb3JFYWNoKChjbGFzc05hbWUpID0+IHtcclxuICAgICAgaW1nTm9kZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbWdOb2RlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5zZXJ0TW90aWYoaW1nU3JjLCBjbGFzc05hbWVMaXN0LCByLCBjLCB3aWR0aCkge1xyXG4gICAgLy8gSW5zZXJ0IHIgYnkgYyBtb3RpZnNcclxuICAgIGNvbnN0IHZlcnRpY2FsR2FwID0gMTAwIC8gcjtcclxuICAgIGNvbnN0IGhvcml6b250YWxHYXAgPSAxMDAgLyBjO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByOyBpICs9IDEpIHtcclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjOyBqICs9IDEpIHtcclxuICAgICAgICBjb25zdCBub2RlID0gY3JlYXRlSW1nTm9kZShpbWdTcmMsIGNsYXNzTmFtZUxpc3QpO1xyXG4gICAgICAgIG5vZGUuc3R5bGUud2lkdGggPSB3aWR0aDtcclxuICAgICAgICBub2RlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgICBub2RlLnN0eWxlLnRvcCA9IGAke3ZlcnRpY2FsR2FwICogaX0lYDtcclxuICAgICAgICBub2RlLnN0eWxlLmxlZnQgPSBgJHtob3Jpem9udGFsR2FwICogKGogKyAoaSAlIDIgPyAwLjUgOiAwKSl9JWA7XHJcbiAgICAgICAgYmFja2dyb3VuZC5hcHBlbmRDaGlsZChub2RlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5zZXJ0Qm90aE1vdGlmKFxyXG4gICAgYWN0aXZlSW1nU3JjLFxyXG4gICAgYWN0aXZlQ2xhc3NOYW1lTGlzdCxcclxuICAgIGluYWN0aXZlSW1nU3JjLFxyXG4gICAgaW5hY3RpdmVDbGFzc05hbWVMaXN0LFxyXG4gICAgcixcclxuICAgIGMsXHJcbiAgICB3aWR0aCxcclxuICApIHtcclxuICAgIGluc2VydE1vdGlmKGFjdGl2ZUltZ1NyYywgWy4uLmFjdGl2ZUNsYXNzTmFtZUxpc3QsICdhY3RpdmUnXSwgciwgYywgd2lkdGgpO1xyXG4gICAgaW5zZXJ0TW90aWYoaW5hY3RpdmVJbWdTcmMsIGluYWN0aXZlQ2xhc3NOYW1lTGlzdCwgciwgYywgd2lkdGgpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGVsZXRlTW90aWYoKSB7XHJcbiAgICB3aGlsZSAoYmFja2dyb3VuZC5sYXN0Q2hpbGQpIGJhY2tncm91bmQucmVtb3ZlQ2hpbGQoYmFja2dyb3VuZC5maXJzdENoaWxkKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHN3YXBNb3RpZigpIHtcclxuICAgIGNvbnN0IGFjdGl2ZU5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJhY2tncm91bmQtd3JhcHBlciBpbWcuYWN0aXZlJyk7XHJcbiAgICBjb25zdCBpbmFjdGl2ZU5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJhY2tncm91bmQtd3JhcHBlciBpbWc6bm90KC5hY3RpdmUpJyk7XHJcbiAgICBhY3RpdmVOb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7IG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7IH0pO1xyXG4gICAgaW5hY3RpdmVOb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7IG5vZGUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7IH0pO1xyXG4gIH1cclxuXHJcbiAgaWYgKGdldEFzcGVjdFJhdGlvKCkgPiAzIC8gNCkge1xyXG4gICAgaW5zZXJ0Qm90aE1vdGlmKHhJbWcsIFsneEltZycsICdhY3RpdmUnXSwgb0ltZywgWydvSW1nJ10sIDQsIDcsICcxMCUnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaW5zZXJ0Qm90aE1vdGlmKHhJbWcsIFsneEltZycsICdhY3RpdmUnXSwgb0ltZywgWydvSW1nJ10sIDEwLCA0LCAnMjAlJyk7XHJcbiAgfVxyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgLy8gTmVlZCB0byBnZXQgd2hpY2ggbW90aWYgaXMgY3VycmVudGx5IGFjdGl2ZSBmaXJzdFxyXG4gICAgY29uc3QgeElzQWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2tncm91bmQtd3JhcHBlciBpbWcueEltZycpLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJyk7XHJcbiAgICBkZWxldGVNb3RpZigpO1xyXG4gICAgaWYgKGdldEFzcGVjdFJhdGlvKCkgPiAzIC8gNCkge1xyXG4gICAgICBpZiAoeElzQWN0aXZlKSB7XHJcbiAgICAgICAgaW5zZXJ0Qm90aE1vdGlmKHhJbWcsIFsneEltZycsICdhY3RpdmUnXSwgb0ltZywgWydvSW1nJ10sIDQsIDcsICcxMCUnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpbnNlcnRCb3RoTW90aWYob0ltZywgWydvSW1nJywgJ2FjdGl2ZSddLCB4SW1nLCBbJ3hJbWcnXSwgNCwgNywgJzEwJScpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHhJc0FjdGl2ZSkge1xyXG4gICAgICBpbnNlcnRCb3RoTW90aWYoeEltZywgWyd4SW1nJywgJ2FjdGl2ZSddLCBvSW1nLCBbJ29JbWcnXSwgMTAsIDQsICcyMCUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGluc2VydEJvdGhNb3RpZihvSW1nLCBbJ29JbWcnLCAnYWN0aXZlJ10sIHhJbWcsIFsneEltZyddLCAxMCwgNCwgJzIwJScpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBib2R5LmFwcGVuZENoaWxkKGJhY2tncm91bmQpO1xyXG4gIHdpbmRvdy5nb29kID0gc3dhcE1vdGlmO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3R1cm5DaGFuZ2VkJywgc3dhcE1vdGlmKTtcclxufSkoKTtcclxuIiwiaW1wb3J0IHB1YlN1YiBmcm9tICcuL3B1YlN1Yic7XHJcblxyXG4oKCkgPT4ge1xyXG4gIGNvbnN0IGxlbiA9IDM7XHJcbiAgbGV0IGJvYXJkTWF0ID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogbGVuIH0sICgpID0+IG5ldyBBcnJheShsZW4pLmZpbGwoJy4nKSk7XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIC8vIGZ1bmN0aW9uIGV4cG9zZUdyaWQoKSB7IC8vIElNUFVSRSwgVU5URVNURUQsIEZPUiBERUJVR0dJTkdcclxuICAvLyAgIGxldCBvdXRwdXRTdHIgPSAnJztcclxuICAvLyAgIGJvYXJkTWF0LmZvckVhY2goKHJvdykgPT4ge1xyXG4gIC8vICAgICBvdXRwdXRTdHIgPSBgJHtvdXRwdXRTdHJ9JHtKU09OLnN0cmluZ2lmeShyb3cpfVxcbmA7XHJcbiAgLy8gICB9KTtcclxuICAvLyAgIHJldHVybiBib2FyZE1hdDtcclxuICAvLyB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldFJlc3VsdChtYXQpIHsgLy8gSU1QVVJFLCBQQVNTRUQgV0lUSCBNT0NLIFBVQlNVQlxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xyXG4gICAgICAvLyBSb3ctd2lzZVxyXG4gICAgICBjb25zdCByb3dSZWYgPSBtYXRbaV1bMF07XHJcbiAgICAgIGlmIChyb3dSZWYgIT09ICcuJykge1xyXG4gICAgICAgIGZvciAobGV0IGMgPSAxOyBjIDwgbGVuOyBjICs9IDEpIHtcclxuICAgICAgICAgIGlmIChtYXRbaV1bY10gIT09IHJvd1JlZikgYnJlYWs7XHJcbiAgICAgICAgICBpZiAoYyA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnd2lubmVyRGVjaWRlZCcsIHJvd1JlZik7XHJcbiAgICAgICAgICAgIHJldHVybiByb3dSZWY7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIENvbHVtbi13aXNlXHJcbiAgICAgIGNvbnN0IGNvbFJlZiA9IG1hdFswXVtpXTtcclxuICAgICAgaWYgKGNvbFJlZiAhPT0gJy4nKSB7XHJcbiAgICAgICAgZm9yIChsZXQgciA9IDE7IHIgPCBsZW47IHIgKz0gMSkge1xyXG4gICAgICAgICAgaWYgKG1hdFtyXVtpXSAhPT0gY29sUmVmKSBicmVhaztcclxuICAgICAgICAgIGlmIChyID09PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd3aW5uZXJEZWNpZGVkJywgY29sUmVmKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbFJlZjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIERpYWdvbmFsc1xyXG4gICAgaWYgKG1hdFswXVswXSAhPT0gJy4nKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgICBpZiAobWF0W2ldW2ldICE9PSBtYXRbMF1bMF0pIGJyZWFrO1xyXG4gICAgICAgIGlmIChpID09PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICBwdWJTdWIucHVibGlzaCgnd2lubmVyRGVjaWRlZCcsIG1hdFswXVswXSk7XHJcbiAgICAgICAgICByZXR1cm4gbWF0WzBdWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG1hdFswXVtsZW4gLSAxXSAhPT0gJy4nKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgICBpZiAobWF0W2ldW2xlbiAtIDEgLSBpXSAhPT0gbWF0WzBdW2xlbiAtIDFdKSBicmVhaztcclxuICAgICAgICBpZiAoaSA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3dpbm5lckRlY2lkZWQnLCBtYXRbMF1bbGVuIC0gMV0pO1xyXG4gICAgICAgICAgcmV0dXJuIG1hdFswXVtsZW4gLSAxXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzRnVsbChtYXQpIHsgLy8gUFVSRSwgVU5URVNURURcclxuICAgIGZvciAobGV0IHIgPSAwOyByIDwgbGVuOyByICs9IDEpIHtcclxuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBsZW47IGMgKz0gMSkge1xyXG4gICAgICAgIGlmIChtYXRbcl1bY10gPT09ICcuJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHBpY2tHcmlkKG1hdCwgciwgYywgc3ltYikge1xyXG4gICAgLy8gSU1QVVJFLCBQQVNTRUQgV0lUSCBNT0NLIFBVQlNVQlxyXG4gICAgaWYgKHIgPCAwIHx8IHIgPj0gbGVuIHx8IGMgPCAwIHx8IGMgPj0gbGVuKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAobWF0W3JdW2NdICE9PSAnLicpIHJldHVybiBmYWxzZTtcclxuICAgIGNvbnN0IG5ld01hdCA9IG5ldyBBcnJheShsZW4pO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xyXG4gICAgICBuZXdNYXRbaV0gPSBtYXRbaV0uc2xpY2UoKTtcclxuICAgIH1cclxuICAgIG5ld01hdFtyXVtjXSA9IHN5bWI7XHJcbiAgICByZXR1cm4gbmV3TWF0O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzZXQoKSB7XHJcbiAgICAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBmb3IgKGxldCByID0gMDsgciA8IGxlbjsgciArPSAxKSB7XHJcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgbGVuOyBjICs9IDEpIHtcclxuICAgICAgICBib2FyZE1hdFtyXVtjXSA9ICcuJztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHJvY2Vzc09yUmVqZWN0R3JpZFBpY2tlZChbciwgY10pIHsgLy8gSU1QVVJFLCBVTlRFU1RFRFxyXG4gICAgaWYgKGJvYXJkTWF0W3JdW2NdID09PSAnLicpIHB1YlN1Yi5wdWJsaXNoKCdncmlkUGlja2VkQWNjZXB0ZWQnLCBbciwgY10pO1xyXG4gICAgZWxzZSBwdWJTdWIucHVibGlzaCgnZ3JpZFBpY2tlZFJlamVjdGVkJywgW3IsIGNdKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRlY2lkZUlmRW5kZWQoKSB7IC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGNvbnN0IHJlcyA9IGdldFJlc3VsdChib2FyZE1hdCk7XHJcbiAgICBpZiAocmVzID09PSBmYWxzZSkge1xyXG4gICAgICBpZiAoaXNGdWxsKGJvYXJkTWF0KSkgcHViU3ViLnB1Ymxpc2goJ2dhbWVFbmRlZCcsICdkcmF3Jyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdnYW1lRW5kZWQnLCByZXMpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdXBkYXRlR3JpZChbciwgYywgc3ltYm9sXSkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBjb25zdCB1cGRhdGVkTWF0cml4ID0gcGlja0dyaWQoYm9hcmRNYXQsIHIsIGMsIHN5bWJvbCk7XHJcbiAgICBib2FyZE1hdCA9IHVwZGF0ZWRNYXRyaXg7XHJcbiAgICBkZWNpZGVJZkVuZGVkKCk7XHJcbiAgfVxyXG5cclxuICAvLyBFdmVudCBzdWJzY3JpcHRpb25cclxuICBwdWJTdWIuc3Vic2NyaWJlKCdyZXN0YXJ0R2FtZScsIHJlc2V0KTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdncmlkUGlja2VkQmVmb3JlRW5kJywgcHJvY2Vzc09yUmVqZWN0R3JpZFBpY2tlZCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgndXBkYXRlR3JpZFBpY2tlZCcsIHVwZGF0ZUdyaWQpO1xyXG59KSgpO1xyXG4iLCJpbXBvcnQgcHViU3ViIGZyb20gJy4vcHViU3ViJztcclxuXHJcbigoKSA9PiB7XHJcbiAgLy8gTG9naWMgdmFyaWFibGVcclxuICBsZXQgaXNDcm9zc1R1cm4gPSB0cnVlO1xyXG4gIGxldCBpc0dhbWVFbmRlZCA9IGZhbHNlO1xyXG5cclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICAvLyBmdW5jdGlvbiBleHBvc2VJc0Nyb3NzVHVybigpIHsgLy8gSU1QVVJFLCBVTlRFU1RFRCwgRk9FIERFQlVHR0lOR1xyXG4gIC8vICAgcmV0dXJuIGlzQ3Jvc3NUdXJuO1xyXG4gIC8vIH1cclxuXHJcbiAgZnVuY3Rpb24gY2hhbmdlVHVybigpIHsgLy8gSU1QVVJFLCBVTlRFU1RFRFxyXG4gICAgaXNDcm9zc1R1cm4gPSAhaXNDcm9zc1R1cm47XHJcbiAgICBwdWJTdWIucHVibGlzaCgndHVybkNoYW5nZWQnLCBudWxsKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGVuZEdhbWUoKSB7XHJcbiAgICBpc0dhbWVFbmRlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNldCgpIHtcclxuICAgIGlzQ3Jvc3NUdXJuID0gdHJ1ZTtcclxuICAgIGlzR2FtZUVuZGVkID0gZmFsc2U7XHJcbiAgICBwdWJTdWIucHVibGlzaCgndHVybkNoYW5nZWQnLCBudWxsKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQoW3IsIGNdKSB7XHJcbiAgICBpZiAoIWlzR2FtZUVuZGVkKSBwdWJTdWIucHVibGlzaCgnZ3JpZFBpY2tlZEJlZm9yZUVuZCcsIFtyLCBjXSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNvbHZlQWNjZXB0ZWRHcmlkUGlja2VkKFtyLCBjXSkge1xyXG4gICAgY29uc3Qgc3ltYm9sID0gaXNDcm9zc1R1cm4gPyAneCcgOiAnbyc7XHJcbiAgICBwdWJTdWIucHVibGlzaCgndXBkYXRlR3JpZFBpY2tlZCcsIFtyLCBjLCBzeW1ib2xdKTtcclxuICB9XHJcblxyXG4gIC8vIEV2ZW50IHN1YnNjcmlwdGlvblxyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3Jlc3RhcnRHYW1lJywgcmVzZXQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dyaWRQaWNrZWQnLCBwcm9jZXNzT3JSZWplY3RHcmlkUGlja2VkKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdncmlkUGlja2VkQWNjZXB0ZWQnLCByZXNvbHZlQWNjZXB0ZWRHcmlkUGlja2VkKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCd1cGRhdGVHcmlkUGlja2VkJywgY2hhbmdlVHVybik7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ2FtZUVuZGVkJywgZW5kR2FtZSk7XHJcbn0pKCk7XHJcbiIsImNvbnN0IHB1YlN1YiA9ICgoKSA9PiB7XHJcbiAgY29uc3QgbWFwID0ge307XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShldmVudCwgZm4pIHtcclxuICAgIGlmICghbWFwW2V2ZW50XSkgbWFwW2V2ZW50XSA9IFtdO1xyXG4gICAgbWFwW2V2ZW50XS5wdXNoKGZuKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHB1Ymxpc2goZXZlbnQsIGRhdGEpIHtcclxuICAgIGlmIChtYXBbZXZlbnRdKSB7XHJcbiAgICAgIG1hcFtldmVudF0uZm9yRWFjaCgoZm4pID0+IHtcclxuICAgICAgICBmbihkYXRhKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1bnN1YnNjcmliZShldmVudCwgZm4pIHtcclxuICAgIGlmIChtYXBbZXZlbnRdKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFwW2V2ZW50XS5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIGlmIChtYXBbZXZlbnRdW2ldID09PSBmbikge1xyXG4gICAgICAgICAgbWFwW2V2ZW50XS5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7IHN1YnNjcmliZSwgcHVibGlzaCwgdW5zdWJzY3JpYmUgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHB1YlN1YjtcclxuIiwiaW1wb3J0IHB1YlN1YiBmcm9tICcuL3B1YlN1Yic7XHJcbmltcG9ydCB4U3ltYm9sIGZyb20gJy4vaW1nL3gucG5nJztcclxuaW1wb3J0IG9TeW1ib2wgZnJvbSAnLi9pbWcvby5wbmcnO1xyXG5cclxuKCgpID0+IHtcclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICBmdW5jdGlvbiB0b2dnbGVFbGVtZW50KGlkKSB7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgZm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNsb3NlUG9wdXAoZXZlbnQpIHtcclxuICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudDtcclxuICAgIGNvbnN0IHBhcmVudCA9IHRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XHJcbiAgICBwYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICBpZiAocGFyZW50LmlkID09PSAncmVzdWx0LWZvcm0nKSB7IC8vIE5lZWQgdG8gY2xlYXIgcmVzdWx0IGFkZGVkXHJcbiAgICAgIGNvbnN0IHJlc0ltZ1dyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzLWltZy13cmFwcGVyJyk7XHJcbiAgICAgIHdoaWxlIChyZXNJbWdXcmFwcGVyLmZpcnN0Q2hpbGQpIHJlc0ltZ1dyYXBwZXIucmVtb3ZlQ2hpbGQocmVzSW1nV3JhcHBlci5sYXN0Q2hpbGQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzZXQoKSB7XHJcbiAgICBjb25zdCBpbWdTID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwgPiBpbWcnKTtcclxuICAgIGltZ1MuZm9yRWFjaCgoaW1nKSA9PiB7XHJcbiAgICAgIGltZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGltZyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVwZGF0ZUdyaWQoW3IsIGMsIHN5bWJvbF0pIHtcclxuICAgIGNvbnN0IGltZyA9IHN5bWJvbCA9PT0gJ3gnID8geFN5bWJvbCA6IG9TeW1ib2w7XHJcbiAgICBjb25zdCBpbWdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICBpbWdOb2RlLnNyYyA9IGltZztcclxuICAgIGNvbnN0IGNlbGxOb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNlbGxbZGF0YS1yPVwiJHtyfVwiXVtkYXRhLWM9XCIke2N9XCJdYCk7XHJcbiAgICBjZWxsTm9kZS5hcHBlbmRDaGlsZChpbWdOb2RlKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRpc3BsYXlSZXN1bHQod2lubmVyKSB7XHJcbiAgICBjb25zdCByZXNJbWdXcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlcy1pbWctd3JhcHBlcicpO1xyXG4gICAgY29uc3QgcmVzdWx0VGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQtdGV4dCcpO1xyXG4gICAgaWYgKHdpbm5lciA9PT0gJ2RyYXcnKSB7XHJcbiAgICAgIGNvbnN0IGltZ05vZGUxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgIGNvbnN0IGltZ05vZGUyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgIGltZ05vZGUxLnNyYyA9IHhTeW1ib2w7XHJcbiAgICAgIGltZ05vZGUyLnNyYyA9IG9TeW1ib2w7XHJcbiAgICAgIHJlc0ltZ1dyYXBwZXIuYXBwZW5kQ2hpbGQoaW1nTm9kZTEpO1xyXG4gICAgICByZXNJbWdXcmFwcGVyLmFwcGVuZENoaWxkKGltZ05vZGUyKTtcclxuICAgICAgcmVzdWx0VGV4dC50ZXh0Q29udGVudCA9ICdEUkFXISc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBpbWcgPSB3aW5uZXIgPT09ICd4JyA/IHhTeW1ib2wgOiBvU3ltYm9sO1xyXG4gICAgICBjb25zdCBpbWdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgIGltZ05vZGUuc3JjID0gaW1nO1xyXG4gICAgICByZXNJbWdXcmFwcGVyLmFwcGVuZENoaWxkKGltZ05vZGUpO1xyXG4gICAgICByZXN1bHRUZXh0LnRleHRDb250ZW50ID0gJ1dJTk5FUiEnO1xyXG4gICAgfVxyXG4gICAgdG9nZ2xlRWxlbWVudCgncmVzdWx0LWZvcm0nKTtcclxuICAgIHRvZ2dsZUVsZW1lbnQoJ292ZXJsYXknKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRlYm91bmNlKGZuLCB0KSB7XHJcbiAgICBsZXQgdGltZUlkO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGRlYm91bmNlZCguLi5hcmdzKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lSWQpO1xyXG4gICAgICB0aW1lSWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBmbiguLi5hcmdzKTtcclxuICAgICAgfSwgdCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2hha2VDZWxsKFtyLCBjXSkge1xyXG4gICAgY29uc3QgY2VsbE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY2VsbFtkYXRhLXI9XCIke3J9XCJdW2RhdGEtYz1cIiR7Y31cIl1gKTtcclxuICAgIGNlbGxOb2RlLmNsYXNzTGlzdC5hZGQoJ3NoYWtlJyk7XHJcbiAgICBkZWJvdW5jZSgoKSA9PiB7XHJcbiAgICAgIGNlbGxOb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3NoYWtlJyk7XHJcbiAgICB9LCAxMDAwKSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2FjaGUgRE9NIGFuZCBiaW5kIGV2ZW50c1xyXG4gIGNvbnN0IHJlc3RhcnRHYW1lQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhcnQtYnRuJyk7XHJcbiAgcmVzdGFydEdhbWVCdG4ub25jbGljayA9ICgpID0+IHtcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdyZXN0YXJ0R2FtZScsIG51bGwpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHBsYXlBZ2FpbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWFnYWluLWJ0bicpO1xyXG4gIHBsYXlBZ2FpbkJ0bi5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdvdmVybGF5Jyk7XHJcbiAgICBjbG9zZVBvcHVwKGV2ZW50KTtcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdyZXN0YXJ0R2FtZScsIG51bGwpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG1vZGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kZS1idG4nKTtcclxuICBtb2RlQnRuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdvdmVybGF5Jyk7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdtb2RlLWZvcm0nKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBpbmZvQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZm8tYnRuJyk7XHJcbiAgaW5mb0J0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnaW5mby1mb3JtJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaW5mb0Nyb3NzQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtLXdyYXBwZXI+c3Bhbi5pY29uLWNsb3NlJyk7XHJcbiAgaW5mb0Nyb3NzQnRucy5mb3JFYWNoKChidG4pID0+IHtcclxuICAgIGNvbnN0IG9wdCA9IGJ0bjsgLy8gQ2Fubm90IG1vZGlmeSBmdW5jdGlvbiBwYXJhbSBkaXJlY3RseVxyXG4gICAgb3B0Lm9uY2xpY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gICAgICBjbG9zZVBvcHVwKGV2ZW50KTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcclxuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICBjb25zdCBvcHQgPSBjZWxsO1xyXG4gICAgb3B0Lm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHIgPSBvcHQuZ2V0QXR0cmlidXRlKCdkYXRhLXInKTtcclxuICAgICAgY29uc3QgYyA9IG9wdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYycpO1xyXG4gICAgICBwdWJTdWIucHVibGlzaCgnZ3JpZFBpY2tlZCcsIFtyLCBjXSk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICAvLyBFdmVudCBzdWJzY3JpcHRpb25cclxuICBwdWJTdWIuc3Vic2NyaWJlKCdyZXN0YXJ0R2FtZScsIHJlc2V0KTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCd1cGRhdGVHcmlkUGlja2VkJywgdXBkYXRlR3JpZCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ3JpZFBpY2tlZFJlamVjdGVkJywgc2hha2VDZWxsKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdnYW1lRW5kZWQnLCBkaXNwbGF5UmVzdWx0KTtcclxufSkoKTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCAnLi9nYW1lQm9hcmQnO1xuaW1wb3J0ICcuL2xvZ2ljJztcbmltcG9ydCAnLi91aSc7XG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcbi8vIE9wdGlvbmFsIG1vZHVsZVxuaW1wb3J0ICcuL2JhY2tncm91bmQnO1xuIl0sIm5hbWVzIjpbInB1YlN1YiIsInhJbWciLCJvSW1nIiwiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImJhY2tncm91bmQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiZ2V0QXNwZWN0UmF0aW8iLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJjcmVhdGVJbWdOb2RlIiwiaW1nU3JjIiwiY2xhc3NOYW1lTGlzdCIsImltZ05vZGUiLCJzcmMiLCJmb3JFYWNoIiwiY2xhc3NOYW1lIiwiaW5zZXJ0TW90aWYiLCJyIiwiYyIsIndpZHRoIiwidmVydGljYWxHYXAiLCJob3Jpem9udGFsR2FwIiwiaSIsImoiLCJub2RlIiwic3R5bGUiLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiLCJhcHBlbmRDaGlsZCIsImluc2VydEJvdGhNb3RpZiIsImFjdGl2ZUltZ1NyYyIsImFjdGl2ZUNsYXNzTmFtZUxpc3QiLCJpbmFjdGl2ZUltZ1NyYyIsImluYWN0aXZlQ2xhc3NOYW1lTGlzdCIsImRlbGV0ZU1vdGlmIiwibGFzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJmaXJzdENoaWxkIiwic3dhcE1vdGlmIiwiYWN0aXZlTm9kZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5hY3RpdmVOb2RlcyIsInJlbW92ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ4SXNBY3RpdmUiLCJjb250YWlucyIsImdvb2QiLCJzdWJzY3JpYmUiLCJsZW4iLCJib2FyZE1hdCIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsImZpbGwiLCJnZXRSZXN1bHQiLCJtYXQiLCJyb3dSZWYiLCJwdWJsaXNoIiwiY29sUmVmIiwiaXNGdWxsIiwicGlja0dyaWQiLCJzeW1iIiwibmV3TWF0Iiwic2xpY2UiLCJyZXNldCIsInByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQiLCJkZWNpZGVJZkVuZGVkIiwicmVzIiwidXBkYXRlR3JpZCIsInN5bWJvbCIsInVwZGF0ZWRNYXRyaXgiLCJpc0Nyb3NzVHVybiIsImlzR2FtZUVuZGVkIiwiY2hhbmdlVHVybiIsImVuZEdhbWUiLCJyZXNvbHZlQWNjZXB0ZWRHcmlkUGlja2VkIiwibWFwIiwiZXZlbnQiLCJmbiIsInB1c2giLCJkYXRhIiwidW5zdWJzY3JpYmUiLCJzcGxpY2UiLCJ4U3ltYm9sIiwib1N5bWJvbCIsInRvZ2dsZUVsZW1lbnQiLCJpZCIsImZvcm0iLCJnZXRFbGVtZW50QnlJZCIsInRvZ2dsZSIsImNsb3NlUG9wdXAiLCJ0YXJnZXQiLCJwYXJlbnQiLCJwYXJlbnROb2RlIiwicmVzSW1nV3JhcHBlciIsImltZ1MiLCJpbWciLCJjZWxsTm9kZSIsImRpc3BsYXlSZXN1bHQiLCJ3aW5uZXIiLCJyZXN1bHRUZXh0IiwiaW1nTm9kZTEiLCJpbWdOb2RlMiIsInRleHRDb250ZW50IiwiZGVib3VuY2UiLCJ0IiwidGltZUlkIiwiZGVib3VuY2VkIiwiYXJncyIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJzaGFrZUNlbGwiLCJyZXN0YXJ0R2FtZUJ0biIsIm9uY2xpY2siLCJwbGF5QWdhaW5CdG4iLCJtb2RlQnRuIiwiaW5mb0J0biIsImluZm9Dcm9zc0J0bnMiLCJidG4iLCJvcHQiLCJjZWxscyIsImNlbGwiLCJnZXRBdHRyaWJ1dGUiXSwic291cmNlUm9vdCI6IiJ9