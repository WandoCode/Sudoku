const nodeSelectors = () => {
  const getBody = () => document.getElementsByTagName('body')[0]

  const getMain = () => document.getElementsByTagName('main')[0]

  const getBoard = () => document.getElementsByClassName('board')[0]

  const getOptionsContainer = () =>
    document.getElementsByClassName('game-options-container')[0]

  const getSelectDifficulty = () => document.getElementById('select-difficulty')

  const getDifficultyOptions = () =>
    document.getElementsByClassName('options')[0]

  const getDifficultyOptionSelect = () =>
    document.getElementsByClassName('option-select')

  const getSelect = () => document.getElementById('select')

  const getAllCells = () => document.getElementsByClassName('board__cell')

  const getClickedCell = () =>
    document.querySelector('.board__cell[data-clicked="true"]')

  return {
    getBody,
    getMain,
    getBoard,
    getOptionsContainer,
    getSelectDifficulty,
    getDifficultyOptions,
    getSelect,
    getDifficultyOptionSelect,
    getAllCells,
    getClickedCell,
  }
}

export default nodeSelectors
