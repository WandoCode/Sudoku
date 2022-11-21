const getCellIndex = (grid, posX, posY) => {
  return grid.findIndex((cell) => {
    return cell.position.x === posX && cell.position.y === posY
  })
}

export { getCellIndex }
