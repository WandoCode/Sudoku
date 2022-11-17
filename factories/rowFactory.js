function rowFactory(cellDatas) {
  const createRow = (posY) => {
    const row = document.createElement('tr')
    row.classList.add('board')

    for (let i = 0; i < 9; i++) {
      const newCell = createCell(i, posY)
      row.appendChild(newCell)
    }

    return row
  }

  const createCell = (posX, posY) => {
    const cell = document.createElement('td')
    cell.setAttribute('data-pos-x', posX)
    cell.setAttribute('data-pos-y', posY)

    const cellValue = getCellValue(posX, posY)
    cell.innerHTML = cellValue

    return cell
  }

  const getCellValue = (posX, posY) => {
    const cellData = cellDatas.find((cell) => {
      return cell.position.x === posX && cell.position.y === posY
    })
    console.log(cellData)
    return cellData.value
  }

  return { createRow }
}

export default rowFactory
