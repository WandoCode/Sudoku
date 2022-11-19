const gameStore = function () {
  const getGame = (gameId) => {
    const gameJSON = localStorage.getItem('game')

    if (!gameJSON) return console.log('No saved game available')

    const { id, gameGrid } = JSON.parse(gameJSON)

    if (id !== gameId)
      return console.log("The game id and solution id doesn't match")

    return gameGrid
  }

  const getSavedId = () => {
    const gameJSON = localStorage.getItem('game')

    if (!gameJSON) return console.log('No saved game available')

    const { id } = JSON.parse(gameJSON)
    return id
  }

  const saveGame = (id, gameGridDatas) => {
    const gameJSON = JSON.stringify({ id, gameGrid: gameGridDatas })
    localStorage.setItem('game', gameJSON)
  }

  const delGame = () => {
    return localStorage.clear()
  }

  return { getGame, saveGame, delGame, getSavedId }
}

export default gameStore
