const getCellIndex = (grid, posX, posY) => {
  return grid.findIndex((cell) => {
    return cell.position.x === posX && cell.position.y === posY
  })
}

const getRandomNbr = (max) => {
  return Math.floor(Math.random() * (max + 1))
}

export { getCellIndex, getRandomNbr }
