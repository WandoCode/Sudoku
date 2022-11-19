import rowFactory from './rowDOMFactory.js'

function gridDOMFactory(gridDatas) {
  const rowGenerator = rowFactory(gridDatas)

  const createBoard = () => {
    const table = document.createElement('table')
    table.classList.add('board')

    for (let j = 0; j < 9; j++) {
      const newRow = rowGenerator.createRow(j)
      table.appendChild(newRow)
    }

    return table
  }

  return { createBoard }
}

export default gridDOMFactory
