function selectFactory(options) {
  const showAsSelected = (optionDOM) => {
    optionDOM.classList.add('current-value')
  }

  const hideAsSelected = (optionDOM) => {
    optionDOM.classList.remove('current-value')
  }

  const getSelectDOM = () => {
    const select = document.createElement('input')
    select.type = 'checkbox'
    select.name = 'select'
    select.id = 'select-input'

    return select
  }

  const getSelectLabelDOM = () => {
    const selectLabel = document.createElement('label')
    selectLabel.htmlFor = 'select-input'
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
    const select = document.getElementById('select')
    select.innerText = options[currentValue]
    updateOptionsClasses(currentValue)
  }

  return {
    currentValue: Object.keys(options)[0],
    createCustomSelect: function () {
      const container = document.createElement('div')

      const select = getSelectDOM()
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

      for (const optionValue in options) {
        const optionName = options[optionValue]

        const option = getOptionDOM(optionName, optionValue, this.currentValue)
        container.appendChild(option)

        option.addEventListener('click', (e) => {
          const optionNamesArr = Object.keys(options)

          this.currentValue = optionNamesArr.find(
            (name) => options[name] === e.target.innerText
          )

          redraw(this.currentValue)
        })
      }
      return container
    },
  }
}

export default selectFactory
