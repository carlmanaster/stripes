const { map, addIndex } = require('ramda')
const mapIndexed = addIndex(map);

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

module.exports = {
  width,
  height,
  row,
  column,
  substituteColumn
}
