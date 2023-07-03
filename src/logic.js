import pubSub from './pubSub';

const logic = (() => {
  // Logic variables
  let isCrossTurn = true;

  // Method declaration
  function exposeIsCrossTurn() { // IMPURE, UNTESTED
    return isCrossTurn;
  }

  function changeTurn() { // IMPURE, UNTESTED
    isCrossTurn = !isCrossTurn;
  }

  pubSub.subscribe('afterMove', changeTurn);

  return { exposeIsCrossTurn, changeTurn };
})();

export default logic;
