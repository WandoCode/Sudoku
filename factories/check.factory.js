function checkFactory(gridDatas) {
  const checkRow = (posY) => {
    const row = gridDatas.filter((el) => el.position.y === posY)

    const rowArrValues = getArrValues(row)

    const rowIsValid = haveOnlyUniqueValues(rowArrValues)

    return rowIsValid
  }

  const checkColumn = (posX) => {
    const column = gridDatas.filter((el) => el.position.x === posX)
    const columnArrValues = getArrValues(column)

    const columnIsValid = haveOnlyUniqueValues(columnArrValues)

    return columnIsValid
  }

  const checkSquare = (posX, posY) => {
    const squareCellsPositons = getSquarePosition(posX, posY)

    const square = gridDatas.filter((el) => {
      const rep = squareCellsPositons.find((squareCell) => {
        return squareCell.x === el.position.x && squareCell.y === el.position.y
      })
      return rep
    })

    const squareArrValues = getArrValues(square)

    const squareIsValid = haveOnlyUniqueValues(squareArrValues)

    return squareIsValid
  }

  const getArrValues = (datas) => {
    return datas.map((el) => {
      return el.value
    })
  }

  const haveOnlyUniqueValues = (arrValues) => {
    let ans = true
    for (let i = 1; i <= 10; i++) {
      const filteredArr = arrValues.some((val) => {
        return val === i
      })

      if (filteredArr.length > 1) {
        ans = false
        break
      }
    }
    return ans
  }

  const getSquarePosition = (posX, posY) => {
    // For pos =[0,9] it gives thoses posible values: 2, 5 and 8
    let posXMax = Math.floor(posX / 3) * 3 + 2
    let posYMax = Math.floor(posY / 3) * 3 + 2

    let positions = []
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        positions.push({ x: posXMax - i, y: posYMax - j })
      }
    }

    return positions
  }

  /* At a given position, looks if the row, column and square are valid */
  const gridIsValidAtPos = function (posX, posY) {
    let gridIsValid = this.checkRow(posY)
    gridIsValid = gridIsValid ? this.checkColumn(posX) : false
    gridIsValid = gridIsValid ? this.checkSquare(posX, posY) : false

    return gridIsValid
  }

  return {
    checkRow,
    checkColumn,
    getSquarePosition,
    checkSquare,
    gridIsValidAtPos,
  }
}

export default checkFactory
