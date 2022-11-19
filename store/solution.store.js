const solutionStore = function () {
  const getSolution = (solutionId) => {
    const solutionJSON = localStorage.getItem('solution')

    if (!solutionJSON) return console.log('No saved solution available')

    const { id, solution } = JSON.parse(solutionJSON)

    if (id !== solutionId)
      return console.log("The solution id and game id doesn't match")

    return solution
  }

  const saveSolution = (id, solutionGridDatas) => {
    const solutionJSON = JSON.stringify({ id, solution: solutionGridDatas })
    localStorage.setItem('solution', solutionJSON)
  }

  const delSolution = () => {
    return localStorage.clear()
  }

  return { getSolution, saveSolution, delSolution }
}

export default solutionStore
