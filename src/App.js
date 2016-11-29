import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import './viz/stripes.css'

import Chart from './stories/Chart'
const { numericChart } = require('./viz/numeric-chart')
const { categoricalChart } = require('./viz/categorical-chart')
const { booleanChart } = require('./viz/boolean-chart')

const { map, sort } = require('ramda')

const data = [-0.0000230, -0.000356, -0.00176, -0.00540, -0.0127, -0.0250, -0.0432, -0.0677, -0.0977, -0.132, -0.167, -0.200, -0.228, -0.248, -0.257, -0.255, -0.241, -0.216, -0.184, -0.147, -0.108, -0.0697, -0.0338, 0.001, 0.0322, 0.0582, 0.0733, 0.0747, 0.0620, 0.0372, 0.00445, -0.0311, -0.0638, -0.0885, -0.101, -0.100, -0.0850, -0.0583, -0.0239, 0.0131, 0.0475, 0.0744, 0.0901, 0.0929, 0.0828, 0.0616, 0.0327, 0.004]
const positiveData = map(Math.abs, data)
const negativeData = map((d) => -d, positiveData)
const orderedData = sort((a, b) => a - b, data)
const withNulls = [-0.0000230, null, -0.00176, -0.00540, null, -0.0250, -0.0432, -0.0677, -0.0977, null, null, -0.200, -0.228, -0.248, -0.257, -0.255, -0.241, -0.216, null, -0.147, -0.108, -0.0697, -0.0338, 0.001, 0.0322, 0.0582, 0.0733, 0.0747, 0.0620, 0.0372, 0.00445, -0.0311, -0.0638, -0.0885, -0.101, -0.100, -0.0850, -0.0583, -0.0239, 0.0131, null, 0.0744, null, 0.0929, 0.0828, 0.0616, 0.0327, 0.004]
const withZero = [-0.0000230, 0.00, -0.00176, -0.00540, 0.00, -0.0250, -0.0432, -0.0677, -0.0977, 0.00, 0.00, -0.200, -0.228, -0.248, -0.257, -0.255, -0.241, -0.216, 0.00, -0.147, -0.108, -0.0697, -0.0338, 0.001, 0.0322, 0.0582, 0.0733, 0.0747, 0.0620, 0.0372, 0.00445, -0.0311, -0.0638, -0.0885, -0.101, -0.100, -0.0850, -0.0583, -0.0239, 0.0131, 0.00, 0.0744, 0.00, 0.0929, 0.0828, 0.0616, 0.0327, 0.004]
const highValues = map((d) => 100 + d, positiveData)
const highNegativeValues = map((d) => -d, highValues)

const c_data = ['red', 'red', 'green', 'green', 'red', 'green', 'blue', 'red', 'blue', 'yellow', 'red', 'green', 'green', 'red', 'green', 'blue', 'red', 'green', 'yellow', 'red', 'blue', 'yellow', 'yellow', 'yellow', 'red', 'blue', 'red', 'blue', 'red', 'blue']
const c_withNulls = ['red', 'red', null, 'green', 'red', 'green', null, 'red', 'blue', null, 'red', null, 'green', 'red', 'green', null, 'red', 'green', 'yellow', 'red', 'blue', 'yellow', 'yellow', 'yellow', 'red', null, null, null, 'red', 'blue']
const c_orderedData = sort((a, b) => a.localeCompare(b), c_data)
const keys = ['blue', 'green', 'red', 'yellow']

const b_data = [true, true, false, true, false, false, true, false, false, true, false, true, false, true, false, false, true, false, true, false, false, true, true, false, true, false, false]
const b_orderedData = sort((a, b) => a === b ? 0 : a ? 1 : -1, b_data)
const b_withNulls = [true, true, null, true, false, false, null, false, false, null, false, true, false, true, false, null, true, null, true, false, false, true, true, false, true, false, false]

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Example Charts</h2>
        </div>
        <p/>
        <Chart chartFn={numericChart} data={highNegativeValues}/>
        <Chart chartFn={numericChart} data={negativeData}/>
        <Chart chartFn={numericChart} data={positiveData}/>
        <Chart chartFn={numericChart} data={highValues}/>
        <p/>
        <Chart chartFn={numericChart} data={data}/>
        <Chart chartFn={numericChart} data={orderedData}/>
        <Chart chartFn={numericChart} data={withNulls}/>
        <p/>
        <Chart chartFn={booleanChart} data={b_data}/>
        <Chart chartFn={booleanChart} data={b_orderedData}/>
        <Chart chartFn={booleanChart} data={b_withNulls}/>
        <p/>
        <Chart chartFn={categoricalChart} data={c_data} config={{keys}}/>
        <Chart chartFn={categoricalChart} data={c_orderedData} config={{keys}}/>
        <Chart chartFn={categoricalChart} data={c_withNulls} config={{keys}}/>
      </div>
    )
  }
}

export default App
