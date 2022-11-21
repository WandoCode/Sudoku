import nodeSelectors from '../utility/nodeSelectors.js'
import UIFactory from './UIFactory.js'

function keyboardDOMFactory(game) {
  const nodes = nodeSelectors()

  const createUndoKey = () => {
    const keyboardUndo = document.createElement('button')
    keyboardUndo.classList.add('keyboard__undo')

    keyboardUndo.value = 'undo'
    keyboardUndo.innerText = 'Undo'
    keyboardUndo.onclick = hanleUndo
    return keyboardUndo
  }

  const hanleUndo = () => {
    game.undo()
  }
  const createSpecialKeys = () => {
    const container = document.createElement('div')
    container.classList.add('keyboard__specials')
    container.appendChild(createUndoKey())

    return container
  }

  const createKeyValue = () => {
    const container = document.createElement('div')
    container.classList.add('keyboard__value')

    for (let i = 0; i < 10; i++) {
      const keyboardKey = document.createElement('button')

      keyboardKey.value = i
      keyboardKey.innerText = i === 0 ? null : i
      keyboardKey.onclick = handleClick

      container.appendChild(keyboardKey)
    }

    return container
  }

  const createKeyboardDOM = () => {
    const container = document.createElement('div')
    container.classList.add('keyboard')

    container.appendChild(createSpecialKeys())
    container.appendChild(createKeyValue())

    return container
  }

  const handleClick = (e) => {
    const value = e.target.value
    const clickedCell = nodes.getClickedCell()

    const clickedCellPosX = clickedCell.getAttribute('data-pos-x')
    const clickedCellPosY = clickedCell.getAttribute('data-pos-y')
    const clickedCellCanChange = clickedCell.getAttribute('data-canChange')

    if (clickedCellCanChange === 'false') return

    clickedCell.innerText = value !== '0' ? value : ''

    game.updateCell(clickedCellPosX, clickedCellPosY, value)
  }

  return { createKeyboardDOM }
}

export default keyboardDOMFactory
