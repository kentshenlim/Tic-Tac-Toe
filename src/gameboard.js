import pubSub from './pubSub';

const gameBoard = (() => {
  const len = 3;
  const boardMat = Array.from({ length: len }, () => new Array(len).fill('.'));

  // Method declaration
  function exposeGrid() { // IMPURE, UNTESTED
    let outputStr = '';
    boardMat.forEach((row) => {
      outputStr = `${outputStr}${JSON.stringify(row)}\n`;
    });
    return boardMat;
  }

  function getResult(mat) { // IMPURE, PASSED WITH MOCK PUBSUB
    for (let i = 0; i < len; i += 1) {
      // Row-wise
      const rowRef = mat[i][0];
      if (rowRef !== '.') {
        for (let c = 1; c < len; c += 1) {
          if (mat[i][c] !== rowRef) break;
          if (c === len - 1) {
            pubSub.publish('winnerDecided', rowRef);
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
            pubSub.publish('winnerDecided', colRef);
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
          pubSub.publish('winnerDecided', mat[0][0]);
          return mat[0][0];
        }
      }
    }
    if (mat[0][len - 1] !== '.') {
      for (let i = 1; i < len; i += 1) {
        if (mat[i][len - 1 - i] !== mat[0][len - 1]) break;
        if (i === len - 1) {
          pubSub.publish('winnerDecided', mat[0][len - 1]);
          return mat[0][len - 1];
        }
      }
    }
    return false;
  }

  function pickGrid(mat, r, c, symb) { // IMPURE, PASSED WITH MOCK PUBSUB
    if (r < 0 || r >= len || c < 0 || c >= len) return false;
    if (mat[r][c] !== '.') return false;
    const newMat = new Array(len);
    for (let i = 0; i < len; i += 1) {
      newMat[i] = mat[i].slice();
    }
    newMat[r][c] = symb;
    pubSub.publish('gridPicked', [r, c]);
    return newMat;
  }

  function resetGrid() { // IMPURE, UNTESTED
    for (let r = 0; r < len; r += 1) {
      for (let c = 0; c < len; c += 1) {
        boardMat[r][c] = '.';
      }
    }
  }

  // Event subscription
  pubSub.subscribe('restartGame', resetGrid);

  return {
    exposeGrid, pickGrid, getResult, resetGrid,
  };
})();

export default gameBoard;
