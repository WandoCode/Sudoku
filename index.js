import datasFactory from './factories/datasFactory.js'
import gridDOMFactory from './factories/gridDOMFactory.js'
import gameManager from './feature/GameManager.js'

const game = gameManager()

game.launchNewGame()
const main = document.getElementsByTagName('MAIN')[0]
