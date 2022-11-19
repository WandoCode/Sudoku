import cellDOMFactory from './cellDOMFactory.js'

function rowDOMFactory(cellDatas) {
  const createRow = (posY) => {
    const row = document.createElement('tr')
    row.classList.add('board__row')

    for (let i = 0; i < 9; i++) {
      const cellData = getCellDatas(i, posY)

      const cell = cellDOMFactory(cellData, i, posY)
      cell.createCellDOM()
      const cellDOM = cell.cellDOM

      row.appendChild(cellDOM)
    }

    return row
  }

  const getCellDatas = (posX, posY) => {
    const cellData = cellDatas.find((cell) => {
      return cell.position.x === posX && cell.position.y === posY
    })
    return cellData
  }

  return { createRow }
}

export default rowDOMFactory
