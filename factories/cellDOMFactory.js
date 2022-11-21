import nodeSelectors from '../utility/nodeSelectors.js'

function cellDOMFactory(cellData, posX, posY) {
  const nodes = nodeSelectors()

  const addClassToCellsOnSameRowColumn = (posX, posY) => {
    const allCells = nodes.getAllCells()

    const cellsArr = [...allCells]
    cellsArr.forEach((cell) => {
      const currCellPosX = cell.getAttribute('data-pos-x')
      const currCellPosY = cell.getAttribute('data-pos-y')

      if (currCellPosX === posX || currCellPosY === posY)
        cell.classList.add('in-cross')
    })
  }

  const handleCellHovering = (e) => {
    e.target.addEventListener('mouseleave', handleCellLeave)

    const posX = e.target.getAttribute('data-pos-x')
    const posY = e.target.getAttribute('data-pos-y')

    const targetIsACell = posX && posY
    if (!targetIsACell) return

    addClassToCellsOnSameRowColumn(posX, posY)
  }

  const handleCellLeave = () => {
    const allCells = nodes.getAllCells()
    const cellsArr = [...allCells]

    cellsArr.forEach((cell) => {
      const currCellPosX = cell.getAttribute('data-pos-x')
      const currCellPosY = cell.getAttribute('data-pos-y')

      if (currCellPosX !== posX && currCellPosY !== posY)
        return cell.classList.remove('in-cross')
    })
  }

  const handleClickCell = function (e) {
    const posX = e.target.getAttribute('data-pos-x')
    const posY = e.target.getAttribute('data-pos-y')
    const canChange = e.target.getAttribute('data-canChange')

    const targetIsValidCell = posX && posY && canChange === 'true'
    if (!targetIsValidCell) return

    const allCells = nodes.getAllCells()
    const cellsArr = [...allCells]

    cellsArr.forEach((cell) => {
      const currCellPosX = cell.getAttribute('data-pos-x')
      const currCellPosY = cell.getAttribute('data-pos-y')

      if (currCellPosX === posX && currCellPosY === posY) {
        const isClicked =
          cell.getAttribute('data-clicked') === 'true' ? true : false
        cell.setAttribute('data-clicked', !isClicked)
      } else {
        cell.setAttribute('data-clicked', false)
      }
    })
  }
  return {
    cellDOM: null,
    createCellDOM: function () {
      this.cellDOM = document.createElement('div')
      this.cellDOM.classList.add('board__cell')

      this.cellDOM.innerHTML = cellData.value
      this.addCellClasses()
      this.addAttribute()

      this.cellDOM.addEventListener('mouseenter', handleCellHovering)
      this.cellDOM.addEventListener('click', handleClickCell)
    },

    addCellClasses: function () {
      let cellClassesArr = ['board__cell']
      if (!cellData.canChange) {
        cellClassesArr.push('board__cell--no-change')
      }

      this.cellDOM.classList.add(...cellClassesArr)
    },

    addAttribute: function () {
      this.cellDOM.setAttribute('data-pos-x', posX)
      this.cellDOM.setAttribute('data-pos-y', posY)
      this.cellDOM.setAttribute('data-canChange', cellData.canChange)
      this.cellDOM.setAttribute('data-clicked', false)
    },
  }
}

export default cellDOMFactory
