const { identity, times, zip, sort, map, pipe } = require('ramda')

const stableSort = (pairs) => {
  const comparator = (a, b) => {
    if (a[0] === null && b[0] === null) return 0
    if (a[0] === null) return -1
    if (b[0] === null) return 1
    if (a[0] > b[0]) return 1
    if (b[0] > a[0]) return -1
    if (a[1] > b[1]) return 1
    if (b[1] > a[1]) return -1
    return 0
  }
  return sort(comparator, pairs)
}

const rank = (column) => {
  const withIndexes = c => ({c, i: times(identity, c.length)})
  const pairIndexesWithValues = (o) => zip(o.c, o.i)
  const extractIndex = map(a => a[1])
  return pipe(withIndexes, pairIndexesWithValues, stableSort, extractIndex)(column)
}

module.exports = {
  rank
}
