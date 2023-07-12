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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SDtBQUNPO0FBQ3JCO0FBQ3NCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2F1ZGlvLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9iYWNrZ3JvdW5kLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2xvZ2ljLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9wdWJTdWIuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL3VpLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9iYWNrZ3JvdW5kLmNzcyIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9teS13ZWJwYWNrLXByb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHB1YlN1YiBmcm9tICcuL3B1YlN1Yic7XHJcbmltcG9ydCBncmFzcyBmcm9tICcuL2F1ZGlvRC9ncmFzcy53YXYnO1xyXG5pbXBvcnQgZXJyb3IgZnJvbSAnLi9hdWRpb0QvZXJyb3Iud2F2JztcclxuaW1wb3J0IHBvcCBmcm9tICcuL2F1ZGlvRC9wb3Aud2F2JztcclxuaW1wb3J0IGp1ZGdlVHJlZSBmcm9tICcuL2F1ZGlvRC9qdWRnZVRyZWUubXAzJztcclxuXHJcbigoKSA9PiB7XHJcbiAgLy8gQ2FjaGUgRE9NXHJcbiAgY29uc3QgbXV0ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtdXRlLWJ0bicpO1xyXG5cclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICBmdW5jdGlvbiBjcmVhdGVBdWRpb05vZGUoYXVkaW9TcmMsIGlkKSB7XHJcbiAgICBjb25zdCBhdWROb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKTtcclxuICAgIGF1ZE5vZGUuc3JjID0gYXVkaW9TcmM7XHJcbiAgICBhdWROb2RlLmlkID0gaWQ7XHJcbiAgICByZXR1cm4gYXVkTm9kZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHBsYXlTb3VuZChhdWROb2RlKSB7XHJcbiAgICBpZiAobXV0ZUJ0bi5jbGFzc0xpc3QuY29udGFpbnMoJ211dGVkJykpIHJldHVybjtcclxuICAgIGNvbnN0IHAgPSBhdWROb2RlO1xyXG4gICAgcC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICBwLnBsYXkoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHN0b3BTb3VuZChhdWROb2RlKSB7XHJcbiAgICBjb25zdCBwID0gYXVkTm9kZTtcclxuICAgIHAucGF1c2UoKTtcclxuICAgIHAuY3VycmVudFRpbWUgPSAwO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZ3Jhc3NOb2RlID0gY3JlYXRlQXVkaW9Ob2RlKGdyYXNzLCAnZ3Jhc3MnKTtcclxuICBjb25zdCBlcnJvck5vZGUgPSBjcmVhdGVBdWRpb05vZGUoZXJyb3IsICdlcnJvcicpO1xyXG4gIGNvbnN0IHBvcE5vZGUgPSBjcmVhdGVBdWRpb05vZGUocG9wLCAncG9wJyk7XHJcbiAgY29uc3QganVkZ2VUcmVlTm9kZSA9IGNyZWF0ZUF1ZGlvTm9kZShqdWRnZVRyZWUsICdqdWRnZVRyZWUnKTtcclxuICBqdWRnZVRyZWVOb2RlLnZvbHVtZSA9IDAuNDtcclxuICBqdWRnZVRyZWVOb2RlLmxvb3AgPSB0cnVlO1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChqdWRnZVRyZWVOb2RlKTtcclxuICBwbGF5U291bmQoanVkZ2VUcmVlTm9kZSk7XHJcblxyXG4gIC8vIEV2ZW50IHN1YnNjcmlwdGlvblxyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3VwZGF0ZUdyaWRQaWNrZWQnLCAoKSA9PiBwbGF5U291bmQoZ3Jhc3NOb2RlKSk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ3JpZFBpY2tlZFJlamVjdGVkJywgKCkgPT4gcGxheVNvdW5kKGVycm9yTm9kZSkpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3BvcENsaWNrZWQnLCAoKSA9PiBwbGF5U291bmQocG9wTm9kZSkpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3BsYXlKdWRnZVRyZWUnLCAoKSA9PiB7XHJcbiAgICBwbGF5U291bmQoanVkZ2VUcmVlTm9kZSk7XHJcbiAgfSk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnc3RvcEp1ZGdlVHJlZScsICgpID0+IHN0b3BTb3VuZChqdWRnZVRyZWVOb2RlKSk7XHJcbn0pKCk7XHJcbiIsImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xyXG5pbXBvcnQgJy4vYmFja2dyb3VuZC5jc3MnO1xyXG5pbXBvcnQgeEltZyBmcm9tICcuL2ltZy94LnBuZyc7XHJcbmltcG9ydCBvSW1nIGZyb20gJy4vaW1nL28ucG5nJztcclxuXHJcbigoKSA9PiB7XHJcbiAgLy8gQ2FjaGUgYW5kIGNyZWF0ZSBET00gbmVlZGVkIGZvciBiYWNrZ3JvdW5kIGhhbmRsaW5nXHJcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuXHJcbiAgY29uc3QgYmFja2dyb3VuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGJhY2tncm91bmQuY2xhc3NMaXN0LmFkZCgnYmFja2dyb3VuZC13cmFwcGVyJyk7XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIGdldEFzcGVjdFJhdGlvKCkge1xyXG4gICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlSW1nTm9kZShpbWdTcmMsIGNsYXNzTmFtZUxpc3QpIHtcclxuICAgIGNvbnN0IGltZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIGltZ05vZGUuc3JjID0gaW1nU3JjO1xyXG4gICAgY2xhc3NOYW1lTGlzdC5mb3JFYWNoKChjbGFzc05hbWUpID0+IHtcclxuICAgICAgaW1nTm9kZS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpbWdOb2RlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5zZXJ0TW90aWYoaW1nU3JjLCBjbGFzc05hbWVMaXN0LCByLCBjLCB3aWR0aCkge1xyXG4gICAgLy8gSW5zZXJ0IHIgYnkgYyBtb3RpZnNcclxuICAgIGNvbnN0IHZlcnRpY2FsR2FwID0gMTAwIC8gcjtcclxuICAgIGNvbnN0IGhvcml6b250YWxHYXAgPSAxMDAgLyBjO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByOyBpICs9IDEpIHtcclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjOyBqICs9IDEpIHtcclxuICAgICAgICBjb25zdCBub2RlID0gY3JlYXRlSW1nTm9kZShpbWdTcmMsIGNsYXNzTmFtZUxpc3QpO1xyXG4gICAgICAgIG5vZGUuc3R5bGUud2lkdGggPSB3aWR0aDtcclxuICAgICAgICBub2RlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgICBub2RlLnN0eWxlLnRvcCA9IGAke3ZlcnRpY2FsR2FwICogaX0lYDtcclxuICAgICAgICBub2RlLnN0eWxlLmxlZnQgPSBgJHtob3Jpem9udGFsR2FwICogKGogKyAoaSAlIDIgPyAwLjUgOiAwKSl9JWA7XHJcbiAgICAgICAgYmFja2dyb3VuZC5hcHBlbmRDaGlsZChub2RlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW5zZXJ0Qm90aE1vdGlmKFxyXG4gICAgYWN0aXZlSW1nU3JjLFxyXG4gICAgYWN0aXZlQ2xhc3NOYW1lTGlzdCxcclxuICAgIGluYWN0aXZlSW1nU3JjLFxyXG4gICAgaW5hY3RpdmVDbGFzc05hbWVMaXN0LFxyXG4gICAgcixcclxuICAgIGMsXHJcbiAgICB3aWR0aCxcclxuICApIHtcclxuICAgIGluc2VydE1vdGlmKGFjdGl2ZUltZ1NyYywgWy4uLmFjdGl2ZUNsYXNzTmFtZUxpc3QsICdhY3RpdmUnXSwgciwgYywgd2lkdGgpO1xyXG4gICAgaW5zZXJ0TW90aWYoaW5hY3RpdmVJbWdTcmMsIGluYWN0aXZlQ2xhc3NOYW1lTGlzdCwgciwgYywgd2lkdGgpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGVsZXRlTW90aWYoKSB7XHJcbiAgICB3aGlsZSAoYmFja2dyb3VuZC5sYXN0Q2hpbGQpIGJhY2tncm91bmQucmVtb3ZlQ2hpbGQoYmFja2dyb3VuZC5maXJzdENoaWxkKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHN3YXBNb3RpZigpIHtcclxuICAgIGNvbnN0IGFjdGl2ZU5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJhY2tncm91bmQtd3JhcHBlciBpbWcuYWN0aXZlJyk7XHJcbiAgICBjb25zdCBpbmFjdGl2ZU5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJhY2tncm91bmQtd3JhcHBlciBpbWc6bm90KC5hY3RpdmUpJyk7XHJcbiAgICBhY3RpdmVOb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7IG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7IH0pO1xyXG4gICAgaW5hY3RpdmVOb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7IG5vZGUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7IH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gSW5pdCBhbmQgYmluZCBldmVudHNcclxuICBpZiAoZ2V0QXNwZWN0UmF0aW8oKSA+IDMgLyA0KSB7XHJcbiAgICBpbnNlcnRCb3RoTW90aWYoeEltZywgWyd4SW1nJywgJ2FjdGl2ZSddLCBvSW1nLCBbJ29JbWcnXSwgNCwgNywgJzEwJScpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpbnNlcnRCb3RoTW90aWYoeEltZywgWyd4SW1nJywgJ2FjdGl2ZSddLCBvSW1nLCBbJ29JbWcnXSwgMTAsIDQsICcyMCUnKTtcclxuICB9XHJcblxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICAvLyBOZWVkIHRvIGdldCB3aGljaCBtb3RpZiBpcyBjdXJyZW50bHkgYWN0aXZlIGZpcnN0XHJcbiAgICBjb25zdCB4SXNBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2dyb3VuZC13cmFwcGVyIGltZy54SW1nJykuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKTtcclxuICAgIGRlbGV0ZU1vdGlmKCk7XHJcbiAgICBpZiAoZ2V0QXNwZWN0UmF0aW8oKSA+IDMgLyA0KSB7XHJcbiAgICAgIGlmICh4SXNBY3RpdmUpIHtcclxuICAgICAgICBpbnNlcnRCb3RoTW90aWYoeEltZywgWyd4SW1nJywgJ2FjdGl2ZSddLCBvSW1nLCBbJ29JbWcnXSwgNCwgNywgJzEwJScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGluc2VydEJvdGhNb3RpZihvSW1nLCBbJ29JbWcnLCAnYWN0aXZlJ10sIHhJbWcsIFsneEltZyddLCA0LCA3LCAnMTAlJyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoeElzQWN0aXZlKSB7XHJcbiAgICAgIGluc2VydEJvdGhNb3RpZih4SW1nLCBbJ3hJbWcnLCAnYWN0aXZlJ10sIG9JbWcsIFsnb0ltZyddLCAxMCwgNCwgJzIwJScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW5zZXJ0Qm90aE1vdGlmKG9JbWcsIFsnb0ltZycsICdhY3RpdmUnXSwgeEltZywgWyd4SW1nJ10sIDEwLCA0LCAnMjAlJyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGJvZHkuYXBwZW5kQ2hpbGQoYmFja2dyb3VuZCk7XHJcblxyXG4gIC8vIEV2ZW50IHN1YnNjcmlwdGlvblxyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3R1cm5DaGFuZ2VkJywgc3dhcE1vdGlmKTtcclxufSkoKTtcclxuIiwiaW1wb3J0IHB1YlN1YiBmcm9tICcuL3B1YlN1Yic7XHJcblxyXG4oKCkgPT4ge1xyXG4gIGNvbnN0IGxlbiA9IDM7XHJcbiAgbGV0IGJvYXJkTWF0ID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogbGVuIH0sICgpID0+IG5ldyBBcnJheShsZW4pLmZpbGwoJy4nKSk7XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIC8vIGZ1bmN0aW9uIGV4cG9zZUdyaWQoKSB7IC8vIElNUFVSRSwgVU5URVNURUQsIEZPUiBERUJVR0dJTkdcclxuICAvLyAgIGxldCBvdXRwdXRTdHIgPSAnJztcclxuICAvLyAgIGJvYXJkTWF0LmZvckVhY2goKHJvdykgPT4ge1xyXG4gIC8vICAgICBvdXRwdXRTdHIgPSBgJHtvdXRwdXRTdHJ9JHtKU09OLnN0cmluZ2lmeShyb3cpfVxcbmA7XHJcbiAgLy8gICB9KTtcclxuICAvLyAgIHJldHVybiBib2FyZE1hdDtcclxuICAvLyB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldFJlc3VsdChtYXQpIHsgLy8gSU1QVVJFLCBQQVNTRUQgV0lUSCBNT0NLIFBVQlNVQlxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xyXG4gICAgICAvLyBSb3ctd2lzZVxyXG4gICAgICBjb25zdCByb3dSZWYgPSBtYXRbaV1bMF07XHJcbiAgICAgIGlmIChyb3dSZWYgIT09ICcuJykge1xyXG4gICAgICAgIGZvciAobGV0IGMgPSAxOyBjIDwgbGVuOyBjICs9IDEpIHtcclxuICAgICAgICAgIGlmIChtYXRbaV1bY10gIT09IHJvd1JlZikgYnJlYWs7XHJcbiAgICAgICAgICBpZiAoYyA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnd2lubmVyRGVjaWRlZCcsIHJvd1JlZik7XHJcbiAgICAgICAgICAgIHJldHVybiByb3dSZWY7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIENvbHVtbi13aXNlXHJcbiAgICAgIGNvbnN0IGNvbFJlZiA9IG1hdFswXVtpXTtcclxuICAgICAgaWYgKGNvbFJlZiAhPT0gJy4nKSB7XHJcbiAgICAgICAgZm9yIChsZXQgciA9IDE7IHIgPCBsZW47IHIgKz0gMSkge1xyXG4gICAgICAgICAgaWYgKG1hdFtyXVtpXSAhPT0gY29sUmVmKSBicmVhaztcclxuICAgICAgICAgIGlmIChyID09PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd3aW5uZXJEZWNpZGVkJywgY29sUmVmKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbFJlZjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIERpYWdvbmFsc1xyXG4gICAgaWYgKG1hdFswXVswXSAhPT0gJy4nKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgICBpZiAobWF0W2ldW2ldICE9PSBtYXRbMF1bMF0pIGJyZWFrO1xyXG4gICAgICAgIGlmIChpID09PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICBwdWJTdWIucHVibGlzaCgnd2lubmVyRGVjaWRlZCcsIG1hdFswXVswXSk7XHJcbiAgICAgICAgICByZXR1cm4gbWF0WzBdWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKG1hdFswXVtsZW4gLSAxXSAhPT0gJy4nKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgICBpZiAobWF0W2ldW2xlbiAtIDEgLSBpXSAhPT0gbWF0WzBdW2xlbiAtIDFdKSBicmVhaztcclxuICAgICAgICBpZiAoaSA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3dpbm5lckRlY2lkZWQnLCBtYXRbMF1bbGVuIC0gMV0pO1xyXG4gICAgICAgICAgcmV0dXJuIG1hdFswXVtsZW4gLSAxXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzRnVsbChtYXQpIHsgLy8gUFVSRSwgVU5URVNURURcclxuICAgIGZvciAobGV0IHIgPSAwOyByIDwgbGVuOyByICs9IDEpIHtcclxuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBsZW47IGMgKz0gMSkge1xyXG4gICAgICAgIGlmIChtYXRbcl1bY10gPT09ICcuJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHBpY2tHcmlkKG1hdCwgciwgYywgc3ltYikge1xyXG4gICAgLy8gSU1QVVJFLCBQQVNTRUQgV0lUSCBNT0NLIFBVQlNVQlxyXG4gICAgaWYgKHIgPCAwIHx8IHIgPj0gbGVuIHx8IGMgPCAwIHx8IGMgPj0gbGVuKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAobWF0W3JdW2NdICE9PSAnLicpIHJldHVybiBmYWxzZTtcclxuICAgIGNvbnN0IG5ld01hdCA9IG5ldyBBcnJheShsZW4pO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xyXG4gICAgICBuZXdNYXRbaV0gPSBtYXRbaV0uc2xpY2UoKTtcclxuICAgIH1cclxuICAgIG5ld01hdFtyXVtjXSA9IHN5bWI7XHJcbiAgICByZXR1cm4gbmV3TWF0O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzZXQoKSB7XHJcbiAgICAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBmb3IgKGxldCByID0gMDsgciA8IGxlbjsgciArPSAxKSB7XHJcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgbGVuOyBjICs9IDEpIHtcclxuICAgICAgICBib2FyZE1hdFtyXVtjXSA9ICcuJztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHJvY2Vzc09yUmVqZWN0R3JpZFBpY2tlZChbciwgY10pIHsgLy8gSU1QVVJFLCBVTlRFU1RFRFxyXG4gICAgaWYgKGJvYXJkTWF0W3JdW2NdID09PSAnLicpIHB1YlN1Yi5wdWJsaXNoKCdncmlkUGlja2VkQWNjZXB0ZWQnLCBbciwgY10pO1xyXG4gICAgZWxzZSBwdWJTdWIucHVibGlzaCgnZ3JpZFBpY2tlZFJlamVjdGVkJywgW3IsIGNdKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRlY2lkZUlmRW5kZWQoKSB7IC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGNvbnN0IHJlcyA9IGdldFJlc3VsdChib2FyZE1hdCk7XHJcbiAgICBpZiAocmVzID09PSBmYWxzZSkge1xyXG4gICAgICBpZiAoaXNGdWxsKGJvYXJkTWF0KSkgcHViU3ViLnB1Ymxpc2goJ2dhbWVFbmRlZCcsICdkcmF3Jyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdnYW1lRW5kZWQnLCByZXMpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdXBkYXRlR3JpZChbciwgYywgc3ltYm9sXSkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBjb25zdCB1cGRhdGVkTWF0cml4ID0gcGlja0dyaWQoYm9hcmRNYXQsIHIsIGMsIHN5bWJvbCk7XHJcbiAgICBib2FyZE1hdCA9IHVwZGF0ZWRNYXRyaXg7XHJcbiAgICBkZWNpZGVJZkVuZGVkKCk7XHJcbiAgfVxyXG5cclxuICAvLyBFdmVudCBzdWJzY3JpcHRpb25cclxuICBwdWJTdWIuc3Vic2NyaWJlKCdyZXN0YXJ0R2FtZScsIHJlc2V0KTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdncmlkUGlja2VkQmVmb3JlRW5kJywgcHJvY2Vzc09yUmVqZWN0R3JpZFBpY2tlZCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgndXBkYXRlR3JpZFBpY2tlZCcsIHVwZGF0ZUdyaWQpO1xyXG59KSgpO1xyXG4iLCJpbXBvcnQgcHViU3ViIGZyb20gJy4vcHViU3ViJztcclxuXHJcbigoKSA9PiB7XHJcbiAgLy8gTG9naWMgdmFyaWFibGVcclxuICBsZXQgaXNDcm9zc1R1cm4gPSB0cnVlO1xyXG4gIGxldCBpc0dhbWVFbmRlZCA9IGZhbHNlO1xyXG5cclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICAvLyBmdW5jdGlvbiBleHBvc2VJc0Nyb3NzVHVybigpIHsgLy8gSU1QVVJFLCBVTlRFU1RFRCwgRk9FIERFQlVHR0lOR1xyXG4gIC8vICAgcmV0dXJuIGlzQ3Jvc3NUdXJuO1xyXG4gIC8vIH1cclxuXHJcbiAgZnVuY3Rpb24gY2hhbmdlVHVybigpIHsgLy8gSU1QVVJFLCBVTlRFU1RFRFxyXG4gICAgaXNDcm9zc1R1cm4gPSAhaXNDcm9zc1R1cm47XHJcbiAgICBwdWJTdWIucHVibGlzaCgndHVybkNoYW5nZWQnLCBudWxsKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGVuZEdhbWUoKSB7XHJcbiAgICBpc0dhbWVFbmRlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNldCgpIHtcclxuICAgIGlmICghaXNDcm9zc1R1cm4pIHB1YlN1Yi5wdWJsaXNoKCd0dXJuQ2hhbmdlZCcsIG51bGwpO1xyXG4gICAgaXNDcm9zc1R1cm4gPSB0cnVlO1xyXG4gICAgaXNHYW1lRW5kZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQoW3IsIGNdKSB7XHJcbiAgICBpZiAoIWlzR2FtZUVuZGVkKSBwdWJTdWIucHVibGlzaCgnZ3JpZFBpY2tlZEJlZm9yZUVuZCcsIFtyLCBjXSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNvbHZlQWNjZXB0ZWRHcmlkUGlja2VkKFtyLCBjXSkge1xyXG4gICAgY29uc3Qgc3ltYm9sID0gaXNDcm9zc1R1cm4gPyAneCcgOiAnbyc7XHJcbiAgICBwdWJTdWIucHVibGlzaCgndXBkYXRlR3JpZFBpY2tlZCcsIFtyLCBjLCBzeW1ib2xdKTtcclxuICB9XHJcblxyXG4gIC8vIEV2ZW50IHN1YnNjcmlwdGlvblxyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3Jlc3RhcnRHYW1lJywgcmVzZXQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ2dyaWRQaWNrZWQnLCBwcm9jZXNzT3JSZWplY3RHcmlkUGlja2VkKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdncmlkUGlja2VkQWNjZXB0ZWQnLCByZXNvbHZlQWNjZXB0ZWRHcmlkUGlja2VkKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCd1cGRhdGVHcmlkUGlja2VkJywgY2hhbmdlVHVybik7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ2FtZUVuZGVkJywgZW5kR2FtZSk7XHJcbn0pKCk7XHJcbiIsImNvbnN0IHB1YlN1YiA9ICgoKSA9PiB7XHJcbiAgY29uc3QgbWFwID0ge307XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShldmVudCwgZm4pIHtcclxuICAgIGlmICghbWFwW2V2ZW50XSkgbWFwW2V2ZW50XSA9IFtdO1xyXG4gICAgbWFwW2V2ZW50XS5wdXNoKGZuKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHB1Ymxpc2goZXZlbnQsIGRhdGEpIHtcclxuICAgIGlmIChtYXBbZXZlbnRdKSB7XHJcbiAgICAgIG1hcFtldmVudF0uZm9yRWFjaCgoZm4pID0+IHtcclxuICAgICAgICBmbihkYXRhKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1bnN1YnNjcmliZShldmVudCwgZm4pIHtcclxuICAgIGlmIChtYXBbZXZlbnRdKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFwW2V2ZW50XS5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIGlmIChtYXBbZXZlbnRdW2ldID09PSBmbikge1xyXG4gICAgICAgICAgbWFwW2V2ZW50XS5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7IHN1YnNjcmliZSwgcHVibGlzaCwgdW5zdWJzY3JpYmUgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHB1YlN1YjtcclxuIiwiaW1wb3J0IHB1YlN1YiBmcm9tICcuL3B1YlN1Yic7XHJcbmltcG9ydCB4U3ltYm9sIGZyb20gJy4vaW1nL3gucG5nJztcclxuaW1wb3J0IG9TeW1ib2wgZnJvbSAnLi9pbWcvby5wbmcnO1xyXG5cclxuKCgpID0+IHtcclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICBmdW5jdGlvbiB0b2dnbGVFbGVtZW50KGlkKSB7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgZm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNsb3NlUG9wdXAoZXZlbnQpIHtcclxuICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudDtcclxuICAgIGNvbnN0IHBhcmVudCA9IHRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XHJcbiAgICBwYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICBpZiAocGFyZW50LmlkID09PSAncmVzdWx0LWZvcm0nKSB7IC8vIE5lZWQgdG8gY2xlYXIgcmVzdWx0IGFkZGVkXHJcbiAgICAgIGNvbnN0IHJlc0ltZ1dyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzLWltZy13cmFwcGVyJyk7XHJcbiAgICAgIHdoaWxlIChyZXNJbWdXcmFwcGVyLmZpcnN0Q2hpbGQpIHJlc0ltZ1dyYXBwZXIucmVtb3ZlQ2hpbGQocmVzSW1nV3JhcHBlci5sYXN0Q2hpbGQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzZXQoKSB7XHJcbiAgICBjb25zdCBpbWdTID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwgPiBpbWcnKTtcclxuICAgIGltZ1MuZm9yRWFjaCgoaW1nKSA9PiB7XHJcbiAgICAgIGltZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGltZyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVwZGF0ZUdyaWQoW3IsIGMsIHN5bWJvbF0pIHtcclxuICAgIGNvbnN0IGltZyA9IHN5bWJvbCA9PT0gJ3gnID8geFN5bWJvbCA6IG9TeW1ib2w7XHJcbiAgICBjb25zdCBpbWdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICBpbWdOb2RlLnNyYyA9IGltZztcclxuICAgIGNvbnN0IGNlbGxOb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNlbGxbZGF0YS1yPVwiJHtyfVwiXVtkYXRhLWM9XCIke2N9XCJdYCk7XHJcbiAgICBjZWxsTm9kZS5hcHBlbmRDaGlsZChpbWdOb2RlKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRpc3BsYXlSZXN1bHQod2lubmVyKSB7XHJcbiAgICBjb25zdCByZXNJbWdXcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlcy1pbWctd3JhcHBlcicpO1xyXG4gICAgY29uc3QgcmVzdWx0VGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQtdGV4dCcpO1xyXG4gICAgaWYgKHdpbm5lciA9PT0gJ2RyYXcnKSB7XHJcbiAgICAgIGNvbnN0IGltZ05vZGUxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgIGNvbnN0IGltZ05vZGUyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgIGltZ05vZGUxLnNyYyA9IHhTeW1ib2w7XHJcbiAgICAgIGltZ05vZGUyLnNyYyA9IG9TeW1ib2w7XHJcbiAgICAgIHJlc0ltZ1dyYXBwZXIuYXBwZW5kQ2hpbGQoaW1nTm9kZTEpO1xyXG4gICAgICByZXNJbWdXcmFwcGVyLmFwcGVuZENoaWxkKGltZ05vZGUyKTtcclxuICAgICAgcmVzdWx0VGV4dC50ZXh0Q29udGVudCA9ICdEUkFXISc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBpbWcgPSB3aW5uZXIgPT09ICd4JyA/IHhTeW1ib2wgOiBvU3ltYm9sO1xyXG4gICAgICBjb25zdCBpbWdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgIGltZ05vZGUuc3JjID0gaW1nO1xyXG4gICAgICByZXNJbWdXcmFwcGVyLmFwcGVuZENoaWxkKGltZ05vZGUpO1xyXG4gICAgICByZXN1bHRUZXh0LnRleHRDb250ZW50ID0gJ1dJTk5FUiEnO1xyXG4gICAgfVxyXG4gICAgdG9nZ2xlRWxlbWVudCgncmVzdWx0LWZvcm0nKTtcclxuICAgIHRvZ2dsZUVsZW1lbnQoJ292ZXJsYXknKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRlYm91bmNlKGZuLCB0KSB7XHJcbiAgICBsZXQgdGltZUlkO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGRlYm91bmNlZCguLi5hcmdzKSB7XHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lSWQpO1xyXG4gICAgICB0aW1lSWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBmbiguLi5hcmdzKTtcclxuICAgICAgfSwgdCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2hha2VDZWxsKFtyLCBjXSkge1xyXG4gICAgY29uc3QgY2VsbE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY2VsbFtkYXRhLXI9XCIke3J9XCJdW2RhdGEtYz1cIiR7Y31cIl1gKTtcclxuICAgIGNlbGxOb2RlLmNsYXNzTGlzdC5hZGQoJ3NoYWtlJyk7XHJcbiAgICBkZWJvdW5jZSgoKSA9PiB7XHJcbiAgICAgIGNlbGxOb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3NoYWtlJyk7XHJcbiAgICB9LCAxMDAwKSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2FjaGUgRE9NIGFuZCBiaW5kIGV2ZW50c1xyXG4gIGNvbnN0IHJlc3RhcnRHYW1lQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhcnQtYnRuJyk7XHJcbiAgcmVzdGFydEdhbWVCdG4ub25jbGljayA9ICgpID0+IHtcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdyZXN0YXJ0R2FtZScsIG51bGwpO1xyXG4gICAgcHViU3ViLnB1Ymxpc2goJ3BvcENsaWNrZWQnLCBudWxsKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBwbGF5QWdhaW5CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheS1hZ2Fpbi1idG4nKTtcclxuICBwbGF5QWdhaW5CdG4ub25jbGljayA9IChldmVudCkgPT4ge1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gICAgY2xvc2VQb3B1cChldmVudCk7XHJcbiAgICBwdWJTdWIucHVibGlzaCgncmVzdGFydEdhbWUnLCBudWxsKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBtb2RlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGUtYnRuJyk7XHJcbiAgbW9kZUJ0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gICAgdG9nZ2xlRWxlbWVudCgnbW9kZS1mb3JtJyk7XHJcbiAgICBwdWJTdWIucHVibGlzaCgncG9wQ2xpY2tlZCcsIG51bGwpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG11dGVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXV0ZS1idG4nKTtcclxuICBjb25zdCBtdXRlQnRuU3ltYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtdXRlLWJ0bj5pb24taWNvbicpO1xyXG4gIG11dGVCdG4ub25jbGljayA9ICgpID0+IHtcclxuICAgIGlmIChtdXRlQnRuLmNsYXNzTGlzdC5jb250YWlucygnbXV0ZWQnKSkgeyAvLyBVbm11dGUgbm93XHJcbiAgICAgIG11dGVCdG5TeW1iLm5hbWUgPSAndm9sdW1lLW11dGUtb3V0bGluZSc7XHJcbiAgICAgIG11dGVCdG4uY2xhc3NMaXN0LnJlbW92ZSgnbXV0ZWQnKTtcclxuICAgICAgcHViU3ViLnB1Ymxpc2goJ3BsYXlKdWRnZVRyZWUnLCBudWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG11dGVCdG5TeW1iLm5hbWUgPSAnbXVzaWNhbC1ub3Rlcy1vdXRsaW5lJzsgLy8gTXV0ZSBub3dcclxuICAgICAgbXV0ZUJ0bi5jbGFzc0xpc3QuYWRkKCdtdXRlZCcpO1xyXG4gICAgICBwdWJTdWIucHVibGlzaCgnc3RvcEp1ZGdlVHJlZScsIG51bGwpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGluZm9CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5mby1idG4nKTtcclxuICBpbmZvQnRuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdvdmVybGF5Jyk7XHJcbiAgICB0b2dnbGVFbGVtZW50KCdpbmZvLWZvcm0nKTtcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdwb3BDbGlja2VkJywgbnVsbCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaW5mb0Nyb3NzQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JtLXdyYXBwZXI+c3Bhbi5pY29uLWNsb3NlJyk7XHJcbiAgaW5mb0Nyb3NzQnRucy5mb3JFYWNoKChidG4pID0+IHtcclxuICAgIGNvbnN0IG9wdCA9IGJ0bjsgLy8gQ2Fubm90IG1vZGlmeSBmdW5jdGlvbiBwYXJhbSBkaXJlY3RseVxyXG4gICAgb3B0Lm9uY2xpY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgdG9nZ2xlRWxlbWVudCgnb3ZlcmxheScpO1xyXG4gICAgICBjbG9zZVBvcHVwKGV2ZW50KTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcclxuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICBjb25zdCBvcHQgPSBjZWxsO1xyXG4gICAgb3B0Lm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHIgPSBvcHQuZ2V0QXR0cmlidXRlKCdkYXRhLXInKTtcclxuICAgICAgY29uc3QgYyA9IG9wdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYycpO1xyXG4gICAgICBwdWJTdWIucHVibGlzaCgnZ3JpZFBpY2tlZCcsIFtyLCBjXSk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICAvLyBFdmVudCBzdWJzY3JpcHRpb25cclxuICBwdWJTdWIuc3Vic2NyaWJlKCdyZXN0YXJ0R2FtZScsIHJlc2V0KTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCd1cGRhdGVHcmlkUGlja2VkJywgdXBkYXRlR3JpZCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ3JpZFBpY2tlZFJlamVjdGVkJywgc2hha2VDZWxsKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdnYW1lRW5kZWQnLCBkaXNwbGF5UmVzdWx0KTtcclxufSkoKTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIi8vIENvcmUgbW9kdWxlc1xuaW1wb3J0ICcuL2dhbWVCb2FyZCc7XG5pbXBvcnQgJy4vbG9naWMnO1xuaW1wb3J0ICcuL3VpJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuLy8gT3B0aW9uYWwgbW9kdWxlc1xuaW1wb3J0ICcuL2JhY2tncm91bmQnO1xuaW1wb3J0ICcuL2F1ZGlvJztcbiJdLCJuYW1lcyI6WyJwdWJTdWIiLCJncmFzcyIsImVycm9yIiwicG9wIiwianVkZ2VUcmVlIiwibXV0ZUJ0biIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVBdWRpb05vZGUiLCJhdWRpb1NyYyIsImlkIiwiYXVkTm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJwbGF5U291bmQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInAiLCJjdXJyZW50VGltZSIsInBsYXkiLCJzdG9wU291bmQiLCJwYXVzZSIsImdyYXNzTm9kZSIsImVycm9yTm9kZSIsInBvcE5vZGUiLCJqdWRnZVRyZWVOb2RlIiwidm9sdW1lIiwibG9vcCIsInF1ZXJ5U2VsZWN0b3IiLCJhcHBlbmRDaGlsZCIsInN1YnNjcmliZSIsInhJbWciLCJvSW1nIiwiYm9keSIsImJhY2tncm91bmQiLCJhZGQiLCJnZXRBc3BlY3RSYXRpbyIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsImNyZWF0ZUltZ05vZGUiLCJpbWdTcmMiLCJjbGFzc05hbWVMaXN0IiwiaW1nTm9kZSIsImZvckVhY2giLCJjbGFzc05hbWUiLCJpbnNlcnRNb3RpZiIsInIiLCJjIiwid2lkdGgiLCJ2ZXJ0aWNhbEdhcCIsImhvcml6b250YWxHYXAiLCJpIiwiaiIsIm5vZGUiLCJzdHlsZSIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsImluc2VydEJvdGhNb3RpZiIsImFjdGl2ZUltZ1NyYyIsImFjdGl2ZUNsYXNzTmFtZUxpc3QiLCJpbmFjdGl2ZUltZ1NyYyIsImluYWN0aXZlQ2xhc3NOYW1lTGlzdCIsImRlbGV0ZU1vdGlmIiwibGFzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJmaXJzdENoaWxkIiwic3dhcE1vdGlmIiwiYWN0aXZlTm9kZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5hY3RpdmVOb2RlcyIsInJlbW92ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJ4SXNBY3RpdmUiLCJsZW4iLCJib2FyZE1hdCIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsImZpbGwiLCJnZXRSZXN1bHQiLCJtYXQiLCJyb3dSZWYiLCJwdWJsaXNoIiwiY29sUmVmIiwiaXNGdWxsIiwicGlja0dyaWQiLCJzeW1iIiwibmV3TWF0Iiwic2xpY2UiLCJyZXNldCIsInByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQiLCJkZWNpZGVJZkVuZGVkIiwicmVzIiwidXBkYXRlR3JpZCIsInN5bWJvbCIsInVwZGF0ZWRNYXRyaXgiLCJpc0Nyb3NzVHVybiIsImlzR2FtZUVuZGVkIiwiY2hhbmdlVHVybiIsImVuZEdhbWUiLCJyZXNvbHZlQWNjZXB0ZWRHcmlkUGlja2VkIiwibWFwIiwiZXZlbnQiLCJmbiIsInB1c2giLCJkYXRhIiwidW5zdWJzY3JpYmUiLCJzcGxpY2UiLCJ4U3ltYm9sIiwib1N5bWJvbCIsInRvZ2dsZUVsZW1lbnQiLCJmb3JtIiwidG9nZ2xlIiwiY2xvc2VQb3B1cCIsInRhcmdldCIsInBhcmVudCIsInBhcmVudE5vZGUiLCJyZXNJbWdXcmFwcGVyIiwiaW1nUyIsImltZyIsImNlbGxOb2RlIiwiZGlzcGxheVJlc3VsdCIsIndpbm5lciIsInJlc3VsdFRleHQiLCJpbWdOb2RlMSIsImltZ05vZGUyIiwidGV4dENvbnRlbnQiLCJkZWJvdW5jZSIsInQiLCJ0aW1lSWQiLCJkZWJvdW5jZWQiLCJhcmdzIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInNoYWtlQ2VsbCIsInJlc3RhcnRHYW1lQnRuIiwib25jbGljayIsInBsYXlBZ2FpbkJ0biIsIm1vZGVCdG4iLCJtdXRlQnRuU3ltYiIsIm5hbWUiLCJpbmZvQnRuIiwiaW5mb0Nyb3NzQnRucyIsImJ0biIsIm9wdCIsImNlbGxzIiwiY2VsbCIsImdldEF0dHJpYnV0ZSJdLCJzb3VyY2VSb290IjoiIn0=