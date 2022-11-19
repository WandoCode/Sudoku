const solutionStore = function () {
  const getSolution = (solutionId) => {
    const solutionObject = localStorage.getItem('solution')

    if (!solutionObject) return console.log('No saved solution available')

    const { id, solution } = solutionObject

    if (id !== solutionId)
      return console.log("The solution id and game id doesn't match")

    return solution
  }

  const saveSolution = (id, solutionGridDatas) => {
    const solutionObject = { id, solution: solutionGridDatas }
    localStorage.setItem('solution', solutionObject)
  }

  const delSolution = () => {
    return localStorage.clear()
  }

  return { getSolution, saveSolution, delSolution }
}

export default solutionStore
