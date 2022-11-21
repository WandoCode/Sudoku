import nodeSelectors from '../utility/nodeSelectors.js'

function keyboardDOMFactory(game) {
  const nodes = nodeSelectors()

  const createKeyboardDOM = () => {
    const container = document.createElement('div')
    container.classList.add('keyboard')

    for (let i = 0; i < 10; i++) {
      const keyboardKey = document.createElement('button')

      keyboardKey.value = i
      keyboardKey.innerText = i === 0 ? null : i
      keyboardKey.onclick = handleClick

      container.appendChild(keyboardKey)
    }

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
