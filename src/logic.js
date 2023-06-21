/* eslint-disable import/extensions */
import gameBoard from './gameBoard.js';
import pubSub from './pubSub.js';

const logic = (() => {
  // Logic variables
  let isCrossTurn = true;

  // Method declaration
  function afterMove() {
    isCrossTurn = !isCrossTurn;
    const res = gameBoard.getResult();
    if (res) {
      console.log(`${res} won!`);
    }
  }

  pubSub.subscribe('afterMove', afterMove);
})();
