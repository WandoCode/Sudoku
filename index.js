import gridDOMFactory from './factories/gridDOMFactory.js'
import gameManager from './feature/GameManager.js'

const drawGrid = (gridDatas) => {
  const main = document.getElementsByTagName('MAIN')[0]
  const board = gridDOMFactory(gridDatas).createBoard()
  main.appendChild(board)
}

const game = gameManager()

game.launchNewGame()
const gridDatas = game.gridCurrState

drawGrid(gridDatas)
