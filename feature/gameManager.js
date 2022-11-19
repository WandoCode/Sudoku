import datasFactory from '../factories/datasFactory.js'
import gameStore from '../store/game.store.js'
import solutionStore from '../store/solution.store.js'

function gameManager() {
  let gridCurrState = []
  let gridSolution = []
  let id

  return {
    gridCurrState,
    gridSolution,
    id,
    launchNewGame: function () {
      const datasMaker = datasFactory()

      datasMaker.getRandomFullValidGrid()

      this.gridSolution = datasMaker.getGrid()

      datasMaker.makeGridPlayable('easy')

      this.gridCurrState = datasMaker.getGrid()

      this.saveGame(this.gridCurrState, this.gridSolution)
    },
    saveGame: function (gridGame, gridSolution) {
      const gameStoreInstance = gameStore()
      const solutionStoreInstance = solutionStore()

      this.id = Date.now()

      solutionStoreInstance.saveSolution(this.id, gridSolution)
      gameStoreInstance.saveGame(this.id, gridGame)
    },
  }
}

export default gameManager
