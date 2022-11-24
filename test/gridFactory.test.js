/**
 * @vitest-environment jsdom
 */
import { describe, expect, test } from 'vitest'
import gridDOMFactory from '../factoriesDOM/gridDOM.factory.js'
import gridDatas from '../mock/_grid.json'

describe('When I call a gridDOMFactory instance', () => {
  test('Then it should have a "createBorad" method', () => {
    const gridDOMFactoryInstance = gridDOMFactory(gridDatas)

    expect(Object.getOwnPropertyNames(gridDOMFactoryInstance)).toContain(
      'createBoard'
    )
  })
})

describe('When I call a gridDOMFactory.createboard', () => {
  test('Then it should return a "table" DOM element', () => {
    const gridDOMFactoryInstance = gridDOMFactory(gridDatas)
    gridDOMFactoryInstance.createBoard()
    const table = gridDOMFactoryInstance.board

    expect(table.tagName).toBe('TABLE')
  })

  test('Then "table" DOM element should contain 9 rows(TR)', () => {
    const gridDOMFactoryInstance = gridDOMFactory(gridDatas)
    gridDOMFactoryInstance.createBoard()
    const table = gridDOMFactoryInstance.board

    table.childNodes.forEach((el) => {
      expect(el.tagName).toBe('TR')
    })

    expect(table.childNodes.length).toEqual(9)
  })
})
