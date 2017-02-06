const { map, addIndex } = require('ramda')
const mapIndexed = addIndex(map)
const { rank } = require('./sorter')

const width = (data) => {
  return data.length === 0 ? 0 : data[0].length
}

const height = (data) => {
  return data.length
}

const row = (data, ordered, index) => {
  return data[ordered(index)]
}

const column = (data, ordered, index) => {
  if (index < 0) return undefined
  if (index >= width(data)) return undefined
  const a = map(a => a[index], data)
  return mapIndexed((o, i) => a[ordered(i)], a)
}

const substituteElement = (a, index, newValue) => {
  return mapIndexed((x, i) => i === index ? newValue : x, a)
}

const substituteColumn = (data, index, newColumn) => {
  return mapIndexed((a, i) => substituteElement(a, index, newColumn[i]), data)
}

const byColumn = (data, index) => {
  const order = rank(column(data, n => n, index))
  return n => order[n]
}

const sortedByColumn = (data, index) => {
  const order = byColumn(data, index)
  return mapIndexed((x, i) => row(data, order, i), data)
}

module.exports = {
  width,
  height,
  row,
  column,
  substituteColumn,
  byColumn,
  sortedByColumn
}
