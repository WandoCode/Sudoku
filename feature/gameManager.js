import datasFactory from '../factories/datasFactory.js'
import gameStore from '../store/game.store.js'
import solutionStore from '../store/solution.store.js'

function gameManager() {
  const gStore = gameStore()
  const sStore = solutionStore()

  return {
    gridCurrState: [],
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
    saveGame: function (gridGame, gridSolution) {
      this.id = Date.now()

      sStore.saveSolution(this.id, gridSolution)
      gStore.saveGame(this.id, gridGame)
    },
  }
}

export default gameManager
