import React, { Component } from 'react'
import './App.css'
import '../viz/stripes.css'

const { uniq } = require('ramda')

const classifier = require('../model/classifier')
const converter = require('../model/converter')
const table = require('../model/table')
// const data = require('../example-data.js')()
// const data = require('../fin105.js')()
const data = require('../fin105-part.js')()
const rows = data.split('\n')
const values = rows.slice(0).map(b => b.split(',')).map(b => b.slice(0, -1))
const dataTable = converter.toDataTable(values)
const { curry } = require('ramda')

import MultiChart from '../stories/MultiChart'
const { numericChart } = require('../viz/numeric-chart')
const { categoricalChart } = require('../viz/categorical-chart')
const { booleanChart } = require('../viz/boolean-chart')
const { rank } = require('../model/sorter')

const chartFn = (column) => {
  if (classifier.isBooleanArray(column)) return booleanChart
  if (classifier.isNumberArray(column)) return numericChart
  return categoricalChart
}

const dataFn = (column) => {
  if (classifier.isBooleanArray(column)) return converter.toBooleanArray(column)
  if (classifier.isNumberArray(column)) return converter.toNumberArray(column)
  return column
}

class App extends Component {
  render() {
    let dataData = dataTable.slice(1)
    // const height = table.height(dataData)
    // const ordered = (i) => height - i

    const a = rank(table.column(dataData, (i) => i, 10))
    const ordered = (i) => a[i]

    const c = curry(table.column)(dataData, ordered)

    var charts = []
    var datas = []
    var configs = []
    for (var i = 0; i < table.width(dataData); i++) {
      const column = c(i)
      const name = table.row(dataTable, (i) => i, 0)[i]
      // const column = c(i).slice(1)
      // const name = c(i)[0]
      const cf = chartFn(column)
      const config = {className: name, top: 20, left: 50 * i}
      if (cf === categoricalChart) {
        config['keys'] = uniq(column).sort()
      }
      charts.push(cf)
      datas.push(dataFn(column))
      configs.push(config)
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2>App</h2>
        </div>
        <p/>
        <MultiChart
          chartFn={charts}
          data={datas}
          config={configs}
        />
      </div>
    )
  }
}

export default App
