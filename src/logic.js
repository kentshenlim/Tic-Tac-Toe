/* eslint-disable import/extensions */
import gameBoard from './gameBoard.js';

const logic = (() => {
  // Logic variables
  const isCrossTurn = true;

  // Method declaration
  function afterMove() {
    const res = gameBoard.getResult();
    if (res) {
      console.log(`${res} won!`);
    }
  }
})();
