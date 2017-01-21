const { map, addIndex, times } = require('ramda')

const mapIndexed = addIndex(map)
const inRange = (a, b, i) => i >= a && i < b

const ofLength = (n) => times(() => false, n)
const selectRange = (a, b, l) => mapIndexed((d, i) => inRange(a, b, i) || d, l)
const sortedBy = (rank, l) => mapIndexed((x, i) => l[rank[i]], l)

module.exports = {
  ofLength,
  selectRange,
  sortedBy
}
