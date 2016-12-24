import React, { Component } from 'react'
import StripesChart from './StripesChart'

import './App.css'
import '../viz/stripes.css'

const converter = require('../model/converter')
const data = require('../fin105.js')()

const rows = data.split('\n')
const names = rows[0].split(',')
const values = rows.slice(1).map(b => b.split(','))
const dataTable = converter.toDataTable(values)

class App extends Component {
  render() {
    return (
      <div className="App">
        <StripesChart
          dataTable={dataTable}
          columnNames={names}
          sortColumn={0}
        />
      </div>
    )
  }
}

export default App
