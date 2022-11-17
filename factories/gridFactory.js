import rowFactory from './rowFactory'

function gridFactory(cellDatas) {
  const rowGenerator = rowFactory(cellDatas)

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

export default gridFactory
