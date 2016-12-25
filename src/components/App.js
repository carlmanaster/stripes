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
     this.state = {sortColumn: 0};
     this.foo = this.foo.bind(this);
   }

  foo() {
    this.setState({sortColumn: this.state.sortColumn + 1})
  }

  render() {
    return (
      <div className="App">
        <a onClick={this.foo}>Foo</a>
        <StripesChart
          dataTable={dataTable}
          columnNames={names}
          sortColumn={this.state.sortColumn}
        />
      </div>
    )
  }
}

export default App
