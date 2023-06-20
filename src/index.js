/* eslint-disable import/extensions */
import gameBoard from './gameBoard.js';

const mat = [['0', 2, '2'], ['.', '2', '.'], ['2', '0', '1']];
console.log(gameBoard.getResult(mat));
gameBoard.logGrid();
