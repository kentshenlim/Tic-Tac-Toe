/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/audio.js":
/*!**********************!*\
  !*** ./src/audio.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubSub */ "./src/pubSub.js");
/* harmony import */ var _audioD_grass_wav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audioD/grass.wav */ "./src/audioD/grass.wav");
/* harmony import */ var _audioD_error_wav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./audioD/error.wav */ "./src/audioD/error.wav");
/* harmony import */ var _audioD_pop_wav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./audioD/pop.wav */ "./src/audioD/pop.wav");




(() => {
  const body = document.querySelector('body');

  // Method declaration
  function createAudioNode(audioSrc, id) {
    const audNode = document.createElement('audio');
    audNode.src = audioSrc;
    audNode.id = id;
    return audNode;
  }
  function playSound(audNode) {
    const p = audNode;
    p.currentTime = 0;
    p.play();
  }
  const grassNode = createAudioNode(_audioD_grass_wav__WEBPACK_IMPORTED_MODULE_1__, 'grass');
  const errorNode = createAudioNode(_audioD_error_wav__WEBPACK_IMPORTED_MODULE_2__, 'error');
  const popNode = createAudioNode(_audioD_pop_wav__WEBPACK_IMPORTED_MODULE_3__, 'pop');

  // Event subscription
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('updateGridPicked', () => playSound(grassNode));
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('gridPickedRejected', () => playSound(errorNode));
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('popClicked', () => playSound(popNode));
})();

/***/ }),

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

  // Init and bind events
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

  // Event subscription
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
    if (!isCrossTurn) _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('turnChanged', null);
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
    _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('popClicked', null);
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
    _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('popClicked', null);
  };
  const infoBtn = document.getElementById('info-btn');
  infoBtn.onclick = () => {
    toggleElement('overlay');
    toggleElement('info-form');
    _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('popClicked', null);
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

/***/ "./src/audioD/error.wav":
/*!******************************!*\
  !*** ./src/audioD/error.wav ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "dff640501756d96e994b.wav";

/***/ }),

/***/ "./src/audioD/grass.wav":
/*!******************************!*\
  !*** ./src/audioD/grass.wav ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "5fdf4dcbcd5a1c52dacd.wav";

/***/ }),

/***/ "./src/audioD/pop.wav":
/*!****************************!*\
  !*** ./src/audioD/pop.wav ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6e58a952e7687ad39b98.wav";

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
/* harmony import */ var _audio__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./audio */ "./src/audio.js");
// Core modules




// Optional modules


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLGtCQUFrQixFQUFFbUUsVUFBVSxDQUFDO0VBQ2hEdkYsK0NBQU0sQ0FBQ29CLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRTZHLFNBQVMsQ0FBQztFQUNqRGpJLCtDQUFNLENBQUNvQixTQUFTLENBQUMsV0FBVyxFQUFFZ0csYUFBYSxDQUFDO0FBQzlDLENBQUMsRUFBRSxDQUFDOzs7Ozs7Ozs7OztBQ2hJSjs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUNxQjtBQUNKO0FBQ0g7QUFDTztBQUNyQjtBQUNzQiIsInNvdXJjZXMiOlsid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9hdWRpby5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9sb2dpYy5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvcHViU3ViLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy91aS5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvYmFja2dyb3VuZC5jc3MiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xyXG5pbXBvcnQgZ3Jhc3MgZnJvbSAnLi9hdWRpb0QvZ3Jhc3Mud2F2JztcclxuaW1wb3J0IGVycm9yIGZyb20gJy4vYXVkaW9EL2Vycm9yLndhdic7XHJcbmltcG9ydCBwb3AgZnJvbSAnLi9hdWRpb0QvcG9wLndhdic7XHJcblxyXG4oKCkgPT4ge1xyXG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZUF1ZGlvTm9kZShhdWRpb1NyYywgaWQpIHtcclxuICAgIGNvbnN0IGF1ZE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpO1xyXG4gICAgYXVkTm9kZS5zcmMgPSBhdWRpb1NyYztcclxuICAgIGF1ZE5vZGUuaWQgPSBpZDtcclxuICAgIHJldHVybiBhdWROb2RlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcGxheVNvdW5kKGF1ZE5vZGUpIHtcclxuICAgIGNvbnN0IHAgPSBhdWROb2RlO1xyXG4gICAgcC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICBwLnBsYXkoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGdyYXNzTm9kZSA9IGNyZWF0ZUF1ZGlvTm9kZShncmFzcywgJ2dyYXNzJyk7XHJcbiAgY29uc3QgZXJyb3JOb2RlID0gY3JlYXRlQXVkaW9Ob2RlKGVycm9yLCAnZXJyb3InKTtcclxuICBjb25zdCBwb3BOb2RlID0gY3JlYXRlQXVkaW9Ob2RlKHBvcCwgJ3BvcCcpO1xyXG5cclxuICAvLyBFdmVudCBzdWJzY3JpcHRpb25cclxuICBwdWJTdWIuc3Vic2NyaWJlKCd1cGRhdGVHcmlkUGlja2VkJywgKCkgPT4gcGxheVNvdW5kKGdyYXNzTm9kZSkpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dyaWRQaWNrZWRSZWplY3RlZCcsICgpID0+IHBsYXlTb3VuZChlcnJvck5vZGUpKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdwb3BDbGlja2VkJywgKCkgPT4gcGxheVNvdW5kKHBvcE5vZGUpKTtcclxufSkoKTtcclxuIiwiaW1wb3J0IHB1YlN1YiBmcm9tICcuL3B1YlN1Yic7XHJcbmltcG9ydCAnLi9iYWNrZ3JvdW5kLmNzcyc7XHJcbmltcG9ydCB4SW1nIGZyb20gJy4vaW1nL3gucG5nJztcclxuaW1wb3J0IG9JbWcgZnJvbSAnLi9pbWcvby5wbmcnO1xyXG5cclxuKCgpID0+IHtcclxuICAvLyBDYWNoZSBhbmQgY3JlYXRlIERPTSBuZWVkZWQgZm9yIGJhY2tncm91bmQgaGFuZGxpbmdcclxuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG5cclxuICBjb25zdCBiYWNrZ3JvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgYmFja2dyb3VuZC5jbGFzc0xpc3QuYWRkKCdiYWNrZ3JvdW5kLXdyYXBwZXInKTtcclxuXHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgZnVuY3Rpb24gZ2V0QXNwZWN0UmF0aW8oKSB7XHJcbiAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVJbWdOb2RlKGltZ1NyYywgY2xhc3NOYW1lTGlzdCkge1xyXG4gICAgY29uc3QgaW1nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgaW1nTm9kZS5zcmMgPSBpbWdTcmM7XHJcbiAgICBjbGFzc05hbWVMaXN0LmZvckVhY2goKGNsYXNzTmFtZSkgPT4ge1xyXG4gICAgICBpbWdOb2RlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGltZ05vZGU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbnNlcnRNb3RpZihpbWdTcmMsIGNsYXNzTmFtZUxpc3QsIHIsIGMsIHdpZHRoKSB7XHJcbiAgICAvLyBJbnNlcnQgciBieSBjIG1vdGlmc1xyXG4gICAgY29uc3QgdmVydGljYWxHYXAgPSAxMDAgLyByO1xyXG4gICAgY29uc3QgaG9yaXpvbnRhbEdhcCA9IDEwMCAvIGM7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHI7IGkgKz0gMSkge1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGM7IGogKz0gMSkge1xyXG4gICAgICAgIGNvbnN0IG5vZGUgPSBjcmVhdGVJbWdOb2RlKGltZ1NyYywgY2xhc3NOYW1lTGlzdCk7XHJcbiAgICAgICAgbm9kZS5zdHlsZS53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIG5vZGUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgIG5vZGUuc3R5bGUudG9wID0gYCR7dmVydGljYWxHYXAgKiBpfSVgO1xyXG4gICAgICAgIG5vZGUuc3R5bGUubGVmdCA9IGAke2hvcml6b250YWxHYXAgKiAoaiArIChpICUgMiA/IDAuNSA6IDApKX0lYDtcclxuICAgICAgICBiYWNrZ3JvdW5kLmFwcGVuZENoaWxkKG5vZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbnNlcnRCb3RoTW90aWYoXHJcbiAgICBhY3RpdmVJbWdTcmMsXHJcbiAgICBhY3RpdmVDbGFzc05hbWVMaXN0LFxyXG4gICAgaW5hY3RpdmVJbWdTcmMsXHJcbiAgICBpbmFjdGl2ZUNsYXNzTmFtZUxpc3QsXHJcbiAgICByLFxyXG4gICAgYyxcclxuICAgIHdpZHRoLFxyXG4gICkge1xyXG4gICAgaW5zZXJ0TW90aWYoYWN0aXZlSW1nU3JjLCBbLi4uYWN0aXZlQ2xhc3NOYW1lTGlzdCwgJ2FjdGl2ZSddLCByLCBjLCB3aWR0aCk7XHJcbiAgICBpbnNlcnRNb3RpZihpbmFjdGl2ZUltZ1NyYywgaW5hY3RpdmVDbGFzc05hbWVMaXN0LCByLCBjLCB3aWR0aCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkZWxldGVNb3RpZigpIHtcclxuICAgIHdoaWxlIChiYWNrZ3JvdW5kLmxhc3RDaGlsZCkgYmFja2dyb3VuZC5yZW1vdmVDaGlsZChiYWNrZ3JvdW5kLmZpcnN0Q2hpbGQpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc3dhcE1vdGlmKCkge1xyXG4gICAgY29uc3QgYWN0aXZlTm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmFja2dyb3VuZC13cmFwcGVyIGltZy5hY3RpdmUnKTtcclxuICAgIGNvbnN0IGluYWN0aXZlTm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmFja2dyb3VuZC13cmFwcGVyIGltZzpub3QoLmFjdGl2ZSknKTtcclxuICAgIGFjdGl2ZU5vZGVzLmZvckVhY2goKG5vZGUpID0+IHsgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTsgfSk7XHJcbiAgICBpbmFjdGl2ZU5vZGVzLmZvckVhY2goKG5vZGUpID0+IHsgbm9kZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTsgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBJbml0IGFuZCBiaW5kIGV2ZW50c1xyXG4gIGlmIChnZXRBc3BlY3RSYXRpbygpID4gMyAvIDQpIHtcclxuICAgIGluc2VydEJvdGhNb3RpZih4SW1nLCBbJ3hJbWcnLCAnYWN0aXZlJ10sIG9JbWcsIFsnb0ltZyddLCA0LCA3LCAnMTAlJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGluc2VydEJvdGhNb3RpZih4SW1nLCBbJ3hJbWcnLCAnYWN0aXZlJ10sIG9JbWcsIFsnb0ltZyddLCAxMCwgNCwgJzIwJScpO1xyXG4gIH1cclxuXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgIC8vIE5lZWQgdG8gZ2V0IHdoaWNoIG1vdGlmIGlzIGN1cnJlbnRseSBhY3RpdmUgZmlyc3RcclxuICAgIGNvbnN0IHhJc0FjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZ3JvdW5kLXdyYXBwZXIgaW1nLnhJbWcnKS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpO1xyXG4gICAgZGVsZXRlTW90aWYoKTtcclxuICAgIGlmIChnZXRBc3BlY3RSYXRpbygpID4gMyAvIDQpIHtcclxuICAgICAgaWYgKHhJc0FjdGl2ZSkge1xyXG4gICAgICAgIGluc2VydEJvdGhNb3RpZih4SW1nLCBbJ3hJbWcnLCAnYWN0aXZlJ10sIG9JbWcsIFsnb0ltZyddLCA0LCA3LCAnMTAlJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5zZXJ0Qm90aE1vdGlmKG9JbWcsIFsnb0ltZycsICdhY3RpdmUnXSwgeEltZywgWyd4SW1nJ10sIDQsIDcsICcxMCUnKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh4SXNBY3RpdmUpIHtcclxuICAgICAgaW5zZXJ0Qm90aE1vdGlmKHhJbWcsIFsneEltZycsICdhY3RpdmUnXSwgb0ltZywgWydvSW1nJ10sIDEwLCA0LCAnMjAlJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpbnNlcnRCb3RoTW90aWYob0ltZywgWydvSW1nJywgJ2FjdGl2ZSddLCB4SW1nLCBbJ3hJbWcnXSwgMTAsIDQsICcyMCUnKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgYm9keS5hcHBlbmRDaGlsZChiYWNrZ3JvdW5kKTtcclxuXHJcbiAgLy8gRXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgcHViU3ViLnN1YnNjcmliZSgndHVybkNoYW5nZWQnLCBzd2FwTW90aWYpO1xyXG59KSgpO1xyXG4iLCJpbXBvcnQgcHViU3ViIGZyb20gJy4vcHViU3ViJztcclxuXHJcbigoKSA9PiB7XHJcbiAgY29uc3QgbGVuID0gMztcclxuICBsZXQgYm9hcmRNYXQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBsZW4gfSwgKCkgPT4gbmV3IEFycmF5KGxlbikuZmlsbCgnLicpKTtcclxuXHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgLy8gZnVuY3Rpb24gZXhwb3NlR3JpZCgpIHsgLy8gSU1QVVJFLCBVTlRFU1RFRCwgRk9SIERFQlVHR0lOR1xyXG4gIC8vICAgbGV0IG91dHB1dFN0ciA9ICcnO1xyXG4gIC8vICAgYm9hcmRNYXQuZm9yRWFjaCgocm93KSA9PiB7XHJcbiAgLy8gICAgIG91dHB1dFN0ciA9IGAke291dHB1dFN0cn0ke0pTT04uc3RyaW5naWZ5KHJvdyl9XFxuYDtcclxuICAvLyAgIH0pO1xyXG4gIC8vICAgcmV0dXJuIGJvYXJkTWF0O1xyXG4gIC8vIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0UmVzdWx0KG1hdCkgeyAvLyBJTVBVUkUsIFBBU1NFRCBXSVRIIE1PQ0sgUFVCU1VCXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgIC8vIFJvdy13aXNlXHJcbiAgICAgIGNvbnN0IHJvd1JlZiA9IG1hdFtpXVswXTtcclxuICAgICAgaWYgKHJvd1JlZiAhPT0gJy4nKSB7XHJcbiAgICAgICAgZm9yIChsZXQgYyA9IDE7IGMgPCBsZW47IGMgKz0gMSkge1xyXG4gICAgICAgICAgaWYgKG1hdFtpXVtjXSAhPT0gcm93UmVmKSBicmVhaztcclxuICAgICAgICAgIGlmIChjID09PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd3aW5uZXJEZWNpZGVkJywgcm93UmVmKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJvd1JlZjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy8gQ29sdW1uLXdpc2VcclxuICAgICAgY29uc3QgY29sUmVmID0gbWF0WzBdW2ldO1xyXG4gICAgICBpZiAoY29sUmVmICE9PSAnLicpIHtcclxuICAgICAgICBmb3IgKGxldCByID0gMTsgciA8IGxlbjsgciArPSAxKSB7XHJcbiAgICAgICAgICBpZiAobWF0W3JdW2ldICE9PSBjb2xSZWYpIGJyZWFrO1xyXG4gICAgICAgICAgaWYgKHIgPT09IGxlbiAtIDEpIHtcclxuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3dpbm5lckRlY2lkZWQnLCBjb2xSZWYpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29sUmVmO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gRGlhZ29uYWxzXHJcbiAgICBpZiAobWF0WzBdWzBdICE9PSAnLicpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW47IGkgKz0gMSkge1xyXG4gICAgICAgIGlmIChtYXRbaV1baV0gIT09IG1hdFswXVswXSkgYnJlYWs7XHJcbiAgICAgICAgaWYgKGkgPT09IGxlbiAtIDEpIHtcclxuICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd3aW5uZXJEZWNpZGVkJywgbWF0WzBdWzBdKTtcclxuICAgICAgICAgIHJldHVybiBtYXRbMF1bMF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobWF0WzBdW2xlbiAtIDFdICE9PSAnLicpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW47IGkgKz0gMSkge1xyXG4gICAgICAgIGlmIChtYXRbaV1bbGVuIC0gMSAtIGldICE9PSBtYXRbMF1bbGVuIC0gMV0pIGJyZWFrO1xyXG4gICAgICAgIGlmIChpID09PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICBwdWJTdWIucHVibGlzaCgnd2lubmVyRGVjaWRlZCcsIG1hdFswXVtsZW4gLSAxXSk7XHJcbiAgICAgICAgICByZXR1cm4gbWF0WzBdW2xlbiAtIDFdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaXNGdWxsKG1hdCkgeyAvLyBQVVJFLCBVTlRFU1RFRFxyXG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCBsZW47IHIgKz0gMSkge1xyXG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGxlbjsgYyArPSAxKSB7XHJcbiAgICAgICAgaWYgKG1hdFtyXVtjXSA9PT0gJy4nKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcGlja0dyaWQobWF0LCByLCBjLCBzeW1iKSB7XHJcbiAgICAvLyBJTVBVUkUsIFBBU1NFRCBXSVRIIE1PQ0sgUFVCU1VCXHJcbiAgICBpZiAociA8IDAgfHwgciA+PSBsZW4gfHwgYyA8IDAgfHwgYyA+PSBsZW4pIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChtYXRbcl1bY10gIT09ICcuJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgbmV3TWF0ID0gbmV3IEFycmF5KGxlbik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgIG5ld01hdFtpXSA9IG1hdFtpXS5zbGljZSgpO1xyXG4gICAgfVxyXG4gICAgbmV3TWF0W3JdW2NdID0gc3ltYjtcclxuICAgIHJldHVybiBuZXdNYXQ7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNldCgpIHtcclxuICAgIC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGZvciAobGV0IHIgPSAwOyByIDwgbGVuOyByICs9IDEpIHtcclxuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBsZW47IGMgKz0gMSkge1xyXG4gICAgICAgIGJvYXJkTWF0W3JdW2NdID0gJy4nO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwcm9jZXNzT3JSZWplY3RHcmlkUGlja2VkKFtyLCBjXSkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBpZiAoYm9hcmRNYXRbcl1bY10gPT09ICcuJykgcHViU3ViLnB1Ymxpc2goJ2dyaWRQaWNrZWRBY2NlcHRlZCcsIFtyLCBjXSk7XHJcbiAgICBlbHNlIHB1YlN1Yi5wdWJsaXNoKCdncmlkUGlja2VkUmVqZWN0ZWQnLCBbciwgY10pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGVjaWRlSWZFbmRlZCgpIHsgLy8gSU1QVVJFLCBVTlRFU1RFRFxyXG4gICAgY29uc3QgcmVzID0gZ2V0UmVzdWx0KGJvYXJkTWF0KTtcclxuICAgIGlmIChyZXMgPT09IGZhbHNlKSB7XHJcbiAgICAgIGlmIChpc0Z1bGwoYm9hcmRNYXQpKSBwdWJTdWIucHVibGlzaCgnZ2FtZUVuZGVkJywgJ2RyYXcnKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcHViU3ViLnB1Ymxpc2goJ2dhbWVFbmRlZCcsIHJlcyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1cGRhdGVHcmlkKFtyLCBjLCBzeW1ib2xdKSB7IC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGNvbnN0IHVwZGF0ZWRNYXRyaXggPSBwaWNrR3JpZChib2FyZE1hdCwgciwgYywgc3ltYm9sKTtcclxuICAgIGJvYXJkTWF0ID0gdXBkYXRlZE1hdHJpeDtcclxuICAgIGRlY2lkZUlmRW5kZWQoKTtcclxuICB9XHJcblxyXG4gIC8vIEV2ZW50IHN1YnNjcmlwdGlvblxyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3Jlc3RhcnRHYW1lJywgcmVzZXQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dyaWRQaWNrZWRCZWZvcmVFbmQnLCBwcm9jZXNzT3JSZWplY3RHcmlkUGlja2VkKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCd1cGRhdGVHcmlkUGlja2VkJywgdXBkYXRlR3JpZCk7XHJcbn0pKCk7XHJcbiIsImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xyXG5cclxuKCgpID0+IHtcclxuICAvLyBMb2dpYyB2YXJpYWJsZVxyXG4gIGxldCBpc0Nyb3NzVHVybiA9IHRydWU7XHJcbiAgbGV0IGlzR2FtZUVuZGVkID0gZmFsc2U7XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIC8vIGZ1bmN0aW9uIGV4cG9zZUlzQ3Jvc3NUdXJuKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVELCBGT0UgREVCVUdHSU5HXHJcbiAgLy8gICByZXR1cm4gaXNDcm9zc1R1cm47XHJcbiAgLy8gfVxyXG5cclxuICBmdW5jdGlvbiBjaGFuZ2VUdXJuKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBpc0Nyb3NzVHVybiA9ICFpc0Nyb3NzVHVybjtcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCd0dXJuQ2hhbmdlZCcsIG51bGwpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZW5kR2FtZSgpIHtcclxuICAgIGlzR2FtZUVuZGVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc2V0KCkge1xyXG4gICAgaWYgKCFpc0Nyb3NzVHVybikgcHViU3ViLnB1Ymxpc2goJ3R1cm5DaGFuZ2VkJywgbnVsbCk7XHJcbiAgICBpc0Nyb3NzVHVybiA9IHRydWU7XHJcbiAgICBpc0dhbWVFbmRlZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHJvY2Vzc09yUmVqZWN0R3JpZFBpY2tlZChbciwgY10pIHtcclxuICAgIGlmICghaXNHYW1lRW5kZWQpIHB1YlN1Yi5wdWJsaXNoKCdncmlkUGlja2VkQmVmb3JlRW5kJywgW3IsIGNdKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc29sdmVBY2NlcHRlZEdyaWRQaWNrZWQoW3IsIGNdKSB7XHJcbiAgICBjb25zdCBzeW1ib2wgPSBpc0Nyb3NzVHVybiA/ICd4JyA6ICdvJztcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCd1cGRhdGVHcmlkUGlja2VkJywgW3IsIGMsIHN5bWJvbF0pO1xyXG4gIH1cclxuXHJcbiAgLy8gRXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgcHViU3ViLnN1YnNjcmliZSgncmVzdGFydEdhbWUnLCByZXNldCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ3JpZFBpY2tlZCcsIHByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dyaWRQaWNrZWRBY2NlcHRlZCcsIHJlc29sdmVBY2NlcHRlZEdyaWRQaWNrZWQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3VwZGF0ZUdyaWRQaWNrZWQnLCBjaGFuZ2VUdXJuKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdnYW1lRW5kZWQnLCBlbmRHYW1lKTtcclxufSkoKTtcclxuIiwiY29uc3QgcHViU3ViID0gKCgpID0+IHtcclxuICBjb25zdCBtYXAgPSB7fTtcclxuXHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgZnVuY3Rpb24gc3Vic2NyaWJlKGV2ZW50LCBmbikge1xyXG4gICAgaWYgKCFtYXBbZXZlbnRdKSBtYXBbZXZlbnRdID0gW107XHJcbiAgICBtYXBbZXZlbnRdLnB1c2goZm4pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHVibGlzaChldmVudCwgZGF0YSkge1xyXG4gICAgaWYgKG1hcFtldmVudF0pIHtcclxuICAgICAgbWFwW2V2ZW50XS5mb3JFYWNoKChmbikgPT4ge1xyXG4gICAgICAgIGZuKGRhdGEpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKGV2ZW50LCBmbikge1xyXG4gICAgaWYgKG1hcFtldmVudF0pIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXBbZXZlbnRdLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgaWYgKG1hcFtldmVudF1baV0gPT09IGZuKSB7XHJcbiAgICAgICAgICBtYXBbZXZlbnRdLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHsgc3Vic2NyaWJlLCBwdWJsaXNoLCB1bnN1YnNjcmliZSB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHViU3ViO1xyXG4iLCJpbXBvcnQgcHViU3ViIGZyb20gJy4vcHViU3ViJztcclxuaW1wb3J0IHhTeW1ib2wgZnJvbSAnLi9pbWcveC5wbmcnO1xyXG5pbXBvcnQgb1N5bWJvbCBmcm9tICcuL2ltZy9vLnBuZyc7XHJcblxyXG4oKCkgPT4ge1xyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIHRvZ2dsZUVsZW1lbnQoaWQpIHtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgICBmb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY2xvc2VQb3B1cChldmVudCkge1xyXG4gICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xyXG4gICAgY29uc3QgcGFyZW50ID0gdGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZTtcclxuICAgIHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgIGlmIChwYXJlbnQuaWQgPT09ICdyZXN1bHQtZm9ybScpIHsgLy8gTmVlZCB0byBjbGVhciByZXN1bHQgYWRkZWRcclxuICAgICAgY29uc3QgcmVzSW1nV3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXMtaW1nLXdyYXBwZXInKTtcclxuICAgICAgd2hpbGUgKHJlc0ltZ1dyYXBwZXIuZmlyc3RDaGlsZCkgcmVzSW1nV3JhcHBlci5yZW1vdmVDaGlsZChyZXNJbWdXcmFwcGVyLmxhc3RDaGlsZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNldCgpIHtcclxuICAgIGNvbnN0IGltZ1MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCA+IGltZycpO1xyXG4gICAgaW1nUy5mb3JFYWNoKChpbWcpID0+IHtcclxuICAgICAgaW1nLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW1nKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdXBkYXRlR3JpZChbciwgYywgc3ltYm9sXSkge1xyXG4gICAgY29uc3QgaW1nID0gc3ltYm9sID09PSAneCcgPyB4U3ltYm9sIDogb1N5bWJvbDtcclxuICAgIGNvbnN0IGltZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIGltZ05vZGUuc3JjID0gaW1nO1xyXG4gICAgY29uc3QgY2VsbE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY2VsbFtkYXRhLXI9XCIke3J9XCJdW2RhdGEtYz1cIiR7Y31cIl1gKTtcclxuICAgIGNlbGxOb2RlLmFwcGVuZENoaWxkKGltZ05vZGUpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGlzcGxheVJlc3VsdCh3aW5uZXIpIHtcclxuICAgIGNvbnN0IHJlc0ltZ1dyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzLWltZy13cmFwcGVyJyk7XHJcbiAgICBjb25zdCByZXN1bHRUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdC10ZXh0Jyk7XHJcbiAgICBpZiAod2lubmVyID09PSAnZHJhdycpIHtcclxuICAgICAgY29uc3QgaW1nTm9kZTEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgY29uc3QgaW1nTm9kZTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgaW1nTm9kZTEuc3JjID0geFN5bWJvbDtcclxuICAgICAgaW1nTm9kZTIuc3JjID0gb1N5bWJvbDtcclxuICAgICAgcmVzSW1nV3JhcHBlci5hcHBlbmRDaGlsZChpbWdOb2RlMSk7XHJcbiAgICAgIHJlc0ltZ1dyYXBwZXIuYXBwZW5kQ2hpbGQoaW1nTm9kZTIpO1xyXG4gICAgICByZXN1bHRUZXh0LnRleHRDb250ZW50ID0gJ0RSQVchJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGltZyA9IHdpbm5lciA9PT0gJ3gnID8geFN5bWJvbCA6IG9TeW1ib2w7XHJcbiAgICAgIGNvbnN0IGltZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgaW1nTm9kZS5zcmMgPSBpbWc7XHJcbiAgICAgIHJlc0ltZ1dyYXBwZXIuYXBwZW5kQ2hpbGQoaW1nTm9kZSk7XHJcbiAgICAgIHJlc3VsdFRleHQudGV4dENvbnRlbnQgPSAnV0lOTkVSISc7XHJcbiAgICB9XHJcbiAgICB0b2dnbGVFbGVtZW50KCdyZXN1bHQtZm9ybScpO1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGVib3VuY2UoZm4sIHQpIHtcclxuICAgIGxldCB0aW1lSWQ7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gZGVib3VuY2VkKC4uLmFyZ3MpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVJZCk7XHJcbiAgICAgIHRpbWVJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGZuKC4uLmFyZ3MpO1xyXG4gICAgICB9LCB0KTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzaGFrZUNlbGwoW3IsIGNdKSB7XHJcbiAgICBjb25zdCBjZWxsTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jZWxsW2RhdGEtcj1cIiR7cn1cIl1bZGF0YS1jPVwiJHtjfVwiXWApO1xyXG4gICAgY2VsbE5vZGUuY2xhc3NMaXN0LmFkZCgnc2hha2UnKTtcclxuICAgIGRlYm91bmNlKCgpID0+IHtcclxuICAgICAgY2VsbE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnc2hha2UnKTtcclxuICAgIH0sIDEwMDApKCk7XHJcbiAgfVxyXG5cclxuICAvLyBDYWNoZSBET00gYW5kIGJpbmQgZXZlbnRzXHJcbiAgY29uc3QgcmVzdGFydEdhbWVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGFydC1idG4nKTtcclxuICByZXN0YXJ0R2FtZUJ0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgcHViU3ViLnB1Ymxpc2goJ3Jlc3RhcnRHYW1lJywgbnVsbCk7XHJcbiAgICBwdWJTdWIucHVibGlzaCgncG9wQ2xpY2tlZCcsIG51bGwpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHBsYXlBZ2FpbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWFnYWluLWJ0bicpO1xyXG4gIHBsYXlBZ2FpbkJ0bi5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdvdmVybGF5Jyk7XHJcbiAgICBjbG9zZVBvcHVwKGV2ZW50KTtcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdyZXN0YXJ0R2FtZScsIG51bGwpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG1vZGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kZS1idG4nKTtcclxuICBtb2RlQnRuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdvdmVybGF5Jyk7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdtb2RlLWZvcm0nKTtcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdwb3BDbGlja2VkJywgbnVsbCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaW5mb0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmZvLWJ0bicpO1xyXG4gIGluZm9CdG4ub25jbGljayA9ICgpID0+IHtcclxuICAgIHRvZ2dsZUVsZW1lbnQoJ292ZXJsYXknKTtcclxuICAgIHRvZ2dsZUVsZW1lbnQoJ2luZm8tZm9ybScpO1xyXG4gICAgcHViU3ViLnB1Ymxpc2goJ3BvcENsaWNrZWQnLCBudWxsKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBpbmZvQ3Jvc3NCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvcm0td3JhcHBlcj5zcGFuLmljb24tY2xvc2UnKTtcclxuICBpbmZvQ3Jvc3NCdG5zLmZvckVhY2goKGJ0bikgPT4ge1xyXG4gICAgY29uc3Qgb3B0ID0gYnRuOyAvLyBDYW5ub3QgbW9kaWZ5IGZ1bmN0aW9uIHBhcmFtIGRpcmVjdGx5XHJcbiAgICBvcHQub25jbGljayA9IChldmVudCkgPT4ge1xyXG4gICAgICB0b2dnbGVFbGVtZW50KCdvdmVybGF5Jyk7XHJcbiAgICAgIGNsb3NlUG9wdXAoZXZlbnQpO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xyXG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgIGNvbnN0IG9wdCA9IGNlbGw7XHJcbiAgICBvcHQub25jbGljayA9ICgpID0+IHtcclxuICAgICAgY29uc3QgciA9IG9wdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcicpO1xyXG4gICAgICBjb25zdCBjID0gb3B0LmdldEF0dHJpYnV0ZSgnZGF0YS1jJyk7XHJcbiAgICAgIHB1YlN1Yi5wdWJsaXNoKCdncmlkUGlja2VkJywgW3IsIGNdKTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIC8vIEV2ZW50IHN1YnNjcmlwdGlvblxyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3Jlc3RhcnRHYW1lJywgcmVzZXQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3VwZGF0ZUdyaWRQaWNrZWQnLCB1cGRhdGVHcmlkKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdncmlkUGlja2VkUmVqZWN0ZWQnLCBzaGFrZUNlbGwpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dhbWVFbmRlZCcsIGRpc3BsYXlSZXN1bHQpO1xyXG59KSgpO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiLy8gQ29yZSBtb2R1bGVzXG5pbXBvcnQgJy4vZ2FtZUJvYXJkJztcbmltcG9ydCAnLi9sb2dpYyc7XG5pbXBvcnQgJy4vdWknO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG4vLyBPcHRpb25hbCBtb2R1bGVzXG5pbXBvcnQgJy4vYmFja2dyb3VuZCc7XG5pbXBvcnQgJy4vYXVkaW8nO1xuIl0sIm5hbWVzIjpbInB1YlN1YiIsImdyYXNzIiwiZXJyb3IiLCJwb3AiLCJib2R5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3JlYXRlQXVkaW9Ob2RlIiwiYXVkaW9TcmMiLCJpZCIsImF1ZE5vZGUiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwicGxheVNvdW5kIiwicCIsImN1cnJlbnRUaW1lIiwicGxheSIsImdyYXNzTm9kZSIsImVycm9yTm9kZSIsInBvcE5vZGUiLCJzdWJzY3JpYmUiLCJ4SW1nIiwib0ltZyIsImJhY2tncm91bmQiLCJjbGFzc0xpc3QiLCJhZGQiLCJnZXRBc3BlY3RSYXRpbyIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsImNyZWF0ZUltZ05vZGUiLCJpbWdTcmMiLCJjbGFzc05hbWVMaXN0IiwiaW1nTm9kZSIsImZvckVhY2giLCJjbGFzc05hbWUiLCJpbnNlcnRNb3RpZiIsInIiLCJjIiwid2lkdGgiLCJ2ZXJ0aWNhbEdhcCIsImhvcml6b250YWxHYXAiLCJpIiwiaiIsIm5vZGUiLCJzdHlsZSIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsImFwcGVuZENoaWxkIiwiaW5zZXJ0Qm90aE1vdGlmIiwiYWN0aXZlSW1nU3JjIiwiYWN0aXZlQ2xhc3NOYW1lTGlzdCIsImluYWN0aXZlSW1nU3JjIiwiaW5hY3RpdmVDbGFzc05hbWVMaXN0IiwiZGVsZXRlTW90aWYiLCJsYXN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImZpcnN0Q2hpbGQiLCJzd2FwTW90aWYiLCJhY3RpdmVOb2RlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbmFjdGl2ZU5vZGVzIiwicmVtb3ZlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInhJc0FjdGl2ZSIsImNvbnRhaW5zIiwibGVuIiwiYm9hcmRNYXQiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJmaWxsIiwiZ2V0UmVzdWx0IiwibWF0Iiwicm93UmVmIiwicHVibGlzaCIsImNvbFJlZiIsImlzRnVsbCIsInBpY2tHcmlkIiwic3ltYiIsIm5ld01hdCIsInNsaWNlIiwicmVzZXQiLCJwcm9jZXNzT3JSZWplY3RHcmlkUGlja2VkIiwiZGVjaWRlSWZFbmRlZCIsInJlcyIsInVwZGF0ZUdyaWQiLCJzeW1ib2wiLCJ1cGRhdGVkTWF0cml4IiwiaXNDcm9zc1R1cm4iLCJpc0dhbWVFbmRlZCIsImNoYW5nZVR1cm4iLCJlbmRHYW1lIiwicmVzb2x2ZUFjY2VwdGVkR3JpZFBpY2tlZCIsIm1hcCIsImV2ZW50IiwiZm4iLCJwdXNoIiwiZGF0YSIsInVuc3Vic2NyaWJlIiwic3BsaWNlIiwieFN5bWJvbCIsIm9TeW1ib2wiLCJ0b2dnbGVFbGVtZW50IiwiZm9ybSIsImdldEVsZW1lbnRCeUlkIiwidG9nZ2xlIiwiY2xvc2VQb3B1cCIsInRhcmdldCIsInBhcmVudCIsInBhcmVudE5vZGUiLCJyZXNJbWdXcmFwcGVyIiwiaW1nUyIsImltZyIsImNlbGxOb2RlIiwiZGlzcGxheVJlc3VsdCIsIndpbm5lciIsInJlc3VsdFRleHQiLCJpbWdOb2RlMSIsImltZ05vZGUyIiwidGV4dENvbnRlbnQiLCJkZWJvdW5jZSIsInQiLCJ0aW1lSWQiLCJkZWJvdW5jZWQiLCJhcmdzIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInNoYWtlQ2VsbCIsInJlc3RhcnRHYW1lQnRuIiwib25jbGljayIsInBsYXlBZ2FpbkJ0biIsIm1vZGVCdG4iLCJpbmZvQnRuIiwiaW5mb0Nyb3NzQnRucyIsImJ0biIsIm9wdCIsImNlbGxzIiwiY2VsbCIsImdldEF0dHJpYnV0ZSJdLCJzb3VyY2VSb290IjoiIn0=