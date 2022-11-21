import rowFactory from './rowDOMFactory.js'

function gridDOMFactory(gridDatas) {
  return {
    board: [],
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
