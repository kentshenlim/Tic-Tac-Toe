# Tic-Tac-Toe

### `Project Overview`

- The PVP Tic-tac-toe app is developed using the module pattern in Vanilla
  JavaScript, serving as a practice exercise.
- Tested with Jest

### `Credits`

- Virus figures from [BioRender](https://www.biorender.com/), a full-blown
  website for drawing research-quality scientific image and illustration.

### `Design`

- The app is built using three independent core modules, namely:

  - logic.js
  - gameBoard.js
  - ui.js

  These modules are coordinated through the mediator pubSub.js.

- Module properties and methods Overview

  ```mermaid
    classDiagram
        class Logic["logic.js"] {
            -boolean isCrossTurn
            -boolean isGameEnded
            -changeTurn() null
            -endGame() null
            -reset() null
            +processOrRejectGridPicked([r, c]) e.gridPickedBeforeEnd
            +resolveAcceptedGridPicked([r, c]) e.updateGridPicked
        }

        class GameBoard["gameBoard.js"] {
            -number len
            -Array boardMat
            -getResult(mat) string
            -isFull(mat) boolean
            -pickGrid(mat, r, c, symb) Array
            -updateGrid([r, c, symb]) null
            -reset(): null
            +processOrRejectGridPicked([r, c]) e.gridPickedAccepted || e.gridPickRejected
            +decideIfEnded() e.gameEnded
        }

        class UI["ui.js"] {
            -toggleElement(id)  undefined
            -closePopup(event) undefined
            -reset() undefined
            -updateGrid([r, c, symb]) undefined
            -displayResult(winner) undefined
            -shakeCell([r, c]) undefined
    }
  ```

- pubSub sequence diagram overview, starting from click being registered at one
  cell, until final result displayed.

  ```mermaid
  sequenceDiagram
    participant pubSub.js
    participant logic.js
    participant gameBoard.js
    participant ui.js

    ui.js->>pubSub.js:gridPicked ([r, c])
    pubSub.js->>logic.js:.processOrRejectGridPicked([r, c])
    logic.js->>pubSub.js:gridPickedBeforeEnd([r, c])
    pubSub.js->>gameBoard.js:.processOrRejectGridPicked([r, c])
    gameBoard.js->>pubSub.js:gridPickedAccepted([r, c])
    pubSub.js->>logic.js:.resolveAcceptedGridPicked([r, c])
    logic.js->>pubSub.js:updateGridPicked([r, c, symb])
    par pubSub.js to logic.js
        pubSub.js->>logic.js: .changeTurn([r, c, symb])
    and pubSub.js to gameBoard.js
        pubSub.js->>gameBoard.js: .updateGrid([r, c, symb])
    and pubSub.js to ui.js
        pubSub.js->>ui.js: .updateGrid([r, c, symb])
    end

    gameBoard.js->>pubSub.js: gameEnded(res)
    par pubSub.js to logic.js
        pubSub.js->>logic.js: .endGame(res)
    and pubSub.js to ui.js
        pubSub.js->>ui.js: .displayResult(res)
    pubSub.js->>ui.js: .updateGrid([r, c, symb])
    end
  ```
