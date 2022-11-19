import datasFactory from '../factories/datasFactory.js'
import gameStore from '../store/game.store.js'
import solutionStore from '../store/solution.store.js'

function gameManager() {
  let gridCurrState = []
  let gridSolution = []

  const saveGame = (gridGame, gridSolution) => {
    const gameStoreInstance = gameStore()
    const solutionStoreInstance = solutionStore()

    const id = Date.now()

    solutionStoreInstance.saveSolution(id, gridSolution)
    gameStoreInstance.saveGame(id, gridGame)
  }
  return {
    gridCurrState,
    gridSolution,
    launchNewGame: function () {
      const datasMaker = datasFactory()

      datasMaker.getRandomFullValidGrid()

      this.gridSolution = datasMaker.getGrid()

      datasMaker.makeGridPlayable('easy')

      this.gridCurrState = datasMaker.getGrid()

      saveGame(this.gridCurrState, this.gridSolution)
    },
  }
}

export default gameManager
