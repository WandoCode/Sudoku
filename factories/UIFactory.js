import nodeSelectors from '../utility/nodeSelectors.js'
import gridDOMFactory from './gridDOMFactory.js'
import keyboardDOMFactory from './keyboardDOMFactory.js'
import selectFactory from './selectFactory.js'

function UIFactory(game) {
  const nodes = nodeSelectors()

  const drawGrid = () => {
    const container = nodes.getGameContainer()
    container.innerHTML = ''

    const grid = gridDOMFactory(game.id, game.gridCurrState)
    grid.createBoard()

    const board = grid.board

    container.appendChild(board)
  }

  const drawNewGameBtn = () => {
    const container = nodes.getResetBtnContainer()

    const btn = document.createElement('button')
    btn.onclick = handleNewGameBtn

    btn.innerText = 'Nouvelle partie'
    container.appendChild(btn)
  }

  const handleNewGameBtn = () => {
    const selectEl = nodes.getSelectDifficulty()

    const difficulty = selectEl.value

    game.launchNewGame(difficulty)
    drawGrid()
  }

  const drawSelectDifficulty = () => {
    const container = nodes.getDifficultyContainer()

    const difficulties = {
      easy: 'Facile',
      medium: 'Intermédiaire',
      hard: 'Difficile',
    }

    container.appendChild(selectFactory(difficulties).createCustomSelect())
  }

  const drawKeyboard = () => {
    const container = nodes.getKeyboardContainer()
    container.appendChild(keyboardDOMFactory(game).createKeyboardDOM())
  }

  const drawPage = () => {
    drawGrid()
    drawNewGameBtn()
    drawSelectDifficulty()
    drawKeyboard()
  }

  const redrawCellValue = (posX, posY, value) => {
    const allCells = nodes.getAllCells()
    const cellsArr = [...allCells]

    cellsArr.forEach((cell) => {
      const currCellPosX = cell.getAttribute('data-pos-x')
      const currCellPosY = cell.getAttribute('data-pos-y')

      if (currCellPosX === posX && currCellPosY === posY)
        return (cell.innerText = value !== '0' ? value : '')
    })
  }
  return { drawPage, redrawCellValue }
}

export default UIFactory
