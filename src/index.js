import gameBoard from './gameBoard';
import logic from './logic';
import './style.css';
import ui from './ui';

gameBoard.exposeGrid();

// Expose interface functions
window.gameBoard = { pickGrid: gameBoard.pickGrid, resetGrid: gameBoard.resetGrid };
