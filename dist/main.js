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
  document.querySelector('body').appendChild(judgeTreeNode);
  playSound(judgeTreeNode);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0o7QUFDSDtBQUNPO0FBQ3JCO0FBQ3NCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2F1ZGlvLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9iYWNrZ3JvdW5kLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2xvZ2ljLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9wdWJTdWIuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL3VpLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9iYWNrZ3JvdW5kLmNzcz8zMzFlIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9zdHlsZS5jc3M/ZTMyMCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xyXG5pbXBvcnQgZ3Jhc3MgZnJvbSAnLi9hdWRpb0QvZ3Jhc3Mud2F2JztcclxuaW1wb3J0IGVycm9yIGZyb20gJy4vYXVkaW9EL2Vycm9yLndhdic7XHJcbmltcG9ydCBwb3AgZnJvbSAnLi9hdWRpb0QvcG9wLndhdic7XHJcbmltcG9ydCBqdWRnZVRyZWUgZnJvbSAnLi9hdWRpb0QvanVkZ2VUcmVlLm1wMyc7XHJcblxyXG4oKCkgPT4ge1xyXG4gIC8vIENhY2hlIERPTVxyXG4gIGNvbnN0IG11dGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXV0ZS1idG4nKTtcclxuXHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgZnVuY3Rpb24gY3JlYXRlQXVkaW9Ob2RlKGF1ZGlvU3JjLCBpZCkge1xyXG4gICAgY29uc3QgYXVkTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJyk7XHJcbiAgICBhdWROb2RlLnNyYyA9IGF1ZGlvU3JjO1xyXG4gICAgYXVkTm9kZS5pZCA9IGlkO1xyXG4gICAgcmV0dXJuIGF1ZE5vZGU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwbGF5U291bmQoYXVkTm9kZSkge1xyXG4gICAgaWYgKG11dGVCdG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdtdXRlZCcpKSByZXR1cm47XHJcbiAgICBjb25zdCBwID0gYXVkTm9kZTtcclxuICAgIHAuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgcC5wbGF5KCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzdG9wU291bmQoYXVkTm9kZSkge1xyXG4gICAgY29uc3QgcCA9IGF1ZE5vZGU7XHJcbiAgICBwLnBhdXNlKCk7XHJcbiAgICBwLmN1cnJlbnRUaW1lID0gMDtcclxuICB9XHJcblxyXG4gIC8vIEluaXQgYXVkaW8gbm9kZVxyXG4gIGNvbnN0IGdyYXNzTm9kZSA9IGNyZWF0ZUF1ZGlvTm9kZShncmFzcywgJ2dyYXNzJyk7XHJcbiAgY29uc3QgZXJyb3JOb2RlID0gY3JlYXRlQXVkaW9Ob2RlKGVycm9yLCAnZXJyb3InKTtcclxuICBjb25zdCBwb3BOb2RlID0gY3JlYXRlQXVkaW9Ob2RlKHBvcCwgJ3BvcCcpO1xyXG4gIGNvbnN0IGp1ZGdlVHJlZU5vZGUgPSBjcmVhdGVBdWRpb05vZGUoanVkZ2VUcmVlLCAnanVkZ2VUcmVlJyk7XHJcbiAganVkZ2VUcmVlTm9kZS52b2x1bWUgPSAwLjQ7XHJcbiAganVkZ2VUcmVlTm9kZS5sb29wID0gdHJ1ZTtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQoanVkZ2VUcmVlTm9kZSk7XHJcbiAgcGxheVNvdW5kKGp1ZGdlVHJlZU5vZGUpO1xyXG5cclxuICAvLyBFdmVudCBzdWJzY3JpcHRpb25cclxuICBwdWJTdWIuc3Vic2NyaWJlKCd1cGRhdGVHcmlkUGlja2VkJywgKCkgPT4gcGxheVNvdW5kKGdyYXNzTm9kZSkpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dyaWRQaWNrZWRSZWplY3RlZCcsICgpID0+IHBsYXlTb3VuZChlcnJvck5vZGUpKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdwb3BDbGlja2VkJywgKCkgPT4gcGxheVNvdW5kKHBvcE5vZGUpKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdwbGF5SnVkZ2VUcmVlJywgKCkgPT4ge1xyXG4gICAgcGxheVNvdW5kKGp1ZGdlVHJlZU5vZGUpO1xyXG4gIH0pO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3N0b3BKdWRnZVRyZWUnLCAoKSA9PiBzdG9wU291bmQoanVkZ2VUcmVlTm9kZSkpO1xyXG59KSgpO1xyXG4iLCJpbXBvcnQgcHViU3ViIGZyb20gJy4vcHViU3ViJztcclxuaW1wb3J0ICcuL2JhY2tncm91bmQuY3NzJztcclxuaW1wb3J0IHhJbWcgZnJvbSAnLi9pbWcveC5wbmcnO1xyXG5pbXBvcnQgb0ltZyBmcm9tICcuL2ltZy9vLnBuZyc7XHJcblxyXG4oKCkgPT4ge1xyXG4gIC8vIENhY2hlIGFuZCBjcmVhdGUgRE9NIG5lZWRlZCBmb3IgYmFja2dyb3VuZCBoYW5kbGluZ1xyXG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblxyXG4gIGNvbnN0IGJhY2tncm91bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBiYWNrZ3JvdW5kLmNsYXNzTGlzdC5hZGQoJ2JhY2tncm91bmQtd3JhcHBlcicpO1xyXG5cclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICBmdW5jdGlvbiBnZXRBc3BlY3RSYXRpbygpIHtcclxuICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZUltZ05vZGUoaW1nU3JjLCBjbGFzc05hbWVMaXN0KSB7XHJcbiAgICBjb25zdCBpbWdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICBpbWdOb2RlLnNyYyA9IGltZ1NyYztcclxuICAgIGNsYXNzTmFtZUxpc3QuZm9yRWFjaCgoY2xhc3NOYW1lKSA9PiB7XHJcbiAgICAgIGltZ05vZGUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaW1nTm9kZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluc2VydE1vdGlmKGltZ1NyYywgY2xhc3NOYW1lTGlzdCwgciwgYywgd2lkdGgpIHtcclxuICAgIC8vIEluc2VydCByIGJ5IGMgbW90aWZzXHJcbiAgICBjb25zdCB2ZXJ0aWNhbEdhcCA9IDEwMCAvIHI7XHJcbiAgICBjb25zdCBob3Jpem9udGFsR2FwID0gMTAwIC8gYztcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcjsgaSArPSAxKSB7XHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYzsgaiArPSAxKSB7XHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IGNyZWF0ZUltZ05vZGUoaW1nU3JjLCBjbGFzc05hbWVMaXN0KTtcclxuICAgICAgICBub2RlLnN0eWxlLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgbm9kZS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgICAgbm9kZS5zdHlsZS50b3AgPSBgJHt2ZXJ0aWNhbEdhcCAqIGl9JWA7XHJcbiAgICAgICAgbm9kZS5zdHlsZS5sZWZ0ID0gYCR7aG9yaXpvbnRhbEdhcCAqIChqICsgKGkgJSAyID8gMC41IDogMCkpfSVgO1xyXG4gICAgICAgIGJhY2tncm91bmQuYXBwZW5kQ2hpbGQobm9kZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluc2VydEJvdGhNb3RpZihcclxuICAgIGFjdGl2ZUltZ1NyYyxcclxuICAgIGFjdGl2ZUNsYXNzTmFtZUxpc3QsXHJcbiAgICBpbmFjdGl2ZUltZ1NyYyxcclxuICAgIGluYWN0aXZlQ2xhc3NOYW1lTGlzdCxcclxuICAgIHIsXHJcbiAgICBjLFxyXG4gICAgd2lkdGgsXHJcbiAgKSB7XHJcbiAgICBpbnNlcnRNb3RpZihhY3RpdmVJbWdTcmMsIFsuLi5hY3RpdmVDbGFzc05hbWVMaXN0LCAnYWN0aXZlJ10sIHIsIGMsIHdpZHRoKTtcclxuICAgIGluc2VydE1vdGlmKGluYWN0aXZlSW1nU3JjLCBpbmFjdGl2ZUNsYXNzTmFtZUxpc3QsIHIsIGMsIHdpZHRoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRlbGV0ZU1vdGlmKCkge1xyXG4gICAgd2hpbGUgKGJhY2tncm91bmQubGFzdENoaWxkKSBiYWNrZ3JvdW5kLnJlbW92ZUNoaWxkKGJhY2tncm91bmQuZmlyc3RDaGlsZCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzd2FwTW90aWYoKSB7XHJcbiAgICBjb25zdCBhY3RpdmVOb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iYWNrZ3JvdW5kLXdyYXBwZXIgaW1nLmFjdGl2ZScpO1xyXG4gICAgY29uc3QgaW5hY3RpdmVOb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iYWNrZ3JvdW5kLXdyYXBwZXIgaW1nOm5vdCguYWN0aXZlKScpO1xyXG4gICAgYWN0aXZlTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4geyBub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpOyB9KTtcclxuICAgIGluYWN0aXZlTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4geyBub2RlLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpOyB9KTtcclxuICB9XHJcblxyXG4gIC8vIEluaXQgYW5kIGJpbmQgZXZlbnRzXHJcbiAgaWYgKGdldEFzcGVjdFJhdGlvKCkgPiAzIC8gNCkge1xyXG4gICAgaW5zZXJ0Qm90aE1vdGlmKHhJbWcsIFsneEltZycsICdhY3RpdmUnXSwgb0ltZywgWydvSW1nJ10sIDQsIDcsICcxMCUnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgaW5zZXJ0Qm90aE1vdGlmKHhJbWcsIFsneEltZycsICdhY3RpdmUnXSwgb0ltZywgWydvSW1nJ10sIDEwLCA0LCAnMjAlJyk7XHJcbiAgfVxyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgLy8gTmVlZCB0byBnZXQgd2hpY2ggbW90aWYgaXMgY3VycmVudGx5IGFjdGl2ZSBmaXJzdFxyXG4gICAgY29uc3QgeElzQWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhY2tncm91bmQtd3JhcHBlciBpbWcueEltZycpLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJyk7XHJcbiAgICBkZWxldGVNb3RpZigpO1xyXG4gICAgaWYgKGdldEFzcGVjdFJhdGlvKCkgPiAzIC8gNCkge1xyXG4gICAgICBpZiAoeElzQWN0aXZlKSB7XHJcbiAgICAgICAgaW5zZXJ0Qm90aE1vdGlmKHhJbWcsIFsneEltZycsICdhY3RpdmUnXSwgb0ltZywgWydvSW1nJ10sIDQsIDcsICcxMCUnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpbnNlcnRCb3RoTW90aWYob0ltZywgWydvSW1nJywgJ2FjdGl2ZSddLCB4SW1nLCBbJ3hJbWcnXSwgNCwgNywgJzEwJScpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHhJc0FjdGl2ZSkge1xyXG4gICAgICBpbnNlcnRCb3RoTW90aWYoeEltZywgWyd4SW1nJywgJ2FjdGl2ZSddLCBvSW1nLCBbJ29JbWcnXSwgMTAsIDQsICcyMCUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGluc2VydEJvdGhNb3RpZihvSW1nLCBbJ29JbWcnLCAnYWN0aXZlJ10sIHhJbWcsIFsneEltZyddLCAxMCwgNCwgJzIwJScpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBib2R5LmFwcGVuZENoaWxkKGJhY2tncm91bmQpO1xyXG5cclxuICAvLyBFdmVudCBzdWJzY3JpcHRpb25cclxuICBwdWJTdWIuc3Vic2NyaWJlKCd0dXJuQ2hhbmdlZCcsIHN3YXBNb3RpZik7XHJcbn0pKCk7XHJcbiIsImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xyXG5cclxuKCgpID0+IHtcclxuICBjb25zdCBsZW4gPSAzO1xyXG4gIGxldCBib2FyZE1hdCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IGxlbiB9LCAoKSA9PiBuZXcgQXJyYXkobGVuKS5maWxsKCcuJykpO1xyXG5cclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICAvLyBmdW5jdGlvbiBleHBvc2VHcmlkKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVELCBGT1IgREVCVUdHSU5HXHJcbiAgLy8gICBsZXQgb3V0cHV0U3RyID0gJyc7XHJcbiAgLy8gICBib2FyZE1hdC5mb3JFYWNoKChyb3cpID0+IHtcclxuICAvLyAgICAgb3V0cHV0U3RyID0gYCR7b3V0cHV0U3RyfSR7SlNPTi5zdHJpbmdpZnkocm93KX1cXG5gO1xyXG4gIC8vICAgfSk7XHJcbiAgLy8gICByZXR1cm4gYm9hcmRNYXQ7XHJcbiAgLy8gfVxyXG5cclxuICBmdW5jdGlvbiBnZXRSZXN1bHQobWF0KSB7IC8vIElNUFVSRSwgUEFTU0VEIFdJVEggTU9DSyBQVUJTVUJcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgLy8gUm93LXdpc2VcclxuICAgICAgY29uc3Qgcm93UmVmID0gbWF0W2ldWzBdO1xyXG4gICAgICBpZiAocm93UmVmICE9PSAnLicpIHtcclxuICAgICAgICBmb3IgKGxldCBjID0gMTsgYyA8IGxlbjsgYyArPSAxKSB7XHJcbiAgICAgICAgICBpZiAobWF0W2ldW2NdICE9PSByb3dSZWYpIGJyZWFrO1xyXG4gICAgICAgICAgaWYgKGMgPT09IGxlbiAtIDEpIHtcclxuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3dpbm5lckRlY2lkZWQnLCByb3dSZWYpO1xyXG4gICAgICAgICAgICByZXR1cm4gcm93UmVmO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyBDb2x1bW4td2lzZVxyXG4gICAgICBjb25zdCBjb2xSZWYgPSBtYXRbMF1baV07XHJcbiAgICAgIGlmIChjb2xSZWYgIT09ICcuJykge1xyXG4gICAgICAgIGZvciAobGV0IHIgPSAxOyByIDwgbGVuOyByICs9IDEpIHtcclxuICAgICAgICAgIGlmIChtYXRbcl1baV0gIT09IGNvbFJlZikgYnJlYWs7XHJcbiAgICAgICAgICBpZiAociA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnd2lubmVyRGVjaWRlZCcsIGNvbFJlZik7XHJcbiAgICAgICAgICAgIHJldHVybiBjb2xSZWY7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBEaWFnb25hbHNcclxuICAgIGlmIChtYXRbMF1bMF0gIT09ICcuJykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgICAgaWYgKG1hdFtpXVtpXSAhPT0gbWF0WzBdWzBdKSBicmVhaztcclxuICAgICAgICBpZiAoaSA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3dpbm5lckRlY2lkZWQnLCBtYXRbMF1bMF0pO1xyXG4gICAgICAgICAgcmV0dXJuIG1hdFswXVswXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChtYXRbMF1bbGVuIC0gMV0gIT09ICcuJykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgICAgaWYgKG1hdFtpXVtsZW4gLSAxIC0gaV0gIT09IG1hdFswXVtsZW4gLSAxXSkgYnJlYWs7XHJcbiAgICAgICAgaWYgKGkgPT09IGxlbiAtIDEpIHtcclxuICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd3aW5uZXJEZWNpZGVkJywgbWF0WzBdW2xlbiAtIDFdKTtcclxuICAgICAgICAgIHJldHVybiBtYXRbMF1bbGVuIC0gMV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpc0Z1bGwobWF0KSB7IC8vIFBVUkUsIFVOVEVTVEVEXHJcbiAgICBmb3IgKGxldCByID0gMDsgciA8IGxlbjsgciArPSAxKSB7XHJcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgbGVuOyBjICs9IDEpIHtcclxuICAgICAgICBpZiAobWF0W3JdW2NdID09PSAnLicpIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwaWNrR3JpZChtYXQsIHIsIGMsIHN5bWIpIHtcclxuICAgIC8vIElNUFVSRSwgUEFTU0VEIFdJVEggTU9DSyBQVUJTVUJcclxuICAgIGlmIChyIDwgMCB8fCByID49IGxlbiB8fCBjIDwgMCB8fCBjID49IGxlbikgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKG1hdFtyXVtjXSAhPT0gJy4nKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBuZXdNYXQgPSBuZXcgQXJyYXkobGVuKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgbmV3TWF0W2ldID0gbWF0W2ldLnNsaWNlKCk7XHJcbiAgICB9XHJcbiAgICBuZXdNYXRbcl1bY10gPSBzeW1iO1xyXG4gICAgcmV0dXJuIG5ld01hdDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc2V0KCkge1xyXG4gICAgLy8gSU1QVVJFLCBVTlRFU1RFRFxyXG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCBsZW47IHIgKz0gMSkge1xyXG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGxlbjsgYyArPSAxKSB7XHJcbiAgICAgICAgYm9hcmRNYXRbcl1bY10gPSAnLic7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQoW3IsIGNdKSB7IC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGlmIChib2FyZE1hdFtyXVtjXSA9PT0gJy4nKSBwdWJTdWIucHVibGlzaCgnZ3JpZFBpY2tlZEFjY2VwdGVkJywgW3IsIGNdKTtcclxuICAgIGVsc2UgcHViU3ViLnB1Ymxpc2goJ2dyaWRQaWNrZWRSZWplY3RlZCcsIFtyLCBjXSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkZWNpZGVJZkVuZGVkKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBjb25zdCByZXMgPSBnZXRSZXN1bHQoYm9hcmRNYXQpO1xyXG4gICAgaWYgKHJlcyA9PT0gZmFsc2UpIHtcclxuICAgICAgaWYgKGlzRnVsbChib2FyZE1hdCkpIHB1YlN1Yi5wdWJsaXNoKCdnYW1lRW5kZWQnLCAnZHJhdycpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwdWJTdWIucHVibGlzaCgnZ2FtZUVuZGVkJywgcmVzKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVwZGF0ZUdyaWQoW3IsIGMsIHN5bWJvbF0pIHsgLy8gSU1QVVJFLCBVTlRFU1RFRFxyXG4gICAgY29uc3QgdXBkYXRlZE1hdHJpeCA9IHBpY2tHcmlkKGJvYXJkTWF0LCByLCBjLCBzeW1ib2wpO1xyXG4gICAgYm9hcmRNYXQgPSB1cGRhdGVkTWF0cml4O1xyXG4gICAgZGVjaWRlSWZFbmRlZCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gRXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgcHViU3ViLnN1YnNjcmliZSgncmVzdGFydEdhbWUnLCByZXNldCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ3JpZFBpY2tlZEJlZm9yZUVuZCcsIHByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3VwZGF0ZUdyaWRQaWNrZWQnLCB1cGRhdGVHcmlkKTtcclxufSkoKTtcclxuIiwiaW1wb3J0IHB1YlN1YiBmcm9tICcuL3B1YlN1Yic7XHJcblxyXG4oKCkgPT4ge1xyXG4gIC8vIExvZ2ljIHZhcmlhYmxlXHJcbiAgbGV0IGlzQ3Jvc3NUdXJuID0gdHJ1ZTtcclxuICBsZXQgaXNHYW1lRW5kZWQgPSBmYWxzZTtcclxuXHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgLy8gZnVuY3Rpb24gZXhwb3NlSXNDcm9zc1R1cm4oKSB7IC8vIElNUFVSRSwgVU5URVNURUQsIEZPRSBERUJVR0dJTkdcclxuICAvLyAgIHJldHVybiBpc0Nyb3NzVHVybjtcclxuICAvLyB9XHJcblxyXG4gIGZ1bmN0aW9uIGNoYW5nZVR1cm4oKSB7IC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGlzQ3Jvc3NUdXJuID0gIWlzQ3Jvc3NUdXJuO1xyXG4gICAgcHViU3ViLnB1Ymxpc2goJ3R1cm5DaGFuZ2VkJywgbnVsbCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBlbmRHYW1lKCkge1xyXG4gICAgaXNHYW1lRW5kZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzZXQoKSB7XHJcbiAgICBpZiAoIWlzQ3Jvc3NUdXJuKSBwdWJTdWIucHVibGlzaCgndHVybkNoYW5nZWQnLCBudWxsKTtcclxuICAgIGlzQ3Jvc3NUdXJuID0gdHJ1ZTtcclxuICAgIGlzR2FtZUVuZGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwcm9jZXNzT3JSZWplY3RHcmlkUGlja2VkKFtyLCBjXSkge1xyXG4gICAgaWYgKCFpc0dhbWVFbmRlZCkgcHViU3ViLnB1Ymxpc2goJ2dyaWRQaWNrZWRCZWZvcmVFbmQnLCBbciwgY10pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzb2x2ZUFjY2VwdGVkR3JpZFBpY2tlZChbciwgY10pIHtcclxuICAgIGNvbnN0IHN5bWJvbCA9IGlzQ3Jvc3NUdXJuID8gJ3gnIDogJ28nO1xyXG4gICAgcHViU3ViLnB1Ymxpc2goJ3VwZGF0ZUdyaWRQaWNrZWQnLCBbciwgYywgc3ltYm9sXSk7XHJcbiAgfVxyXG5cclxuICAvLyBFdmVudCBzdWJzY3JpcHRpb25cclxuICBwdWJTdWIuc3Vic2NyaWJlKCdyZXN0YXJ0R2FtZScsIHJlc2V0KTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdncmlkUGlja2VkJywgcHJvY2Vzc09yUmVqZWN0R3JpZFBpY2tlZCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ3JpZFBpY2tlZEFjY2VwdGVkJywgcmVzb2x2ZUFjY2VwdGVkR3JpZFBpY2tlZCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgndXBkYXRlR3JpZFBpY2tlZCcsIGNoYW5nZVR1cm4pO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dhbWVFbmRlZCcsIGVuZEdhbWUpO1xyXG59KSgpO1xyXG4iLCJjb25zdCBwdWJTdWIgPSAoKCkgPT4ge1xyXG4gIGNvbnN0IG1hcCA9IHt9O1xyXG5cclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICBmdW5jdGlvbiBzdWJzY3JpYmUoZXZlbnQsIGZuKSB7XHJcbiAgICBpZiAoIW1hcFtldmVudF0pIG1hcFtldmVudF0gPSBbXTtcclxuICAgIG1hcFtldmVudF0ucHVzaChmbik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwdWJsaXNoKGV2ZW50LCBkYXRhKSB7XHJcbiAgICBpZiAobWFwW2V2ZW50XSkge1xyXG4gICAgICBtYXBbZXZlbnRdLmZvckVhY2goKGZuKSA9PiB7XHJcbiAgICAgICAgZm4oZGF0YSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdW5zdWJzY3JpYmUoZXZlbnQsIGZuKSB7XHJcbiAgICBpZiAobWFwW2V2ZW50XSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcFtldmVudF0ubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICBpZiAobWFwW2V2ZW50XVtpXSA9PT0gZm4pIHtcclxuICAgICAgICAgIG1hcFtldmVudF0uc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4geyBzdWJzY3JpYmUsIHB1Ymxpc2gsIHVuc3Vic2NyaWJlIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwdWJTdWI7XHJcbiIsImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xyXG5pbXBvcnQgeFN5bWJvbCBmcm9tICcuL2ltZy94LnBuZyc7XHJcbmltcG9ydCBvU3ltYm9sIGZyb20gJy4vaW1nL28ucG5nJztcclxuXHJcbigoKSA9PiB7XHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgZnVuY3Rpb24gdG9nZ2xlRWxlbWVudChpZCkge1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuICAgIGZvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjbG9zZVBvcHVwKGV2ZW50KSB7XHJcbiAgICBjb25zdCB7IHRhcmdldCB9ID0gZXZlbnQ7XHJcbiAgICBjb25zdCBwYXJlbnQgPSB0YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xyXG4gICAgcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgaWYgKHBhcmVudC5pZCA9PT0gJ3Jlc3VsdC1mb3JtJykgeyAvLyBOZWVkIHRvIGNsZWFyIHJlc3VsdCBhZGRlZFxyXG4gICAgICBjb25zdCByZXNJbWdXcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlcy1pbWctd3JhcHBlcicpO1xyXG4gICAgICB3aGlsZSAocmVzSW1nV3JhcHBlci5maXJzdENoaWxkKSByZXNJbWdXcmFwcGVyLnJlbW92ZUNoaWxkKHJlc0ltZ1dyYXBwZXIubGFzdENoaWxkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc2V0KCkge1xyXG4gICAgY29uc3QgaW1nUyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsID4gaW1nJyk7XHJcbiAgICBpbWdTLmZvckVhY2goKGltZykgPT4ge1xyXG4gICAgICBpbWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbWcpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1cGRhdGVHcmlkKFtyLCBjLCBzeW1ib2xdKSB7XHJcbiAgICBjb25zdCBpbWcgPSBzeW1ib2wgPT09ICd4JyA/IHhTeW1ib2wgOiBvU3ltYm9sO1xyXG4gICAgY29uc3QgaW1nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgaW1nTm9kZS5zcmMgPSBpbWc7XHJcbiAgICBjb25zdCBjZWxsTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jZWxsW2RhdGEtcj1cIiR7cn1cIl1bZGF0YS1jPVwiJHtjfVwiXWApO1xyXG4gICAgY2VsbE5vZGUuYXBwZW5kQ2hpbGQoaW1nTm9kZSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkaXNwbGF5UmVzdWx0KHdpbm5lcikge1xyXG4gICAgY29uc3QgcmVzSW1nV3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXMtaW1nLXdyYXBwZXInKTtcclxuICAgIGNvbnN0IHJlc3VsdFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0LXRleHQnKTtcclxuICAgIGlmICh3aW5uZXIgPT09ICdkcmF3Jykge1xyXG4gICAgICBjb25zdCBpbWdOb2RlMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICBjb25zdCBpbWdOb2RlMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICBpbWdOb2RlMS5zcmMgPSB4U3ltYm9sO1xyXG4gICAgICBpbWdOb2RlMi5zcmMgPSBvU3ltYm9sO1xyXG4gICAgICByZXNJbWdXcmFwcGVyLmFwcGVuZENoaWxkKGltZ05vZGUxKTtcclxuICAgICAgcmVzSW1nV3JhcHBlci5hcHBlbmRDaGlsZChpbWdOb2RlMik7XHJcbiAgICAgIHJlc3VsdFRleHQudGV4dENvbnRlbnQgPSAnRFJBVyEnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgaW1nID0gd2lubmVyID09PSAneCcgPyB4U3ltYm9sIDogb1N5bWJvbDtcclxuICAgICAgY29uc3QgaW1nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICBpbWdOb2RlLnNyYyA9IGltZztcclxuICAgICAgcmVzSW1nV3JhcHBlci5hcHBlbmRDaGlsZChpbWdOb2RlKTtcclxuICAgICAgcmVzdWx0VGV4dC50ZXh0Q29udGVudCA9ICdXSU5ORVIhJztcclxuICAgIH1cclxuICAgIHRvZ2dsZUVsZW1lbnQoJ3Jlc3VsdC1mb3JtJyk7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdvdmVybGF5Jyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkZWJvdW5jZShmbiwgdCkge1xyXG4gICAgbGV0IHRpbWVJZDtcclxuICAgIHJldHVybiBmdW5jdGlvbiBkZWJvdW5jZWQoLi4uYXJncykge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGltZUlkKTtcclxuICAgICAgdGltZUlkID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZm4oLi4uYXJncyk7XHJcbiAgICAgIH0sIHQpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNoYWtlQ2VsbChbciwgY10pIHtcclxuICAgIGNvbnN0IGNlbGxOb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNlbGxbZGF0YS1yPVwiJHtyfVwiXVtkYXRhLWM9XCIke2N9XCJdYCk7XHJcbiAgICBjZWxsTm9kZS5jbGFzc0xpc3QuYWRkKCdzaGFrZScpO1xyXG4gICAgZGVib3VuY2UoKCkgPT4ge1xyXG4gICAgICBjZWxsTm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdzaGFrZScpO1xyXG4gICAgfSwgMTAwMCkoKTtcclxuICB9XHJcblxyXG4gIC8vIENhY2hlIERPTSBhbmQgYmluZCBldmVudHNcclxuICBjb25zdCByZXN0YXJ0R2FtZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXJ0LWJ0bicpO1xyXG4gIHJlc3RhcnRHYW1lQnRuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICBwdWJTdWIucHVibGlzaCgncmVzdGFydEdhbWUnLCBudWxsKTtcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdwb3BDbGlja2VkJywgbnVsbCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcGxheUFnYWluQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXktYWdhaW4tYnRuJyk7XHJcbiAgcGxheUFnYWluQnRuLm9uY2xpY2sgPSAoZXZlbnQpID0+IHtcclxuICAgIHRvZ2dsZUVsZW1lbnQoJ292ZXJsYXknKTtcclxuICAgIGNsb3NlUG9wdXAoZXZlbnQpO1xyXG4gICAgcHViU3ViLnB1Ymxpc2goJ3Jlc3RhcnRHYW1lJywgbnVsbCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbW9kZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RlLWJ0bicpO1xyXG4gIG1vZGVCdG4ub25jbGljayA9ICgpID0+IHtcclxuICAgIHRvZ2dsZUVsZW1lbnQoJ292ZXJsYXknKTtcclxuICAgIHRvZ2dsZUVsZW1lbnQoJ21vZGUtZm9ybScpO1xyXG4gICAgcHViU3ViLnB1Ymxpc2goJ3BvcENsaWNrZWQnLCBudWxsKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBtdXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ211dGUtYnRuJyk7XHJcbiAgY29uc3QgbXV0ZUJ0blN5bWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbXV0ZS1idG4+aW9uLWljb24nKTtcclxuICBtdXRlQnRuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICBpZiAobXV0ZUJ0bi5jbGFzc0xpc3QuY29udGFpbnMoJ211dGVkJykpIHsgLy8gVW5tdXRlIG5vd1xyXG4gICAgICBtdXRlQnRuU3ltYi5uYW1lID0gJ3ZvbHVtZS1tdXRlLW91dGxpbmUnO1xyXG4gICAgICBtdXRlQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ211dGVkJyk7XHJcbiAgICAgIHB1YlN1Yi5wdWJsaXNoKCdwbGF5SnVkZ2VUcmVlJywgbnVsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtdXRlQnRuU3ltYi5uYW1lID0gJ211c2ljYWwtbm90ZXMtb3V0bGluZSc7IC8vIE11dGUgbm93XHJcbiAgICAgIG11dGVCdG4uY2xhc3NMaXN0LmFkZCgnbXV0ZWQnKTtcclxuICAgICAgcHViU3ViLnB1Ymxpc2goJ3N0b3BKdWRnZVRyZWUnLCBudWxsKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBpbmZvQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZm8tYnRuJyk7XHJcbiAgaW5mb0J0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnaW5mby1mb3JtJyk7XHJcbiAgICBwdWJTdWIucHVibGlzaCgncG9wQ2xpY2tlZCcsIG51bGwpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGluZm9Dcm9zc0J0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9ybS13cmFwcGVyPnNwYW4uaWNvbi1jbG9zZScpO1xyXG4gIGluZm9Dcm9zc0J0bnMuZm9yRWFjaCgoYnRuKSA9PiB7XHJcbiAgICBjb25zdCBvcHQgPSBidG47IC8vIENhbm5vdCBtb2RpZnkgZnVuY3Rpb24gcGFyYW0gZGlyZWN0bHlcclxuICAgIG9wdC5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRvZ2dsZUVsZW1lbnQoJ292ZXJsYXknKTtcclxuICAgICAgY2xvc2VQb3B1cChldmVudCk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XHJcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgY29uc3Qgb3B0ID0gY2VsbDtcclxuICAgIG9wdC5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCByID0gb3B0LmdldEF0dHJpYnV0ZSgnZGF0YS1yJyk7XHJcbiAgICAgIGNvbnN0IGMgPSBvcHQuZ2V0QXR0cmlidXRlKCdkYXRhLWMnKTtcclxuICAgICAgcHViU3ViLnB1Ymxpc2goJ2dyaWRQaWNrZWQnLCBbciwgY10pO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgLy8gRXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgcHViU3ViLnN1YnNjcmliZSgncmVzdGFydEdhbWUnLCByZXNldCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgndXBkYXRlR3JpZFBpY2tlZCcsIHVwZGF0ZUdyaWQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dyaWRQaWNrZWRSZWplY3RlZCcsIHNoYWtlQ2VsbCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ2FtZUVuZGVkJywgZGlzcGxheVJlc3VsdCk7XHJcbn0pKCk7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCIvLyBDb3JlIG1vZHVsZXNcbmltcG9ydCAnLi9nYW1lQm9hcmQnO1xuaW1wb3J0ICcuL2xvZ2ljJztcbmltcG9ydCAnLi91aSc7XG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcbi8vIE9wdGlvbmFsIG1vZHVsZXNcbmltcG9ydCAnLi9iYWNrZ3JvdW5kJztcbmltcG9ydCAnLi9hdWRpbyc7XG4iXSwibmFtZXMiOlsicHViU3ViIiwiZ3Jhc3MiLCJlcnJvciIsInBvcCIsImp1ZGdlVHJlZSIsIm11dGVCdG4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlQXVkaW9Ob2RlIiwiYXVkaW9TcmMiLCJpZCIsImF1ZE5vZGUiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwicGxheVNvdW5kIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJwIiwiY3VycmVudFRpbWUiLCJwbGF5Iiwic3RvcFNvdW5kIiwicGF1c2UiLCJncmFzc05vZGUiLCJlcnJvck5vZGUiLCJwb3BOb2RlIiwianVkZ2VUcmVlTm9kZSIsInZvbHVtZSIsImxvb3AiLCJxdWVyeVNlbGVjdG9yIiwiYXBwZW5kQ2hpbGQiLCJzdWJzY3JpYmUiLCJ4SW1nIiwib0ltZyIsImJvZHkiLCJiYWNrZ3JvdW5kIiwiYWRkIiwiZ2V0QXNwZWN0UmF0aW8iLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJjcmVhdGVJbWdOb2RlIiwiaW1nU3JjIiwiY2xhc3NOYW1lTGlzdCIsImltZ05vZGUiLCJmb3JFYWNoIiwiY2xhc3NOYW1lIiwiaW5zZXJ0TW90aWYiLCJyIiwiYyIsIndpZHRoIiwidmVydGljYWxHYXAiLCJob3Jpem9udGFsR2FwIiwiaSIsImoiLCJub2RlIiwic3R5bGUiLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiLCJpbnNlcnRCb3RoTW90aWYiLCJhY3RpdmVJbWdTcmMiLCJhY3RpdmVDbGFzc05hbWVMaXN0IiwiaW5hY3RpdmVJbWdTcmMiLCJpbmFjdGl2ZUNsYXNzTmFtZUxpc3QiLCJkZWxldGVNb3RpZiIsImxhc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiZmlyc3RDaGlsZCIsInN3YXBNb3RpZiIsImFjdGl2ZU5vZGVzIiwicXVlcnlTZWxlY3RvckFsbCIsImluYWN0aXZlTm9kZXMiLCJyZW1vdmUiLCJhZGRFdmVudExpc3RlbmVyIiwieElzQWN0aXZlIiwibGVuIiwiYm9hcmRNYXQiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJmaWxsIiwiZ2V0UmVzdWx0IiwibWF0Iiwicm93UmVmIiwicHVibGlzaCIsImNvbFJlZiIsImlzRnVsbCIsInBpY2tHcmlkIiwic3ltYiIsIm5ld01hdCIsInNsaWNlIiwicmVzZXQiLCJwcm9jZXNzT3JSZWplY3RHcmlkUGlja2VkIiwiZGVjaWRlSWZFbmRlZCIsInJlcyIsInVwZGF0ZUdyaWQiLCJzeW1ib2wiLCJ1cGRhdGVkTWF0cml4IiwiaXNDcm9zc1R1cm4iLCJpc0dhbWVFbmRlZCIsImNoYW5nZVR1cm4iLCJlbmRHYW1lIiwicmVzb2x2ZUFjY2VwdGVkR3JpZFBpY2tlZCIsIm1hcCIsImV2ZW50IiwiZm4iLCJwdXNoIiwiZGF0YSIsInVuc3Vic2NyaWJlIiwic3BsaWNlIiwieFN5bWJvbCIsIm9TeW1ib2wiLCJ0b2dnbGVFbGVtZW50IiwiZm9ybSIsInRvZ2dsZSIsImNsb3NlUG9wdXAiLCJ0YXJnZXQiLCJwYXJlbnQiLCJwYXJlbnROb2RlIiwicmVzSW1nV3JhcHBlciIsImltZ1MiLCJpbWciLCJjZWxsTm9kZSIsImRpc3BsYXlSZXN1bHQiLCJ3aW5uZXIiLCJyZXN1bHRUZXh0IiwiaW1nTm9kZTEiLCJpbWdOb2RlMiIsInRleHRDb250ZW50IiwiZGVib3VuY2UiLCJ0IiwidGltZUlkIiwiZGVib3VuY2VkIiwiYXJncyIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJzaGFrZUNlbGwiLCJyZXN0YXJ0R2FtZUJ0biIsIm9uY2xpY2siLCJwbGF5QWdhaW5CdG4iLCJtb2RlQnRuIiwibXV0ZUJ0blN5bWIiLCJuYW1lIiwiaW5mb0J0biIsImluZm9Dcm9zc0J0bnMiLCJidG4iLCJvcHQiLCJjZWxscyIsImNlbGwiLCJnZXRBdHRyaWJ1dGUiXSwic291cmNlUm9vdCI6IiJ9