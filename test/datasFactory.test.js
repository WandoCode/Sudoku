/**
 * @vitest-environment jsdom
 */

import { beforeEach, describe, expect, expectTypeOf, test } from 'vitest'
import datasFactory from '../factories/datas.factory.js'
import gridDatas from '../mock/_grid.json'

let datasFactoryInstance
beforeEach(() => {
  datasFactoryInstance = datasFactory()
})

describe('When I start an instance of datasFactory', () => {
  test('Then the "createEmptyFullGrid" method should be available', () => {
    const methods = Object.getOwnPropertyNames(datasFactoryInstance)
    expect(methods).toContain('createEmptyFullGrid')
  })
  test('Then the "getNextEmptyCellPos" method should be available', () => {
    const methods = Object.getOwnPropertyNames(datasFactoryInstance)
    expect(methods).toContain('getNextEmptyCellPos')
  })
  test('Then the "getRandomFullValidGrid" method should be available', () => {
    const methods = Object.getOwnPropertyNames(datasFactoryInstance)
    expect(methods).toContain('getRandomFullValidGrid')
  })
  test('Then the "getGrid" method should be available', () => {
    const methods = Object.getOwnPropertyNames(datasFactoryInstance)
    expect(methods).toContain('getGrid')
  })
  test('Then the "fillCellWithValidValue" method should be available', () => {
    const methods = Object.getOwnPropertyNames(datasFactoryInstance)
    expect(methods).toContain('fillCellWithValidValue')
  })
  test('Then the "makeGridPlayable" method should be available', () => {
    const methods = Object.getOwnPropertyNames(datasFactoryInstance)
    expect(methods).toContain('makeGridPlayable')
  })
  test('Then the "grid"  should be available', () => {
    const grid = datasFactoryInstance
    expect(grid).toBeDefined()
  })
})

describe('When I call "getGrid"', () => {
  test('Then it should return a deep copy of the grid', () => {
    datasFactoryInstance.grid = gridDatas

    const grid = datasFactoryInstance.grid
    const copy = datasFactoryInstance.getGrid()

    expect(copy).not.toBe(grid)
    expect(copy).toEqual(grid)
  })
})

describe('When I call "createEmptyFullGrid"', () => {
  test('Then it should return an array of 81 element that have a shape of an empty cell', () => {
    datasFactoryInstance.createEmptyFullGrid()
    const emptyGrid = datasFactoryInstance.grid

    expectTypeOf(emptyGrid).toBeArray()
    expect(emptyGrid.length).toEqual(81)

    emptyGrid.forEach((emptyCell) => {
      expect(emptyCell.value).toBeDefined()
      expect(emptyCell.value).toBeNull()
      expect(emptyCell.position.x).toMatch(/[0-9]/)
      expect(emptyCell.position.y).toMatch(/[0-9]/)
      expect(emptyCell.canChange).toBeTruthy()
    })
  })
})

describe('When I call the "fillGridWithValidValues" method', () => {
  test('Then it should return a boolean', () => {
    datasFactoryInstance.createEmptyFullGrid()
    const gridFullOfValidValues = datasFactoryInstance.fillGridWithValidValues()

    expectTypeOf(gridFullOfValidValues).toBeBoolean()
  })
})

describe('When I create an instance of datasFactory, assign it a grid and call the "getNextEmptyCellPos" method', () => {
  describe('Given the grid is empty', () => {
    test('Then it should return the next available position in the grid', () => {
      datasFactoryInstance.createEmptyFullGrid() // Attribute an empty grid to this.grid

      const nextEmptyCellPos = datasFactoryInstance.getNextEmptyCellPos(0, 0)
      expect(nextEmptyCellPos).toBeDefined()
      expect(nextEmptyCellPos).toEqual({ x: 1, y: 0 })
    })
  })

  describe('Given the grid is not empty but have empty position', () => {
    test('Then it should return the next available position in the grid', () => {
      datasFactoryInstance.grid = gridDatas // The next available position should be { x: 2, y: 0 }

      const nextEmptyCellPos = datasFactoryInstance.getNextEmptyCellPos(0, 0)
      expect(nextEmptyCellPos).toBeDefined()
      expect(nextEmptyCellPos).toEqual({ x: 2, y: 0 })
    })
  })

  describe('Given the grid is full', () => {
    let gridDatasCopy = JSON.parse(JSON.stringify(gridDatas))

    const fullGrid = gridDatasCopy.map((cell) => {
      return { ...cell, value: 1 }
    })
    test('Then it should return { x: null, y: null }', () => {
      datasFactoryInstance.grid = fullGrid

      const nextEmptyCellPos = datasFactoryInstance.getNextEmptyCellPos(0, 0)
      expect(nextEmptyCellPos).toBeDefined()
      expect(nextEmptyCellPos).toEqual({ x: null, y: null })
    })
  })
})

describe('When I call "getRandomFullValidGrid"', () => {
  test('Then it should return an array of 81 cells that have no null value', () => {
    datasFactoryInstance.getRandomFullValidGrid()
    const fullGrid = datasFactoryInstance.grid

    expect(Array.isArray(fullGrid)).toBeTruthy()
    expect(fullGrid.length).toEqual(81)

    fullGrid.forEach((fullCell) => {
      expect(fullCell.value).toBeDefined()
      expect(fullCell.value).not.toBeNull()
    })
  })

  // As a 1st estimation that the grid is valid for a sudoku
  test('Then it should return an array of 81 cells where numbers from 1 to 9 are found exactly 9 times', () => {
    datasFactoryInstance.getRandomFullValidGrid()
    const fullGrid = datasFactoryInstance.grid

    const rep = {}
    expect(Array.isArray(fullGrid)).toBeTruthy()
    expect(fullGrid.length).toEqual(81)

    fullGrid.forEach((fullCell) => {
      const val = fullCell.value
      if (!rep[val]) rep[val] = 1
      else rep[val]++
    })

    expect(rep).toEqual({
      1: 9,
      2: 9,
      3: 9,
      4: 9,
      5: 9,
      6: 9,
      7: 9,
      8: 9,
      9: 9,
    })
  })
})

describe('When I call "fillCellWithValidValue" with valid value, ', () => {
  test('Then it should return a boolean', () => {
    datasFactoryInstance.createEmptyFullGrid()
    const cellCannotBeFilled = datasFactoryInstance.fillCellWithValidValue(
      0,
      0,
      0
    )

    expectTypeOf(cellCannotBeFilled).toBeBoolean()
  })

  describe('Given a valid value can be found', () => {
    test('Then it should return true', () => {
      datasFactoryInstance.createEmptyFullGrid()
      const cellhasBeenFilled = datasFactoryInstance.fillCellWithValidValue(
        0,
        0,
        0
      )

      expect(cellhasBeenFilled).toBeTruthy()
    })
  })

  describe('Given no valid value can be found', () => {
    test('Then it should return false', () => {
      // The gridDatas[0].value is 1
      datasFactoryInstance.grid = gridDatas

      // We try to fill the 2nd cell with a "one" too
      const cellhasBeenFilled = datasFactoryInstance.fillCellWithValidValue(
        1,
        0,
        1,
        [1]
      )
      expect(cellhasBeenFilled).toBeFalsy()
    })
  })

  test('Then the given cell value in .grid should not be "null"', () => {
    datasFactoryInstance.createEmptyFullGrid()
    const posX = 0
    const posY = 0
    const indexCell = 0
    datasFactoryInstance.fillCellWithValidValue(indexCell, posX, posY)

    const grid = datasFactoryInstance.grid
    expect(grid[indexCell].value).not.toBeNull()
  })
})
describe('When I call "makeGridPlayable" with a full valid grid', () => {
  describe('Given the difficulty is "easy"', () => {
    test('Then the grid should have exactly 25 non-null cell value', () => {
      datasFactoryInstance.getRandomFullValidGrid()
      datasFactoryInstance.makeGridPlayable()

      const grid = datasFactoryInstance.grid

      const nonNullCells = grid.reduce((total, cell) => {
        return cell.value !== null ? total + 1 : total
      }, 0)

      expect(nonNullCells).toEqual(25)
    })
  })
  describe('Given the difficulty is "medium"', () => {
    test('Then the grid should have exactly 25 non-null cell value', () => {
      datasFactoryInstance.getRandomFullValidGrid()
      datasFactoryInstance.makeGridPlayable('medium')

      const grid = datasFactoryInstance.grid

      const nonNullCells = grid.reduce((total, cell) => {
        return cell.value !== null ? total + 1 : total
      }, 0)

      expect(nonNullCells).toEqual(21)
    })
  })
  describe('Given the difficulty is "hard"', () => {
    test('Then the grid should have exactly 25 non-null cell value', () => {
      datasFactoryInstance.getRandomFullValidGrid()
      datasFactoryInstance.makeGridPlayable('hard')

      const grid = datasFactoryInstance.grid

      const nonNullCells = grid.reduce((total, cell) => {
        return cell.value !== null ? total + 1 : total
      }, 0)

      expect(nonNullCells).toEqual(17)
    })
  })
})
