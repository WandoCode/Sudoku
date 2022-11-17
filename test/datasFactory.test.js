/**
 * @vitest-environment jsdom
 */

import { describe, expect, test } from 'vitest'
import datasFactory from '../factories/datasFactory'

describe('When I start an instance of datasFactory', () => {
  test('Then the "createEmptyFullGrid" should be available', () => {
    const datasFactoryInstance = datasFactory()
    const methods = Object.getOwnPropertyNames(datasFactoryInstance)
    expect(methods).toContain('createEmptyFullGrid')
  })
  test.todo('Then the "getRandomFullValidGrid" should be available', () => {
    const datasFactoryInstance = datasFactory()
    const methods = Object.getOwnPropertyNames(datasFactoryInstance)
    expect(methods).toContain('getRandomFullValidGrid')
  })
})

describe('When I call "createEmptyFullGrid"', () => {
  test('Then it should return an array of 81 element that have a form of a empty cellData', () => {
    const datasFactoryInstance = datasFactory()
    const emptyGrid = datasFactoryInstance.createEmptyFullGrid()

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

describe('When I create an instance of datasFactory and call the "init" method', () => {
  test('Then it the "grid" propertie should be an array of 81 element that have a form of a empty cellData', () => {
    const datasFactoryInstance = datasFactory()
    datasFactoryInstance.init()
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
