const { map, addIndex, times } = require('ramda')

const mapIndexed = addIndex(map)
const inRange = (a, b, i) => i >= a && i < b
const selectRange = (a, b, l) => mapIndexed((d, i) => inRange(a, b, i) ? true : d, l)
const ofLength = (n) => times(() => false, n)

module.exports = {
  selectRange,
  ofLength
}
