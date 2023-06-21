/* eslint-disable import/extensions */
import gameBoard from './gameBoard.js';
import logic from './logic.js';

gameBoard.getGrid();

// Expose interface functions
window.gameBoard = { pickGrid: gameBoard.pickGrid, resetGrid: gameBoard.resetGrid };
