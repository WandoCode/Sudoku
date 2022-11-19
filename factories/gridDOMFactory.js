import gameStore from '../store/game.store.js'
import rowFactory from './rowDOMFactory.js'

function gridDOMFactory(id, gridDatas) {
  let board
  console.log({ id, gridDatas })
  const toggleValues = (posX, posY) => {
    const cellData = gridDatas.find((cell) => {
      return cell.position.x === posX && cell.position.y === posY
    })

    const value = cellData.value

    const newValue = value + 1

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
    },
    addListener: function () {
      this.board.addEventListener('click', (e) => {
        const posX = parseInt(e.target.getAttribute('data-pos-x'))
        const posY = parseInt(e.target.getAttribute('data-pos-y'))
        const canChange = e.target.getAttribute('data-canChange') === 'true'

        if (canChange) {
          const newValue = toggleValues(posX, posY)
          e.target.innerHTML = newValue
        }
      })
    },
  }
}

export default gridDOMFactory
