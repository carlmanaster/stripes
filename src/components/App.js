import React, { Component } from 'react'
import StripesChart from './StripesChart'

import './App.css'
import '../viz/stripes.css'

const d3 = require('d3')
const FileInput = require('react-file-input')
const converter = require('../model/converter')

const parse = data => {
  if (!data) return

  const rows = data.split(/\r?\n/)
  if (!rows[rows.length - 1]) rows.splice(rows.length - 1)

  const names = rows[0].split(',')
  const values = rows.slice(1).map(b => b.split(','))
  const dataTable = converter.toDataTable(values)
  return { dataTable, names }
}

let app

class App extends Component {

  constructor(props) {
     super(props);
     this.state = {};
     app = this
  }

  handleChange(event) {
    const file = event.target.files[0]
    if (!file) return

    const cb = data => app.setState({data})
    const reader = new FileReader()
    reader.onloadend = (evt) => d3.text(evt.target.result, cb)
    reader.readAsDataURL(file)
  }

  render() {
    if (!app.state.data) {
      return (
        <div className='App'>
          <form>
            <FileInput
              name='pickFile'
              accept='.csv'
              placeholder='Pick a CSV file'
              className='file-picker'
              onChange={this.handleChange}
            />
          </form>
        </div>
      )
    }

    const { dataTable, names, selection } = parse(app.state.data)
    return (
      <div className='App'>
        <StripesChart
          dataTable={dataTable}
          columnNames={names}
          selection={selection}
        />
      </div>
    )
  }
}

export default App
