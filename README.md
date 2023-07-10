# Tic-Tac-Toe

### Project Overview

- The PVP Tic-tac-toe app is developed using the module pattern in Vanilla
  JavaScript, serving as a practice exercise.
- Tested with Jest

### Design

- The app is built using three independent core modules, namely:

  - logic.js
  - gameBoard.js
  - ui.js

  These modules are coordinated through the mediator pubSub.js.

- Module overview

  ```mermaid
    classDiagram
        class Logic["logic.js"] {
            -boolean isCrossTurn
            -boolean isGameEnded
            -changeTurn() null
            -endGame() null
            -reset() null
            +processOrRejectGridPicked([r, c]) null
            +resolveAcceptedGridPicked([r, c]) null
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
