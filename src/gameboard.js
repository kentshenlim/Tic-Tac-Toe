import pubSub from './pubSub';

const gameBoard = (() => {
  const len = 3;
  let boardMat = Array.from({ length: len }, () => new Array(len).fill('.'));

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

  function processOrRejectGridPicked([r, c]) { // IMPURE, UNTESTED
    if (boardMat[r][c] === '.') pubSub.publish('gridPickedAccepted', [r, c]);
    else pubSub.publish('gridPickedRejected', null);
    console.log('okay');
  }

  function pickGrid(mat, r, c, symb) { // IMPURE, PASSED WITH MOCK PUBSUB
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

  function resetGrid() { // IMPURE, UNTESTED
    for (let r = 0; r < len; r += 1) {
      for (let c = 0; c < len; c += 1) {
        boardMat[r][c] = '.';
      }
    }
  }

  // Event subscription
  pubSub.subscribe('gridPicked', processOrRejectGridPicked);
  pubSub.subscribe('updateGridPicked', updateGrid);
  pubSub.subscribe('restartGame', resetGrid);

  return {
    exposeGrid, pickGrid, getResult, resetGrid,
  };
})();

export default gameBoard;
