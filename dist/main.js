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
/* harmony import */ var _audioD_judgeTree_mp3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./audioD/judgeTree.mp3 */ "./src/audioD/judgeTree.mp3");





(() => {
  // Cache DOM
  const muteBtn = document.getElementById('mute-btn');

  // Method declaration
  function createAudioNode(audioSrc, id) {
    const audNode = document.createElement('audio');
    audNode.src = audioSrc;
    audNode.id = id;
    return audNode;
  }
  function playSound(audNode) {
    if (muteBtn.classList.contains('muted')) return;
    const p = audNode;
    p.currentTime = 0;
    p.play();
  }
  function stopSound(audNode) {
    const p = audNode;
    p.pause();
    p.currentTime = 0;
  }

  // Init audio node
  const grassNode = createAudioNode(_audioD_grass_wav__WEBPACK_IMPORTED_MODULE_1__, 'grass');
  const errorNode = createAudioNode(_audioD_error_wav__WEBPACK_IMPORTED_MODULE_2__, 'error');
  const popNode = createAudioNode(_audioD_pop_wav__WEBPACK_IMPORTED_MODULE_3__, 'pop');
  const judgeTreeNode = createAudioNode(_audioD_judgeTree_mp3__WEBPACK_IMPORTED_MODULE_4__, 'judgeTree');
  judgeTreeNode.volume = 0.4;
  judgeTreeNode.loop = true;

  // Event subscription
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('updateGridPicked', () => playSound(grassNode));
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('gridPickedRejected', () => playSound(errorNode));
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('popClicked', () => playSound(popNode));
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('playJudgeTree', () => {
    playSound(judgeTreeNode);
  });
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('stopJudgeTree', () => stopSound(judgeTreeNode));
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
  const muteBtn = document.getElementById('mute-btn');
  const muteBtnSymb = document.querySelector('#mute-btn>ion-icon');
  muteBtn.onclick = () => {
    if (muteBtn.classList.contains('muted')) {
      // Unmute now
      muteBtnSymb.name = 'volume-mute-outline';
      muteBtn.classList.remove('muted');
      _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('playJudgeTree', null);
    } else {
      muteBtnSymb.name = 'musical-notes-outline'; // Mute now
      muteBtn.classList.add('muted');
      _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('stopJudgeTree', null);
    }
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

/***/ "./src/audioD/judgeTree.mp3":
/*!**********************************!*\
  !*** ./src/audioD/judgeTree.mp3 ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "832da78375ff2b4063ea.mp3";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDO0VBQ0gsQ0FBQyxDQUFDOztFQUVGO0VBQ0EvQywrQ0FBTSxDQUFDNEIsU0FBUyxDQUFDLGFBQWEsRUFBRStELEtBQUssQ0FBQztFQUN0QzNGLCtDQUFNLENBQUM0QixTQUFTLENBQUMsa0JBQWtCLEVBQUVtRSxVQUFVLENBQUM7RUFDaEQvRiwrQ0FBTSxDQUFDNEIsU0FBUyxDQUFDLG9CQUFvQixFQUFFNEcsU0FBUyxDQUFDO0VBQ2pEeEksK0NBQU0sQ0FBQzRCLFNBQVMsQ0FBQyxXQUFXLEVBQUUrRixhQUFhLENBQUM7QUFDOUMsQ0FBQyxFQUFFLENBQUM7Ozs7Ozs7Ozs7O0FDOUlKOzs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUNxQjtBQUNKO0FBQ0g7QUFDTztBQUNyQjtBQUNzQiIsInNvdXJjZXMiOlsid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9hdWRpby5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9sb2dpYy5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvcHViU3ViLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy91aS5qcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvYmFja2dyb3VuZC5jc3MiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xyXG5pbXBvcnQgZ3Jhc3MgZnJvbSAnLi9hdWRpb0QvZ3Jhc3Mud2F2JztcclxuaW1wb3J0IGVycm9yIGZyb20gJy4vYXVkaW9EL2Vycm9yLndhdic7XHJcbmltcG9ydCBwb3AgZnJvbSAnLi9hdWRpb0QvcG9wLndhdic7XHJcbmltcG9ydCBqdWRnZVRyZWUgZnJvbSAnLi9hdWRpb0QvanVkZ2VUcmVlLm1wMyc7XHJcblxyXG4oKCkgPT4ge1xyXG4gIC8vIENhY2hlIERPTVxyXG4gIGNvbnN0IG11dGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXV0ZS1idG4nKTtcclxuXHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgZnVuY3Rpb24gY3JlYXRlQXVkaW9Ob2RlKGF1ZGlvU3JjLCBpZCkge1xyXG4gICAgY29uc3QgYXVkTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJyk7XHJcbiAgICBhdWROb2RlLnNyYyA9IGF1ZGlvU3JjO1xyXG4gICAgYXVkTm9kZS5pZCA9IGlkO1xyXG4gICAgcmV0dXJuIGF1ZE5vZGU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwbGF5U291bmQoYXVkTm9kZSkge1xyXG4gICAgaWYgKG11dGVCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdtdXRlZCcpKSByZXR1cm47XHJcbiAgICBjb25zdCBwID0gYXVkTm9kZTtcclxuICAgIHAuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgcC5wbGF5KCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzdG9wU291bmQoYXVkTm9kZSkge1xyXG4gICAgY29uc3QgcCA9IGF1ZE5vZGU7XHJcbiAgICBwLnBhdXNlKCk7XHJcbiAgICBwLmN1cnJlbnRUaW1lID0gMDtcclxuICB9XHJcblxyXG4gIC8vIEluaXQgYXVkaW8gbm9kZVxyXG4gIGNvbnN0IGdyYXNzTm9kZSA9IGNyZWF0ZUF1ZGlvTm9kZShncmFzcywgJ2dyYXNzJyk7XHJcbiAgY29uc3QgZXJyb3JOb2RlID0gY3JlYXRlQXVkaW9Ob2RlKGVycm9yLCAnZXJyb3InKTtcclxuICBjb25zdCBwb3BOb2RlID0gY3JlYXRlQXVkaW9Ob2RlKHBvcCwgJ3BvcCcpO1xyXG4gIGNvbnN0IGp1ZGdlVHJlZU5vZGUgPSBjcmVhdGVBdWRpb05vZGUoanVkZ2VUcmVlLCAnanVkZ2VUcmVlJyk7XHJcbiAganVkZ2VUcmVlTm9kZS52b2x1bWUgPSAwLjQ7XHJcbiAganVkZ2VUcmVlTm9kZS5sb29wID0gdHJ1ZTtcclxuXHJcbiAgLy8gRXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgcHViU3ViLnN1YnNjcmliZSgndXBkYXRlR3JpZFBpY2tlZCcsICgpID0+IHBsYXlTb3VuZChncmFzc05vZGUpKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdncmlkUGlja2VkUmVqZWN0ZWQnLCAoKSA9PiBwbGF5U291bmQoZXJyb3JOb2RlKSk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgncG9wQ2xpY2tlZCcsICgpID0+IHBsYXlTb3VuZChwb3BOb2RlKSk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgncGxheUp1ZGdlVHJlZScsICgpID0+IHtcclxuICAgIHBsYXlTb3VuZChqdWRnZVRyZWVOb2RlKTtcclxuICB9KTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdzdG9wSnVkZ2VUcmVlJywgKCkgPT4gc3RvcFNvdW5kKGp1ZGdlVHJlZU5vZGUpKTtcclxufSkoKTtcclxuIiwiaW1wb3J0IHB1YlN1YiBmcm9tICcuL3B1YlN1Yic7XHJcbmltcG9ydCAnLi9iYWNrZ3JvdW5kLmNzcyc7XHJcbmltcG9ydCB4SW1nIGZyb20gJy4vaW1nL3gucG5nJztcclxuaW1wb3J0IG9JbWcgZnJvbSAnLi9pbWcvby5wbmcnO1xyXG5cclxuKCgpID0+IHtcclxuICAvLyBDYWNoZSBhbmQgY3JlYXRlIERPTSBuZWVkZWQgZm9yIGJhY2tncm91bmQgaGFuZGxpbmdcclxuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG5cclxuICBjb25zdCBiYWNrZ3JvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgYmFja2dyb3VuZC5jbGFzc0xpc3QuYWRkKCdiYWNrZ3JvdW5kLXdyYXBwZXInKTtcclxuXHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgZnVuY3Rpb24gZ2V0QXNwZWN0UmF0aW8oKSB7XHJcbiAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVJbWdOb2RlKGltZ1NyYywgY2xhc3NOYW1lTGlzdCkge1xyXG4gICAgY29uc3QgaW1nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgaW1nTm9kZS5zcmMgPSBpbWdTcmM7XHJcbiAgICBjbGFzc05hbWVMaXN0LmZvckVhY2goKGNsYXNzTmFtZSkgPT4ge1xyXG4gICAgICBpbWdOb2RlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGltZ05vZGU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbnNlcnRNb3RpZihpbWdTcmMsIGNsYXNzTmFtZUxpc3QsIHIsIGMsIHdpZHRoKSB7XHJcbiAgICAvLyBJbnNlcnQgciBieSBjIG1vdGlmc1xyXG4gICAgY29uc3QgdmVydGljYWxHYXAgPSAxMDAgLyByO1xyXG4gICAgY29uc3QgaG9yaXpvbnRhbEdhcCA9IDEwMCAvIGM7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHI7IGkgKz0gMSkge1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGM7IGogKz0gMSkge1xyXG4gICAgICAgIGNvbnN0IG5vZGUgPSBjcmVhdGVJbWdOb2RlKGltZ1NyYywgY2xhc3NOYW1lTGlzdCk7XHJcbiAgICAgICAgbm9kZS5zdHlsZS53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIG5vZGUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgIG5vZGUuc3R5bGUudG9wID0gYCR7dmVydGljYWxHYXAgKiBpfSVgO1xyXG4gICAgICAgIG5vZGUuc3R5bGUubGVmdCA9IGAke2hvcml6b250YWxHYXAgKiAoaiArIChpICUgMiA/IDAuNSA6IDApKX0lYDtcclxuICAgICAgICBiYWNrZ3JvdW5kLmFwcGVuZENoaWxkKG5vZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbnNlcnRCb3RoTW90aWYoXHJcbiAgICBhY3RpdmVJbWdTcmMsXHJcbiAgICBhY3RpdmVDbGFzc05hbWVMaXN0LFxyXG4gICAgaW5hY3RpdmVJbWdTcmMsXHJcbiAgICBpbmFjdGl2ZUNsYXNzTmFtZUxpc3QsXHJcbiAgICByLFxyXG4gICAgYyxcclxuICAgIHdpZHRoLFxyXG4gICkge1xyXG4gICAgaW5zZXJ0TW90aWYoYWN0aXZlSW1nU3JjLCBbLi4uYWN0aXZlQ2xhc3NOYW1lTGlzdCwgJ2FjdGl2ZSddLCByLCBjLCB3aWR0aCk7XHJcbiAgICBpbnNlcnRNb3RpZihpbmFjdGl2ZUltZ1NyYywgaW5hY3RpdmVDbGFzc05hbWVMaXN0LCByLCBjLCB3aWR0aCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkZWxldGVNb3RpZigpIHtcclxuICAgIHdoaWxlIChiYWNrZ3JvdW5kLmxhc3RDaGlsZCkgYmFja2dyb3VuZC5yZW1vdmVDaGlsZChiYWNrZ3JvdW5kLmZpcnN0Q2hpbGQpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc3dhcE1vdGlmKCkge1xyXG4gICAgY29uc3QgYWN0aXZlTm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmFja2dyb3VuZC13cmFwcGVyIGltZy5hY3RpdmUnKTtcclxuICAgIGNvbnN0IGluYWN0aXZlTm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmFja2dyb3VuZC13cmFwcGVyIGltZzpub3QoLmFjdGl2ZSknKTtcclxuICAgIGFjdGl2ZU5vZGVzLmZvckVhY2goKG5vZGUpID0+IHsgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTsgfSk7XHJcbiAgICBpbmFjdGl2ZU5vZGVzLmZvckVhY2goKG5vZGUpID0+IHsgbm9kZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTsgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBJbml0IGFuZCBiaW5kIGV2ZW50c1xyXG4gIGlmIChnZXRBc3BlY3RSYXRpbygpID4gMyAvIDQpIHtcclxuICAgIGluc2VydEJvdGhNb3RpZih4SW1nLCBbJ3hJbWcnLCAnYWN0aXZlJ10sIG9JbWcsIFsnb0ltZyddLCA0LCA3LCAnMTAlJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGluc2VydEJvdGhNb3RpZih4SW1nLCBbJ3hJbWcnLCAnYWN0aXZlJ10sIG9JbWcsIFsnb0ltZyddLCAxMCwgNCwgJzIwJScpO1xyXG4gIH1cclxuXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgIC8vIE5lZWQgdG8gZ2V0IHdoaWNoIG1vdGlmIGlzIGN1cnJlbnRseSBhY3RpdmUgZmlyc3RcclxuICAgIGNvbnN0IHhJc0FjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZ3JvdW5kLXdyYXBwZXIgaW1nLnhJbWcnKS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpO1xyXG4gICAgZGVsZXRlTW90aWYoKTtcclxuICAgIGlmIChnZXRBc3BlY3RSYXRpbygpID4gMyAvIDQpIHtcclxuICAgICAgaWYgKHhJc0FjdGl2ZSkge1xyXG4gICAgICAgIGluc2VydEJvdGhNb3RpZih4SW1nLCBbJ3hJbWcnLCAnYWN0aXZlJ10sIG9JbWcsIFsnb0ltZyddLCA0LCA3LCAnMTAlJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5zZXJ0Qm90aE1vdGlmKG9JbWcsIFsnb0ltZycsICdhY3RpdmUnXSwgeEltZywgWyd4SW1nJ10sIDQsIDcsICcxMCUnKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh4SXNBY3RpdmUpIHtcclxuICAgICAgaW5zZXJ0Qm90aE1vdGlmKHhJbWcsIFsneEltZycsICdhY3RpdmUnXSwgb0ltZywgWydvSW1nJ10sIDEwLCA0LCAnMjAlJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpbnNlcnRCb3RoTW90aWYob0ltZywgWydvSW1nJywgJ2FjdGl2ZSddLCB4SW1nLCBbJ3hJbWcnXSwgMTAsIDQsICcyMCUnKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgYm9keS5hcHBlbmRDaGlsZChiYWNrZ3JvdW5kKTtcclxuXHJcbiAgLy8gRXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgcHViU3ViLnN1YnNjcmliZSgndHVybkNoYW5nZWQnLCBzd2FwTW90aWYpO1xyXG59KSgpO1xyXG4iLCJpbXBvcnQgcHViU3ViIGZyb20gJy4vcHViU3ViJztcclxuXHJcbigoKSA9PiB7XHJcbiAgY29uc3QgbGVuID0gMztcclxuICBsZXQgYm9hcmRNYXQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBsZW4gfSwgKCkgPT4gbmV3IEFycmF5KGxlbikuZmlsbCgnLicpKTtcclxuXHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgLy8gZnVuY3Rpb24gZXhwb3NlR3JpZCgpIHsgLy8gSU1QVVJFLCBVTlRFU1RFRCwgRk9SIERFQlVHR0lOR1xyXG4gIC8vICAgbGV0IG91dHB1dFN0ciA9ICcnO1xyXG4gIC8vICAgYm9hcmRNYXQuZm9yRWFjaCgocm93KSA9PiB7XHJcbiAgLy8gICAgIG91dHB1dFN0ciA9IGAke291dHB1dFN0cn0ke0pTT04uc3RyaW5naWZ5KHJvdyl9XFxuYDtcclxuICAvLyAgIH0pO1xyXG4gIC8vICAgcmV0dXJuIGJvYXJkTWF0O1xyXG4gIC8vIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0UmVzdWx0KG1hdCkgeyAvLyBJTVBVUkUsIFBBU1NFRCBXSVRIIE1PQ0sgUFVCU1VCXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgIC8vIFJvdy13aXNlXHJcbiAgICAgIGNvbnN0IHJvd1JlZiA9IG1hdFtpXVswXTtcclxuICAgICAgaWYgKHJvd1JlZiAhPT0gJy4nKSB7XHJcbiAgICAgICAgZm9yIChsZXQgYyA9IDE7IGMgPCBsZW47IGMgKz0gMSkge1xyXG4gICAgICAgICAgaWYgKG1hdFtpXVtjXSAhPT0gcm93UmVmKSBicmVhaztcclxuICAgICAgICAgIGlmIChjID09PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd3aW5uZXJEZWNpZGVkJywgcm93UmVmKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJvd1JlZjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy8gQ29sdW1uLXdpc2VcclxuICAgICAgY29uc3QgY29sUmVmID0gbWF0WzBdW2ldO1xyXG4gICAgICBpZiAoY29sUmVmICE9PSAnLicpIHtcclxuICAgICAgICBmb3IgKGxldCByID0gMTsgciA8IGxlbjsgciArPSAxKSB7XHJcbiAgICAgICAgICBpZiAobWF0W3JdW2ldICE9PSBjb2xSZWYpIGJyZWFrO1xyXG4gICAgICAgICAgaWYgKHIgPT09IGxlbiAtIDEpIHtcclxuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3dpbm5lckRlY2lkZWQnLCBjb2xSZWYpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29sUmVmO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gRGlhZ29uYWxzXHJcbiAgICBpZiAobWF0WzBdWzBdICE9PSAnLicpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW47IGkgKz0gMSkge1xyXG4gICAgICAgIGlmIChtYXRbaV1baV0gIT09IG1hdFswXVswXSkgYnJlYWs7XHJcbiAgICAgICAgaWYgKGkgPT09IGxlbiAtIDEpIHtcclxuICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd3aW5uZXJEZWNpZGVkJywgbWF0WzBdWzBdKTtcclxuICAgICAgICAgIHJldHVybiBtYXRbMF1bMF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobWF0WzBdW2xlbiAtIDFdICE9PSAnLicpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW47IGkgKz0gMSkge1xyXG4gICAgICAgIGlmIChtYXRbaV1bbGVuIC0gMSAtIGldICE9PSBtYXRbMF1bbGVuIC0gMV0pIGJyZWFrO1xyXG4gICAgICAgIGlmIChpID09PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICBwdWJTdWIucHVibGlzaCgnd2lubmVyRGVjaWRlZCcsIG1hdFswXVtsZW4gLSAxXSk7XHJcbiAgICAgICAgICByZXR1cm4gbWF0WzBdW2xlbiAtIDFdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaXNGdWxsKG1hdCkgeyAvLyBQVVJFLCBVTlRFU1RFRFxyXG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCBsZW47IHIgKz0gMSkge1xyXG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGxlbjsgYyArPSAxKSB7XHJcbiAgICAgICAgaWYgKG1hdFtyXVtjXSA9PT0gJy4nKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcGlja0dyaWQobWF0LCByLCBjLCBzeW1iKSB7XHJcbiAgICAvLyBJTVBVUkUsIFBBU1NFRCBXSVRIIE1PQ0sgUFVCU1VCXHJcbiAgICBpZiAociA8IDAgfHwgciA+PSBsZW4gfHwgYyA8IDAgfHwgYyA+PSBsZW4pIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChtYXRbcl1bY10gIT09ICcuJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgbmV3TWF0ID0gbmV3IEFycmF5KGxlbik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgIG5ld01hdFtpXSA9IG1hdFtpXS5zbGljZSgpO1xyXG4gICAgfVxyXG4gICAgbmV3TWF0W3JdW2NdID0gc3ltYjtcclxuICAgIHJldHVybiBuZXdNYXQ7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNldCgpIHtcclxuICAgIC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGZvciAobGV0IHIgPSAwOyByIDwgbGVuOyByICs9IDEpIHtcclxuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBsZW47IGMgKz0gMSkge1xyXG4gICAgICAgIGJvYXJkTWF0W3JdW2NdID0gJy4nO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwcm9jZXNzT3JSZWplY3RHcmlkUGlja2VkKFtyLCBjXSkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBpZiAoYm9hcmRNYXRbcl1bY10gPT09ICcuJykgcHViU3ViLnB1Ymxpc2goJ2dyaWRQaWNrZWRBY2NlcHRlZCcsIFtyLCBjXSk7XHJcbiAgICBlbHNlIHB1YlN1Yi5wdWJsaXNoKCdncmlkUGlja2VkUmVqZWN0ZWQnLCBbciwgY10pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGVjaWRlSWZFbmRlZCgpIHsgLy8gSU1QVVJFLCBVTlRFU1RFRFxyXG4gICAgY29uc3QgcmVzID0gZ2V0UmVzdWx0KGJvYXJkTWF0KTtcclxuICAgIGlmIChyZXMgPT09IGZhbHNlKSB7XHJcbiAgICAgIGlmIChpc0Z1bGwoYm9hcmRNYXQpKSBwdWJTdWIucHVibGlzaCgnZ2FtZUVuZGVkJywgJ2RyYXcnKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcHViU3ViLnB1Ymxpc2goJ2dhbWVFbmRlZCcsIHJlcyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1cGRhdGVHcmlkKFtyLCBjLCBzeW1ib2xdKSB7IC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGNvbnN0IHVwZGF0ZWRNYXRyaXggPSBwaWNrR3JpZChib2FyZE1hdCwgciwgYywgc3ltYm9sKTtcclxuICAgIGJvYXJkTWF0ID0gdXBkYXRlZE1hdHJpeDtcclxuICAgIGRlY2lkZUlmRW5kZWQoKTtcclxuICB9XHJcblxyXG4gIC8vIEV2ZW50IHN1YnNjcmlwdGlvblxyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3Jlc3RhcnRHYW1lJywgcmVzZXQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dyaWRQaWNrZWRCZWZvcmVFbmQnLCBwcm9jZXNzT3JSZWplY3RHcmlkUGlja2VkKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCd1cGRhdGVHcmlkUGlja2VkJywgdXBkYXRlR3JpZCk7XHJcbn0pKCk7XHJcbiIsImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xyXG5cclxuKCgpID0+IHtcclxuICAvLyBMb2dpYyB2YXJpYWJsZVxyXG4gIGxldCBpc0Nyb3NzVHVybiA9IHRydWU7XHJcbiAgbGV0IGlzR2FtZUVuZGVkID0gZmFsc2U7XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIC8vIGZ1bmN0aW9uIGV4cG9zZUlzQ3Jvc3NUdXJuKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVELCBGT0UgREVCVUdHSU5HXHJcbiAgLy8gICByZXR1cm4gaXNDcm9zc1R1cm47XHJcbiAgLy8gfVxyXG5cclxuICBmdW5jdGlvbiBjaGFuZ2VUdXJuKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBpc0Nyb3NzVHVybiA9ICFpc0Nyb3NzVHVybjtcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCd0dXJuQ2hhbmdlZCcsIG51bGwpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZW5kR2FtZSgpIHtcclxuICAgIGlzR2FtZUVuZGVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc2V0KCkge1xyXG4gICAgaWYgKCFpc0Nyb3NzVHVybikgcHViU3ViLnB1Ymxpc2goJ3R1cm5DaGFuZ2VkJywgbnVsbCk7XHJcbiAgICBpc0Nyb3NzVHVybiA9IHRydWU7XHJcbiAgICBpc0dhbWVFbmRlZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHJvY2Vzc09yUmVqZWN0R3JpZFBpY2tlZChbciwgY10pIHtcclxuICAgIGlmICghaXNHYW1lRW5kZWQpIHB1YlN1Yi5wdWJsaXNoKCdncmlkUGlja2VkQmVmb3JlRW5kJywgW3IsIGNdKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc29sdmVBY2NlcHRlZEdyaWRQaWNrZWQoW3IsIGNdKSB7XHJcbiAgICBjb25zdCBzeW1ib2wgPSBpc0Nyb3NzVHVybiA/ICd4JyA6ICdvJztcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCd1cGRhdGVHcmlkUGlja2VkJywgW3IsIGMsIHN5bWJvbF0pO1xyXG4gIH1cclxuXHJcbiAgLy8gRXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgcHViU3ViLnN1YnNjcmliZSgncmVzdGFydEdhbWUnLCByZXNldCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ3JpZFBpY2tlZCcsIHByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dyaWRQaWNrZWRBY2NlcHRlZCcsIHJlc29sdmVBY2NlcHRlZEdyaWRQaWNrZWQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3VwZGF0ZUdyaWRQaWNrZWQnLCBjaGFuZ2VUdXJuKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdnYW1lRW5kZWQnLCBlbmRHYW1lKTtcclxufSkoKTtcclxuIiwiY29uc3QgcHViU3ViID0gKCgpID0+IHtcclxuICBjb25zdCBtYXAgPSB7fTtcclxuXHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgZnVuY3Rpb24gc3Vic2NyaWJlKGV2ZW50LCBmbikge1xyXG4gICAgaWYgKCFtYXBbZXZlbnRdKSBtYXBbZXZlbnRdID0gW107XHJcbiAgICBtYXBbZXZlbnRdLnB1c2goZm4pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHVibGlzaChldmVudCwgZGF0YSkge1xyXG4gICAgaWYgKG1hcFtldmVudF0pIHtcclxuICAgICAgbWFwW2V2ZW50XS5mb3JFYWNoKChmbikgPT4ge1xyXG4gICAgICAgIGZuKGRhdGEpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKGV2ZW50LCBmbikge1xyXG4gICAgaWYgKG1hcFtldmVudF0pIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXBbZXZlbnRdLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgaWYgKG1hcFtldmVudF1baV0gPT09IGZuKSB7XHJcbiAgICAgICAgICBtYXBbZXZlbnRdLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHsgc3Vic2NyaWJlLCBwdWJsaXNoLCB1bnN1YnNjcmliZSB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHViU3ViO1xyXG4iLCJpbXBvcnQgcHViU3ViIGZyb20gJy4vcHViU3ViJztcclxuaW1wb3J0IHhTeW1ib2wgZnJvbSAnLi9pbWcveC5wbmcnO1xyXG5pbXBvcnQgb1N5bWJvbCBmcm9tICcuL2ltZy9vLnBuZyc7XHJcblxyXG4oKCkgPT4ge1xyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIHRvZ2dsZUVsZW1lbnQoaWQpIHtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgICBmb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY2xvc2VQb3B1cChldmVudCkge1xyXG4gICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xyXG4gICAgY29uc3QgcGFyZW50ID0gdGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZTtcclxuICAgIHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgIGlmIChwYXJlbnQuaWQgPT09ICdyZXN1bHQtZm9ybScpIHsgLy8gTmVlZCB0byBjbGVhciByZXN1bHQgYWRkZWRcclxuICAgICAgY29uc3QgcmVzSW1nV3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXMtaW1nLXdyYXBwZXInKTtcclxuICAgICAgd2hpbGUgKHJlc0ltZ1dyYXBwZXIuZmlyc3RDaGlsZCkgcmVzSW1nV3JhcHBlci5yZW1vdmVDaGlsZChyZXNJbWdXcmFwcGVyLmxhc3RDaGlsZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNldCgpIHtcclxuICAgIGNvbnN0IGltZ1MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCA+IGltZycpO1xyXG4gICAgaW1nUy5mb3JFYWNoKChpbWcpID0+IHtcclxuICAgICAgaW1nLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW1nKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdXBkYXRlR3JpZChbciwgYywgc3ltYm9sXSkge1xyXG4gICAgY29uc3QgaW1nID0gc3ltYm9sID09PSAneCcgPyB4U3ltYm9sIDogb1N5bWJvbDtcclxuICAgIGNvbnN0IGltZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIGltZ05vZGUuc3JjID0gaW1nO1xyXG4gICAgY29uc3QgY2VsbE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY2VsbFtkYXRhLXI9XCIke3J9XCJdW2RhdGEtYz1cIiR7Y31cIl1gKTtcclxuICAgIGNlbGxOb2RlLmFwcGVuZENoaWxkKGltZ05vZGUpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGlzcGxheVJlc3VsdCh3aW5uZXIpIHtcclxuICAgIGNvbnN0IHJlc0ltZ1dyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzLWltZy13cmFwcGVyJyk7XHJcbiAgICBjb25zdCByZXN1bHRUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdC10ZXh0Jyk7XHJcbiAgICBpZiAod2lubmVyID09PSAnZHJhdycpIHtcclxuICAgICAgY29uc3QgaW1nTm9kZTEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgY29uc3QgaW1nTm9kZTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgaW1nTm9kZTEuc3JjID0geFN5bWJvbDtcclxuICAgICAgaW1nTm9kZTIuc3JjID0gb1N5bWJvbDtcclxuICAgICAgcmVzSW1nV3JhcHBlci5hcHBlbmRDaGlsZChpbWdOb2RlMSk7XHJcbiAgICAgIHJlc0ltZ1dyYXBwZXIuYXBwZW5kQ2hpbGQoaW1nTm9kZTIpO1xyXG4gICAgICByZXN1bHRUZXh0LnRleHRDb250ZW50ID0gJ0RSQVchJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGltZyA9IHdpbm5lciA9PT0gJ3gnID8geFN5bWJvbCA6IG9TeW1ib2w7XHJcbiAgICAgIGNvbnN0IGltZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgaW1nTm9kZS5zcmMgPSBpbWc7XHJcbiAgICAgIHJlc0ltZ1dyYXBwZXIuYXBwZW5kQ2hpbGQoaW1nTm9kZSk7XHJcbiAgICAgIHJlc3VsdFRleHQudGV4dENvbnRlbnQgPSAnV0lOTkVSISc7XHJcbiAgICB9XHJcbiAgICB0b2dnbGVFbGVtZW50KCdyZXN1bHQtZm9ybScpO1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGVib3VuY2UoZm4sIHQpIHtcclxuICAgIGxldCB0aW1lSWQ7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gZGVib3VuY2VkKC4uLmFyZ3MpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVJZCk7XHJcbiAgICAgIHRpbWVJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGZuKC4uLmFyZ3MpO1xyXG4gICAgICB9LCB0KTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzaGFrZUNlbGwoW3IsIGNdKSB7XHJcbiAgICBjb25zdCBjZWxsTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jZWxsW2RhdGEtcj1cIiR7cn1cIl1bZGF0YS1jPVwiJHtjfVwiXWApO1xyXG4gICAgY2VsbE5vZGUuY2xhc3NMaXN0LmFkZCgnc2hha2UnKTtcclxuICAgIGRlYm91bmNlKCgpID0+IHtcclxuICAgICAgY2VsbE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnc2hha2UnKTtcclxuICAgIH0sIDEwMDApKCk7XHJcbiAgfVxyXG5cclxuICAvLyBDYWNoZSBET00gYW5kIGJpbmQgZXZlbnRzXHJcbiAgY29uc3QgcmVzdGFydEdhbWVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGFydC1idG4nKTtcclxuICByZXN0YXJ0R2FtZUJ0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgcHViU3ViLnB1Ymxpc2goJ3Jlc3RhcnRHYW1lJywgbnVsbCk7XHJcbiAgICBwdWJTdWIucHVibGlzaCgncG9wQ2xpY2tlZCcsIG51bGwpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHBsYXlBZ2FpbkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5LWFnYWluLWJ0bicpO1xyXG4gIHBsYXlBZ2FpbkJ0bi5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdvdmVybGF5Jyk7XHJcbiAgICBjbG9zZVBvcHVwKGV2ZW50KTtcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdyZXN0YXJ0R2FtZScsIG51bGwpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG1vZGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kZS1idG4nKTtcclxuICBtb2RlQnRuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdvdmVybGF5Jyk7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdtb2RlLWZvcm0nKTtcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdwb3BDbGlja2VkJywgbnVsbCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbXV0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtdXRlLWJ0bicpO1xyXG4gIGNvbnN0IG11dGVCdG5TeW1iID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI211dGUtYnRuPmlvbi1pY29uJyk7XHJcbiAgbXV0ZUJ0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgaWYgKG11dGVCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdtdXRlZCcpKSB7IC8vIFVubXV0ZSBub3dcclxuICAgICAgbXV0ZUJ0blN5bWIubmFtZSA9ICd2b2x1bWUtbXV0ZS1vdXRsaW5lJztcclxuICAgICAgbXV0ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdtdXRlZCcpO1xyXG4gICAgICBwdWJTdWIucHVibGlzaCgncGxheUp1ZGdlVHJlZScsIG51bGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbXV0ZUJ0blN5bWIubmFtZSA9ICdtdXNpY2FsLW5vdGVzLW91dGxpbmUnOyAvLyBNdXRlIG5vd1xyXG4gICAgICBtdXRlQnRuLmNsYXNzTGlzdC5hZGQoJ211dGVkJyk7XHJcbiAgICAgIHB1YlN1Yi5wdWJsaXNoKCdzdG9wSnVkZ2VUcmVlJywgbnVsbCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaW5mb0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmZvLWJ0bicpO1xyXG4gIGluZm9CdG4ub25jbGljayA9ICgpID0+IHtcclxuICAgIHRvZ2dsZUVsZW1lbnQoJ292ZXJsYXknKTtcclxuICAgIHRvZ2dsZUVsZW1lbnQoJ2luZm8tZm9ybScpO1xyXG4gICAgcHViU3ViLnB1Ymxpc2goJ3BvcENsaWNrZWQnLCBudWxsKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBpbmZvQ3Jvc3NCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvcm0td3JhcHBlcj5zcGFuLmljb24tY2xvc2UnKTtcclxuICBpbmZvQ3Jvc3NCdG5zLmZvckVhY2goKGJ0bikgPT4ge1xyXG4gICAgY29uc3Qgb3B0ID0gYnRuOyAvLyBDYW5ub3QgbW9kaWZ5IGZ1bmN0aW9uIHBhcmFtIGRpcmVjdGx5XHJcbiAgICBvcHQub25jbGljayA9IChldmVudCkgPT4ge1xyXG4gICAgICB0b2dnbGVFbGVtZW50KCdvdmVybGF5Jyk7XHJcbiAgICAgIGNsb3NlUG9wdXAoZXZlbnQpO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xyXG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcclxuICAgIGNvbnN0IG9wdCA9IGNlbGw7XHJcbiAgICBvcHQub25jbGljayA9ICgpID0+IHtcclxuICAgICAgY29uc3QgciA9IG9wdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcicpO1xyXG4gICAgICBjb25zdCBjID0gb3B0LmdldEF0dHJpYnV0ZSgnZGF0YS1jJyk7XHJcbiAgICAgIHB1YlN1Yi5wdWJsaXNoKCdncmlkUGlja2VkJywgW3IsIGNdKTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIC8vIEV2ZW50IHN1YnNjcmlwdGlvblxyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3Jlc3RhcnRHYW1lJywgcmVzZXQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3VwZGF0ZUdyaWRQaWNrZWQnLCB1cGRhdGVHcmlkKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdncmlkUGlja2VkUmVqZWN0ZWQnLCBzaGFrZUNlbGwpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dhbWVFbmRlZCcsIGRpc3BsYXlSZXN1bHQpO1xyXG59KSgpO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiLy8gQ29yZSBtb2R1bGVzXG5pbXBvcnQgJy4vZ2FtZUJvYXJkJztcbmltcG9ydCAnLi9sb2dpYyc7XG5pbXBvcnQgJy4vdWknO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG4vLyBPcHRpb25hbCBtb2R1bGVzXG5pbXBvcnQgJy4vYmFja2dyb3VuZCc7XG5pbXBvcnQgJy4vYXVkaW8nO1xuIl0sIm5hbWVzIjpbInB1YlN1YiIsImdyYXNzIiwiZXJyb3IiLCJwb3AiLCJqdWRnZVRyZWUiLCJtdXRlQnRuIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNyZWF0ZUF1ZGlvTm9kZSIsImF1ZGlvU3JjIiwiaWQiLCJhdWROb2RlIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsInBsYXlTb3VuZCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwicCIsImN1cnJlbnRUaW1lIiwicGxheSIsInN0b3BTb3VuZCIsInBhdXNlIiwiZ3Jhc3NOb2RlIiwiZXJyb3JOb2RlIiwicG9wTm9kZSIsImp1ZGdlVHJlZU5vZGUiLCJ2b2x1bWUiLCJsb29wIiwic3Vic2NyaWJlIiwieEltZyIsIm9JbWciLCJib2R5IiwicXVlcnlTZWxlY3RvciIsImJhY2tncm91bmQiLCJhZGQiLCJnZXRBc3BlY3RSYXRpbyIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsImNyZWF0ZUltZ05vZGUiLCJpbWdTcmMiLCJjbGFzc05hbWVMaXN0IiwiaW1nTm9kZSIsImZvckVhY2giLCJjbGFzc05hbWUiLCJpbnNlcnRNb3RpZiIsInIiLCJjIiwid2lkdGgiLCJ2ZXJ0aWNhbEdhcCIsImhvcml6b250YWxHYXAiLCJpIiwiaiIsIm5vZGUiLCJzdHlsZSIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsImFwcGVuZENoaWxkIiwiaW5zZXJ0Qm90aE1vdGlmIiwiYWN0aXZlSW1nU3JjIiwiYWN0aXZlQ2xhc3NOYW1lTGlzdCIsImluYWN0aXZlSW1nU3JjIiwiaW5hY3RpdmVDbGFzc05hbWVMaXN0IiwiZGVsZXRlTW90aWYiLCJsYXN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsImZpcnN0Q2hpbGQiLCJzd2FwTW90aWYiLCJhY3RpdmVOb2RlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbmFjdGl2ZU5vZGVzIiwicmVtb3ZlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInhJc0FjdGl2ZSIsImxlbiIsImJvYXJkTWF0IiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiZmlsbCIsImdldFJlc3VsdCIsIm1hdCIsInJvd1JlZiIsInB1Ymxpc2giLCJjb2xSZWYiLCJpc0Z1bGwiLCJwaWNrR3JpZCIsInN5bWIiLCJuZXdNYXQiLCJzbGljZSIsInJlc2V0IiwicHJvY2Vzc09yUmVqZWN0R3JpZFBpY2tlZCIsImRlY2lkZUlmRW5kZWQiLCJyZXMiLCJ1cGRhdGVHcmlkIiwic3ltYm9sIiwidXBkYXRlZE1hdHJpeCIsImlzQ3Jvc3NUdXJuIiwiaXNHYW1lRW5kZWQiLCJjaGFuZ2VUdXJuIiwiZW5kR2FtZSIsInJlc29sdmVBY2NlcHRlZEdyaWRQaWNrZWQiLCJtYXAiLCJldmVudCIsImZuIiwicHVzaCIsImRhdGEiLCJ1bnN1YnNjcmliZSIsInNwbGljZSIsInhTeW1ib2wiLCJvU3ltYm9sIiwidG9nZ2xlRWxlbWVudCIsImZvcm0iLCJ0b2dnbGUiLCJjbG9zZVBvcHVwIiwidGFyZ2V0IiwicGFyZW50IiwicGFyZW50Tm9kZSIsInJlc0ltZ1dyYXBwZXIiLCJpbWdTIiwiaW1nIiwiY2VsbE5vZGUiLCJkaXNwbGF5UmVzdWx0Iiwid2lubmVyIiwicmVzdWx0VGV4dCIsImltZ05vZGUxIiwiaW1nTm9kZTIiLCJ0ZXh0Q29udGVudCIsImRlYm91bmNlIiwidCIsInRpbWVJZCIsImRlYm91bmNlZCIsImFyZ3MiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0Iiwic2hha2VDZWxsIiwicmVzdGFydEdhbWVCdG4iLCJvbmNsaWNrIiwicGxheUFnYWluQnRuIiwibW9kZUJ0biIsIm11dGVCdG5TeW1iIiwibmFtZSIsImluZm9CdG4iLCJpbmZvQ3Jvc3NCdG5zIiwiYnRuIiwib3B0IiwiY2VsbHMiLCJjZWxsIiwiZ2V0QXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==