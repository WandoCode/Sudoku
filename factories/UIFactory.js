import gridDOMFactory from './gridDOMFactory.js'

function UIFactory(game) {
  const drawGrid = () => {
    const container = document.getElementsByClassName('game-container')[0]
    container.innerHTML = ''

    const grid = gridDOMFactory(game.id, game.gridCurrState)
    grid.createBoard()
    grid.addListener()

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
    const selectEl = document.getElementsByClassName('select-difficulty')[0]
    const difficulty = selectEl.value

    game.launchNewGame(difficulty)
    drawGrid()
  }

  const drawSelectDifficulty = () => {
    const difficulties = ['easy', 'medium', 'hard']

    const container = document.getElementsByClassName('difficulty-container')[0]

    const select = document.createElement('select')
    select.classList.add('select-difficulty')

    difficulties.forEach((difficulty) => {
      const option = document.createElement('option')
      option.value = difficulty
      option.innerText = difficulty

      select.appendChild(option)
    })

    container.appendChild(select)
  }

  const drawPage = () => {
    drawGrid()
    drawNewGameBtn()
    drawSelectDifficulty()
  }
  return { drawPage }
}

export default UIFactory
