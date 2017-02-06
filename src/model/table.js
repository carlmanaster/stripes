const { map, addIndex } = require('ramda')
const mapIndexed = addIndex(map)
const { rank } = require('./sorter')

const width             = data                     => data.length === 0 ? 0 : data[0].length
const height            = data                     => data.length
const row               = (data, ordered, index)   => data[ordered(index)]
const substituteElement = (a, index, newValue)     => mapIndexed((x, i) => i === index ? newValue : x, a)
const substituteColumn  = (data, index, newColumn) => mapIndexed((a, i) => substituteElement(a, index, newColumn[i]), data)

const column = (data, ordered, index) => {
  if (index < 0) return undefined
  if (index >= width(data)) return undefined
  const a = map(a => a[index], data)
  return mapIndexed((o, i) => a[ordered(i)], a)
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
