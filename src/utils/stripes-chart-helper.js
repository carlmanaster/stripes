const { isNumberArray, isBooleanArray } = require('../model/classifier')
const { numericChart } = require('../viz/numeric-chart')
const { categoricalChart } = require('../viz/categorical-chart')
const { booleanChart } = require('../viz/boolean-chart')
const table = require('../model/table')
const { uniq } = require('ramda')

const chartFn = (column) => {
  if (isBooleanArray(column)) return booleanChart
  if (isNumberArray(column)) return numericChart
  return categoricalChart
}

const reduceOne = (c, name, index) => {
  const column = c(index)
  const cf = chartFn(column)
  const config = {name, className: name, top: 20, left: 50 * index}
  if (cf === categoricalChart) {
    config['keys'] = uniq(column).sort()
  }
  return { index, cf, column, config }
}

const reduce = (c, dataTable, columnNames) => {
  var packets = []
  for (var i = 0; i < table.width(dataTable); i++) {
    packets.push(reduceOne(c, columnNames[i], i))
  }
  return packets
}

module.exports = {
  reduce
}
