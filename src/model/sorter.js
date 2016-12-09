const { identity, times, zip, sortBy, prop, map, pipe } = require('ramda')

const rank = (column) => {
  const withIndexes = (c) => {return {c, i: times(identity, c.length)}}
  const pairIndexesWithValues = (o) => zip(o.c, o.i)
  const sortByValue = sortBy(prop(0))
  const extractIndex = map(a => a[1])
  return pipe(withIndexes, pairIndexesWithValues, sortByValue, extractIndex)(column)
}

module.exports = {
  rank
}
