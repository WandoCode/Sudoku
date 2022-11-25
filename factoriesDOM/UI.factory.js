import nodeSelectors from '../utility/nodeSelectors.js'
import gridDOMFactory from './gridDOM.factory.js'
import keyboardDOMFactory from './keyboardDOM.factory.js'
import selectFactory from './selectDOM.factory.js'

function UIFactory(game) {
  const nodes = nodeSelectors()

  const drawGrid = () => {
    const prevChild = nodes.getOptionsContainer()

    const grid = gridDOMFactory(game.gridCurrState)
    grid.createBoard()

    const board = grid.board

    const remainingBoard = nodes.getBoard()
    remainingBoard?.remove()

    prevChild.after(board)
  }

  const drawNewGameBtn = () => {
    const container = nodes.getOptionsContainer()

    const btn = document.createElement('button')
    btn.innerHTML = 'Nouvelle partie'
    btn.classList.add('btn', 'btn--primary')

    btn.onclick = handleNewGameBtn

    container.appendChild(btn)
  }

  const handleNewGameBtn = () => {
    const selectEl = nodes.getSelectDifficulty()

    const difficulty = selectEl.value

    game.launchNewGame(difficulty)
    drawGrid()
  }

  const drawSelectDifficulty = () => {
    const container = nodes.getOptionsContainer()

    const difficulties = {
      easy: 'Facile',
      medium: 'Intermédiaire',
      hard: 'Difficile',
    }

    container.appendChild(selectFactory(difficulties).createCustomSelect())
  }

  const drawKeyboard = () => {
    const container = nodes.getMain()
    container.appendChild(keyboardDOMFactory(game).createKeyboardDOM())
  }

  const drawPage = () => {
    drawGrid()
    drawNewGameBtn()
    drawSelectDifficulty()
    drawKeyboard()
  }

  const redrawCellValue = (posX, posY, value, options = []) => {
    const allCells = nodes.getAllCells()
    const cellsArr = [...allCells]

    cellsArr.forEach((cell) => {
      const currCellPosX = cell.getAttribute('data-pos-x')
      const currCellPosY = cell.getAttribute('data-pos-y')

      if (currCellPosX === posX && currCellPosY === posY) {
        if (options.includes('canNotChange')) {
          cell.setAttribute('data-canChange', 'false')
        }
        cell.innerHTML = value === '0' || isNaN(value) ? '' : value
        cell.classList.remove('cell--error')
      }
      return
    })
  }

  const drawErrors = (errors) => {
    const allCells = nodes.getAllCells()
    const cellsArr = [...allCells]

    cellsArr.forEach((cell) => {
      const currCellPosX = cell.getAttribute('data-pos-x')
      const currCellPosY = cell.getAttribute('data-pos-y')

      errors.forEach((error) => {
        if (
          parseInt(currCellPosX) === error.x &&
          parseInt(currCellPosY) === error.y
        ) {
          cell.classList.add('board__cell--error')
        }
      })
    })
  }
  return { drawPage, redrawCellValue, drawErrors }
}

export default UIFactory
