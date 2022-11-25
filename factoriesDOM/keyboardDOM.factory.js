import nodeSelectors from '../utility/nodeSelectors.js'
import hintSVG from '../assets/hint.svg'
import checkSVG from '../assets/check.svg'
import undoSVG from '../assets/undo.svg'

function keyboardDOMFactory(game) {
  const nodes = nodeSelectors()

  const createImg = (path, altText) => {
    const img = document.createElement('img')
    img.src = path
    img.alt = altText

    return img
  }
  const createShowErrorsKey = () => {
    const keyboardShowErrors = document.createElement('button')
    const errorImg = createImg(checkSVG, 'Check for errors')

    keyboardShowErrors.appendChild(errorImg)

    keyboardShowErrors.classList.add(
      'btn',
      'btn--secondary',
      'keyboard__show-errors'
    )

    keyboardShowErrors.onclick = handleShowErrors

    return keyboardShowErrors
  }

  const handleShowErrors = () => {
    game.showGameErrors()
  }

  const createHintKey = () => {
    const keyboardHint = document.createElement('button')
    const hintImg = createImg(hintSVG, 'Tip')

    keyboardHint.appendChild(hintImg)

    keyboardHint.classList.add('btn', 'btn--secondary', 'keyboard__undo')

    keyboardHint.onclick = handleHint
    return keyboardHint
  }

  const handleHint = () => {
    game.giveHint()
  }
  const createUndoKey = () => {
    const keyboardUndo = document.createElement('button')
    const undoImg = createImg(undoSVG, 'Undo')

    keyboardUndo.appendChild(undoImg)

    keyboardUndo.classList.add('btn', 'btn--secondary', 'keyboard__undo')

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
    container.appendChild(createHintKey())
    container.appendChild(createShowErrorsKey())

    return container
  }

  const createKeyValue = () => {
    const container = document.createElement('div')
    container.classList.add('keyboard__value')

    for (let i = 0; i < 10; i++) {
      const keyboardKey = document.createElement('button')
      keyboardKey.classList.add('btn', 'btn--key')
      keyboardKey.value = i === 0 ? null : i
      keyboardKey.innerHTML = i === 0 ? null : i
      keyboardKey.onclick = handleClick

      container.appendChild(keyboardKey)
    }

    return container
  }

  const createKeyboardDOM = () => {
    const container = document.createElement('div')
    container.classList.add('keyboard')
    container.setAttribute('data-testId', 'keyboard')

    container.appendChild(createSpecialKeys())
    container.appendChild(createKeyValue())

    return container
  }

  const handleClick = (e) => {
    const value = e.target.value
    const clickedCell = nodes.getClickedCell()

    if (!clickedCell) return

    const clickedCellPosX = clickedCell.getAttribute('data-pos-x')
    const clickedCellPosY = clickedCell.getAttribute('data-pos-y')
    const clickedCellCanChange = clickedCell.getAttribute('data-canChange')

    if (clickedCellCanChange === 'false') return

    game.updateCell(clickedCellPosX, clickedCellPosY, value)
  }

  return { createKeyboardDOM }
}

export default keyboardDOMFactory
