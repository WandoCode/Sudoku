import cellFactory from './cellFactory.js'
import checkFactory from './checkFactory.js'
import { getCellIndex } from './helpers.js'

function datasFactory() {
  const createEmptyCell = (posX, posY) => {
    const emptyCell = cellFactory(null, posX, posY, true)
    return emptyCell
  }

  const getRandomArrValue = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  const getRandomPositions = (nbr) => {
    const maxPos = { x: 8, y: 8 }

    const resArr = []
    while (resArr.length < nbr) {
      const xRandom = Math.floor(Math.random() * (maxPos.x + 1))
      const yRandom = Math.floor(Math.random() * (maxPos.y + 1))

      const positionAlreadyInArr = resArr.some((el) => {
        return el.x === xRandom && el.y === yRandom
      })

      if (!positionAlreadyInArr) {
        resArr.push({ x: xRandom, y: yRandom })
      }
    }
    return resArr
  }

  const evalKeepCell = (cell, identifiersArr) => {
    const cellIdentifier = `${cell.position.x}${cell.position.y}`

    return identifiersArr.includes(cellIdentifier)
  }

  return {
    grid: [],

    getGrid: function () {
      return JSON.parse(JSON.stringify(this.grid))
    },
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
      let noValidValueFound = true

      while (currPosX !== null && currPosY !== null) {
        noValidValueFound = this.fillCellWithValidValue(
          currCellIndex,
          currPosX,
          currPosY
        )

        //No valid value has been found: this grid can't be resolved
        if (noValidValueFound) {
          break
        }

        // Pick the next empty cell
        const currEmptyCellPos = this.getNextEmptyCellPos(currPosX, currPosY)
        currPosX = currEmptyCellPos.x
        currPosY = currEmptyCellPos.y

        currCellIndex = getCellIndex(this.grid, currPosX, currPosY)
      }

      // When noValidValueFound=false at this point it means the grid as has been filled
      return noValidValueFound
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

    makeGridPlayable: function (difficulty) {
      // {difficulty: # of number that stay on the grid}
      const difficultiesInterface = { easy: 15, medium: 11, hard: 7 }

      const quantityOfCellsLeftOnGrid = difficultiesInterface[difficulty]

      const keptPositionsArr = getRandomPositions(quantityOfCellsLeftOnGrid)

      const keptPositionsArrIdentifiers = keptPositionsArr.map((el) => {
        return `${el.x}${el.y}`
      })

      const trimmedGrid = this.grid.map((cell) => {
        const keepCellValue = evalKeepCell(cell, keptPositionsArrIdentifiers)

        if (keepCellValue) return { ...cell, canChange: false }
        else return { ...cell, value: null }
      })

      this.grid = trimmedGrid
    },
  }
}

export default datasFactory
