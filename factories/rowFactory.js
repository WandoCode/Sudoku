function rowFactory() {
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

    return cell
  }

  return { createRow }
}

export default rowFactory
