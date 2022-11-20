function selectFactory(options) {
  const getSelectDOM = (currentValue) => {
    const select = document.createElement('input')
    select.type = 'checkbox'
    select.name = 'select'
    select.id = 'select-difficulty'
    select.value = currentValue

    select.addEventListener('change', (ev) => {
      if (ev.target.checked) openOptionsHandler()
    })

    return select
  }

  const getSelectLabelDOM = () => {
    const selectLabel = document.createElement('label')
    selectLabel.htmlFor = 'select-difficulty'
    selectLabel.id = 'select'

    return selectLabel
  }

  const getOptionDOM = (optionName, optionValue, currentValue) => {
    const option = document.createElement('li')

    option.id = optionName
    option.innerText = optionName
    option.setAttribute('data-value', optionValue)
    option.classList.add('option-select')

    if (currentValue === optionValue) showAsSelected(option)

    return option
  }

  const openOptionsHandler = () => {
    const body = document.getElementsByTagName('body')[0]
    const optionsDOM = document.getElementsByClassName('options')[0]

    optionsDOM.style.display = 'block'

    body.addEventListener('click', clickOutsideSelectHandler)
  }

  const closeOptionsHandler = () => {
    const select = document.getElementById('select-difficulty')
    const optionsDOM = document.getElementsByClassName('options')[0]
    const body = document.getElementsByTagName('body')[0]

    optionsDOM.style.display = 'none'
    select.checked = false

    body.removeEventListener('click', clickOutsideSelectHandler)
  }

  const clickOutsideSelectHandler = (e) => {
    const selectLabel = document.getElementById('select')
    if (e.target.id !== selectLabel.id) closeOptionsHandler()
  }

  const showAsSelected = (optionDOM) => {
    optionDOM.classList.add('current-value')
  }

  const hideAsSelected = (optionDOM) => {
    optionDOM.classList.remove('current-value')
  }

  const updateOptionsClasses = function (currentValue) {
    const selectOptions = document.getElementsByClassName('option-select')

    const optionsArr = [...selectOptions]

    optionsArr.forEach((option) => {
      const optionValue = option.getAttribute('data-value')

      if (optionValue === currentValue) {
        showAsSelected(option)
      } else hideAsSelected(option)
    })
  }

  const redraw = function (currentValue) {
    const select = document.getElementById('select-difficulty')
    const selectLabel = document.getElementById('select')

    selectLabel.innerText = options[currentValue]
    select.value = currentValue

    updateOptionsClasses(currentValue)
  }

  return {
    currentValue: Object.keys(options)[0],
    createCustomSelect: function () {
      const container = document.createElement('div')
      container.classList.add('select-container')

      const select = getSelectDOM(this.currentValue)
      const selectLabel = getSelectLabelDOM()
      const optionDOM = this.getOptionsDOM(options)

      selectLabel.innerText = options[this.currentValue]

      container.appendChild(select)
      container.appendChild(selectLabel)
      container.appendChild(optionDOM)

      return container
    },

    getOptionsDOM: function (options) {
      const container = document.createElement('ul')
      container.classList.add('options')

      for (const optionValue in options) {
        const optionName = options[optionValue]

        const option = getOptionDOM(optionName, optionValue, this.currentValue)
        container.appendChild(option)

        option.addEventListener('click', (e) => {
          this.currentValue = e.target.getAttribute('data-value')

          closeOptionsHandler()
          redraw(this.currentValue)
        })
      }
      return container
    },
  }
}

export default selectFactory
