const { map, addIndex, times, curry } = require('ramda')

const mapIndexed = addIndex(map)
const inRange = (a, b, i) => i >= a && i < b

const ofLength = (n) => times(() => false, n)
const selectRange = curry((l, a, b) => mapIndexed((d, i) => inRange(a, b, i) || d, l))
const sortedBy = (rank, l) => mapIndexed((x, i) => l[rank[i]], l)
const isSelected = curry((l, i) => l[i])

module.exports = {
  ofLength,
  selectRange,
  sortedBy,
  isSelected
}
