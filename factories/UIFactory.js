import gridDOMFactory from './gridDOMFactory.js'
import selectFactory from './selectFactory.js'

function UIFactory(game) {
  const drawGrid = () => {
    const container = document.getElementsByClassName('game-container')[0]
    container.innerHTML = ''

    const grid = gridDOMFactory(game.id, game.gridCurrState)
    grid.createBoard()

    const board = grid.board

    container.appendChild(board)
  }

  const drawNewGameBtn = () => {
    const container = document.getElementsByClassName('reset-btn-container')[0]

    const btn = document.createElement('button')
    btn.onclick = handleNewGameBtn

    btn.innerText = 'Nouvelle partie'
    container.appendChild(btn)
  }

  const handleNewGameBtn = () => {
    const selectEl = document.getElementById('select-difficulty')
    console.log(selectEl)
    const difficulty = selectEl.value

    game.launchNewGame(difficulty)
    drawGrid()
  }

  const drawSelectDifficulty = () => {
    const container = document.getElementsByClassName('difficulty-container')[0]

    const difficulties = {
      easy: 'Facile',
      medium: 'Intermédiaire',
      hard: 'Difficile',
    }

    container.appendChild(selectFactory(difficulties).createCustomSelect())
  }

  const drawPage = () => {
    drawGrid()
    drawNewGameBtn()
    drawSelectDifficulty()
  }

  return { drawPage }
}

export default UIFactory
