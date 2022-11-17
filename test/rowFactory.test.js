/**
 * @vitest-environment jsdom
 */

import { describe, expect, test } from 'vitest'
import rowFactory from '../factories/rowFactory'
import { screen } from '@testing-library/dom'

/* Unit tests */
describe('When I start an instance of rowFactory', () => {
  test('Then the "createRow" should be available', () => {
    const rowFactoryInstance = rowFactory()
    const methods = Object.getOwnPropertyNames(rowFactoryInstance)
    expect(methods).toContain('createRow')
  })
})

describe('When I call "createRow" method with a correct argument', () => {
  test('Then it should return a TR DOM element with 9 cells (TD) ', () => {
    const rowFactoryInstance = rowFactory()
    const row = rowFactoryInstance.createRow(1)

    row.childNodes.forEach((el) => {
      expect(el.tagName).toEqual('TD')
    })
    expect(row.childNodes.length).toEqual(9)
    expect(row.tagName).toEqual('TR')
  })

  test('Then it should return a TR DOM element filled with TD cells having the corresponding "data-pos-y" attribute', () => {
    const posY = '5'
    const rowFactoryInstance = rowFactory()
    const row = rowFactoryInstance.createRow(posY)

    expect(row.tagName).toEqual('TR')

    row.childNodes.forEach((el) => {
      expect(el.tagName).toEqual('TD')
      expect(el.getAttribute('data-pos-y')).toEqual(posY)
    })
  })

  test('Then it should return a TR DOM element filled with TD cells having a "data-pos-x" attribute 0->9 ', () => {
    const rowFactoryInstance = rowFactory()
    const row = rowFactoryInstance.createRow(1)

    expect(row.tagName).toEqual('TR')

    row.childNodes.forEach((el, index) => {
      expect(el.tagName).toEqual('TD')
      expect(el.getAttribute('data-pos-x')).toEqual(`${index}`)
    })
  })
})
