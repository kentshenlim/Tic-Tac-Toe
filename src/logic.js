import pubSub from './pubSub';

(() => {
  // Logic variable
  let isCrossTurn = true;
  let isGameEnded = false;

  // Method declaration
  // function exposeIsCrossTurn() { // IMPURE, UNTESTED, FOE DEBUGGING
  //   return isCrossTurn;
  // }

  function changeTurn() { // IMPURE, UNTESTED
    isCrossTurn = !isCrossTurn;
  }

  function endGame() {
    isGameEnded = true;
  }

  function reset() {
    isCrossTurn = true;
    isGameEnded = false;
  }

  function processOrRejectGridPicked([r, c]) {
    if (!isGameEnded) pubSub.publish('gridPickedBeforeEnd', [r, c]);
  }

  function resolveAcceptedGridPicked([r, c]) {
    const symbol = isCrossTurn ? 'x' : 'o';
    pubSub.publish('updateGridPicked', [r, c, symbol]);
  }

  // Event subscription
  pubSub.subscribe('restartGame', reset);
  pubSub.subscribe('gridPicked', processOrRejectGridPicked);
  pubSub.subscribe('gridPickedAccepted', resolveAcceptedGridPicked);
  pubSub.subscribe('updateGridPicked', changeTurn);
  pubSub.subscribe('gameEnded', endGame);
})();
