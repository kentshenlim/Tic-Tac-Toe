const gameBoard = (() => {
  const len = 3;
  const matrix = Array.from({ length: len }, () => new Array(len).fill('.'));
  let isCrossTurn = true;

  // Methods declaration
  function logGrid() {
    console.log(matrix);
  }

  function pickGrid(r, c, mat = matrix) {
    if (r < 0 || r >= len || c < 0 || c >= len) {
      console.log('Row number or col number out of range!');
    } else if (mat[r][c] !== '.') {
      console.log('Grid chosen has been occupied!');
    } else {
      const ref = mat;
      ref[r][c] = isCrossTurn ? 'X' : 'O';
      isCrossTurn = !isCrossTurn;
    }
  }

  function getResult(mat) {
    for (let i = 0; i < len; i += 1) {
      // Row-wise
      const rowRef = mat[i][0];
      if (rowRef !== '.') {
        for (let c = 1; c < len; c += 1) {
          if (mat[i][c] !== rowRef) break;
          if (c === len - 1) return rowRef;
        }
      }
      // Col-wise
      const colRef = mat[0][i];
      if (colRef !== '.') {
        for (let r = 1; r < len; r += 1) {
          if (mat[r][i] !== colRef) break;
          if (r === len - 1) return colRef;
        }
      }
    }
    // Diagonals
    if (mat[0][0] !== '.') {
      for (let i = 1; i < len; i += 1) {
        if (mat[i][i] !== mat[0][0]) break;
        if (i === len - 1) return mat[0][0];
      }
    }
    if (mat[0][len - 1] !== '.') {
      for (let i = 1; i < len; i += 1) {
        if (mat[i][len - 1 - i] !== mat[0][len - 1]) break;
        if (i === len - 1) return mat[0][len - 1];
      }
    }
    return false;
  }

  return { logGrid, pickGrid, getResult };
})();

export default gameBoard;
