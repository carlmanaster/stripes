import React, { Component } from 'react'
import './App.css'
import '../viz/stripes.css'

const { uniq } = require('ramda')

const converter = require('../model/converter')
const { isNumberArray, isBooleanArray } = require('../model/classifier')
const table = require('../model/table')
// const data = require('../example-data.js')()
const data = require('../fin105.js')()
// const data = require('../fin105-part.js')()
// const data = require('../fin105-tiny.js')()
const rows = data.split('\n')
const values = rows.slice(1).map(b => b.split(','))

const dataTable = converter.toDataTable(values)
const { curry } = require('ramda')

import MultiChart from '../stories/MultiChart'
const { numericChart } = require('../viz/numeric-chart')
const { categoricalChart } = require('../viz/categorical-chart')
const { booleanChart } = require('../viz/boolean-chart')

const chartFn = (column) => {
  if (isBooleanArray(column)) return booleanChart
  if (isNumberArray(column)) return numericChart
  return categoricalChart
}

class App extends Component {
  render() {
    let dataData = dataTable.slice(1)
    // const height = table.height(dataData)
    // const ordered = (i) => height - i

    const ordered = table.byColumn(dataData, 3)

    const c = curry(table.column)(dataData, ordered)

    var charts = []
    var datas = []
    var configs = []
    for (var i = 0; i < table.width(dataData); i++) {
      const column = c(i)
      const name = table.row(dataTable, i => i, 0)[i]
      // const name = c(i)[0]
      const cf = chartFn(column)
      const config = {className: name, top: 20, left: 50 * i}
      if (cf === categoricalChart) {
        config['keys'] = uniq(column).sort()
      }
      charts.push(cf)
      datas.push(column)
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
