import UIFactory from './factories/UIFactory.js'
import gameManager from './feature/GameManager.js'

const game = gameManager()
const gameLoaded = game.loadGame()

if (!gameLoaded) game.launchNewGame('easy')

const UIGenerator = UIFactory(game)
UIGenerator.drawPage()
