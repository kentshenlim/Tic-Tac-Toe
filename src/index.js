import gameBoard from './gameBoard';
import logic from './logic';
import './style.css';

gameBoard.exposeGrid();

// Expose interface functions
window.gameBoard = { pickGrid: gameBoard.pickGrid, resetGrid: gameBoard.resetGrid };
