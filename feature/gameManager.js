import datasFactory from '../factories/datasFactory.js'

function gameManager() {
  let gridCurrState = []
  let gridSolution = []
  return {
    gridCurrState,
    gridSolution,
    launchNewGame: function () {
      const datasMaker = datasFactory()
      datasMaker.getRandomFullValidGrid()

      this.gridSolution = datasMaker.getGrid()

      datasMaker.makeGridPlayable('easy')

      this.gridCurrState = datasMaker.getGrid()
    },
  }
}

export default gameManager
