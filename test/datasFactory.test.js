/**
 * @vitest-environment jsdom
 */

import { describe, expect, test } from 'vitest'
import datasFactory from '../factories/datasFactory'
import gridDatas from '../mock/_grid.json'

describe('When I start an instance of datasFactory', () => {
  test('Then the "createEmptyFullGrid" should be available', () => {
    const datasFactoryInstance = datasFactory()
    const methods = Object.getOwnPropertyNames(datasFactoryInstance)
    expect(methods).toContain('createEmptyFullGrid')
  })
  test('Then the "getNextEmptyCellPos" should be available', () => {
    const datasFactoryInstance = datasFactory()
    const methods = Object.getOwnPropertyNames(datasFactoryInstance)
    expect(methods).toContain('getNextEmptyCellPos')
  })
  test('Then the "getRandomFullValidGrid" should be available', () => {
    const datasFactoryInstance = datasFactory()
    const methods = Object.getOwnPropertyNames(datasFactoryInstance)
    expect(methods).toContain('getRandomFullValidGrid')
  })
})

describe('When I call "createEmptyFullGrid"', () => {
  test('Then it should return an array of 81 element that have a form of a empty cellData', () => {
    const datasFactoryInstance = datasFactory()
    datasFactoryInstance.createEmptyFullGrid()
    const emptyGrid = datasFactoryInstance.grid

    expect(Array.isArray(emptyGrid)).toBeTruthy()
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

describe('When I create an instance of datasFactory, assign it a grid and call the "getNextEmptyCellPos" method', () => {
  describe('Given the grid is empty', () => {
    test('Then it should return the next available position in the grid', () => {
      const datasFactoryInstance = datasFactory()
      datasFactoryInstance.createEmptyFullGrid() // Attribute an empty grid to this.grid

      const nextEmptyCellPos = datasFactoryInstance.getNextEmptyCellPos(0, 0)
      expect(nextEmptyCellPos).toBeDefined()
      expect(nextEmptyCellPos).toEqual({ x: 1, y: 0 })
    })
  })

  describe('Given the grid is not empty but have empty position', () => {
    test('Then it should return the next available position in the grid', () => {
      const datasFactoryInstance = datasFactory()
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
      const datasFactoryInstance = datasFactory()
      datasFactoryInstance.grid = fullGrid

      const nextEmptyCellPos = datasFactoryInstance.getNextEmptyCellPos(0, 0)
      expect(nextEmptyCellPos).toBeDefined()
      expect(nextEmptyCellPos).toEqual({ x: null, y: null })
    })
  })
})

describe('When I call "getRandomFullValidGrid"', () => {
  test('Then it should return an array of 81 cells that have no null value', () => {
    const datasFactoryInstance = datasFactory()
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
  test('Then it should return an array of 81 cells where numbers from 1 to 10 are found exactly 9 times', () => {
    const datasFactoryInstance = datasFactory()
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
