function cellFactory(value, x, y, canChange) {
  return { value, position: { x, y }, canChange }
}

export default cellFactory
