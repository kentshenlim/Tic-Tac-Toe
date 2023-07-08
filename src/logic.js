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

  function resolveAcceptedGridPicked([r, c]) {
    const symbol = isCrossTurn ? 'x' : 'o';
    pubSub.publish('updateGridPicked', [r, c, symbol]);
  }

  // Event subscription
  pubSub.subscribe('gridPickedAccepted', resolveAcceptedGridPicked);
  pubSub.subscribe('updateGridPicked', changeTurn);
  pubSub.subscribe('restartGame', resetLogic);

  return { exposeIsCrossTurn, changeTurn };
})();

export default logic;
