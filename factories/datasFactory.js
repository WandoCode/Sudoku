import cellFactory from './cellFactory.js'

function datasFactory() {
  let grid = []

  const init = function () {
    this.grid = createEmptyFullGrid()
  }

  const getRandomFullValidGrid = () => {
    let currPosX = 0
    let currPosY = 0

    // for (let i = 0; i < 9; i++) {
    //   let possibleValuesForRow = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    //   for (let j = 0; j < 9; j++) {
    //     const value = getRandomArrValue(possibleValuesForRow)
    //     possibleValuesForRow = possibleValuesForRow.filter((el) => el !== value)

    //     grid[i][j] = value
    //   }
    // }

    // console.log(grid)
  }

  const getNextEmptyCellPos = (currPosX, currPosY) => {
    let nextPosX = currPosX
    let nextPosY = currPosY
    while (nextPosX < 9 && nextPosY < 9) {
      nextPosX++
      if (nextPosX === 9) {
        nextPosX = 0
        nextPosY++

        if (nextPosY === 9) return
      }

      const currCell = grid.find(
        (cell) => cell.position.x === nextPosX && cell.position.x === nextPosY
      )

      if (currCell.value === null) return { nextPosX, nextPosY }
    }
  }

  const createEmptyCell = (posX, posY) => {
    const emptyCell = cellFactory(null, posX, posY, true)
    return emptyCell
  }

  const createEmptyFullGrid = () => {
    const emptyGrid = []
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        emptyGrid.push(createEmptyCell(i, j))
      }
    }
    return emptyGrid
  }

  const getRandomArrValue = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  return {
    getRandomFullValidGrid,
    createEmptyFullGrid,
    getNextEmptyCellPos,
    grid,
    init,
  }
}

export default datasFactory
