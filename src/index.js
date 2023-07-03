import gameBoard from './gameBoard';
import logic from './logic';

gameBoard.getGrid();

// Expose interface functions
window.gameBoard = { pickGrid: gameBoard.pickGrid, resetGrid: gameBoard.resetGrid };
