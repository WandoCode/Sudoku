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
    const selectEl = document.getElementsByClassName('select-difficulty')[0]
    const difficulty = selectEl.value

    game.launchNewGame(difficulty)
    drawGrid()
  }

  const drawSelectDifficulty = () => {
    const difficulties = {
      facile: 'easy',
      intermédiaire: 'medium',
      difficile: 'hard',
    }

    const container = document.getElementsByClassName('difficulty-container')[0]

    const select = document.createElement('select')
    select.classList.add('select-difficulty')

    addOptionsDOM(difficulties, select)

    container.appendChild(select)
  }

  const addOptionsDOM = (difficulties, selectDOM) => {
    for (const difficultyName in difficulties) {
      const difficultyValue = difficulties[difficultyName]
      const option = document.createElement('option')
      option.value = difficultyValue
      option.innerText = difficultyName

      selectDOM.appendChild(option)
    }
  }

  const drawPage = () => {
    drawGrid()
    drawNewGameBtn()
    drawSelectDifficulty()
    const main = document.getElementsByTagName('main')[0]

    const difficulties = {
      easy: 'facile',
      medium: 'intermédiaire',
      hard: 'difficile',
    }

    main.appendChild(selectFactory(difficulties).createCustomSelect())
  }

  return { drawPage }
}

export default UIFactory
