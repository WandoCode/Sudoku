// getBody
// getAllCells
// etc.

const nodeSelectors = () => {
  const getBody = () => document.getElementsByTagName('body')[0]

  const getGameContainer = () =>
    document.getElementsByClassName('game-container')[0]

  const getResetBtnContainer = () =>
    document.getElementsByClassName('reset-btn-container')[0]

  const getSelectDifficulty = () => document.getElementById('select-difficulty')

  const getDifficultyContainer = () =>
    document.getElementsByClassName('difficulty-container')[0]

  const getDifficultyOptions = () =>
    document.getElementsByClassName('options')[0]

  const getDifficultyOptionSelect = () =>
    document.getElementsByClassName('option-select')

  const getSelect = () => document.getElementById('select')

  const getAllCells = () => document.getElementsByClassName('board__cell')

  const getKeyboardContainer = () =>
    document.getElementsByClassName('keyboard-container')[0]

  const getClickedCell = () =>
    document.querySelector('.board__cell[data-clicked="true"]')

  return {
    getBody,
    getGameContainer,
    getResetBtnContainer,
    getSelectDifficulty,
    getDifficultyContainer,
    getDifficultyOptions,
    getSelect,
    getDifficultyOptionSelect,
    getAllCells,
    getKeyboardContainer,
    getClickedCell,
  }
}

export default nodeSelectors
