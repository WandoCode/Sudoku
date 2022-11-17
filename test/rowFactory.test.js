/**
 * @vitest-environment jsdom
 */

import { describe, expect, test } from 'vitest'
import rowDOMFactory from '../factories/rowDOMFactory'
import gridDatas from '../mock/_grid.json'

/* Unit tests */
describe('When I start an instance of rowDOMFactory', () => {
  test('Then the "createRow" should be available', () => {
    const rowDOMFactoryInstance = rowDOMFactory(gridDatas)
    const methods = Object.getOwnPropertyNames(rowDOMFactoryInstance)
    expect(methods).toContain('createRow')
  })

  test('Then cells value should correspond to the values given in the grid datas', () => {
    const posY = 1
    const rowDOMFactoryInstance = rowDOMFactory(gridDatas)
    const row = rowDOMFactoryInstance.createRow(posY)

    row.childNodes.forEach((el, index) => {
      const cellData = gridDatas.find((cell) => {
        return cell.position.x === index && cell.position.y === posY
      })
      const value = cellData.value
      const stringValue = value === null ? '' : `${value}`

      expect(el.innerHTML).toEqual(stringValue)
    })
  })
})

describe('When I call "createRow" method with a correct argument', () => {
  test('Then it should return a TR DOM element with 9 cells (TD) ', () => {
    const rowDOMFactoryInstance = rowDOMFactory(gridDatas)
    const row = rowDOMFactoryInstance.createRow(1)

    row.childNodes.forEach((el) => {
      expect(el.tagName).toEqual('TD')
    })
    expect(row.childNodes.length).toEqual(9)
    expect(row.tagName).toEqual('TR')
  })

  test('Then it should return a TR DOM element filled with TD cells having the corresponding "data-pos-y" attribute', () => {
    const posY = 5
    const rowDOMFactoryInstance = rowDOMFactory(gridDatas)
    const row = rowDOMFactoryInstance.createRow(posY)

    expect(row.tagName).toEqual('TR')

    row.childNodes.forEach((el) => {
      expect(el.tagName).toEqual('TD')
      expect(el.getAttribute('data-pos-y')).toEqual(`${posY}`)
    })
  })

  test('Then it should return a TR DOM element filled with TD cells having a "data-pos-x" attribute 0->9 ', () => {
    const rowDOMFactoryInstance = rowDOMFactory(gridDatas)
    const row = rowDOMFactoryInstance.createRow(1)

    expect(row.tagName).toEqual('TR')

    row.childNodes.forEach((el, index) => {
      expect(el.tagName).toEqual('TD')
      expect(el.getAttribute('data-pos-x')).toEqual(`${index}`)
    })
  })
})
