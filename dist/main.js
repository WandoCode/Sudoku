/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./factoriesDOM/UI.factory.js":
/*!************************************!*\
  !*** ./factoriesDOM/UI.factory.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utility_nodeSelectors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/nodeSelectors.js */ \"./utility/nodeSelectors.js\");\n/* harmony import */ var _gridDOM_factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gridDOM.factory.js */ \"./factoriesDOM/gridDOM.factory.js\");\n/* harmony import */ var _keyboardDOM_factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keyboardDOM.factory.js */ \"./factoriesDOM/keyboardDOM.factory.js\");\n/* harmony import */ var _selectDOM_factory_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./selectDOM.factory.js */ \"./factoriesDOM/selectDOM.factory.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\n\nfunction UIFactory(game) {\n  var nodes = (0,_utility_nodeSelectors_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  var drawGrid = function drawGrid() {\n    var prevChild = nodes.getOptionsContainer();\n    var grid = (0,_gridDOM_factory_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(game.gridCurrState);\n    grid.createBoard();\n    var board = grid.board;\n    var remainingBoard = nodes.getBoard();\n    remainingBoard === null || remainingBoard === void 0 ? void 0 : remainingBoard.remove();\n    prevChild.after(board);\n  };\n  var drawNewGameBtn = function drawNewGameBtn() {\n    var container = nodes.getOptionsContainer();\n    var btn = document.createElement('button');\n    btn.innerText = 'Nouvelle partie';\n    btn.classList.add('btn', 'btn--primary');\n    btn.onclick = handleNewGameBtn;\n    container.appendChild(btn);\n  };\n  var handleNewGameBtn = function handleNewGameBtn() {\n    var selectEl = nodes.getSelectDifficulty();\n    var difficulty = selectEl.value;\n    game.launchNewGame(difficulty);\n    drawGrid();\n  };\n  var drawSelectDifficulty = function drawSelectDifficulty() {\n    var container = nodes.getOptionsContainer();\n    var difficulties = {\n      easy: 'Facile',\n      medium: 'Intermédiaire',\n      hard: 'Difficile'\n    };\n    container.appendChild((0,_selectDOM_factory_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(difficulties).createCustomSelect());\n  };\n  var drawKeyboard = function drawKeyboard() {\n    var container = nodes.getMain();\n    container.appendChild((0,_keyboardDOM_factory_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(game).createKeyboardDOM());\n  };\n  var drawPage = function drawPage() {\n    drawGrid();\n    drawNewGameBtn();\n    drawSelectDifficulty();\n    drawKeyboard();\n  };\n  var redrawCellValue = function redrawCellValue(posX, posY, value) {\n    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];\n    var allCells = nodes.getAllCells();\n    var cellsArr = _toConsumableArray(allCells);\n    cellsArr.forEach(function (cell) {\n      var currCellPosX = cell.getAttribute('data-pos-x');\n      var currCellPosY = cell.getAttribute('data-pos-y');\n      if (currCellPosX === posX && currCellPosY === posY) {\n        if (options.includes('canNotChange')) {\n          cell.setAttribute('data-canChange', 'false');\n        }\n        cell.innerText = value === '0' || isNaN(value) ? '' : value;\n        cell.classList.remove('cell--error');\n      }\n      return;\n    });\n  };\n  var drawErrors = function drawErrors(errors) {\n    var allCells = nodes.getAllCells();\n    var cellsArr = _toConsumableArray(allCells);\n    cellsArr.forEach(function (cell) {\n      var currCellPosX = cell.getAttribute('data-pos-x');\n      var currCellPosY = cell.getAttribute('data-pos-y');\n      errors.forEach(function (error) {\n        if (parseInt(currCellPosX) === error.x && parseInt(currCellPosY) === error.y) {\n          cell.classList.add('board__cell--error');\n        }\n      });\n    });\n  };\n  return {\n    drawPage: drawPage,\n    redrawCellValue: redrawCellValue,\n    drawErrors: drawErrors\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UIFactory);\n\n//# sourceURL=webpack://sudoku/./factoriesDOM/UI.factory.js?");

/***/ }),

/***/ "./factoriesDOM/cellDOM.factory.js":
/*!*****************************************!*\
  !*** ./factoriesDOM/cellDOM.factory.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utility_nodeSelectors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/nodeSelectors.js */ \"./utility/nodeSelectors.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction cellDOMFactory(cellData, posX, posY) {\n  var nodes = (0,_utility_nodeSelectors_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  var addClassToCellsOnSameRowColumn = function addClassToCellsOnSameRowColumn(posX, posY) {\n    var allCells = nodes.getAllCells();\n    var cellsArr = _toConsumableArray(allCells);\n    cellsArr.forEach(function (cell) {\n      var currCellPosX = cell.getAttribute('data-pos-x');\n      var currCellPosY = cell.getAttribute('data-pos-y');\n      if (currCellPosX === posX || currCellPosY === posY) cell.classList.add('board__cell-in-cross');\n    });\n  };\n  var handleCellHovering = function handleCellHovering(e) {\n    e.target.addEventListener('mouseleave', handleCellLeave);\n    var posX = e.target.getAttribute('data-pos-x');\n    var posY = e.target.getAttribute('data-pos-y');\n    var targetIsACell = posX && posY;\n    if (!targetIsACell) return;\n    addClassToCellsOnSameRowColumn(posX, posY);\n  };\n  var handleCellLeave = function handleCellLeave() {\n    var allCells = nodes.getAllCells();\n    var cellsArr = _toConsumableArray(allCells);\n    cellsArr.forEach(function (cell) {\n      var currCellPosX = cell.getAttribute('data-pos-x');\n      var currCellPosY = cell.getAttribute('data-pos-y');\n      if (currCellPosX !== posX && currCellPosY !== posY) return cell.classList.remove('board__cell-in-cross');\n    });\n  };\n  var handleClickCell = function handleClickCell(e) {\n    var posX = e.target.getAttribute('data-pos-x');\n    var posY = e.target.getAttribute('data-pos-y');\n    var canChange = e.target.getAttribute('data-canChange');\n    var targetIsValidCell = posX && posY && canChange === 'true';\n    if (!targetIsValidCell) return;\n    var allCells = nodes.getAllCells();\n    var cellsArr = _toConsumableArray(allCells);\n    cellsArr.forEach(function (cell) {\n      var currCellPosX = cell.getAttribute('data-pos-x');\n      var currCellPosY = cell.getAttribute('data-pos-y');\n      if (currCellPosX === posX && currCellPosY === posY) {\n        var isClicked = cell.getAttribute('data-clicked') === 'true' ? true : false;\n        cell.setAttribute('data-clicked', !isClicked);\n      } else {\n        cell.setAttribute('data-clicked', false);\n      }\n    });\n  };\n  return {\n    cellDOM: null,\n    createCellDOM: function createCellDOM() {\n      this.cellDOM = document.createElement('div');\n      this.cellDOM.classList.add('board__cell');\n      this.cellDOM.innerHTML = cellData.value;\n      this.addCellClasses();\n      this.addAttribute();\n      this.cellDOM.addEventListener('mouseenter', handleCellHovering);\n      this.cellDOM.addEventListener('click', handleClickCell);\n    },\n    addCellClasses: function addCellClasses() {\n      var _this$cellDOM$classLi;\n      var cellClassesArr = ['board__cell'];\n      if (!cellData.canChange) {\n        cellClassesArr.push('board__cell--no-change');\n      }\n      (_this$cellDOM$classLi = this.cellDOM.classList).add.apply(_this$cellDOM$classLi, cellClassesArr);\n    },\n    addAttribute: function addAttribute() {\n      this.cellDOM.setAttribute('data-pos-x', posX);\n      this.cellDOM.setAttribute('data-pos-y', posY);\n      this.cellDOM.setAttribute('data-canChange', cellData.canChange);\n      this.cellDOM.setAttribute('data-clicked', false);\n    }\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cellDOMFactory);\n\n//# sourceURL=webpack://sudoku/./factoriesDOM/cellDOM.factory.js?");

/***/ }),

/***/ "./factoriesDOM/gridDOM.factory.js":
/*!*****************************************!*\
  !*** ./factoriesDOM/gridDOM.factory.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _rowDOM_factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rowDOM.factory.js */ \"./factoriesDOM/rowDOM.factory.js\");\n\nfunction gridDOMFactory(gridDatas) {\n  return {\n    board: [],\n    getBoard: function getBoard() {\n      return this.board;\n    },\n    createBoard: function createBoard() {\n      var rowGenerator = (0,_rowDOM_factory_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(gridDatas);\n      var table = document.createElement('table');\n      table.classList.add('board');\n      table.setAttribute('data-testid', 'table');\n      for (var j = 0; j < 9; j++) {\n        var newRow = rowGenerator.createRow(j);\n        table.appendChild(newRow);\n      }\n      this.board = table;\n    }\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gridDOMFactory);\n\n//# sourceURL=webpack://sudoku/./factoriesDOM/gridDOM.factory.js?");

/***/ }),

/***/ "./factoriesDOM/keyboardDOM.factory.js":
/*!*********************************************!*\
  !*** ./factoriesDOM/keyboardDOM.factory.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utility_nodeSelectors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/nodeSelectors.js */ \"./utility/nodeSelectors.js\");\n/* harmony import */ var _assets_hint_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/hint.svg */ \"./assets/hint.svg\");\n/* harmony import */ var _assets_check_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/check.svg */ \"./assets/check.svg\");\n/* harmony import */ var _assets_undo_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/undo.svg */ \"./assets/undo.svg\");\n\n\n\n\nfunction keyboardDOMFactory(game) {\n  var nodes = (0,_utility_nodeSelectors_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  var createImg = function createImg(path, altText) {\n    var img = document.createElement('img');\n    img.src = path;\n    img.alt = altText;\n    return img;\n  };\n  var createShowErrorsKey = function createShowErrorsKey() {\n    var keyboardShowErrors = document.createElement('button');\n    var errorImg = createImg(_assets_check_svg__WEBPACK_IMPORTED_MODULE_2__, 'Check for errors');\n    keyboardShowErrors.appendChild(errorImg);\n    keyboardShowErrors.classList.add('btn', 'btn--secondary', 'keyboard__show-errors');\n    keyboardShowErrors.onclick = handleShowErrors;\n    return keyboardShowErrors;\n  };\n  var handleShowErrors = function handleShowErrors() {\n    game.showGameErrors();\n  };\n  var createHintKey = function createHintKey() {\n    var keyboardHint = document.createElement('button');\n    var hintImg = createImg(_assets_hint_svg__WEBPACK_IMPORTED_MODULE_1__, 'Tip');\n    keyboardHint.appendChild(hintImg);\n    keyboardHint.classList.add('btn', 'btn--secondary', 'keyboard__undo');\n    keyboardHint.onclick = handleHint;\n    return keyboardHint;\n  };\n  var handleHint = function handleHint() {\n    game.giveHint();\n  };\n  var createUndoKey = function createUndoKey() {\n    var keyboardUndo = document.createElement('button');\n    var undoImg = createImg(_assets_undo_svg__WEBPACK_IMPORTED_MODULE_3__, 'Undo');\n    keyboardUndo.appendChild(undoImg);\n    keyboardUndo.classList.add('btn', 'btn--secondary', 'keyboard__undo');\n    keyboardUndo.onclick = hanleUndo;\n    return keyboardUndo;\n  };\n  var hanleUndo = function hanleUndo() {\n    game.undo();\n  };\n  var createSpecialKeys = function createSpecialKeys() {\n    var container = document.createElement('div');\n    container.classList.add('keyboard__specials');\n    container.appendChild(createUndoKey());\n    container.appendChild(createHintKey());\n    container.appendChild(createShowErrorsKey());\n    return container;\n  };\n  var createKeyValue = function createKeyValue() {\n    var container = document.createElement('div');\n    container.classList.add('keyboard__value');\n    for (var i = 0; i < 10; i++) {\n      var keyboardKey = document.createElement('button');\n      keyboardKey.classList.add('btn', 'btn--key');\n      keyboardKey.value = i === 0 ? null : i;\n      keyboardKey.innerText = i === 0 ? null : i;\n      keyboardKey.onclick = handleClick;\n      container.appendChild(keyboardKey);\n    }\n    return container;\n  };\n  var createKeyboardDOM = function createKeyboardDOM() {\n    var container = document.createElement('div');\n    container.classList.add('keyboard');\n    container.appendChild(createSpecialKeys());\n    container.appendChild(createKeyValue());\n    return container;\n  };\n  var handleClick = function handleClick(e) {\n    var value = e.target.value;\n    var clickedCell = nodes.getClickedCell();\n    if (!clickedCell) return;\n    var clickedCellPosX = clickedCell.getAttribute('data-pos-x');\n    var clickedCellPosY = clickedCell.getAttribute('data-pos-y');\n    var clickedCellCanChange = clickedCell.getAttribute('data-canChange');\n    if (clickedCellCanChange === 'false') return;\n    game.updateCell(clickedCellPosX, clickedCellPosY, value);\n  };\n  return {\n    createKeyboardDOM: createKeyboardDOM\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (keyboardDOMFactory);\n\n//# sourceURL=webpack://sudoku/./factoriesDOM/keyboardDOM.factory.js?");

/***/ }),

/***/ "./factoriesDOM/rowDOM.factory.js":
/*!****************************************!*\
  !*** ./factoriesDOM/rowDOM.factory.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _cellDOM_factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cellDOM.factory.js */ \"./factoriesDOM/cellDOM.factory.js\");\n\nfunction rowDOMFactory(cellDatas) {\n  var createRow = function createRow(posY) {\n    var row = document.createElement('tr');\n    row.classList.add('board__row');\n    for (var i = 0; i < 9; i++) {\n      var cellData = getCellDatas(i, posY);\n      var cell = (0,_cellDOM_factory_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(cellData, i, posY);\n      cell.createCellDOM();\n      var cellDOM = cell.cellDOM;\n      row.appendChild(cellDOM);\n    }\n    return row;\n  };\n  var getCellDatas = function getCellDatas(posX, posY) {\n    var cellData = cellDatas.find(function (cell) {\n      return cell.position.x === posX && cell.position.y === posY;\n    });\n    return cellData;\n  };\n  return {\n    createRow: createRow\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rowDOMFactory);\n\n//# sourceURL=webpack://sudoku/./factoriesDOM/rowDOM.factory.js?");

/***/ }),

/***/ "./factoriesDOM/selectDOM.factory.js":
/*!*******************************************!*\
  !*** ./factoriesDOM/selectDOM.factory.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utility_nodeSelectors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/nodeSelectors.js */ \"./utility/nodeSelectors.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction selectFactory(options) {\n  var nodes = (0,_utility_nodeSelectors_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  var getSelectDOM = function getSelectDOM(currentValue) {\n    var select = document.createElement('input');\n    select.type = 'checkbox';\n    select.name = 'select';\n    select.id = 'select-difficulty';\n    select.value = currentValue;\n    select.addEventListener('change', function (ev) {\n      if (ev.target.checked) openOptionsHandler();\n    });\n    return select;\n  };\n  var getSelectLabelDOM = function getSelectLabelDOM() {\n    var selectLabel = document.createElement('label');\n    selectLabel.htmlFor = 'select-difficulty';\n    selectLabel.id = 'select';\n    return selectLabel;\n  };\n  var getOptionDOM = function getOptionDOM(optionName, optionValue, currentValue) {\n    var option = document.createElement('li');\n    option.id = optionName;\n    option.innerText = optionName;\n    option.setAttribute('data-value', optionValue);\n    option.classList.add('option-select');\n    if (currentValue === optionValue) showAsSelected(option);\n    return option;\n  };\n  var openOptionsHandler = function openOptionsHandler() {\n    var body = document.getElementsByTagName('body')[0];\n    var optionsDOM = nodes.getDifficultyOptions();\n    optionsDOM.style.display = 'block';\n    body.addEventListener('click', clickOutsideSelectHandler);\n  };\n  var closeOptionsHandler = function closeOptionsHandler() {\n    var select = nodes.getSelectDifficulty();\n    var optionsDOM = nodes.getDifficultyOptions();\n    var body = nodes.getBody();\n    optionsDOM.style.display = 'none';\n    select.checked = false;\n    body.removeEventListener('click', clickOutsideSelectHandler);\n  };\n  var clickOutsideSelectHandler = function clickOutsideSelectHandler(e) {\n    var selectLabel = nodes.getSelect();\n    if (e.target.id !== selectLabel.id) closeOptionsHandler();\n  };\n  var showAsSelected = function showAsSelected(optionDOM) {\n    optionDOM.classList.add('current-value');\n  };\n  var hideAsSelected = function hideAsSelected(optionDOM) {\n    optionDOM.classList.remove('current-value');\n  };\n  var updateOptionsClasses = function updateOptionsClasses(currentValue) {\n    var selectOptions = nodes.getDifficultyOptionSelect();\n    var optionsArr = _toConsumableArray(selectOptions);\n    optionsArr.forEach(function (option) {\n      var optionValue = option.getAttribute('data-value');\n      if (optionValue === currentValue) {\n        showAsSelected(option);\n      } else hideAsSelected(option);\n    });\n  };\n  var redraw = function redraw(currentValue) {\n    var select = nodes.getSelectDifficulty();\n    var selectLabel = nodes.getSelect();\n    selectLabel.innerText = options[currentValue];\n    select.value = currentValue;\n    updateOptionsClasses(currentValue);\n  };\n  return {\n    currentValue: Object.keys(options)[0],\n    createCustomSelect: function createCustomSelect() {\n      var container = document.createElement('div');\n      container.classList.add('select-container');\n      var select = getSelectDOM(this.currentValue);\n      var selectLabel = getSelectLabelDOM();\n      var optionDOM = this.getOptionsDOM(options);\n      selectLabel.innerText = options[this.currentValue];\n      container.appendChild(select);\n      container.appendChild(selectLabel);\n      container.appendChild(optionDOM);\n      return container;\n    },\n    getOptionsDOM: function getOptionsDOM(options) {\n      var _this = this;\n      var container = document.createElement('ul');\n      container.classList.add('options');\n      for (var optionValue in options) {\n        var optionName = options[optionValue];\n        var option = getOptionDOM(optionName, optionValue, this.currentValue);\n        container.appendChild(option);\n        option.addEventListener('click', function (e) {\n          _this.currentValue = e.target.getAttribute('data-value');\n          closeOptionsHandler();\n          redraw(_this.currentValue);\n        });\n      }\n      return container;\n    }\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (selectFactory);\n\n//# sourceURL=webpack://sudoku/./factoriesDOM/selectDOM.factory.js?");

/***/ }),

/***/ "./factories/check.factory.js":
/*!************************************!*\
  !*** ./factories/check.factory.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction checkFactory(gridDatas) {\n  var checkRow = function checkRow(posY) {\n    var row = gridDatas.filter(function (el) {\n      return el.position.y === posY;\n    });\n    var rowArrValues = getArrValues(row);\n    var rowIsValid = haveOnlyUniqueValues(rowArrValues);\n    return rowIsValid;\n  };\n  var checkColumn = function checkColumn(posX) {\n    var column = gridDatas.filter(function (el) {\n      return el.position.x === posX;\n    });\n    var columnArrValues = getArrValues(column);\n    var columnIsValid = haveOnlyUniqueValues(columnArrValues);\n    return columnIsValid;\n  };\n  var checkSquare = function checkSquare(posX, posY) {\n    var squareCellsPositons = getSquarePosition(posX, posY);\n    var square = gridDatas.filter(function (el) {\n      var rep = squareCellsPositons.find(function (squareCell) {\n        return squareCell.x === el.position.x && squareCell.y === el.position.y;\n      });\n      return rep;\n    });\n    var squareArrValues = getArrValues(square);\n    var squareIsValid = haveOnlyUniqueValues(squareArrValues);\n    return squareIsValid;\n  };\n  var getArrValues = function getArrValues(datas) {\n    return datas.map(function (el) {\n      return el.value;\n    });\n  };\n  var haveOnlyUniqueValues = function haveOnlyUniqueValues(arrValues) {\n    var ans = true;\n    var _loop = function _loop(i) {\n      var filteredArr = arrValues.filter(function (val) {\n        return val === i;\n      });\n      if (filteredArr.length > 1) {\n        ans = false;\n        return \"break\";\n      }\n    };\n    for (var i = 1; i <= 10; i++) {\n      var _ret = _loop(i);\n      if (_ret === \"break\") break;\n    }\n    return ans;\n  };\n  var getSquarePosition = function getSquarePosition(posX, posY) {\n    // For pos =[0,9] it gives thoses posible values: 2, 5 and 8\n    var posXMax = Math.floor(posX / 3) * 3 + 2;\n    var posYMax = Math.floor(posY / 3) * 3 + 2;\n    var positions = [];\n    for (var i = 0; i < 3; i++) {\n      for (var j = 0; j < 3; j++) {\n        positions.push({\n          x: posXMax - i,\n          y: posYMax - j\n        });\n      }\n    }\n    return positions;\n  };\n\n  /* At a given position, looks if the row, column and square are valid */\n  var gridIsValidAtPos = function gridIsValidAtPos(posX, posY) {\n    var gridIsValid = this.checkRow(posY);\n    gridIsValid = gridIsValid ? this.checkColumn(posX) : false;\n    gridIsValid = gridIsValid ? this.checkSquare(posX, posY) : false;\n    return gridIsValid;\n  };\n  return {\n    checkRow: checkRow,\n    checkColumn: checkColumn,\n    getSquarePosition: getSquarePosition,\n    checkSquare: checkSquare,\n    gridIsValidAtPos: gridIsValidAtPos\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkFactory);\n\n//# sourceURL=webpack://sudoku/./factories/check.factory.js?");

/***/ }),

/***/ "./factories/datas.factory.js":
/*!************************************!*\
  !*** ./factories/datas.factory.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _check_factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./check.factory.js */ \"./factories/check.factory.js\");\n/* harmony import */ var _utility_helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility/helpers.js */ \"./utility/helpers.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\nfunction datasFactory() {\n  var createEmptyCell = function createEmptyCell(posX, posY) {\n    return {\n      value: null,\n      position: {\n        x: posX,\n        y: posY\n      },\n      canChange: true\n    };\n  };\n  var getRandomValueInArr = function getRandomValueInArr(arr) {\n    return arr[(0,_utility_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNbr)(arr.length - 1)];\n  };\n  var getNextCellPositions = function getNextCellPositions(posX, posY) {\n    var nextPosX = posX;\n    var nextPosY = posY;\n    nextPosX++;\n    if (nextPosX === 9) {\n      nextPosX = 0;\n      nextPosY++;\n    }\n    return {\n      nextPosX: nextPosX,\n      nextPosY: nextPosY\n    };\n  };\n  var getUniqueRandomPositions = function getUniqueRandomPositions(nbr) {\n    var maxPos = {\n      x: 8,\n      y: 8\n    };\n    var resArr = [];\n    var _loop = function _loop() {\n      var xRandom = (0,_utility_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNbr)(maxPos.x);\n      var yRandom = (0,_utility_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNbr)(maxPos.y);\n      var positionAlreadyInArr = resArr.some(function (el) {\n        return el.x === xRandom && el.y === yRandom;\n      });\n      if (!positionAlreadyInArr) {\n        resArr.push({\n          x: xRandom,\n          y: yRandom\n        });\n      }\n    };\n    while (resArr.length < nbr) {\n      _loop();\n    }\n    return resArr;\n  };\n  var evalKeepCell = function evalKeepCell(cell, identifiersArr) {\n    var cellIdentifier = \"\".concat(cell.position.x).concat(cell.position.y);\n    return identifiersArr.includes(cellIdentifier);\n  };\n  return {\n    grid: [],\n    getGrid: function getGrid() {\n      return JSON.parse(JSON.stringify(this.grid));\n    },\n    getRandomFullValidGrid: function getRandomFullValidGrid() {\n      var allCellsFilled = false;\n      while (!allCellsFilled) {\n        this.createEmptyFullGrid();\n        allCellsFilled = this.fillGridWithValidValues();\n      }\n    },\n    createEmptyFullGrid: function createEmptyFullGrid() {\n      var emptyGrid = [];\n      for (var i = 0; i < 9; i++) {\n        for (var j = 0; j < 9; j++) {\n          emptyGrid.push(createEmptyCell(i, j));\n        }\n      }\n      this.grid = emptyGrid;\n    },\n    fillGridWithValidValues: function fillGridWithValidValues() {\n      var currPosX = 0;\n      var currPosY = 0;\n      var currCellIndex = 0;\n      var validValueFound = true;\n      while (currPosX !== null && currPosY !== null) {\n        validValueFound = this.fillCellWithValidValue(currCellIndex, currPosX, currPosY);\n\n        //No valid value has been found: this grid can't be resolved\n        if (!validValueFound) {\n          break;\n        }\n\n        // Pick the next empty cell\n        var currEmptyCellPos = this.getNextEmptyCellPos(currPosX, currPosY);\n        currPosX = currEmptyCellPos.x;\n        currPosY = currEmptyCellPos.y;\n        currCellIndex = (0,_utility_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getCellIndex)(this.grid, currPosX, currPosY);\n      }\n\n      // When noValidValueFound=false at this point it means the grid as has been filled\n      return validValueFound;\n    },\n    getNextEmptyCellPos: function getNextEmptyCellPos(currPosX, currPosY) {\n      var nextPosX = currPosX;\n      var nextPosY = currPosY;\n      while (nextPosX < 9 && nextPosY < 9) {\n        var nextPosition = getNextCellPositions(nextPosX, nextPosY);\n        nextPosX = nextPosition.nextPosX;\n        nextPosY = nextPosition.nextPosY;\n        if (nextPosY === 9) break; // we're out of the grid\n\n        var currCellIndex = (0,_utility_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getCellIndex)(this.grid, nextPosX, nextPosY);\n        var currCell = this.grid[currCellIndex];\n        if ((currCell === null || currCell === void 0 ? void 0 : currCell.value) === null) return {\n          x: nextPosX,\n          y: nextPosY\n        };else continue;\n      }\n      return {\n        x: null,\n        y: null\n      };\n    },\n    fillCellWithValidValue: function fillCellWithValidValue(currCellIndex, currPosX, currPosY, customPossibleArrValues) {\n      var possibleValues = customPossibleArrValues || [1, 2, 3, 4, 5, 6, 7, 8, 9];\n      var validValueFound = false;\n      var searchCount = 0;\n      while (!validValueFound && searchCount < 30) {\n        searchCount++;\n        // Pick a new random value\n        var newValue = getRandomValueInArr(possibleValues);\n        this.grid[currCellIndex].value = newValue;\n\n        // Check if the value can fit in the empty cell\n        var checker = (0,_check_factory_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.grid);\n        var gridIsValid = checker.gridIsValidAtPos(currPosX, currPosY);\n\n        // If she can: add value to the cell and go to next empty cell\n        if (gridIsValid) {\n          validValueFound = true;\n        } else {\n          this.grid[currCellIndex].value = null;\n        }\n      }\n\n      // If validValueFound is false here, it means that a value has not be found after 30 guess => I asume that there is no valid value possible\n      return validValueFound;\n    },\n    makeGridPlayable: function makeGridPlayable() {\n      var difficulty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'easy';\n      // {difficulty: amount of number that stay on the grid}\n      var difficultiesInterface = {\n        easy: 25,\n        medium: 21,\n        hard: 17\n      };\n      var quantityOfCellsLeftOnGrid = difficultiesInterface[difficulty];\n      var keepPositionsArr = getUniqueRandomPositions(quantityOfCellsLeftOnGrid);\n      var keepPositionsArrIdentifiers = keepPositionsArr.map(function (el) {\n        return \"\".concat(el.x).concat(el.y);\n      });\n      var trimmedGrid = this.grid.map(function (cell) {\n        var keepCellValue = evalKeepCell(cell, keepPositionsArrIdentifiers);\n        if (keepCellValue) return _objectSpread(_objectSpread({}, cell), {}, {\n          canChange: false\n        });else return _objectSpread(_objectSpread({}, cell), {}, {\n          value: null\n        });\n      });\n      this.grid = trimmedGrid;\n    }\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (datasFactory);\n\n//# sourceURL=webpack://sudoku/./factories/datas.factory.js?");

/***/ }),

/***/ "./factories/gameManager.js":
/*!**********************************!*\
  !*** ./factories/gameManager.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _datas_factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datas.factory.js */ \"./factories/datas.factory.js\");\n/* harmony import */ var _utility_helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility/helpers.js */ \"./utility/helpers.js\");\n/* harmony import */ var _factoriesDOM_UI_factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../factoriesDOM/UI.factory.js */ \"./factoriesDOM/UI.factory.js\");\n/* harmony import */ var _store_game_store_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/game.store.js */ \"./store/game.store.js\");\n/* harmony import */ var _store_solution_store_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/solution.store.js */ \"./store/solution.store.js\");\n\n\n\n\n\nfunction gameManager() {\n  var gStore = (0,_store_game_store_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n  var sStore = (0,_store_solution_store_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n  var getRandomEmptyCellPosition = function getRandomEmptyCellPosition(grid) {\n    var emptyCellPosition;\n    var count = 0;\n    while (!emptyCellPosition && count < 200) {\n      count++;\n      var posX = (0,_utility_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNbr)(8);\n      var posY = (0,_utility_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getRandomNbr)(8);\n      var cell = grid[(0,_utility_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getCellIndex)(grid, posX, posY)];\n      var cellIsEmpty = cell.value === null;\n      if (cellIsEmpty) emptyCellPosition = {\n        posX: posX,\n        posY: posY\n      };\n    }\n    return emptyCellPosition;\n  };\n  return {\n    gridCurrState: [],\n    precStates: [],\n    //[{ x, y, value}]\n    gridSolution: [],\n    id: null,\n    launchNewGame: function launchNewGame(difficulty) {\n      var datasMaker = (0,_datas_factory_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n      datasMaker.getRandomFullValidGrid();\n      this.gridSolution = datasMaker.getGrid();\n      datasMaker.makeGridPlayable(difficulty);\n      this.gridCurrState = datasMaker.getGrid();\n      this.saveGame(this.gridCurrState, this.gridSolution);\n    },\n    loadGame: function loadGame() {\n      this.id = gStore.getSavedId();\n      if (!this.id) return false;\n      this.gridCurrState = gStore.getGame(this.id);\n      this.gridSolution = sStore.getSolution(this.id);\n      return true;\n    },\n    saveGame: function saveGame() {\n      this.id = Date.now();\n      sStore.saveSolution(this.id, this.gridSolution);\n      gStore.saveGame(this.id, this.gridCurrState);\n    },\n    updateCellData: function updateCellData(cell, posX, posY, newValue, options) {\n      if (!options.includes('skipSaveForUndo')) this.precStates.push({\n        x: posX,\n        y: posY,\n        value: cell.value\n      });\n      if (options.includes('canNotChange')) cell.canChange = false;\n      cell.value = newValue;\n    },\n    updateCell: function updateCell(cellPosX, cellPosY, newValue) {\n      var _this = this;\n      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];\n      var cellPosXInt = parseInt(cellPosX);\n      var cellPosYInt = parseInt(cellPosY);\n      var newValueInt = parseInt(newValue);\n      this.gridCurrState = this.gridCurrState.map(function (cell) {\n        var cellIsValid = cell.position.x === cellPosXInt && cell.position.y === cellPosYInt && cell.canChange;\n        if (!cellIsValid) return cell;\n        _this.updateCellData(cell, cellPosXInt, cellPosYInt, newValueInt, options);\n        return cell;\n      });\n      (0,_factoriesDOM_UI_factory_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])().redrawCellValue(String(cellPosXInt), String(cellPosYInt), String(newValueInt), options);\n      this.saveGame();\n    },\n    undo: function undo() {\n      var lastStateChange = this.precStates.pop();\n      if (!lastStateChange) return;\n      this.updateCell(String(lastStateChange.x), String(lastStateChange.y), String(lastStateChange.value), ['skipSaveForUndo']);\n    },\n    giveHint: function giveHint() {\n      var emptyCellPosition = getRandomEmptyCellPosition(this.gridCurrState);\n      if (!emptyCellPosition) return;\n      var hintCell = this.gridSolution.find(function (cell) {\n        return cell.position.x === emptyCellPosition.posX && cell.position.y === emptyCellPosition.posY;\n      });\n      this.updateCell(hintCell.position.x, hintCell.position.y, hintCell.value, ['canNotChange', 'skipSaveForUndo']);\n    },\n    showGameErrors: function showGameErrors() {\n      var _this2 = this;\n      var errors = [];\n      this.gridCurrState.forEach(function (currCell, index) {\n        var solutionValue = parseInt(_this2.gridSolution[index].value);\n        var currValue = parseInt(currCell.value) || null;\n        if (solutionValue !== currValue && currValue !== null) errors.push({\n          x: currCell.position.x,\n          y: currCell.position.y\n        });\n      });\n      (0,_factoriesDOM_UI_factory_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])().drawErrors(errors);\n      return errors;\n    }\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameManager);\n\n//# sourceURL=webpack://sudoku/./factories/gameManager.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _factoriesDOM_UI_factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factoriesDOM/UI.factory.js */ \"./factoriesDOM/UI.factory.js\");\n/* harmony import */ var _factories_gameManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/gameManager.js */ \"./factories/gameManager.js\");\n/* harmony import */ var _style_index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style/index.css */ \"./style/index.css\");\n\n\n\nvar game = (0,_factories_gameManager_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\nvar UIGenerator = (0,_factoriesDOM_UI_factory_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(game);\nvar gameLoaded = game.loadGame();\nif (!gameLoaded) game.launchNewGame('easy');\nUIGenerator.drawPage();\n\n//# sourceURL=webpack://sudoku/./index.js?");

/***/ }),

/***/ "./store/game.store.js":
/*!*****************************!*\
  !*** ./store/game.store.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar gameStore = function gameStore() {\n  var getGame = function getGame(gameId) {\n    var gameJSON = localStorage.getItem('game');\n    if (!gameJSON) return console.log('No saved game available');\n    var _JSON$parse = JSON.parse(gameJSON),\n      id = _JSON$parse.id,\n      gameGrid = _JSON$parse.gameGrid;\n    if (id !== gameId) return console.log(\"The game id and solution id doesn't match\");\n    return gameGrid;\n  };\n  var getSavedId = function getSavedId() {\n    var gameJSON = localStorage.getItem('game');\n    if (!gameJSON) return console.log('No saved game available');\n    var _JSON$parse2 = JSON.parse(gameJSON),\n      id = _JSON$parse2.id;\n    return id;\n  };\n  var saveGame = function saveGame(id, gameGridDatas) {\n    var gameJSON = JSON.stringify({\n      id: id,\n      gameGrid: gameGridDatas\n    });\n    localStorage.setItem('game', gameJSON);\n  };\n  var delGame = function delGame() {\n    return localStorage.clear();\n  };\n  return {\n    getGame: getGame,\n    saveGame: saveGame,\n    delGame: delGame,\n    getSavedId: getSavedId\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameStore);\n\n//# sourceURL=webpack://sudoku/./store/game.store.js?");

/***/ }),

/***/ "./store/solution.store.js":
/*!*********************************!*\
  !*** ./store/solution.store.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar solutionStore = function solutionStore() {\n  var getSolution = function getSolution(solutionId) {\n    var solutionJSON = localStorage.getItem('solution');\n    if (!solutionJSON) return console.log('No saved solution available');\n    var _JSON$parse = JSON.parse(solutionJSON),\n      id = _JSON$parse.id,\n      solution = _JSON$parse.solution;\n    if (id !== solutionId) return console.log(\"The solution id and game id doesn't match\");\n    return solution;\n  };\n  var saveSolution = function saveSolution(id, solutionGridDatas) {\n    var solutionJSON = JSON.stringify({\n      id: id,\n      solution: solutionGridDatas\n    });\n    localStorage.setItem('solution', solutionJSON);\n  };\n  var delSolution = function delSolution() {\n    return localStorage.clear();\n  };\n  return {\n    getSolution: getSolution,\n    saveSolution: saveSolution,\n    delSolution: delSolution\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (solutionStore);\n\n//# sourceURL=webpack://sudoku/./store/solution.store.js?");

/***/ }),

/***/ "./utility/helpers.js":
/*!****************************!*\
  !*** ./utility/helpers.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCellIndex\": () => (/* binding */ getCellIndex),\n/* harmony export */   \"getRandomNbr\": () => (/* binding */ getRandomNbr)\n/* harmony export */ });\nvar getCellIndex = function getCellIndex(grid, posX, posY) {\n  return grid.findIndex(function (cell) {\n    return cell.position.x === posX && cell.position.y === posY;\n  });\n};\nvar getRandomNbr = function getRandomNbr(max) {\n  return Math.floor(Math.random() * (max + 1));\n};\n\n\n//# sourceURL=webpack://sudoku/./utility/helpers.js?");

/***/ }),

/***/ "./utility/nodeSelectors.js":
/*!**********************************!*\
  !*** ./utility/nodeSelectors.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar nodeSelectors = function nodeSelectors() {\n  var getBody = function getBody() {\n    return document.getElementsByTagName('body')[0];\n  };\n  var getMain = function getMain() {\n    return document.getElementsByTagName('main')[0];\n  };\n  var getBoard = function getBoard() {\n    return document.getElementsByClassName('board')[0];\n  };\n  var getOptionsContainer = function getOptionsContainer() {\n    return document.getElementsByClassName('game-options-container')[0];\n  };\n  var getSelectDifficulty = function getSelectDifficulty() {\n    return document.getElementById('select-difficulty');\n  };\n  var getDifficultyOptions = function getDifficultyOptions() {\n    return document.getElementsByClassName('options')[0];\n  };\n  var getDifficultyOptionSelect = function getDifficultyOptionSelect() {\n    return document.getElementsByClassName('option-select');\n  };\n  var getSelect = function getSelect() {\n    return document.getElementById('select');\n  };\n  var getAllCells = function getAllCells() {\n    return document.getElementsByClassName('board__cell');\n  };\n  var getClickedCell = function getClickedCell() {\n    return document.querySelector('.board__cell[data-clicked=\"true\"]');\n  };\n  return {\n    getBody: getBody,\n    getMain: getMain,\n    getBoard: getBoard,\n    getOptionsContainer: getOptionsContainer,\n    getSelectDifficulty: getSelectDifficulty,\n    getDifficultyOptions: getDifficultyOptions,\n    getSelect: getSelect,\n    getDifficultyOptionSelect: getDifficultyOptionSelect,\n    getAllCells: getAllCells,\n    getClickedCell: getClickedCell\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (nodeSelectors);\n\n//# sourceURL=webpack://sudoku/./utility/nodeSelectors.js?");

/***/ }),

/***/ "./style/index.css":
/*!*************************!*\
  !*** ./style/index.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://sudoku/./style/index.css?");

/***/ }),

/***/ "./assets/check.svg":
/*!**************************!*\
  !*** ./assets/check.svg ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/check.svg\";\n\n//# sourceURL=webpack://sudoku/./assets/check.svg?");

/***/ }),

/***/ "./assets/hint.svg":
/*!*************************!*\
  !*** ./assets/hint.svg ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/hint.svg\";\n\n//# sourceURL=webpack://sudoku/./assets/hint.svg?");

/***/ }),

/***/ "./assets/undo.svg":
/*!*************************!*\
  !*** ./assets/undo.svg ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"assets/undo.svg\";\n\n//# sourceURL=webpack://sudoku/./assets/undo.svg?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;