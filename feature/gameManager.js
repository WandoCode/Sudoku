import datasFactory from '../factories/datasFactory.js'
import { getCellIndex } from '../factories/helpers.js'
import UIFactory from '../factories/UIFactory.js'
import gameStore from '../store/game.store.js'
import solutionStore from '../store/solution.store.js'

function gameManager() {
  const gStore = gameStore()
  const sStore = solutionStore()

  const getRandomNbr = (max) => {
    return Math.floor(Math.random() * (max + 1))
  }

  const getRandomEmptyCellPosition = (grid) => {
    let emptyCellPosition
    while (!emptyCellPosition) {
      const posX = getRandomNbr(8)
      const posY = getRandomNbr(8)

      const cell = grid[getCellIndex(grid, posX, posY)]
      const cellIsEmpty = cell.value === null

      if (cellIsEmpty) emptyCellPosition = { posX, posY }
    }

    return emptyCellPosition
  }

  return {
    gridCurrState: [],
    precStates: [], //[{ x: null, y: null, value: null }]
    gridSolution: [],
    id: null,
    launchNewGame: function (difficulty) {
      const datasMaker = datasFactory()

      datasMaker.getRandomFullValidGrid()

      this.gridSolution = datasMaker.getGrid()
      datasMaker.makeGridPlayable(difficulty)

      this.gridCurrState = datasMaker.getGrid()

      this.saveGame(this.gridCurrState, this.gridSolution)
    },
    loadGame: function () {
      this.id = gStore.getSavedId()

      if (!this.id) return false

      this.gridCurrState = gStore.getGame(this.id)
      this.gridSolution = sStore.getSolution(this.id)

      return true
    },
    saveGame: function () {
      this.id = Date.now()

      sStore.saveSolution(this.id, this.gridSolution)
      gStore.saveGame(this.id, this.gridCurrState)
    },

    updateCell: function (cellPosX, cellPosY, newValue, saveForUndo = true) {
      this.gridCurrState = this.gridCurrState.map((cell) => {
        if (
          cell.position.x == cellPosX &&
          cell.position.y == cellPosY &&
          cell.canChange
        ) {
          if (saveForUndo) {
            this.precStates.push({
              x: cellPosX,
              y: cellPosY,
              value: cell.value,
            })
          }
          cell.value = newValue
        }
        return cell
      })

      this.saveGame()
    },
    undo: function () {
      const lastStateChange = this.precStates.pop()

      if (!lastStateChange) return

      this.updateCell(
        lastStateChange.x,
        lastStateChange.y,
        lastStateChange.value,
        false
      )
      UIFactory().redrawCellValue(
        lastStateChange.x,
        lastStateChange.y,
        lastStateChange.value
      )
    },
    giveHint: function () {
      const emptyCellPosition = getRandomEmptyCellPosition(this.gridCurrState)
      const hintCell = this.gridSolution.find((cell) => {
        return (
          cell.position.x === emptyCellPosition.posX &&
          cell.position.y === emptyCellPosition.posY
        )
      })

      this.updateCell(hintCell.position.x, hintCell.position.y, hintCell.value)

      UIFactory().redrawCellValue(
        String(hintCell.position.x),
        String(hintCell.position.y),
        String(hintCell.value),
        ['canChange']
      )
    },
  }
}

export default gameManager
