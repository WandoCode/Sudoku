function cellDOMFactory(cellData, posX, posY) {
  let cellDOM

  return {
    cellDOM,
    createCellDOM: function () {
      this.cellDOM = document.createElement('td')
      this.cellDOM.classList.add('board__cell')

      this.cellDOM.innerHTML = cellData.value
      this.addCellClasses()
      this.addAttribute()
    },

    addCellClasses: function () {
      let cellClassesArr = ['board__cell']
      if (cellData.value) {
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
