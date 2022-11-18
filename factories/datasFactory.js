import cellFactory from './cellFactory.js'
import checkFactory from './checkFactory.js'

function datasFactory() {
  const createEmptyCell = (posX, posY) => {
    const emptyCell = cellFactory(null, posX, posY, true)
    return emptyCell
  }

  const getRandomArrValue = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  const getCellIndex = (grid, posX, posY) => {
    return grid.findIndex((cell) => {
      return cell.position.x === posX && cell.position.y === posY
    })
  }
  return {
    grid: [],

    getRandomFullValidGrid: function () {
      let searchingValidValues = true

      while (searchingValidValues) {
        this.createEmptyFullGrid()
        searchingValidValues = this.fillGridWithValidValues()
      }
    },

    createEmptyFullGrid: function () {
      const emptyGrid = []
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          emptyGrid.push(createEmptyCell(i, j))
        }
      }
      this.grid = emptyGrid
    },

    fillGridWithValidValues: function () {
      let currPosX = 0
      let currPosY = 0
      let currCellIndex = 0
      let searchingAValidValue = true

      while (currPosX !== null && currPosY !== null) {
        searchingAValidValue = this.fillCellWithValidValue(
          currCellIndex,
          currPosX,
          currPosY
        )

        //No valid value has been found: begin a new grid
        if (searchingAValidValue) {
          break
        }

        // Pick the next empty cell
        const currEmptyCellPos = this.getNextEmptyCellPos(currPosX, currPosY)
        currPosX = currEmptyCellPos.x
        currPosY = currEmptyCellPos.y

        currCellIndex = getCellIndex(this.grid, currPosX, currPosY)
      }

      // When searchingAValidValue=false at this point it means the grid as has been filled
      return searchingAValidValue
    },

    getNextEmptyCellPos: function (currPosX, currPosY) {
      let nextPosX = currPosX
      let nextPosY = currPosY

      while (nextPosX < 9 && nextPosY < 9) {
        nextPosX++

        if (nextPosX === 9) {
          nextPosX = 0
          nextPosY++

          if (nextPosY === 9) break // we're out of the grid
        }

        const currCellIndex = getCellIndex(this.grid, nextPosX, nextPosY)
        const currCell = this.grid[currCellIndex]

        if (currCell?.value === null) return { x: nextPosX, y: nextPosY }
        else continue
      }

      return { x: null, y: null }
    },

    fillCellWithValidValue: function (currCellIndex, currPosX, currPosY) {
      const possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      let searchingAValidValue = true
      let searchCount = 0

      while (searchingAValidValue && searchCount < 50) {
        searchCount++
        // Pick a new random value
        const newValue = getRandomArrValue(possibleValues)

        this.grid[currCellIndex].value = newValue

        // Check if the value can fit in the empty cell
        const checker = checkFactory(this.grid)
        let gridIsValid = checker.gridIsValidAtPos(currPosX, currPosY)

        // If she can: add value to the cell and go to next empty cell
        if (gridIsValid) {
          searchingAValidValue = false
        } else {
          this.grid[currCellIndex].value = null
        }
      }

      // If searchingAValidValue is true here, it means that a value has not be found after 50 guess => I asume that there is no valid value possible
      return searchingAValidValue
    },
  }
}

export default datasFactory
