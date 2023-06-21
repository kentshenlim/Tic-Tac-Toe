/* eslint-disable import/extensions */
import pubSub from './pubSub.js';

const gameBoard = (() => {
  const len = 3;
  const matrix = Array.from({ length: len }, () => new Array(len).fill('.'));

  // Method declaration
  function getGrid() {
    let outputStr = '';
    matrix.forEach((row) => {
      outputStr = `${outputStr}${JSON.stringify(row)}\n`;
    });
    console.log(outputStr);
    return matrix;
  }

  function getSymbol(mat) {
    // In case symbol not provided in pickGrid
    let xCount = 0;
    let oCount = 0;
    mat.forEach((row) => {
      row.forEach((item) => {
        if (item === 'X') xCount += 1;
        else if (item === 'O') oCount += 1;
      });
    });
    return xCount === oCount ? 'X' : 'O';
  }

  function getResult() {
    for (let i = 0; i < len; i += 1) {
      // Row-wise
      const rowRef = matrix[i][0];
      if (rowRef !== '.') {
        for (let c = 1; c < len; c += 1) {
          if (matrix[i][c] !== rowRef) break;
          if (c === len - 1) return rowRef;
        }
      }
      // Col-wise
      const colRef = matrix[0][i];
      if (colRef !== '.') {
        for (let r = 1; r < len; r += 1) {
          if (matrix[r][i] !== colRef) break;
          if (r === len - 1) return colRef;
        }
      }
    }
    // Diagonals
    if (matrix[0][0] !== '.') {
      for (let i = 1; i < len; i += 1) {
        if (matrix[i][i] !== matrix[0][0]) break;
        if (i === len - 1) return matrix[0][0];
      }
    }
    if (matrix[0][len - 1] !== '.') {
      for (let i = 1; i < len; i += 1) {
        if (matrix[i][len - 1 - i] !== matrix[0][len - 1]) break;
        if (i === len - 1) return matrix[0][len - 1];
      }
    }
    return false;
  }

  function pickGrid(r, c, symb) {
    if (r < 0 || r >= len || c < 0 || c >= len) {
      console.log('%cRow number or col number out of range!', 'color: red;');
      return false;
    }
    if (matrix[r][c] !== '.') {
      console.log('%cGrid chosen has been occupied!', 'color: red;');
      return false;
    }
    if (symb !== undefined) {
      if (symb !== 'X' && symb !== 'O') {
        console.log('%cPlayer symbol either "X" or "O" only!', 'color:red;');
        return false;
      }
      if (symb !== getSymbol(matrix)) {
        console.log('%cNot your turn!', 'color: red;');
        return false;
      }
    }
    // eslint-disable-next-line no-param-reassign
    if (symb === undefined) symb = getSymbol(matrix);
    matrix[r][c] = symb;
    getGrid();
    pubSub.publish('afterMove', null);
    return true;
  }

  function resetGrid() {
    for (let r = 0; r < len; r += 1) {
      for (let c = 0; c < len; c += 1) {
        matrix[r][c] = 0;
      }
    }
  }

  // Event subscription
  pubSub.subscribe('gameEnd', resetGrid);

  return {
    getGrid, pickGrid, getResult, resetGrid,
  };
})();

export default gameBoard;
