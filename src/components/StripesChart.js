import MultiChart from '../stories/MultiChart'

const React = require('react')
const { Component, PropTypes } = React
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
    return (
      <div className="App">
        <MultiChart
          chartFn={charts}
          data={datas}
          config={configs}
        />
      </div>
    )
  }
}

export default StripesChart
