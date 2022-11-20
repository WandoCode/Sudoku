import gameStore from '../store/game.store.js'
import rowFactory from './rowDOMFactory.js'

function gridDOMFactory(id, gridDatas) {
  let board

  const toggleValue = (value) => {
    let newValue = value ? value + 1 : 1

    newValue = newValue > 9 ? null : newValue

    return newValue
  }

  const updateValue = (posX, posY) => {
    const cellData = gridDatas.find((cell) => {
      return cell.position.x === posX && cell.position.y === posY
    })

    const value = cellData.value
    const newValue = toggleValue(value)

    cellData.value = newValue

    gameStore().saveGame(id, gridDatas)

    return newValue
  }

  return {
    board,
    createBoard: function () {
      const rowGenerator = rowFactory(gridDatas)

      const table = document.createElement('table')
      table.classList.add('board')

      for (let j = 0; j < 9; j++) {
        const newRow = rowGenerator.createRow(j)
        table.appendChild(newRow)
      }
      this.board = table
      this.addListener()
    },
    addListener: function () {
      this.board.addEventListener('click', (e) => {
        const posX = parseInt(e.target.getAttribute('data-pos-x'))
        const posY = parseInt(e.target.getAttribute('data-pos-y'))
        const canChange = e.target.getAttribute('data-canChange') === 'true'

        if (canChange) {
          const newValue = updateValue(posX, posY)
          e.target.innerHTML = newValue
        }
      })
    },
  }
}

export default gridDOMFactory
