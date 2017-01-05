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
  constructor(props) {
     super(props);
     this.state = {};
   }

  render() {
    return (
      <div className="App">
        <StripesChart
          dataTable={dataTable}
          columnNames={names}
        />
      </div>
    )
  }
}

export default App
