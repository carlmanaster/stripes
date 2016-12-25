const React = require('react')
const { Component, PropTypes } = React
const FauxDom = require('react-faux-dom')
const d3 = require('d3')
const { curry, uniq } = require('ramda')
const { isNumberArray, isBooleanArray } = require('../model/classifier')
const { numericChart } = require('../viz/numeric-chart')
const { categoricalChart } = require('../viz/categorical-chart')
const { booleanChart } = require('../viz/boolean-chart')
const table = require('../model/table')

const chartFn = (column) => {
  if (isBooleanArray(column)) return booleanChart
  if (isNumberArray(column)) return numericChart
  return categoricalChart
}

const reduce = (c, dataTable, columnNames) => {
  var charts = []
  var datas = []
  var configs = []
  for (var i = 0; i < table.width(dataTable); i++) {
    const column = c(i)
    const name = columnNames[i]
    const cf = chartFn(column)
    const config = {name, className: name, top: 20, left: 50 * i}
    if (cf === categoricalChart) {
      config['keys'] = uniq(column).sort()
    }
    charts.push(cf)
    datas.push(column)
    configs.push(config)
  }
  return { charts, datas, configs }
}

class StripesChart extends Component {
  propTypes: {
    dataTable: PropTypes.array.isRequired,
    columnNames: PropTypes.array.isRequired,
    sortColumn: PropTypes.number
  }

  render() {
    const { dataTable, columnNames, sortColumn } = this.props
    const ordered = table.byColumn(dataTable, sortColumn)
    const c = curry(table.column)(dataTable, ordered)

    const { charts, datas, configs } = reduce(c, dataTable, columnNames)
    const node = FauxDom.createElement('svg')
    const g = d3.select(node)
    .attr('width', datas.length * 50)
    .attr('height', 3000)
    .append('g')

    for (let i = 0; i < datas.length; i++) {
      charts[i](g, datas[i], configs[i])
    }

    return node.toReact()
  }
}

export default StripesChart
