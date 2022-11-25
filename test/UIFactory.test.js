/**
 * @vitest-environment jsdom
 */

import { describe, expect, test, beforeEach, beforeAll, vi } from 'vitest'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import mockGridDatas from '../mock/_grid.json'
import cellDOMFactory from '../factoriesDOM/cellDOM.factory'
import gameManager from '../factories/gameManager.js'
import UIFactory from '../factoriesDOM/UI.factory'

let game
let UIFactoryInstance
let gridDatas
beforeEach(() => {
  document.body.innerHTML = ''

  game = gameManager()
  gridDatas = JSON.parse(JSON.stringify(mockGridDatas))

  game.gridCurrState = gridDatas

  UIFactoryInstance = UIFactory(game)

  const main = document.createElement('main')
  const optionsContainer = document.createElement('div')
  optionsContainer.className = 'game-options-container'

  document.body.appendChild(main)
  main.appendChild(optionsContainer)
})

describe('When UIFactory is called', () => {
  let methods
  beforeEach(() => {
    methods = Object.getOwnPropertyNames(UIFactoryInstance)
  })

  test('Then it should have the "drawPage" method', () => {
    expect(methods).contains('drawPage')
  })

  test('Then it should have the "redrawCellValue" method', () => {
    expect(methods).contains('redrawCellValue')
  })

  test('Then it should have the "drawErrors" method', () => {
    expect(methods).contains('drawErrors')
  })
})

describe('When I use the "drawPage" method', () => {
  beforeEach(() => {
    UIFactoryInstance.drawPage()
  })
  test('Then is should generate the game board in DOM', () => {
    const table = screen.getByRole('table')

    expect(table).toBeDefined()
  })

  test('Then is should generate the button "new game" in DOM', () => {
    const button = screen.getByRole('button', { name: 'Nouvelle partie' })

    expect(button).toBeDefined()
  })
  test('Then is should generate the custom select element in DOM', () => {
    const select = screen.getByLabelText('Facile')

    expect(select).toBeDefined()
  })
  test('Then is should generate the keyboard in DOM', () => {
    const keyboard = screen.getByTestId('keyboard')

    expect(keyboard).toBeDefined()
  })
})

describe('When user click on the "new game" button', () => {
  test('Then it should launch a new game (!does not test the rerender)', async () => {
    const user = userEvent.setup()
    UIFactoryInstance.drawPage()

    const spy = vi.spyOn(game, 'launchNewGame')

    const button = screen.getByRole('button', { name: 'Nouvelle partie' })

    await user.click(button)

    expect(spy).toHaveBeenCalled()
  })
})

describe('When .redrawCellValue is called correctly', () => {
  test('Then it should change the value of the given cell in DOM and remove the "cell--error" class', async () => {
    UIFactoryInstance.drawPage()

    const nodeWithOneBefore = screen.getAllByText('1')

    const x = nodeWithOneBefore[0].getAttribute('data-pos-x')
    const y = nodeWithOneBefore[0].getAttribute('data-pos-y')

    const cell = nodeWithOneBefore[0]
    cell.classList.add('cell--error')

    expect(cell.innerHTML).not.toEqual('9')

    // Check that the cell is in [0,0]
    expect(x).toEqual('0')
    expect(y).toEqual('0')

    UIFactoryInstance.redrawCellValue('0', '0', '9')

    expect(cell.innerHTML).toEqual('9')
    expect(cell.className).not.toMatch(/cell--error/)
  })

  describe('Given the option "canNotChange" is set', () => {
    test('Then it should change attribute "data-canChange" of the given cell to false in DOM', async () => {
      UIFactoryInstance.drawPage()

      const nodeWithOneBefore = screen.getAllByText('1')

      const x = nodeWithOneBefore[0].getAttribute('data-pos-x')
      const y = nodeWithOneBefore[0].getAttribute('data-pos-y')

      const cell = nodeWithOneBefore[0]

      expect(cell.getAttribute('data-canChange')).toMatch(/true/)

      // Check that the cell is in [0,0]
      expect(x).toEqual('0')
      expect(y).toEqual('0')

      UIFactoryInstance.redrawCellValue('0', '0', '9', ['canNotChange'])

      expect(cell.getAttribute('data-canChange')).toMatch(/false/)
    })
  })

  describe('Given the given value is NaN', () => {
    test('Then it should remove the displayed value in cell in the DOM', async () => {
      UIFactoryInstance.drawPage()

      const nodeWithOneBefore = screen.getAllByText('1')

      const x = nodeWithOneBefore[0].getAttribute('data-pos-x')
      const y = nodeWithOneBefore[0].getAttribute('data-pos-y')

      const cell = nodeWithOneBefore[0]

      expect(cell.innerHTML).not.toEqual('')

      // Check that the cell is in [0,0]
      expect(x).toEqual('0')
      expect(y).toEqual('0')

      UIFactoryInstance.redrawCellValue('0', '0', NaN)

      expect(cell.innerHTML).toEqual('')
    })
  })
})

describe('When .drawErrors is called correctly', () => {
  test('Then it should add the "cell--error" class to the given cell in DOM', async () => {
    UIFactoryInstance.drawPage()

    const nodeWithOneBefore = screen.getAllByText('1')

    const x = nodeWithOneBefore[0].getAttribute('data-pos-x')
    const y = nodeWithOneBefore[0].getAttribute('data-pos-y')

    const cell = nodeWithOneBefore[0]
    cell.classList.add('cell--error')

    expect(cell.innerHTML).not.toEqual('9')

    // Check that the cell is in [0,0]
    expect(x).toEqual('0')
    expect(y).toEqual('0')

    // Identify cell in [0,0] as an error
    UIFactoryInstance.drawErrors([{ x: 0, y: 0 }])

    expect(cell.className).toMatch(/cell--error/)
  })
})
