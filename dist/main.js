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
  function testSwap() {
    const activeNodes = document.querySelectorAll('.background-wrapper img.active');
    const inactiveNodes = document.querySelectorAll('.background-wrapper img:not(.active)');
    console.log(activeNodes);
    activeNodes.forEach(node => {
      node.classList.remove('active');
    });
    inactiveNodes.forEach(node => {
      node.classList.add('active');
    });
  }
  if (getAspectRatio() > 3 / 4) {
    insertMotif(_img_x_png__WEBPACK_IMPORTED_MODULE_1__, ['xImg', 'active'], 4, 7, '10%');
    insertMotif(_img_o_png__WEBPACK_IMPORTED_MODULE_2__, ['oImg'], 4, 7, '10%');
  } else {
    insertMotif(_img_x_png__WEBPACK_IMPORTED_MODULE_1__, ['xImg', 'active'], 10, 4, '20%');
  }
  window.addEventListener('resize', () => {
    deleteMotif();
    if (getAspectRatio() > 3 / 4) {
      insertMotif(_img_x_png__WEBPACK_IMPORTED_MODULE_1__, ['xImg', 'active'], 4, 7, '10%');
    } else {
      insertMotif(_img_x_png__WEBPACK_IMPORTED_MODULE_1__, ['xImg', 'active'], 10, 4, '20%');
    }
  });
  body.appendChild(background);
  window.test = swapMotif;
  window.good = testSwap;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbEJxQjtBQUNKO0FBQ0g7QUFDTztBQUNyQiIsInNvdXJjZXMiOlsid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9iYWNrZ3JvdW5kLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2xvZ2ljLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9wdWJTdWIuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL3VpLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9iYWNrZ3JvdW5kLmNzcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL2JhY2tncm91bmQuY3NzJztcclxuaW1wb3J0IHhJbWcgZnJvbSAnLi9pbWcveC5wbmcnO1xyXG5pbXBvcnQgb0ltZyBmcm9tICcuL2ltZy9vLnBuZyc7XHJcblxyXG4oKCkgPT4ge1xyXG4gIC8vIENhY2hlIGFuZCBjcmVhdGUgRE9NIG5lZWRlZCBmb3IgYmFja2dyb3VuZCBoYW5kbGluZ1xyXG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblxyXG4gIGNvbnN0IGJhY2tncm91bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBiYWNrZ3JvdW5kLmNsYXNzTGlzdC5hZGQoJ2JhY2tncm91bmQtd3JhcHBlcicpO1xyXG5cclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICBmdW5jdGlvbiBnZXRBc3BlY3RSYXRpbygpIHtcclxuICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZUltZ05vZGUoaW1nU3JjLCBjbGFzc05hbWVMaXN0KSB7XHJcbiAgICBjb25zdCBpbWdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICBpbWdOb2RlLnNyYyA9IGltZ1NyYztcclxuICAgIGNsYXNzTmFtZUxpc3QuZm9yRWFjaCgoY2xhc3NOYW1lKSA9PiB7XHJcbiAgICAgIGltZ05vZGUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaW1nTm9kZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluc2VydE1vdGlmKGltZ1NyYywgY2xhc3NOYW1lTGlzdCwgciwgYywgd2lkdGgpIHtcclxuICAgIC8vIEluc2VydCByIGJ5IGNcclxuICAgIGNvbnN0IHZlcnRpY2FsR2FwID0gMTAwIC8gcjtcclxuICAgIGNvbnN0IGhvcml6b250YWxHYXAgPSAxMDAgLyBjO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByOyBpICs9IDEpIHtcclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjOyBqICs9IDEpIHtcclxuICAgICAgICBjb25zdCBub2RlID0gY3JlYXRlSW1nTm9kZShpbWdTcmMsIGNsYXNzTmFtZUxpc3QpO1xyXG4gICAgICAgIG5vZGUuc3R5bGUud2lkdGggPSB3aWR0aDtcclxuICAgICAgICBub2RlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgICBub2RlLnN0eWxlLnRvcCA9IGAke3ZlcnRpY2FsR2FwICogaX0lYDtcclxuICAgICAgICBub2RlLnN0eWxlLmxlZnQgPSBgJHtob3Jpem9udGFsR2FwICogKGogKyAoaSAlIDIgPyAwLjUgOiAwKSl9JWA7XHJcbiAgICAgICAgYmFja2dyb3VuZC5hcHBlbmRDaGlsZChub2RlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGVsZXRlTW90aWYoKSB7XHJcbiAgICB3aGlsZSAoYmFja2dyb3VuZC5sYXN0Q2hpbGQpIGJhY2tncm91bmQucmVtb3ZlQ2hpbGQoYmFja2dyb3VuZC5maXJzdENoaWxkKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHN3YXBNb3RpZigpIHtcclxuICAgIGNvbnN0IG5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJhY2tncm91bmQtd3JhcHBlciBpbWcnKTtcclxuICAgIGNvbnN0IFtuZXdJbWcsIG5ld0NsYXNzXSA9IChub2Rlc1swXS5jbGFzc0xpc3QuY29udGFpbnMoJ3hJbWcnKSkgPyBbb0ltZywgJ29JbWcnXSA6IFt4SW1nLCAneEltZyddO1xyXG4gICAgY29uc3Qgb2xkQ2xhc3MgPSBuZXdDbGFzcyA9PT0gJ3hJbWcnID8gJ29JbWcnIDogJ3hJbWcnO1xyXG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xyXG4gICAgICBjb25zdCBwID0gbm9kZTtcclxuICAgICAgcC5jbGFzc0xpc3QucmVwbGFjZShvbGRDbGFzcywgbmV3Q2xhc3MpO1xyXG4gICAgICBwLnNyYyA9IG5ld0ltZztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdGVzdFN3YXAoKSB7XHJcbiAgICBjb25zdCBhY3RpdmVOb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iYWNrZ3JvdW5kLXdyYXBwZXIgaW1nLmFjdGl2ZScpO1xyXG4gICAgY29uc3QgaW5hY3RpdmVOb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iYWNrZ3JvdW5kLXdyYXBwZXIgaW1nOm5vdCguYWN0aXZlKScpO1xyXG4gICAgY29uc29sZS5sb2coYWN0aXZlTm9kZXMpO1xyXG4gICAgYWN0aXZlTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4geyBub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpOyB9KTtcclxuICAgIGluYWN0aXZlTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4geyBub2RlLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpOyB9KTtcclxuICB9XHJcblxyXG4gIGlmIChnZXRBc3BlY3RSYXRpbygpID4gMyAvIDQpIHtcclxuICAgIGluc2VydE1vdGlmKHhJbWcsIFsneEltZycsICdhY3RpdmUnXSwgNCwgNywgJzEwJScpO1xyXG4gICAgaW5zZXJ0TW90aWYob0ltZywgWydvSW1nJ10sIDQsIDcsICcxMCUnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaW5zZXJ0TW90aWYoeEltZywgWyd4SW1nJywgJ2FjdGl2ZSddLCAxMCwgNCwgJzIwJScpO1xyXG4gIH1cclxuXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgIGRlbGV0ZU1vdGlmKCk7XHJcbiAgICBpZiAoZ2V0QXNwZWN0UmF0aW8oKSA+IDMgLyA0KSB7XHJcbiAgICAgIGluc2VydE1vdGlmKHhJbWcsIFsneEltZycsICdhY3RpdmUnXSwgNCwgNywgJzEwJScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW5zZXJ0TW90aWYoeEltZywgWyd4SW1nJywgJ2FjdGl2ZSddLCAxMCwgNCwgJzIwJScpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBib2R5LmFwcGVuZENoaWxkKGJhY2tncm91bmQpO1xyXG4gIHdpbmRvdy50ZXN0ID0gc3dhcE1vdGlmO1xyXG4gIHdpbmRvdy5nb29kID0gdGVzdFN3YXA7XHJcbn0pKCk7XHJcbiIsImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xyXG5cclxuKCgpID0+IHtcclxuICBjb25zdCBsZW4gPSAzO1xyXG4gIGxldCBib2FyZE1hdCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IGxlbiB9LCAoKSA9PiBuZXcgQXJyYXkobGVuKS5maWxsKCcuJykpO1xyXG5cclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICAvLyBmdW5jdGlvbiBleHBvc2VHcmlkKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVELCBGT1IgREVCVUdHSU5HXHJcbiAgLy8gICBsZXQgb3V0cHV0U3RyID0gJyc7XHJcbiAgLy8gICBib2FyZE1hdC5mb3JFYWNoKChyb3cpID0+IHtcclxuICAvLyAgICAgb3V0cHV0U3RyID0gYCR7b3V0cHV0U3RyfSR7SlNPTi5zdHJpbmdpZnkocm93KX1cXG5gO1xyXG4gIC8vICAgfSk7XHJcbiAgLy8gICByZXR1cm4gYm9hcmRNYXQ7XHJcbiAgLy8gfVxyXG5cclxuICBmdW5jdGlvbiBnZXRSZXN1bHQobWF0KSB7IC8vIElNUFVSRSwgUEFTU0VEIFdJVEggTU9DSyBQVUJTVUJcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgLy8gUm93LXdpc2VcclxuICAgICAgY29uc3Qgcm93UmVmID0gbWF0W2ldWzBdO1xyXG4gICAgICBpZiAocm93UmVmICE9PSAnLicpIHtcclxuICAgICAgICBmb3IgKGxldCBjID0gMTsgYyA8IGxlbjsgYyArPSAxKSB7XHJcbiAgICAgICAgICBpZiAobWF0W2ldW2NdICE9PSByb3dSZWYpIGJyZWFrO1xyXG4gICAgICAgICAgaWYgKGMgPT09IGxlbiAtIDEpIHtcclxuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3dpbm5lckRlY2lkZWQnLCByb3dSZWYpO1xyXG4gICAgICAgICAgICByZXR1cm4gcm93UmVmO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyBDb2x1bW4td2lzZVxyXG4gICAgICBjb25zdCBjb2xSZWYgPSBtYXRbMF1baV07XHJcbiAgICAgIGlmIChjb2xSZWYgIT09ICcuJykge1xyXG4gICAgICAgIGZvciAobGV0IHIgPSAxOyByIDwgbGVuOyByICs9IDEpIHtcclxuICAgICAgICAgIGlmIChtYXRbcl1baV0gIT09IGNvbFJlZikgYnJlYWs7XHJcbiAgICAgICAgICBpZiAociA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnd2lubmVyRGVjaWRlZCcsIGNvbFJlZik7XHJcbiAgICAgICAgICAgIHJldHVybiBjb2xSZWY7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBEaWFnb25hbHNcclxuICAgIGlmIChtYXRbMF1bMF0gIT09ICcuJykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgICAgaWYgKG1hdFtpXVtpXSAhPT0gbWF0WzBdWzBdKSBicmVhaztcclxuICAgICAgICBpZiAoaSA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3dpbm5lckRlY2lkZWQnLCBtYXRbMF1bMF0pO1xyXG4gICAgICAgICAgcmV0dXJuIG1hdFswXVswXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChtYXRbMF1bbGVuIC0gMV0gIT09ICcuJykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgICAgaWYgKG1hdFtpXVtsZW4gLSAxIC0gaV0gIT09IG1hdFswXVtsZW4gLSAxXSkgYnJlYWs7XHJcbiAgICAgICAgaWYgKGkgPT09IGxlbiAtIDEpIHtcclxuICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd3aW5uZXJEZWNpZGVkJywgbWF0WzBdW2xlbiAtIDFdKTtcclxuICAgICAgICAgIHJldHVybiBtYXRbMF1bbGVuIC0gMV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpc0Z1bGwobWF0KSB7IC8vIFBVUkUsIFVOVEVTVEVEXHJcbiAgICBmb3IgKGxldCByID0gMDsgciA8IGxlbjsgciArPSAxKSB7XHJcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgbGVuOyBjICs9IDEpIHtcclxuICAgICAgICBpZiAobWF0W3JdW2NdID09PSAnLicpIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwaWNrR3JpZChtYXQsIHIsIGMsIHN5bWIpIHtcclxuICAgIC8vIElNUFVSRSwgUEFTU0VEIFdJVEggTU9DSyBQVUJTVUJcclxuICAgIGlmIChyIDwgMCB8fCByID49IGxlbiB8fCBjIDwgMCB8fCBjID49IGxlbikgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKG1hdFtyXVtjXSAhPT0gJy4nKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBuZXdNYXQgPSBuZXcgQXJyYXkobGVuKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgbmV3TWF0W2ldID0gbWF0W2ldLnNsaWNlKCk7XHJcbiAgICB9XHJcbiAgICBuZXdNYXRbcl1bY10gPSBzeW1iO1xyXG4gICAgcmV0dXJuIG5ld01hdDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc2V0KCkge1xyXG4gICAgLy8gSU1QVVJFLCBVTlRFU1RFRFxyXG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCBsZW47IHIgKz0gMSkge1xyXG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGxlbjsgYyArPSAxKSB7XHJcbiAgICAgICAgYm9hcmRNYXRbcl1bY10gPSAnLic7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQoW3IsIGNdKSB7IC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGlmIChib2FyZE1hdFtyXVtjXSA9PT0gJy4nKSBwdWJTdWIucHVibGlzaCgnZ3JpZFBpY2tlZEFjY2VwdGVkJywgW3IsIGNdKTtcclxuICAgIGVsc2UgcHViU3ViLnB1Ymxpc2goJ2dyaWRQaWNrZWRSZWplY3RlZCcsIFtyLCBjXSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkZWNpZGVJZkVuZGVkKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBjb25zdCByZXMgPSBnZXRSZXN1bHQoYm9hcmRNYXQpO1xyXG4gICAgaWYgKHJlcyA9PT0gZmFsc2UpIHtcclxuICAgICAgaWYgKGlzRnVsbChib2FyZE1hdCkpIHB1YlN1Yi5wdWJsaXNoKCdnYW1lRW5kZWQnLCAnZHJhdycpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwdWJTdWIucHVibGlzaCgnZ2FtZUVuZGVkJywgcmVzKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVwZGF0ZUdyaWQoW3IsIGMsIHN5bWJvbF0pIHsgLy8gSU1QVVJFLCBVTlRFU1RFRFxyXG4gICAgY29uc3QgdXBkYXRlZE1hdHJpeCA9IHBpY2tHcmlkKGJvYXJkTWF0LCByLCBjLCBzeW1ib2wpO1xyXG4gICAgYm9hcmRNYXQgPSB1cGRhdGVkTWF0cml4O1xyXG4gICAgZGVjaWRlSWZFbmRlZCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gRXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgcHViU3ViLnN1YnNjcmliZSgncmVzdGFydEdhbWUnLCByZXNldCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ3JpZFBpY2tlZEJlZm9yZUVuZCcsIHByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3VwZGF0ZUdyaWRQaWNrZWQnLCB1cGRhdGVHcmlkKTtcclxufSkoKTtcclxuIiwiaW1wb3J0IHB1YlN1YiBmcm9tICcuL3B1YlN1Yic7XHJcblxyXG4oKCkgPT4ge1xyXG4gIC8vIExvZ2ljIHZhcmlhYmxlXHJcbiAgbGV0IGlzQ3Jvc3NUdXJuID0gdHJ1ZTtcclxuICBsZXQgaXNHYW1lRW5kZWQgPSBmYWxzZTtcclxuXHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgLy8gZnVuY3Rpb24gZXhwb3NlSXNDcm9zc1R1cm4oKSB7IC8vIElNUFVSRSwgVU5URVNURUQsIEZPRSBERUJVR0dJTkdcclxuICAvLyAgIHJldHVybiBpc0Nyb3NzVHVybjtcclxuICAvLyB9XHJcblxyXG4gIGZ1bmN0aW9uIGNoYW5nZVR1cm4oKSB7IC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGlzQ3Jvc3NUdXJuID0gIWlzQ3Jvc3NUdXJuO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZW5kR2FtZSgpIHtcclxuICAgIGlzR2FtZUVuZGVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc2V0KCkge1xyXG4gICAgaXNDcm9zc1R1cm4gPSB0cnVlO1xyXG4gICAgaXNHYW1lRW5kZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQoW3IsIGNdKSB7XHJcbiAgICBpZiAoIWlzR2FtZUVuZGVkKSBwdWJTdWIucHVibGlzaCgnZ3JpZFBpY2tlZEJlZm9yZUVuZCcsIFtyLCBjXSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNvbHZlQWNjZXB0ZWRHcmlkUGlja2VkKFtyLCBjXSkge1xyXG4gICAgY29uc3Qgc3ltYm9sID0gaXNDcm9zc1R1cm4gPyAneCcgOiAnbyc7XHJcbiAgICBwdWJTdWIucHVibGlzaCgndXBkYXRlR3JpZFBpY2tlZCcsIFtyLCBjLCBzeW1ib2xdKTtcclxuICB9XHJcblxyXG4gIC8vIEV2ZW50IHN1YnNjcmlwdGlvblxyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3Jlc3RhcnRHYW1lJywgcmVzZXQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dyaWRQaWNrZWQnLCBwcm9jZXNzT3JSZWplY3RHcmlkUGlja2VkKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdncmlkUGlja2VkQWNjZXB0ZWQnLCByZXNvbHZlQWNjZXB0ZWRHcmlkUGlja2VkKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCd1cGRhdGVHcmlkUGlja2VkJywgY2hhbmdlVHVybik7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ2FtZUVuZGVkJywgZW5kR2FtZSk7XHJcbn0pKCk7XHJcbiIsImNvbnN0IHB1YlN1YiA9ICgoKSA9PiB7XHJcbiAgY29uc3QgbWFwID0ge307XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShldmVudCwgZm4pIHtcclxuICAgIGlmICghbWFwW2V2ZW50XSkgbWFwW2V2ZW50XSA9IFtdO1xyXG4gICAgbWFwW2V2ZW50XS5wdXNoKGZuKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHB1Ymxpc2goZXZlbnQsIGRhdGEpIHtcclxuICAgIGlmIChtYXBbZXZlbnRdKSB7XHJcbiAgICAgIG1hcFtldmVudF0uZm9yRWFjaCgoZm4pID0+IHtcclxuICAgICAgICBmbihkYXRhKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1bnN1YnNjcmliZShldmVudCwgZm4pIHtcclxuICAgIGlmIChtYXBbZXZlbnRdKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFwW2V2ZW50XS5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIGlmIChtYXBbZXZlbnRdW2ldID09PSBmbikge1xyXG4gICAgICAgICAgbWFwW2V2ZW50XS5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7IHN1YnNjcmliZSwgcHVibGlzaCwgdW5zdWJzY3JpYmUgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHB1YlN1YjtcclxuIiwiaW1wb3J0IHB1YlN1YiBmcm9tICcuL3B1YlN1Yic7XHJcbmltcG9ydCB4U3ltYm9sIGZyb20gJy4vaW1nL3gucG5nJztcclxuaW1wb3J0IG9TeW1ib2wgZnJvbSAnLi9pbWcvby5wbmcnO1xyXG5cclxuKCgpID0+IHtcclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICBmdW5jdGlvbiB0b2dnbGVFbGVtZW50KGlkKSB7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgZm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNsb3NlUG9wdXAoZXZlbnQpIHtcclxuICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudDtcclxuICAgIGNvbnN0IHBhcmVudCA9IHRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XHJcbiAgICBwYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICBpZiAocGFyZW50LmlkID09PSAncmVzdWx0LWZvcm0nKSB7IC8vIE5lZWQgdG8gY2xlYXIgcmVzdWx0IGFkZGVkXHJcbiAgICAgIGNvbnN0IHJlc0ltZ1dyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzLWltZy13cmFwcGVyJyk7XHJcbiAgICAgIHdoaWxlIChyZXNJbWdXcmFwcGVyLmZpcnN0Q2hpbGQpIHJlc0ltZ1dyYXBwZXIucmVtb3ZlQ2hpbGQocmVzSW1nV3JhcHBlci5sYXN0Q2hpbGQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzZXQoKSB7XHJcbiAgICBjb25zdCBpbWdTID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwgPiBpbWcnKTtcclxuICAgIGltZ1MuZm9yRWFjaCgoaW1nKSA9PiB7XHJcbiAgICAgIGltZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGltZyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVwZGF0ZUdyaWQoW3IsIGMsIHN5bWJvbF0pIHtcclxuICAgIGNvbnN0IGltZyA9IHN5bWJvbCA9PT0gJ3gnID8geFN5bWJvbCA6IG9TeW1ib2w7XHJcbiAgICBjb25zdCBpbWdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICBpbWdOb2RlLnNyYyA9IGltZztcclxuICAgIGNvbnN0IGNlbGxOb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNlbGxbZGF0YS1yPVwiJHtyfVwiXVtkYXRhLWM9XCIke2N9XCJdYCk7XHJcbiAgICBjZWxsTm9kZS5hcHBlbmRDaGlsZChpbWdOb2RlKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRpc3BsYXlSZXN1bHQod2lubmVyKSB7XHJcbiAgICBjb25zdCByZXNJbWdXcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlcy1pbWctd3JhcHBlcicpO1xyXG4gICAgY29uc3QgcmVzdWx0VGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQtdGV4dCcpO1xyXG4gICAgaWYgKHdpbm5lciA9PT0gJ2RyYXcnKSB7XHJcbiAgICAgIGNvbnN0IGltZ05vZGUxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgIGNvbnN0IGltZ05vZGUyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgIGltZ05vZGUxLnNyYyA9IHhTeW1ib2w7XHJcbiAgICAgIGltZ05vZGUyLnNyYyA9IG9TeW1ib2w7XHJcbiAgICAgIHJlc0ltZ1dyYXBwZXIuYXBwZW5kQ2hpbGQoaW1nTm9kZTEpO1xyXG4gICAgICByZXNJbWdXcmFwcGVyLmFwcGVuZENoaWxkKGltZ05vZGUyKTtcclxuICAgICAgcmVzdWx0VGV4dC50ZXh0Q29udGVudCA9ICdEUkFXISc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBpbWcgPSB3aW5uZXIgPT09ICd4JyA/IHhTeW1ib2wgOiBvU3ltYm9sO1xyXG4gICAgICBjb25zdCBpbWdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgIGltZ05vZGUuc3JjID0gaW1nO1xyXG4gICAgICByZXNJbWdXcmFwcGVyLmFwcGVuZENoaWxkKGltZ05vZGUpO1xyXG4gICAgICByZXN1bHRUZXh0LnRleHRDb250ZW50ID0gJ1dJTk5FUiEnO1xyXG4gICAgfVxyXG4gICAgdG9nZ2xlRWxlbWVudCgncmVzdWx0LWZvcm0nKTtcclxuICAgIHRvZ2dsZUVsZW1lbnQoJ292ZXJsYXknKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRlYm91bmNlKGZuLCB0KSB7XHJcbiAgICBsZXQgdGltZUlkO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGRlYm91bmNlZCguLi5hcmdzKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lSWQpO1xyXG4gICAgICB0aW1lSWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBmbiguLi5hcmdzKTtcclxuICAgICAgfSwgdCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2hha2VDZWxsKFtyLCBjXSkge1xyXG4gICAgY29uc3QgY2VsbE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY2VsbFtkYXRhLXI9XCIke3J9XCJdW2RhdGEtYz1cIiR7Y31cIl1gKTtcclxuICAgIGNlbGxOb2RlLmNsYXNzTGlzdC5hZGQoJ3NoYWtlJyk7XHJcbiAgICBkZWJvdW5jZSgoKSA9PiB7XHJcbiAgICAgIGNlbGxOb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3NoYWtlJyk7XHJcbiAgICB9LCAxMDAwKSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2FjaGUgRE9NIGFuZCBiaW5kIGV2ZW50c1xyXG4gIGNvbnN0IHJlc3RhcnRHYW1lQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhcnQtYnRuJyk7XHJcbiAgcmVzdGFydEdhbWVCdG4ub25jbGljayA9ICgpID0+IHtcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdyZXN0YXJ0R2FtZScsIG51bGwpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHBsYXlBZ2FpbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWFnYWluLWJ0bicpO1xyXG4gIHBsYXlBZ2FpbkJ0bi5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdvdmVybGF5Jyk7XHJcbiAgICBjbG9zZVBvcHVwKGV2ZW50KTtcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdyZXN0YXJ0R2FtZScsIG51bGwpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG1vZGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kZS1idG4nKTtcclxuICBtb2RlQnRuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdvdmVybGF5Jyk7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdtb2RlLWZvcm0nKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBpbmZvQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZm8tYnRuJyk7XHJcbiAgaW5mb0J0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnaW5mby1mb3JtJyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaW5mb0Nyb3NzQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtLXdyYXBwZXI+c3Bhbi5pY29uLWNsb3NlJyk7XHJcbiAgaW5mb0Nyb3NzQnRucy5mb3JFYWNoKChidG4pID0+IHtcclxuICAgIGNvbnN0IG9wdCA9IGJ0bjsgLy8gQ2Fubm90IG1vZGlmeSBmdW5jdGlvbiBwYXJhbSBkaXJlY3RseVxyXG4gICAgb3B0Lm9uY2xpY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gICAgICBjbG9zZVBvcHVwKGV2ZW50KTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcclxuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICBjb25zdCBvcHQgPSBjZWxsO1xyXG4gICAgb3B0Lm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHIgPSBvcHQuZ2V0QXR0cmlidXRlKCdkYXRhLXInKTtcclxuICAgICAgY29uc3QgYyA9IG9wdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYycpO1xyXG4gICAgICBwdWJTdWIucHVibGlzaCgnZ3JpZFBpY2tlZCcsIFtyLCBjXSk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICAvLyBFdmVudCBzdWJzY3JpcHRpb25cclxuICBwdWJTdWIuc3Vic2NyaWJlKCdyZXN0YXJ0R2FtZScsIHJlc2V0KTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCd1cGRhdGVHcmlkUGlja2VkJywgdXBkYXRlR3JpZCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ3JpZFBpY2tlZFJlamVjdGVkJywgc2hha2VDZWxsKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdnYW1lRW5kZWQnLCBkaXNwbGF5UmVzdWx0KTtcclxufSkoKTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCAnLi9nYW1lQm9hcmQnO1xuaW1wb3J0ICcuL2xvZ2ljJztcbmltcG9ydCAnLi91aSc7XG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcbi8vIE9wdGlvbmFsIG1vZHVsZVxuaW1wb3J0ICcuL2JhY2tncm91bmQnO1xuIl0sIm5hbWVzIjpbInhJbWciLCJvSW1nIiwiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImJhY2tncm91bmQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiZ2V0QXNwZWN0UmF0aW8iLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJjcmVhdGVJbWdOb2RlIiwiaW1nU3JjIiwiY2xhc3NOYW1lTGlzdCIsImltZ05vZGUiLCJzcmMiLCJmb3JFYWNoIiwiY2xhc3NOYW1lIiwiaW5zZXJ0TW90aWYiLCJyIiwiYyIsIndpZHRoIiwidmVydGljYWxHYXAiLCJob3Jpem9udGFsR2FwIiwiaSIsImoiLCJub2RlIiwic3R5bGUiLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiLCJhcHBlbmRDaGlsZCIsImRlbGV0ZU1vdGlmIiwibGFzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJmaXJzdENoaWxkIiwic3dhcE1vdGlmIiwibm9kZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibmV3SW1nIiwibmV3Q2xhc3MiLCJjb250YWlucyIsIm9sZENsYXNzIiwicCIsInJlcGxhY2UiLCJ0ZXN0U3dhcCIsImFjdGl2ZU5vZGVzIiwiaW5hY3RpdmVOb2RlcyIsImNvbnNvbGUiLCJsb2ciLCJyZW1vdmUiLCJhZGRFdmVudExpc3RlbmVyIiwidGVzdCIsImdvb2QiLCJwdWJTdWIiLCJsZW4iLCJib2FyZE1hdCIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsImZpbGwiLCJnZXRSZXN1bHQiLCJtYXQiLCJyb3dSZWYiLCJwdWJsaXNoIiwiY29sUmVmIiwiaXNGdWxsIiwicGlja0dyaWQiLCJzeW1iIiwibmV3TWF0Iiwic2xpY2UiLCJyZXNldCIsInByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQiLCJkZWNpZGVJZkVuZGVkIiwicmVzIiwidXBkYXRlR3JpZCIsInN5bWJvbCIsInVwZGF0ZWRNYXRyaXgiLCJzdWJzY3JpYmUiLCJpc0Nyb3NzVHVybiIsImlzR2FtZUVuZGVkIiwiY2hhbmdlVHVybiIsImVuZEdhbWUiLCJyZXNvbHZlQWNjZXB0ZWRHcmlkUGlja2VkIiwibWFwIiwiZXZlbnQiLCJmbiIsInB1c2giLCJkYXRhIiwidW5zdWJzY3JpYmUiLCJzcGxpY2UiLCJ4U3ltYm9sIiwib1N5bWJvbCIsInRvZ2dsZUVsZW1lbnQiLCJpZCIsImZvcm0iLCJnZXRFbGVtZW50QnlJZCIsInRvZ2dsZSIsImNsb3NlUG9wdXAiLCJ0YXJnZXQiLCJwYXJlbnQiLCJwYXJlbnROb2RlIiwicmVzSW1nV3JhcHBlciIsImltZ1MiLCJpbWciLCJjZWxsTm9kZSIsImRpc3BsYXlSZXN1bHQiLCJ3aW5uZXIiLCJyZXN1bHRUZXh0IiwiaW1nTm9kZTEiLCJpbWdOb2RlMiIsInRleHRDb250ZW50IiwiZGVib3VuY2UiLCJ0IiwidGltZUlkIiwiZGVib3VuY2VkIiwiYXJncyIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJzaGFrZUNlbGwiLCJyZXN0YXJ0R2FtZUJ0biIsIm9uY2xpY2siLCJwbGF5QWdhaW5CdG4iLCJtb2RlQnRuIiwiaW5mb0J0biIsImluZm9Dcm9zc0J0bnMiLCJidG4iLCJvcHQiLCJjZWxscyIsImNlbGwiLCJnZXRBdHRyaWJ1dGUiXSwic291cmNlUm9vdCI6IiJ9