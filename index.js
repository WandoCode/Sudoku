import UIFactory from './factoriesDOM/UI.factory.js'
import gameManager from './factories/gameManager.js'
import './style/index.css'

const game = gameManager()
const UIGenerator = UIFactory(game)

const gameLoaded = game.loadGame()
if (!gameLoaded) game.launchNewGame('easy')

UIGenerator.drawPage()
