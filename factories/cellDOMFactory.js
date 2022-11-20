function cellDOMFactory(cellData, posX, posY) {
  const addClassToCellsOnSameRowColumn = (posX, posY) => {
    const allCells = document.getElementsByClassName('board__cell')

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
    const allCells = document.getElementsByClassName('board__cell')
    const cellsArr = [...allCells]
    cellsArr.forEach((cell) => {
      const currCellPosX = cell.getAttribute('data-pos-x')
      const currCellPosY = cell.getAttribute('data-pos-y')

      if (currCellPosX !== posX && currCellPosY !== posY)
        return cell.classList.remove('in-cross')
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
    },
  }
}

export default cellDOMFactory
