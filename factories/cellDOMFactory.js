function cellDOMFactory(cellData, posX, posY) {
  let cellDOM

  const handleCellHovering = (e) => {
    e.target.addEventListener('mouseleave', handleCellLeave)

    // Check if the hovered el is a cell
    const posX = e.target.getAttribute('data-pos-x')
    const posY = e.target.getAttribute('data-pos-y')

    if (!posX || !posY) return

    // Add a class to all the cell on the same colupmn or row than the hovered cell
    const allCells = document.getElementsByClassName('board__cell')

    const cellsArr = [...allCells]
    cellsArr.forEach((cell) => {
      const currCellPosX = cell.getAttribute('data-pos-x')
      const currCellPosY = cell.getAttribute('data-pos-y')

      if (currCellPosX !== posX && currCellPosY !== posY) return
      else return cell.classList.add('in-cross')
    })
  }

  const handleCellLeave = (e) => {
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
    cellDOM,
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
