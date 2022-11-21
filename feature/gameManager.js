import datasFactory from '../factories/datasFactory.js'
import { getCellIndex, getRandomNbr } from '../factories/helpers.js'
import UIFactory from '../factories/UIFactory.js'
import gameStore from '../store/game.store.js'
import solutionStore from '../store/solution.store.js'

function gameManager() {
  const gStore = gameStore()
  const sStore = solutionStore()

  const getRandomEmptyCellPosition = (grid) => {
    let emptyCellPosition
    let count = 0

    while (!emptyCellPosition && count < 200) {
      count++

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

    updateCell: function (cellPosX, cellPosY, newValue, options = []) {
      const cellPosXInt = parseInt(cellPosX)
      const cellPosYInt = parseInt(cellPosY)
      const newValueInt = parseInt(newValue)

      this.gridCurrState = this.gridCurrState.map((cell) => {
        const cellIsValid =
          cell.position.x === cellPosXInt &&
          cell.position.y === cellPosYInt &&
          cell.canChange

        if (cellIsValid) {
          if (!options.includes('skipSaveForUndo'))
            this.precStates.push({
              x: cellPosXInt,
              y: cellPosYInt,
              value: cell.value,
            })

          if (options.includes('canNotChange')) cell.canChange = false

          cell.value = newValueInt
        }
        return cell
      })

      UIFactory().redrawCellValue(
        String(cellPosXInt),
        String(cellPosYInt),
        String(newValueInt),
        options
      )
      this.saveGame()
    },

    undo: function () {
      const lastStateChange = this.precStates.pop()
      if (!lastStateChange) return

      this.updateCell(
        String(lastStateChange.x),
        String(lastStateChange.y),
        String(lastStateChange.value),
        ['skipSaveForUndo']
      )
    },

    giveHint: function () {
      const emptyCellPosition = getRandomEmptyCellPosition(this.gridCurrState)

      if (!emptyCellPosition) return

      const hintCell = this.gridSolution.find((cell) => {
        return (
          cell.position.x === emptyCellPosition.posX &&
          cell.position.y === emptyCellPosition.posY
        )
      })

      this.updateCell(
        hintCell.position.x,
        hintCell.position.y,
        hintCell.value,
        ['canNotChange', 'skipSaveForUndo']
      )
    },
    showGameErrors: function () {
      let errors = []

      this.gridCurrState.forEach((currCell, index) => {
        const solutionValue = parseInt(this.gridSolution[index].value)
        const currValue = parseInt(currCell.value) || null
        console.log(currValue)
        if (solutionValue !== currValue && currValue !== null)
          errors.push({ x: currCell.position.x, y: currCell.position.y })
      })

      UIFactory().drawErrors(errors)

      return errors
    },
  }
}

export default gameManager
