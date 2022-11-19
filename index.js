import gridDOMFactory from './factories/gridDOMFactory.js'
import gameManager from './feature/GameManager.js'

const drawGrid = ({ id, gridDatas }) => {
  const main = document.getElementsByTagName('MAIN')[0]

  const grid = gridDOMFactory(id, gridDatas)
  grid.createBoard()
  grid.addListener()

  const board = grid.board

  main.appendChild(board)
}

const game = gameManager()

game.launchNewGame()

const gridDatas = game.gridCurrState
const id = game.id

drawGrid({ id, gridDatas })
