const gameStore = function () {
  const getGame = (gameId) => {
    const gameJSON = localStorage.getItem('solution')

    if (!gameJSON) return console.log('No saved game available')

    const { id, gameGrid } = JSON.parse(gameJSON)

    if (id !== gameId)
      return console.log("The game id and solution id doesn't match")

    return gameGrid
  }

  const saveGame = (id, gameGridDatas) => {
    const gameJSON = JSON.stringify({ id, gameGrid: gameGridDatas })
    localStorage.setItem('game', gameJSON)
  }

  const delGame = () => {
    return localStorage.clear()
  }

  return { getGame, saveGame, delGame }
}

export default gameStore
