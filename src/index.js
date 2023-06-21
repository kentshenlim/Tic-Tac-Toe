/* eslint-disable import/extensions */
import gameBoard from './gameBoard.js';
import logic from './logic.js';

const mat = [['0', 2, '2'], ['.', '2', '.'], ['2', '0', '1']];
console.log(gameBoard.getResult(mat));
gameBoard.getGrid();

window.gameBoard = gameBoard;
