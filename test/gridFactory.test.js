/**
 * @vitest-environment jsdom
 */
import { describe, expect, test } from 'vitest'
import gridFactory from '../factories/gridFactory'
import gridDatas from '../mock/_grid.json'

describe('When I call a gridFactory instance', () => {
  test('Then it should have a "createBorad" method', () => {
    const gridFactoryInstance = gridFactory(gridDatas)

    expect(Object.getOwnPropertyNames(gridFactoryInstance)).toContain(
      'createBoard'
    )
  })
})

describe('When I call a gridFactory.createboard', () => {
  test('Then it should return a "table" DOM element', () => {
    const gridFactoryInstance = gridFactory(gridDatas)
    const table = gridFactoryInstance.createBoard()

    expect(table.tagName).toBe('TABLE')
  })

  test('Then "table" DOM element should contain 9 rows(TR)', () => {
    const gridFactoryInstance = gridFactory(gridDatas)
    const table = gridFactoryInstance.createBoard()

    table.childNodes.forEach((el) => {
      expect(el.tagName).toBe('TR')
    })

    expect(table.childNodes.length).toEqual(9)
  })
})
