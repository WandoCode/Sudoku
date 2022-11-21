import gameStore from '../store/game.store.js'
import rowFactory from './rowDOMFactory.js'

function gridDOMFactory(id, gridDatas) {
  let board

  const toggleValue = (value) => {
    let newValue = value ? value + 1 : 1

    newValue = newValue > 9 ? null : newValue

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
  }
}

export default gridDOMFactory
