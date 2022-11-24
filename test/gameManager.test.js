/**
 * @vitest-environment jsdom
 */
import { describe, expect, test, beforeAll, beforeEach, vi } from 'vitest'
import datasFactory from '../factories/datas.factory.js'
import gameManager from '../factories/gameManager'
import mockGridDatas from '../mock/_grid.json'

let game
let gridDatas
beforeEach(() => {
  game = gameManager()
  gridDatas = JSON.parse(JSON.stringify(mockGridDatas))
})

describe('When I create an instance of gameManager', () => {
  test('Then it should have a gridCurrState ', () => {
    const rep = game.gridCurrState
    expect(rep).toBeDefined()
  })

  test('Then it should have a precStates ', () => {
    const rep = game.precStates
    expect(rep).toBeDefined()
  })

  test('Then it should have a gridSolution ', () => {
    const rep = game.gridSolution
    expect(rep).toBeDefined()
  })

  test('Then it should have an id ', () => {
    const rep = game.id
    expect(rep).toBeDefined()
  })

  test('Then it should have a launchNewGame method ', () => {
    const methods = Object.getOwnPropertyNames(game)
    expect(methods).toContain('launchNewGame')
  })

  test('Then it should have a loadGame method ', () => {
    const methods = Object.getOwnPropertyNames(game)
    expect(methods).toContain('loadGame')
  })

  test('Then it should have a saveGame method ', () => {
    const methods = Object.getOwnPropertyNames(game)
    expect(methods).toContain('saveGame')
  })

  test('Then it should have a updateCellData method ', () => {
    const methods = Object.getOwnPropertyNames(game)
    expect(methods).toContain('updateCellData')
  })

  test('Then it should have a updateCell method ', () => {
    const methods = Object.getOwnPropertyNames(game)
    expect(methods).toContain('updateCell')
  })

  test('Then it should have an undo method ', () => {
    const methods = Object.getOwnPropertyNames(game)
    expect(methods).toContain('undo')
  })

  test('Then it should have a giveHint method ', () => {
    const methods = Object.getOwnPropertyNames(game)
    expect(methods).toContain('giveHint')
  })

  test('Then it should have a showGameErrors method ', () => {
    const methods = Object.getOwnPropertyNames(game)
    expect(methods).toContain('showGameErrors')
  })
})

describe('When I call launchNewGame ', () => {
  test('Then it should create a new grid with the solution too', () => {
    game.launchNewGame()
    const grid = game.gridCurrState
    const solution = game.gridSolution

    expect(grid).toBeDefined()
    expect(solution).toBeDefined()
  })

  test('Then it should save in localstorage a new grid with the solution too', () => {
    game.launchNewGame()
    const grid = localStorage.getItem('game')
    const solution = localStorage.getItem('solution')

    expect(grid).toBeDefined()
    expect(solution).toBeDefined()
  })
})

describe('When I call saveGame ', () => {
  test('Then it should save the current gridCurrState and gridSolution in localStorage with the same id', () => {
    game.gridCurrState = gridDatas
    game.gridSolution = gridDatas
    game.saveGame()

    const gridObject = localStorage.getItem('game')
    const solutionObject = localStorage.getItem('solution')

    const grid = JSON.parse(gridObject).gameGrid
    const gridId = JSON.parse(gridObject).id

    const solution = JSON.parse(solutionObject).solution
    const solutionId = JSON.parse(solutionObject).id

    expect(grid).toEqual(gridDatas)
    expect(solution).toEqual(gridDatas)
    expect(gridId === solutionId).toBeTruthy()
  })
})

describe('When I call loadGame ', () => {
  describe('Given a game has been saved correctly', () => {
    beforeEach(() => {
      const solutionJSON = JSON.stringify({ id: 123, solution: gridDatas })
      const gameJSON = JSON.stringify({ id: 123, gameGrid: gridDatas })

      localStorage.setItem('game', gameJSON)
      localStorage.setItem('solution', solutionJSON)
    })

    test('Then it should load the saved gridSolution and gridCurrState', () => {
      game.loadGame()

      const grid = game.gridCurrState
      const solution = game.gridSolution

      expect(grid).toEqual(gridDatas)
      expect(solution).toEqual(gridDatas)
    })

    test('Then it should return true', () => {
      const isLoaded = game.loadGame()

      expect(isLoaded).toBeTruthy()
    })
  })

  describe('Given no game has been saved', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    test('Then it should not load datas in gridSolution and gridCurrState', () => {
      game.loadGame()

      const grid = game.gridCurrState
      const solution = game.gridSolution

      expect(grid).toEqual([])
      expect(solution).toEqual([])
    })

    test('Then it should return false', () => {
      const isLoaded = game.loadGame()

      expect(isLoaded).toBeFalsy()
    })
  })
})

describe('When updateCellData is called with correct argument', () => {
  describe('With no option', () => {
    test('Then it should update correctely the given cell with the given value and add the modification in .precStates', () => {
      game.gridCurrState = gridDatas
      const grid = game.gridCurrState

      const posX = 0
      const posY = 1
      const newValue = 5
      const cell = grid[1]
      game.updateCellData(cell, posX, posY, newValue, [])

      const precStates = game.precStates

      expect(cell.value).toEqual(newValue)
      expect(precStates).toEqual([{ x: posX, y: posY, value: null }]) // see mock/grid.json : null is the value of the given cell
    })
    describe('With the "skipSaveForUndo" option', () => {
      test('Then it should not update .precStates ', () => {
        game.gridCurrState = gridDatas
        const grid = game.gridCurrState

        const posX = 0
        const posY = 1
        const newValue = 5
        const cell = grid[1]
        game.updateCellData(cell, posX, posY, newValue, ['skipSaveForUndo'])

        const precStates = game.precStates

        expect(precStates).toEqual([])
      })
    })
    describe('With the "canNotChange" option', () => {
      test('Then the cell.canChange should be set to false ', () => {
        game.gridCurrState = gridDatas
        const grid = game.gridCurrState

        const posX = 0
        const posY = 1
        const newValue = 5
        const cell = grid[1]
        game.updateCellData(cell, posX, posY, newValue, ['canNotChange'])

        expect(cell.canChange).toBeFalsy()
      })
    })
  })
})

describe('When updateCell is called with correct argument', () => {
  describe('With no option', () => {
    test('Then it should update correctely the given grid with the given value in the correct cell and add the modification in .precStates', () => {
      game.gridCurrState = gridDatas

      const grid = game.gridCurrState
      const gridCopy = JSON.parse(JSON.stringify(grid))

      const posX = 0
      const posY = 1
      const newValue = 5
      game.updateCell(posX, posY, newValue)

      gridCopy[1].value = 5

      const precStates = game.precStates

      expect(grid).toEqual(gridCopy)
      expect(precStates).toEqual([{ x: posX, y: posY, value: null }]) // see mock/grid.json : null is the value of the given cell
    })

    test('Then it should save the game', () => {
      const spy = vi.spyOn(game, 'saveGame')
      game.gridCurrState = gridDatas

      const posX = 0
      const posY = 1
      const newValue = 5
      game.updateCell(posX, posY, newValue)

      expect(spy).toBeCalledTimes(1)
    })

    describe('With the "skipSaveForUndo" option', () => {
      test('Then it should not update .precStates ', () => {
        game.gridCurrState = gridDatas
        const grid = game.gridCurrState

        const posX = 0
        const posY = 1
        const newValue = 5
        const cell = grid[1]
        game.updateCellData(cell, posX, posY, newValue, ['skipSaveForUndo'])

        const precStates = game.precStates

        expect(precStates).toEqual([])
      })
    })
    describe('With the "canNotChange" option', () => {
      test('Then the cell.canChange should be set to false ', () => {
        game.gridCurrState = gridDatas
        const grid = game.gridCurrState

        const posX = 0
        const posY = 1
        const newValue = 5
        const cell = grid[1]
        game.updateCellData(cell, posX, posY, newValue, ['canNotChange'])

        expect(cell.canChange).toBeFalsy()
      })
    })
  })
})

describe('When I call undo', () => {
  describe('Given there is nothing to undo', () => {
    test('Then it should not call .updateCell', () => {
      game.undo()

      const spy = vi.spyOn(game, 'updateCell')

      expect(spy).not.toBeCalled()
    })
  })

  describe('Given there is a precedent move to undo', () => {
    test('Then it should  call .updateCell', () => {
      game.precStates = [{ x: 0, y: 0, value: 1 }]

      const spy = vi.spyOn(game, 'updateCell')

      game.undo()

      expect(spy).toBeCalledWith('0', '0', '1', ['skipSaveForUndo'])
    })
  })
})

describe('When I call giveHint', () => {
  describe('Given there is no more empty cell', () => {
    test('Then it should not call .updateCell', () => {
      game.launchNewGame()

      const fullGrid = JSON.parse(JSON.stringify(game.gridSolution))

      game.gridCurrState = fullGrid

      game.giveHint()

      const spy = vi.spyOn(game, 'updateCell')

      expect(spy).not.toBeCalled()
    })
  })

  describe('Given there is at least an empty cell left', () => {
    test('Then it should  call .updateCell', () => {
      game.launchNewGame()

      const spy = vi.spyOn(game, 'updateCell')

      game.giveHint()

      expect(spy).toBeCalled()
    })
  })
})
