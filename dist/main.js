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
  const boardMat = Array.from({
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
  function pickGrid(mat, r, c, symb) {
    // IMPURE, PASSED WITH MOCK PUBSUB
    if (r < 0 || r >= len || c < 0 || c >= len) return false;
    if (mat[r][c] !== '.') return false;
    const newMat = new Array(len);
    for (let i = 0; i < len; i += 1) {
      newMat[i] = mat[i].slice();
    }
    newMat[r][c] = symb;
    _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].publish('gridPicked', [r, c]);
    return newMat;
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

  // Event subscription
  _pubSub__WEBPACK_IMPORTED_MODULE_0__["default"].subscribe('gridPicked', changeTurn);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsQm9DO0FBQ1I7QUFDUDtBQUNDO0FBRXRCekMsa0RBQVMsQ0FBQ08sVUFBVSxDQUFDLENBQUM7O0FBRXRCO0FBQ0F5RCxNQUFNLENBQUNoRSxTQUFTLEdBQUc7RUFBRXFCLFFBQVEsRUFBRXJCLGtEQUFTLENBQUNxQixRQUFRO0VBQUVJLFNBQVMsRUFBRXpCLGtEQUFTLENBQUN5QjtBQUFVLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL2xvZ2ljLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9wdWJTdWIuanMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0Ly4vc3JjL3VpLmpzIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbXktd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL215LXdlYnBhY2stcHJvamVjdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHViU3ViIGZyb20gJy4vcHViU3ViJztcclxuXHJcbmNvbnN0IGdhbWVCb2FyZCA9ICgoKSA9PiB7XHJcbiAgY29uc3QgbGVuID0gMztcclxuICBjb25zdCBib2FyZE1hdCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IGxlbiB9LCAoKSA9PiBuZXcgQXJyYXkobGVuKS5maWxsKCcuJykpO1xyXG5cclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICBmdW5jdGlvbiBleHBvc2VHcmlkKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBsZXQgb3V0cHV0U3RyID0gJyc7XHJcbiAgICBib2FyZE1hdC5mb3JFYWNoKChyb3cpID0+IHtcclxuICAgICAgb3V0cHV0U3RyID0gYCR7b3V0cHV0U3RyfSR7SlNPTi5zdHJpbmdpZnkocm93KX1cXG5gO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYm9hcmRNYXQ7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZXRSZXN1bHQobWF0KSB7IC8vIElNUFVSRSwgUEFTU0VEIFdJVEggTU9DSyBQVUJTVUJcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDEpIHtcclxuICAgICAgLy8gUm93LXdpc2VcclxuICAgICAgY29uc3Qgcm93UmVmID0gbWF0W2ldWzBdO1xyXG4gICAgICBpZiAocm93UmVmICE9PSAnLicpIHtcclxuICAgICAgICBmb3IgKGxldCBjID0gMTsgYyA8IGxlbjsgYyArPSAxKSB7XHJcbiAgICAgICAgICBpZiAobWF0W2ldW2NdICE9PSByb3dSZWYpIGJyZWFrO1xyXG4gICAgICAgICAgaWYgKGMgPT09IGxlbiAtIDEpIHtcclxuICAgICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3dpbm5lckRlY2lkZWQnLCByb3dSZWYpO1xyXG4gICAgICAgICAgICByZXR1cm4gcm93UmVmO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyBDb2x1bW4td2lzZVxyXG4gICAgICBjb25zdCBjb2xSZWYgPSBtYXRbMF1baV07XHJcbiAgICAgIGlmIChjb2xSZWYgIT09ICcuJykge1xyXG4gICAgICAgIGZvciAobGV0IHIgPSAxOyByIDwgbGVuOyByICs9IDEpIHtcclxuICAgICAgICAgIGlmIChtYXRbcl1baV0gIT09IGNvbFJlZikgYnJlYWs7XHJcbiAgICAgICAgICBpZiAociA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgICBwdWJTdWIucHVibGlzaCgnd2lubmVyRGVjaWRlZCcsIGNvbFJlZik7XHJcbiAgICAgICAgICAgIHJldHVybiBjb2xSZWY7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBEaWFnb25hbHNcclxuICAgIGlmIChtYXRbMF1bMF0gIT09ICcuJykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgICAgaWYgKG1hdFtpXVtpXSAhPT0gbWF0WzBdWzBdKSBicmVhaztcclxuICAgICAgICBpZiAoaSA9PT0gbGVuIC0gMSkge1xyXG4gICAgICAgICAgcHViU3ViLnB1Ymxpc2goJ3dpbm5lckRlY2lkZWQnLCBtYXRbMF1bMF0pO1xyXG4gICAgICAgICAgcmV0dXJuIG1hdFswXVswXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChtYXRbMF1bbGVuIC0gMV0gIT09ICcuJykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbjsgaSArPSAxKSB7XHJcbiAgICAgICAgaWYgKG1hdFtpXVtsZW4gLSAxIC0gaV0gIT09IG1hdFswXVtsZW4gLSAxXSkgYnJlYWs7XHJcbiAgICAgICAgaWYgKGkgPT09IGxlbiAtIDEpIHtcclxuICAgICAgICAgIHB1YlN1Yi5wdWJsaXNoKCd3aW5uZXJEZWNpZGVkJywgbWF0WzBdW2xlbiAtIDFdKTtcclxuICAgICAgICAgIHJldHVybiBtYXRbMF1bbGVuIC0gMV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwaWNrR3JpZChtYXQsIHIsIGMsIHN5bWIpIHsgLy8gSU1QVVJFLCBQQVNTRUQgV0lUSCBNT0NLIFBVQlNVQlxyXG4gICAgaWYgKHIgPCAwIHx8IHIgPj0gbGVuIHx8IGMgPCAwIHx8IGMgPj0gbGVuKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAobWF0W3JdW2NdICE9PSAnLicpIHJldHVybiBmYWxzZTtcclxuICAgIGNvbnN0IG5ld01hdCA9IG5ldyBBcnJheShsZW4pO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xyXG4gICAgICBuZXdNYXRbaV0gPSBtYXRbaV0uc2xpY2UoKTtcclxuICAgIH1cclxuICAgIG5ld01hdFtyXVtjXSA9IHN5bWI7XHJcbiAgICBwdWJTdWIucHVibGlzaCgnZ3JpZFBpY2tlZCcsIFtyLCBjXSk7XHJcbiAgICByZXR1cm4gbmV3TWF0O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVzZXRHcmlkKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBmb3IgKGxldCByID0gMDsgciA8IGxlbjsgciArPSAxKSB7XHJcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgbGVuOyBjICs9IDEpIHtcclxuICAgICAgICBib2FyZE1hdFtyXVtjXSA9ICcuJztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gRXZlbnQgc3Vic2NyaXB0aW9uXHJcbiAgcHViU3ViLnN1YnNjcmliZSgncmVzdGFydEdhbWUnLCByZXNldEdyaWQpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZXhwb3NlR3JpZCwgcGlja0dyaWQsIGdldFJlc3VsdCwgcmVzZXRHcmlkLFxyXG4gIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnYW1lQm9hcmQ7XHJcbiIsImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xyXG5cclxuY29uc3QgbG9naWMgPSAoKCkgPT4ge1xyXG4gIC8vIExvZ2ljIHZhcmlhYmxlc1xyXG4gIGxldCBpc0Nyb3NzVHVybiA9IHRydWU7XHJcblxyXG4gIC8vIE1ldGhvZCBkZWNsYXJhdGlvblxyXG4gIGZ1bmN0aW9uIGV4cG9zZUlzQ3Jvc3NUdXJuKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICByZXR1cm4gaXNDcm9zc1R1cm47XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjaGFuZ2VUdXJuKCkgeyAvLyBJTVBVUkUsIFVOVEVTVEVEXHJcbiAgICBpc0Nyb3NzVHVybiA9ICFpc0Nyb3NzVHVybjtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlc2V0TG9naWMoKSB7XHJcbiAgICBpc0Nyb3NzVHVybiA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvLyBFdmVudCBzdWJzY3JpcHRpb25cclxuICBwdWJTdWIuc3Vic2NyaWJlKCdncmlkUGlja2VkJywgY2hhbmdlVHVybik7XHJcbiAgcHViU3ViLnN1YnNjcmliZSgncmVzdGFydEdhbWUnLCByZXNldExvZ2ljKTtcclxuXHJcbiAgcmV0dXJuIHsgZXhwb3NlSXNDcm9zc1R1cm4sIGNoYW5nZVR1cm4gfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxvZ2ljO1xyXG4iLCJjb25zdCBwdWJTdWIgPSAoKCkgPT4ge1xyXG4gIGNvbnN0IG1hcCA9IHt9O1xyXG5cclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICBmdW5jdGlvbiBzdWJzY3JpYmUoZXZlbnQsIGZuKSB7XHJcbiAgICBpZiAoIW1hcFtldmVudF0pIG1hcFtldmVudF0gPSBbXTtcclxuICAgIG1hcFtldmVudF0ucHVzaChmbik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBwdWJsaXNoKGV2ZW50LCBkYXRhKSB7XHJcbiAgICBpZiAobWFwW2V2ZW50XSkge1xyXG4gICAgICBtYXBbZXZlbnRdLmZvckVhY2goKGZuKSA9PiB7XHJcbiAgICAgICAgZm4oZGF0YSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdW5zdWJzY3JpYmUoZXZlbnQsIGZuKSB7XHJcbiAgICBpZiAobWFwW2V2ZW50XSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcFtldmVudF0ubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICBpZiAobWFwW2V2ZW50XVtpXSA9PT0gZm4pIHtcclxuICAgICAgICAgIG1hcFtldmVudF0uc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4geyBzdWJzY3JpYmUsIHB1Ymxpc2gsIHVuc3Vic2NyaWJlIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwdWJTdWI7XHJcbiIsImltcG9ydCBwdWJTdWIgZnJvbSAnLi9wdWJTdWInO1xyXG5pbXBvcnQgeFN5bWJvbCBmcm9tICcuL2ltZy94LnBuZyc7XHJcbmltcG9ydCBvU3ltYm9sIGZyb20gJy4vaW1nL28ucG5nJztcclxuXHJcbmNvbnN0IHVpID0gKCgpID0+IHtcclxuICAvLyBNZXRob2QgZGVjbGFyYXRpb25cclxuICBmdW5jdGlvbiB0b2dnbGVPdmVybGF5KCkge1xyXG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVybGF5Jyk7XHJcbiAgICBvdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gdG9nZ2xlSW5mbygpIHtcclxuICAgIGNvbnN0IGluZm9Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZm8tZm9ybScpO1xyXG4gICAgaW5mb0Zvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXNldEdyaWQoKSB7XHJcbiAgICBjb25zdCBpbWdTID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwgPiBpbWcnKTtcclxuICAgIGltZ1MuZm9yRWFjaCgoaW1nKSA9PiB7XHJcbiAgICAgIGltZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGltZyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIEJpbmQgZXZlbnRzXHJcbiAgY29uc3QgcmVzdGFydEdhbWVCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGFydC1idG4nKTtcclxuICByZXN0YXJ0R2FtZUJ0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgcHViU3ViLnB1Ymxpc2goJ3Jlc3RhcnRHYW1lJywgbnVsbCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaW5mb0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmZvLWJ0bicpO1xyXG4gIGluZm9CdG4ub25jbGljayA9ICgpID0+IHtcclxuICAgIHRvZ2dsZU92ZXJsYXkoKTtcclxuICAgIHRvZ2dsZUluZm8oKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBpbmZvQ3Jvc3NCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5mby1mb3JtPnNwYW4uaWNvbi1jbG9zZScpO1xyXG4gIGluZm9Dcm9zc0J0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgdG9nZ2xlT3ZlcmxheSgpO1xyXG4gICAgdG9nZ2xlSW5mbygpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcclxuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XHJcbiAgICBjb25zdCBvcHQgPSBjZWxsOyAvLyBDYW5ub3QgbW9kaWZ5IGZ1bmN0aW9uIHBhcmFtIGRpcmVjdGx5XHJcbiAgICBvcHQub25jbGljayA9ICgpID0+IHtcclxuICAgICAgY29uc3QgciA9IG9wdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcicpO1xyXG4gICAgICBjb25zdCBjID0gb3B0LmdldEF0dHJpYnV0ZSgnZGF0YS1jJyk7XHJcbiAgICAgIHB1YlN1Yi5wdWJsaXNoKCdncmlkUGlja2VkJywgW3IsIGNdKTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIC8vIEV2ZW50IHN1YnNjcmlwdGlvblxyXG4gIHB1YlN1Yi5zdWJzY3JpYmUoJ3Jlc3RhcnRHYW1lJywgcmVzZXRHcmlkKTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVpO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0IGdhbWVCb2FyZCBmcm9tICcuL2dhbWVCb2FyZCc7XG5pbXBvcnQgbG9naWMgZnJvbSAnLi9sb2dpYyc7XG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCB1aSBmcm9tICcuL3VpJztcblxuZ2FtZUJvYXJkLmV4cG9zZUdyaWQoKTtcblxuLy8gRXhwb3NlIGludGVyZmFjZSBmdW5jdGlvbnNcbndpbmRvdy5nYW1lQm9hcmQgPSB7IHBpY2tHcmlkOiBnYW1lQm9hcmQucGlja0dyaWQsIHJlc2V0R3JpZDogZ2FtZUJvYXJkLnJlc2V0R3JpZCB9O1xuIl0sIm5hbWVzIjpbInB1YlN1YiIsImdhbWVCb2FyZCIsImxlbiIsImJvYXJkTWF0IiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiZmlsbCIsImV4cG9zZUdyaWQiLCJvdXRwdXRTdHIiLCJmb3JFYWNoIiwicm93IiwiSlNPTiIsInN0cmluZ2lmeSIsImdldFJlc3VsdCIsIm1hdCIsImkiLCJyb3dSZWYiLCJjIiwicHVibGlzaCIsImNvbFJlZiIsInIiLCJwaWNrR3JpZCIsInN5bWIiLCJuZXdNYXQiLCJzbGljZSIsInJlc2V0R3JpZCIsInN1YnNjcmliZSIsImxvZ2ljIiwiaXNDcm9zc1R1cm4iLCJleHBvc2VJc0Nyb3NzVHVybiIsImNoYW5nZVR1cm4iLCJyZXNldExvZ2ljIiwibWFwIiwiZXZlbnQiLCJmbiIsInB1c2giLCJkYXRhIiwidW5zdWJzY3JpYmUiLCJzcGxpY2UiLCJ4U3ltYm9sIiwib1N5bWJvbCIsInVpIiwidG9nZ2xlT3ZlcmxheSIsIm92ZXJsYXkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwidG9nZ2xlSW5mbyIsImluZm9Gb3JtIiwiaW1nUyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpbWciLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJyZXN0YXJ0R2FtZUJ0biIsIm9uY2xpY2siLCJpbmZvQnRuIiwiaW5mb0Nyb3NzQnRuIiwicXVlcnlTZWxlY3RvciIsImNlbGxzIiwiY2VsbCIsIm9wdCIsImdldEF0dHJpYnV0ZSIsIndpbmRvdyJdLCJzb3VyY2VSb290IjoiIn0=