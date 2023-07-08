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

  function resetLogic() {
    isCrossTurn = true;
  }

  // Event subscription
  pubSub.subscribe('gridPicked', changeTurn);
  pubSub.subscribe('restartGame', resetLogic);

  return { exposeIsCrossTurn, changeTurn };
})();

export default logic;
