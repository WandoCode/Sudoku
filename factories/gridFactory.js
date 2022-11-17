import rowFactory from "./rowFactory"

function gridFactory() {
  const rowGenerator =  rowFactory()
  const createBoard = () => {
    const table = document.createElement('table')
    table.classList.add('board')

    const tableBody = document.createElement('tbody')
    table.appendChild(tableBody)

    for(let j=0; j<9; 1++){
      rowGenerator.createRow(j)
    }
    
    return table
  }

  return { createBoard }
}

export default gridFactory
