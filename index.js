import UIFactory from './factories/UIFactory.js'
import gameManager from './feature/GameManager.js'
import './style/index.css'

const game = gameManager()
const UIGenerator = UIFactory(game)

const gameLoaded = game.loadGame()
if (!gameLoaded) game.launchNewGame('easy')

UIGenerator.drawPage()
