/**
 * @vitest-environment jsdom
 */

import { describe, expect, test, beforeAll } from 'vitest'
import { screen } from '@testing-library/dom'
import gridDatas from '../mock/_grid.json'
import checkFactory from '../factories/checkFactory'

/* Unit tests */
describe('When I start an instance of checkFactory', () => {
  test('Then the "checkRow" should be available', () => {
    const checkFactoryInstance = checkFactory(gridDatas)
    const methods = Object.getOwnPropertyNames(checkFactoryInstance)
    expect(methods).toContain('checkRow')
  })

  test('Then the "checkColumn" should be available', () => {
    const checkFactoryInstance = checkFactory(gridDatas)
    const methods = Object.getOwnPropertyNames(checkFactoryInstance)
    expect(methods).toContain('checkColumn')
  })

  test('Then the "checkSquare" should be available', () => {
    const checkFactoryInstance = checkFactory(gridDatas)
    const methods = Object.getOwnPropertyNames(checkFactoryInstance)
    expect(methods).toContain('checkSquare')
  })
  test('Then the "getSquarePosition" should be available', () => {
    const checkFactoryInstance = checkFactory(gridDatas)
    const methods = Object.getOwnPropertyNames(checkFactoryInstance)
    expect(methods).toContain('getSquarePosition')
  })
})

describe('When I call the checkRow method with valid values', () => {
  describe('Given the row is valid', () => {
    test('Then it should be return true', () => {
      const checkFactoryInstance = checkFactory(gridDatas)
      const rowIsValid = checkFactoryInstance.checkRow(0)

      expect(rowIsValid).toBeTruthy()
    })
  })

  describe('Given the row is not valid', () => {
    const gridDatasCopy = JSON.parse(JSON.stringify(gridDatas))

    // Those 2 positions in gridDatas are the positions (x:0,y:0) and (x:1,y:0)
    gridDatasCopy[0].value = 1
    gridDatasCopy[10].value = 1

    test('Then the "checkRow" should be return false', () => {
      const checkFactoryInstance = checkFactory(gridDatasCopy)
      const rowIsValid = checkFactoryInstance.checkRow(0)

      expect(rowIsValid).toBeFalsy()
    })
  })
})

describe('When I call the checkcolumn method with valid values', () => {
  describe('Given the column is valid', () => {
    test('Then it should be return true', () => {
      const checkFactoryInstance = checkFactory(gridDatas)
      const columnIsValid = checkFactoryInstance.checkColumn(0)

      expect(columnIsValid).toBeTruthy()
    })
  })

  describe('Given the row is not valid', () => {
    const gridDatasCopy = JSON.parse(JSON.stringify(gridDatas))

    // Those 2 positions in gridDatas are the positions (x:0,y:0) and (x:0,y:1)
    gridDatasCopy[0].value = 1
    gridDatasCopy[1].value = 1

    test('Then the it should be return false', () => {
      const checkFactoryInstance = checkFactory(gridDatasCopy)
      const columnIsValid = checkFactoryInstance.checkColumn(0)

      expect(columnIsValid).toBeFalsy()
    })
  })
})

describe('When I call the getSquarePosition method with valid argument', () => {
  test('Then it should be return the position of the cell that are in the same square (1st square)', () => {
    const checkFactoryInstance = checkFactory()

    // Position of a cell in the 1st square

    let posX = 0
    let posY = 1

    const repA = [
      { x: 2, y: 2 },
      { x: 2, y: 1 },
      { x: 2, y: 0 },
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: 2 },
      { x: 0, y: 1 },
      { x: 0, y: 0 },
    ]

    const squarePositionsA = checkFactoryInstance.getSquarePosition(posX, posY)

    expect(Array.isArray(squarePositionsA)).toBeTruthy()
    expect(squarePositionsA).toEqual(repA)
  })
  test('Then it should be return the position of the cell that are in the same square (middle square)', () => {
    const checkFactoryInstance = checkFactory()

    // Position of a cell in the middle square
    let posX = 5
    let posY = 3

    const repB = [
      { x: 5, y: 5 },
      { x: 5, y: 4 },
      { x: 5, y: 3 },
      { x: 4, y: 5 },
      { x: 4, y: 4 },
      { x: 4, y: 3 },
      { x: 3, y: 5 },
      { x: 3, y: 4 },
      { x: 3, y: 3 },
    ]
    const squarePositionsB = checkFactoryInstance.getSquarePosition(posX, posY)

    expect(Array.isArray(squarePositionsB)).toBeTruthy()
    expect(squarePositionsB).toEqual(repB)
  })
})

describe('When I call the checkSquare method with valid values', () => {
  describe('Given the column is valid', () => {
    test('Then it should be return true', () => {
      const checkFactoryInstance = checkFactory(gridDatas)
      const squareIsValid = checkFactoryInstance.checkSquare(0, 0)

      expect(squareIsValid).toBeTruthy()
    })
  })

  describe('Given the row is not valid', () => {
    const gridDatasCopy = JSON.parse(JSON.stringify(gridDatas))

    // Those 2 positions in gridDatas are the positions (x:0,y:0) and (x:1,y:1)
    gridDatasCopy[0].value = 1
    gridDatasCopy[11].value = 1

    test('Then the it should be return false', () => {
      const checkFactoryInstance = checkFactory(gridDatasCopy)
      const squareIsValid = checkFactoryInstance.checkSquare(0, 0)

      expect(squareIsValid).toBeFalsy()
    })
  })
})
