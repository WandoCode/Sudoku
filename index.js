import datasFactory from './factories/datasFactory.js'

const gridDatasInstance = datasFactory()
gridDatasInstance.getRandomFullValidGrid()
console.log(gridDatasInstance.grid)
