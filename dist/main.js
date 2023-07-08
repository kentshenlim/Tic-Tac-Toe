/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubSub */ "./src/pubSub.js");

const gameBoard = (() => {
  const len = 3;
  let boardMat = Array.from({
    length: len
  }, () => new Array(len).fill('.'));

  // Method declaration
  function exposeGrid() {
    // IMPURE, UNTESTED
    let outputStr = '';
    boardMat.forEach(row => {
      outputStr = `${outputStr}${JSON.stringify(row)}\n`;
    });
    return boardMat;
  }
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
  function processOrRejectGridPicked([r, c]) {
    // IMPURE, UNTESTED
    if (boardMat[r][c] === '.') _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('gridPickedAccepted', [r, c]);else _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('gridPickedRejected', null);
    console.log('okay');
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
  function updateGrid([r, c, symbol]) {
    const updatedMatrix = pickGrid(boardMat, r, c, symbol);
    console.log(updatedMatrix);
    boardMat = updatedMatrix;
  }
  function resetGrid() {
    // IMPURE, UNTESTED
    for (let r = 0; r < len; r += 1) {
      for (let c = 0; c < len; c += 1) {
        boardMat[r][c] = '.';
      }
    }
  }

  // Event subscription
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('gridPicked', processOrRejectGridPicked);
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('updateGridPicked', updateGrid);
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('restartGame', resetGrid);
  return {
    exposeGrid,
    pickGrid,
    getResult,
    resetGrid
  };
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameBoard);

/***/ }),

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubSub */ "./src/pubSub.js");

const logic = (() => {
  // Logic variables
  let isCrossTurn = true;

  // Method declaration
  function exposeIsCrossTurn() {
    // IMPURE, UNTESTED
    return isCrossTurn;
  }
  function changeTurn() {
    // IMPURE, UNTESTED
    isCrossTurn = !isCrossTurn;
  }
  function resetLogic() {
    isCrossTurn = true;
  }
  function resolveAcceptedGridPicked([r, c]) {
    const symbol = isCrossTurn ? 'x' : 'o';
    _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('updateGridPicked', [r, c, symbol]);
  }

  // Event subscription
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('gridPickedAccepted', resolveAcceptedGridPicked);
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('updateGridPicked', changeTurn);
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('restartGame', resetLogic);
  return {
    exposeIsCrossTurn,
    changeTurn
  };
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (logic);

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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubSub */ "./src/pubSub.js");
/* harmony import */ var _img_x_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./img/x.png */ "./src/img/x.png");
/* harmony import */ var _img_o_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/o.png */ "./src/img/o.png");



const ui = (() => {
  // Method declaration
  function toggleOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.classList.toggle('active');
  }
  function toggleInfo() {
    const infoForm = document.getElementById('info-form');
    infoForm.classList.toggle('active');
  }
  function resetGrid() {
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

  // Bind events
  const restartGameBtn = document.getElementById('restart-btn');
  restartGameBtn.onclick = () => {
    _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('restartGame', null);
  };
  const infoBtn = document.getElementById('info-btn');
  infoBtn.onclick = () => {
    toggleOverlay();
    toggleInfo();
  };
  const infoCrossBtn = document.querySelector('#info-form>span.icon-close');
  infoCrossBtn.onclick = () => {
    toggleOverlay();
    toggleInfo();
  };
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    const opt = cell; // Cannot modify function param directly
    opt.onclick = () => {
      const r = opt.getAttribute('data-r');
      const c = opt.getAttribute('data-c');
      _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('gridPicked', [r, c]);
    };
  });

  // Event subscription
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('updateGridPicked', updateGrid);
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('restartGame', resetGrid);
})();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ui);

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
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui */ "./src/ui.js");




_gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"].exposeGrid();

// Expose interface functions
window.gameBoard = {
  pickGrid: _gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"].pickGrid,
  resetGrid: _gameBoard__WEBPACK_IMPORTED_MODULE_0__["default"].resetGrid
};
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDOztFQUVGO0VBQ0FsQiwrQ0FBTSxDQUFDaUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFSixVQUFVLENBQUM7RUFDaEQ3QiwrQ0FBTSxDQUFDaUMsU0FBUyxDQUFDLGFBQWEsRUFBRUQsU0FBUyxDQUFDO0FBQzVDLENBQUMsRUFBRSxDQUFDO0FBRUosaUVBQWVpQixFQUFFOzs7Ozs7Ozs7OztBQ2hFakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsQm9DO0FBQ1I7QUFDUDtBQUNDO0FBRXRCaEQsa0RBQVMsQ0FBQ08sVUFBVSxDQUFDLENBQUM7O0FBRXRCO0FBQ0FxRSxNQUFNLENBQUM1RSxTQUFTLEdBQUc7RUFBRXdCLFFBQVEsRUFBRXhCLGtEQUFTLENBQUN3QixRQUFRO0VBQUVPLFNBQVMsRUFBRS9CLGtEQUFTLENBQUMrQjtBQUFVLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2xvZ2ljLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9wdWJTdWIuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL3VpLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHViU3ViIGZyb20gJy4vcHViU3ViJztcclxuXHJcbmNvbnN0IGdhbWVCb2FyZCA9ICgoKSA9PiB7XHJcbiAgY29uc3QgbGVuID0gMztcclxuICBsZXQgYm9hcmRNYXQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBsZW4gfSwgKCkgPT4gbmV3IEFycmF5KGxlbikuZmlsbCgnLicpKTtcclxuXHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgZnVuY3Rpb24gZXhwb3NlR3JpZCgpIHsgLy8gSU1QVVJFLCBVTlRFU1RFRFxyXG4gICAgbGV0IG91dHB1dFN0ciA9ICcnO1xyXG4gICAgYm9hcmRNYXQuZm9yRWFjaCgocm93KSA9PiB7XHJcbiAgICAgIG91dHB1dFN0ciA9IGAke291dHB1dFN0cn0ke0pTT04uc3RyaW5naWZ5KHJvdyl9XFxuYDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGJvYXJkTWF0O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0UmVzdWx0KG1hdCkgeyAvLyBJTVBVUkUsIFBBU1NFRCBXSVRIIE1PQ0sgUFVCU1VCXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgIC8vIFJvdy13aXNlXHJcbiAgICAgIGNvbnN0IHJvd1JlZiA9IG1hdFtpXVswXTtcclxuICAgICAgaWYgKHJvd1JlZiAhPT0gJy4nKSB7XHJcbiAgICAgICAgZm9yIChsZXQgYyA9IDE7IGMgPCBsZW47IGMgKz0gMSkge1xyXG4gICAgICAgICAgaWYgKG1hdFtpXVtjXSAhPT0gcm93UmVmKSBicmVhaztcclxuICAgICAgICAgIGlmIChjID09PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd3aW5uZXJEZWNpZGVkJywgcm93UmVmKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJvd1JlZjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy8gQ29sdW1uLXdpc2VcclxuICAgICAgY29uc3QgY29sUmVmID0gbWF0WzBdW2ldO1xyXG4gICAgICBpZiAoY29sUmVmICE9PSAnLicpIHtcclxuICAgICAgICBmb3IgKGxldCByID0gMTsgciA8IGxlbjsgciArPSAxKSB7XHJcbiAgICAgICAgICBpZiAobWF0W3JdW2ldICE9PSBjb2xSZWYpIGJyZWFrO1xyXG4gICAgICAgICAgaWYgKHIgPT09IGxlbiAtIDEpIHtcclxuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3dpbm5lckRlY2lkZWQnLCBjb2xSZWYpO1xyXG4gICAgICAgICAgICByZXR1cm4gY29sUmVmO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gRGlhZ29uYWxzXHJcbiAgICBpZiAobWF0WzBdWzBdICE9PSAnLicpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW47IGkgKz0gMSkge1xyXG4gICAgICAgIGlmIChtYXRbaV1baV0gIT09IG1hdFswXVswXSkgYnJlYWs7XHJcbiAgICAgICAgaWYgKGkgPT09IGxlbiAtIDEpIHtcclxuICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd3aW5uZXJEZWNpZGVkJywgbWF0WzBdWzBdKTtcclxuICAgICAgICAgIHJldHVybiBtYXRbMF1bMF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobWF0WzBdW2xlbiAtIDFdICE9PSAnLicpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW47IGkgKz0gMSkge1xyXG4gICAgICAgIGlmIChtYXRbaV1bbGVuIC0gMSAtIGldICE9PSBtYXRbMF1bbGVuIC0gMV0pIGJyZWFrO1xyXG4gICAgICAgIGlmIChpID09PSBsZW4gLSAxKSB7XHJcbiAgICAgICAgICBwdWJTdWIucHVibGlzaCgnd2lubmVyRGVjaWRlZCcsIG1hdFswXVtsZW4gLSAxXSk7XHJcbiAgICAgICAgICByZXR1cm4gbWF0WzBdW2xlbiAtIDFdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHJvY2Vzc09yUmVqZWN0R3JpZFBpY2tlZChbciwgY10pIHsgLy8gSU1QVVJFLCBVTlRFU1RFRFxyXG4gICAgaWYgKGJvYXJkTWF0W3JdW2NdID09PSAnLicpIHB1YlN1Yi5wdWJsaXNoKCdncmlkUGlja2VkQWNjZXB0ZWQnLCBbciwgY10pO1xyXG4gICAgZWxzZSBwdWJTdWIucHVibGlzaCgnZ3JpZFBpY2tlZFJlamVjdGVkJywgbnVsbCk7XHJcbiAgICBjb25zb2xlLmxvZygnb2theScpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcGlja0dyaWQobWF0LCByLCBjLCBzeW1iKSB7IC8vIElNUFVSRSwgUEFTU0VEIFdJVEggTU9DSyBQVUJTVUJcclxuICAgIGlmIChyIDwgMCB8fCByID49IGxlbiB8fCBjIDwgMCB8fCBjID49IGxlbikgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKG1hdFtyXVtjXSAhPT0gJy4nKSByZXR1cm4gZmFsc2U7XHJcbiAgICBjb25zdCBuZXdNYXQgPSBuZXcgQXJyYXkobGVuKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgbmV3TWF0W2ldID0gbWF0W2ldLnNsaWNlKCk7XHJcbiAgICB9XHJcbiAgICBuZXdNYXRbcl1bY10gPSBzeW1iO1xyXG4gICAgcmV0dXJuIG5ld01hdDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVwZGF0ZUdyaWQoW3IsIGMsIHN5bWJvbF0pIHtcclxuICAgIGNvbnN0IHVwZGF0ZWRNYXRyaXggPSBwaWNrR3JpZChib2FyZE1hdCwgciwgYywgc3ltYm9sKTtcclxuICAgIGNvbnNvbGUubG9nKHVwZGF0ZWRNYXRyaXgpO1xyXG4gICAgYm9hcmRNYXQgPSB1cGRhdGVkTWF0cml4O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzZXRHcmlkKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBmb3IgKGxldCByID0gMDsgciA8IGxlbjsgciArPSAxKSB7XHJcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgbGVuOyBjICs9IDEpIHtcclxuICAgICAgICBib2FyZE1hdFtyXVtjXSA9ICcuJztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gRXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ3JpZFBpY2tlZCcsIHByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQpO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3VwZGF0ZUdyaWRQaWNrZWQnLCB1cGRhdGVHcmlkKTtcclxuICBwdWJTdWIuc3Vic2NyaWJlKCdyZXN0YXJ0R2FtZScsIHJlc2V0R3JpZCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBleHBvc2VHcmlkLCBwaWNrR3JpZCwgZ2V0UmVzdWx0LCByZXNldEdyaWQsXHJcbiAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVCb2FyZDtcclxuIiwiaW1wb3J0IHB1YlN1YiBmcm9tICcuL3B1YlN1Yic7XHJcblxyXG5jb25zdCBsb2dpYyA9ICgoKSA9PiB7XHJcbiAgLy8gTG9naWMgdmFyaWFibGVzXHJcbiAgbGV0IGlzQ3Jvc3NUdXJuID0gdHJ1ZTtcclxuXHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgZnVuY3Rpb24gZXhwb3NlSXNDcm9zc1R1cm4oKSB7IC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIHJldHVybiBpc0Nyb3NzVHVybjtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNoYW5nZVR1cm4oKSB7IC8vIElNUFVSRSwgVU5URVNURURcclxuICAgIGlzQ3Jvc3NUdXJuID0gIWlzQ3Jvc3NUdXJuO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzZXRMb2dpYygpIHtcclxuICAgIGlzQ3Jvc3NUdXJuID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc29sdmVBY2NlcHRlZEdyaWRQaWNrZWQoW3IsIGNdKSB7XHJcbiAgICBjb25zdCBzeW1ib2wgPSBpc0Nyb3NzVHVybiA/ICd4JyA6ICdvJztcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCd1cGRhdGVHcmlkUGlja2VkJywgW3IsIGMsIHN5bWJvbF0pO1xyXG4gIH1cclxuXHJcbiAgLy8gRXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgcHViU3ViLnN1YnNjcmliZSgnZ3JpZFBpY2tlZEFjY2VwdGVkJywgcmVzb2x2ZUFjY2VwdGVkR3JpZFBpY2tlZCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgndXBkYXRlR3JpZFBpY2tlZCcsIGNoYW5nZVR1cm4pO1xyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3Jlc3RhcnRHYW1lJywgcmVzZXRMb2dpYyk7XHJcblxyXG4gIHJldHVybiB7IGV4cG9zZUlzQ3Jvc3NUdXJuLCBjaGFuZ2VUdXJuIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsb2dpYztcclxuIiwiY29uc3QgcHViU3ViID0gKCgpID0+IHtcclxuICBjb25zdCBtYXAgPSB7fTtcclxuXHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgZnVuY3Rpb24gc3Vic2NyaWJlKGV2ZW50LCBmbikge1xyXG4gICAgaWYgKCFtYXBbZXZlbnRdKSBtYXBbZXZlbnRdID0gW107XHJcbiAgICBtYXBbZXZlbnRdLnB1c2goZm4pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcHVibGlzaChldmVudCwgZGF0YSkge1xyXG4gICAgaWYgKG1hcFtldmVudF0pIHtcclxuICAgICAgbWFwW2V2ZW50XS5mb3JFYWNoKChmbikgPT4ge1xyXG4gICAgICAgIGZuKGRhdGEpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKGV2ZW50LCBmbikge1xyXG4gICAgaWYgKG1hcFtldmVudF0pIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXBbZXZlbnRdLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgaWYgKG1hcFtldmVudF1baV0gPT09IGZuKSB7XHJcbiAgICAgICAgICBtYXBbZXZlbnRdLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHsgc3Vic2NyaWJlLCBwdWJsaXNoLCB1bnN1YnNjcmliZSB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHViU3ViO1xyXG4iLCJpbXBvcnQgcHViU3ViIGZyb20gJy4vcHViU3ViJztcclxuaW1wb3J0IHhTeW1ib2wgZnJvbSAnLi9pbWcveC5wbmcnO1xyXG5pbXBvcnQgb1N5bWJvbCBmcm9tICcuL2ltZy9vLnBuZyc7XHJcblxyXG5jb25zdCB1aSA9ICgoKSA9PiB7XHJcbiAgLy8gTWV0aG9kIGRlY2xhcmF0aW9uXHJcbiAgZnVuY3Rpb24gdG9nZ2xlT3ZlcmxheSgpIHtcclxuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheScpO1xyXG4gICAgb3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHRvZ2dsZUluZm8oKSB7XHJcbiAgICBjb25zdCBpbmZvRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmZvLWZvcm0nKTtcclxuICAgIGluZm9Gb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzZXRHcmlkKCkge1xyXG4gICAgY29uc3QgaW1nUyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsID4gaW1nJyk7XHJcbiAgICBpbWdTLmZvckVhY2goKGltZykgPT4ge1xyXG4gICAgICBpbWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbWcpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB1cGRhdGVHcmlkKFtyLCBjLCBzeW1ib2xdKSB7XHJcbiAgICBjb25zdCBpbWcgPSBzeW1ib2wgPT09ICd4JyA/IHhTeW1ib2wgOiBvU3ltYm9sO1xyXG4gICAgY29uc3QgaW1nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgaW1nTm9kZS5zcmMgPSBpbWc7XHJcbiAgICBjb25zdCBjZWxsTm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jZWxsW2RhdGEtcj1cIiR7cn1cIl1bZGF0YS1jPVwiJHtjfVwiXWApO1xyXG4gICAgY2VsbE5vZGUuYXBwZW5kQ2hpbGQoaW1nTm9kZSk7XHJcbiAgfVxyXG5cclxuICAvLyBCaW5kIGV2ZW50c1xyXG4gIGNvbnN0IHJlc3RhcnRHYW1lQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhcnQtYnRuJyk7XHJcbiAgcmVzdGFydEdhbWVCdG4ub25jbGljayA9ICgpID0+IHtcclxuICAgIHB1YlN1Yi5wdWJsaXNoKCdyZXN0YXJ0R2FtZScsIG51bGwpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGluZm9CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5mby1idG4nKTtcclxuICBpbmZvQnRuLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICB0b2dnbGVPdmVybGF5KCk7XHJcbiAgICB0b2dnbGVJbmZvKCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaW5mb0Nyb3NzQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luZm8tZm9ybT5zcGFuLmljb24tY2xvc2UnKTtcclxuICBpbmZvQ3Jvc3NCdG4ub25jbGljayA9ICgpID0+IHtcclxuICAgIHRvZ2dsZU92ZXJsYXkoKTtcclxuICAgIHRvZ2dsZUluZm8oKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJyk7XHJcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xyXG4gICAgY29uc3Qgb3B0ID0gY2VsbDsgLy8gQ2Fubm90IG1vZGlmeSBmdW5jdGlvbiBwYXJhbSBkaXJlY3RseVxyXG4gICAgb3B0Lm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHIgPSBvcHQuZ2V0QXR0cmlidXRlKCdkYXRhLXInKTtcclxuICAgICAgY29uc3QgYyA9IG9wdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYycpO1xyXG4gICAgICBwdWJTdWIucHVibGlzaCgnZ3JpZFBpY2tlZCcsIFtyLCBjXSk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICAvLyBFdmVudCBzdWJzY3JpcHRpb25cclxuICBwdWJTdWIuc3Vic2NyaWJlKCd1cGRhdGVHcmlkUGlja2VkJywgdXBkYXRlR3JpZCk7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgncmVzdGFydEdhbWUnLCByZXNldEdyaWQpO1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdWk7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgZ2FtZUJvYXJkIGZyb20gJy4vZ2FtZUJvYXJkJztcbmltcG9ydCBsb2dpYyBmcm9tICcuL2xvZ2ljJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IHVpIGZyb20gJy4vdWknO1xuXG5nYW1lQm9hcmQuZXhwb3NlR3JpZCgpO1xuXG4vLyBFeHBvc2UgaW50ZXJmYWNlIGZ1bmN0aW9uc1xud2luZG93LmdhbWVCb2FyZCA9IHsgcGlja0dyaWQ6IGdhbWVCb2FyZC5waWNrR3JpZCwgcmVzZXRHcmlkOiBnYW1lQm9hcmQucmVzZXRHcmlkIH07XG4iXSwibmFtZXMiOlsicHViU3ViIiwiZ2FtZUJvYXJkIiwibGVuIiwiYm9hcmRNYXQiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJmaWxsIiwiZXhwb3NlR3JpZCIsIm91dHB1dFN0ciIsImZvckVhY2giLCJyb3ciLCJKU09OIiwic3RyaW5naWZ5IiwiZ2V0UmVzdWx0IiwibWF0IiwiaSIsInJvd1JlZiIsImMiLCJwdWJsaXNoIiwiY29sUmVmIiwiciIsInByb2Nlc3NPclJlamVjdEdyaWRQaWNrZWQiLCJjb25zb2xlIiwibG9nIiwicGlja0dyaWQiLCJzeW1iIiwibmV3TWF0Iiwic2xpY2UiLCJ1cGRhdGVHcmlkIiwic3ltYm9sIiwidXBkYXRlZE1hdHJpeCIsInJlc2V0R3JpZCIsInN1YnNjcmliZSIsImxvZ2ljIiwiaXNDcm9zc1R1cm4iLCJleHBvc2VJc0Nyb3NzVHVybiIsImNoYW5nZVR1cm4iLCJyZXNldExvZ2ljIiwicmVzb2x2ZUFjY2VwdGVkR3JpZFBpY2tlZCIsIm1hcCIsImV2ZW50IiwiZm4iLCJwdXNoIiwiZGF0YSIsInVuc3Vic2NyaWJlIiwic3BsaWNlIiwieFN5bWJvbCIsIm9TeW1ib2wiLCJ1aSIsInRvZ2dsZU92ZXJsYXkiLCJvdmVybGF5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInRvZ2dsZUluZm8iLCJpbmZvRm9ybSIsImltZ1MiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW1nIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiaW1nTm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJjZWxsTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJhcHBlbmRDaGlsZCIsInJlc3RhcnRHYW1lQnRuIiwib25jbGljayIsImluZm9CdG4iLCJpbmZvQ3Jvc3NCdG4iLCJjZWxscyIsImNlbGwiLCJvcHQiLCJnZXRBdHRyaWJ1dGUiLCJ3aW5kb3ciXSwic291cmNlUm9vdCI6IiJ9