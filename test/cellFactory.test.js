/**
 * @vitest-environment jsdom
 */

import { describe, expect, test, beforeEach } from 'vitest'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import mockGridDatas from '../mock/_grid.json'
import cellDOMFactory from '../factoriesDOM/cellDOM.factory'

let gridDatas
let cellData
let cellInstance

beforeEach(() => {
  gridDatas = JSON.parse(JSON.stringify(mockGridDatas))
  gridDatas[6].value = null
  cellData = gridDatas[6]
  cellInstance = cellDOMFactory(cellData)

  document.body.innerHTML = ''
})

describe('When cellDOMFactory is called,', () => {
  let cellFactoryInstance

  beforeEach(() => {
    cellFactoryInstance = cellDOMFactory()
  })

  test('Then it should have a cellDOM property', () => {
    const rep = cellFactoryInstance.cellDOM

    expect(rep).toBeDefined()
  })
  test('Then it should have a createCellDOM property', () => {
    const methods = Object.getOwnPropertyNames(cellFactoryInstance)

    expect(methods).toContain('createCellDOM')
  })
  test('Then it should have a addCellClasses property', () => {
    const methods = Object.getOwnPropertyNames(cellFactoryInstance)

    expect(methods).toContain('createCellDOM')
  })
  test('Then it should have a addAttribute property', () => {
    const methods = Object.getOwnPropertyNames(cellFactoryInstance)

    expect(methods).toContain('addAttribute')
  })
})

describe('When .createCellDOM is called', () => {
  test('Then it should change the value of .cellDOM to be a div filled with the correct value and the "board__cell" class', () => {
    gridDatas[6].value = null
    gridDatas[7].value = 1

    const cellDataA = gridDatas[6]
    const cellDataB = gridDatas[7]

    const cellInstanceA = cellDOMFactory(cellDataA)
    const cellInstanceB = cellDOMFactory(cellDataB)

    cellInstanceA.createCellDOM()
    cellInstanceB.createCellDOM()

    const cellA = cellInstanceA.cellDOM
    const cellB = cellInstanceB.cellDOM

    const expectedCellValueA =
      cellDataA.value === null ? '' : `${cellDataA.value}`

    const expectedCellValueB =
      cellDataB.value === null ? '' : `${cellDataB.value}`

    expect(cellA.tagName === 'DIV').toBeTruthy()
    expect(cellA.innerHTML === expectedCellValueA).toBeTruthy()
    expect(cellA.className === 'board__cell').toBeTruthy()

    expect(cellB.innerHTML === expectedCellValueB).toBeTruthy()
  })

  describe('Given cellData.canChange is true', () => {
    test('Then .cellDOM should have an attribute "data-canChange=true"', () => {
      cellData = gridDatas[1]
      cellData.canChange = true

      cellInstance = cellDOMFactory(cellData)

      cellInstance.createCellDOM()

      const cell = cellInstance.cellDOM

      expect(cell.hasAttribute('data-canchange')).toBeTruthy()
      expect(cell.getAttribute('data-canchange')).toMatch(/true/)
    })
  })

  describe('Given cellData.canChange is false', () => {
    test('Then .cellDOM should have an attribute "data-canChange=false"', () => {
      cellData = gridDatas[1]
      cellData.canChange = false

      cellInstance = cellDOMFactory(cellData)

      cellInstance.createCellDOM()

      const cell = cellInstance.cellDOM

      expect(cell.hasAttribute('data-canchange')).toBeTruthy()
      expect(cell.getAttribute('data-canchange')).toMatch(/false/)
    })
  })

  describe('Given cellData.canChange is false', () => {
    test('Then .cellDOM should have a "data-pos-x" and "data-pos-y" attributes accordingly to cellData', () => {
      cellInstance.createCellDOM()

      const cell = cellInstance.cellDOM

      expect(cell.hasAttribute('data-pos-x')).toBeTruthy()
      expect(cell.hasAttribute('data-pos-y')).toBeTruthy()

      expect(cell.getAttribute('data-pos-x')).toEqual(`${cellData.position.x}`)
      expect(cell.getAttribute('data-pos-y')).toEqual(`${cellData.position.y}`)
    })
  })

  test('Then .cellDOM should have an "data-clicked=false" attribute', () => {
    cellInstance.createCellDOM()

    const cell = cellInstance.cellDOM

    expect(cell.hasAttribute('data-clicked')).toBeTruthy()

    expect(cell.getAttribute('data-clicked')).toMatch(/false/)
  })

  test('Then , on hover, .cellDOM should have a "board__cell-in-cross" class', async () => {
    const user = userEvent.setup()

    cellData.value = 1

    cellInstance = cellDOMFactory(cellData)
    cellInstance.createCellDOM()

    const cell = cellInstance.cellDOM

    document.body.appendChild(cell)

    const cellScreen = screen.getByText(`${cellData.value}`)

    await user.hover(cellScreen)
    expect(cellScreen.className).toMatch(/board__cell-in-cross/)

    await user.unhover(cellScreen)
    expect(cellScreen.className).not.toMatch(/board__cell-in-cross/)
  })

  describe('Given cellData.canChange=true', () => {
    test('Then , on click, .cellDOM should have the "data-clicked=true" attribute', async () => {
      const user = userEvent.setup()

      cellData.value = 1
      cellData.canChange = true
      cellInstance = cellDOMFactory(cellData)
      cellInstance.createCellDOM()

      const cell = cellInstance.cellDOM

      document.body.appendChild(cell)

      const cellScreen = screen.getByText(`${cellData.value}`)

      await user.click(cellScreen)

      expect(cellScreen.getAttribute('data-clicked')).toMatch(/true/)
    })
  })

  describe('Given cellData.canChange=false', () => {
    test('Then , on click, .cellDOM should have the "data-clicked=false" attribute', async () => {
      const user = userEvent.setup()

      cellData.value = 1
      cellData.canChange = false
      cellInstance = cellDOMFactory(cellData)
      cellInstance.createCellDOM()

      const cell = cellInstance.cellDOM

      document.body.appendChild(cell)

      const cellScreen = screen.getByText(`${cellData.value}`)

      await user.click(cellScreen)

      expect(cellScreen.getAttribute('data-clicked')).toMatch(/false/)
    })

    test('Then .cellDOM should have the "board__cell--no-change" calss', async () => {
      const user = userEvent.setup()

      cellData.value = 1
      cellData.canChange = false
      cellInstance = cellDOMFactory(cellData)
      cellInstance.createCellDOM()

      const cell = cellInstance.cellDOM

      document.body.appendChild(cell)

      const cellScreen = screen.getByText(`${cellData.value}`)

      await user.click(cellScreen)

      expect(cellScreen.className).toMatch(/board__cell--no-change/)
    })
  })
})
