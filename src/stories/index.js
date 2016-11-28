const React = require('react')
const { map, sort } = require('ramda')
const { storiesOf, action, linkTo } = require('@kadira/storybook')

const { numericChart } = require('../viz/numeric-chart')
const { categoricalChart } = require('../viz/categorical-chart')
const { booleanChart } = require('../viz/boolean-chart')

import Chart from './Chart'
import MultiChart from './MultiChart'

const numericStories = () => {
  const data = [-0.0000230, -0.000356, -0.00176, -0.00540, -0.0127, -0.0250, -0.0432, -0.0677, -0.0977, -0.132, -0.167, -0.200, -0.228, -0.248, -0.257, -0.255, -0.241, -0.216, -0.184, -0.147, -0.108, -0.0697, -0.0338, 0.001, 0.0322, 0.0582, 0.0733, 0.0747, 0.0620, 0.0372, 0.00445, -0.0311, -0.0638, -0.0885, -0.101, -0.100, -0.0850, -0.0583, -0.0239, 0.0131, 0.0475, 0.0744, 0.0901, 0.0929, 0.0828, 0.0616, 0.0327, 0.004]
  const positiveData = map(Math.abs, data)
  const negativeData = map((d) => -d, positiveData)
  const orderedData = sort((a, b) => a - b, data)
  const withNulls = [-0.0000230, null, -0.00176, -0.00540, null, -0.0250, -0.0432, -0.0677, -0.0977, null, null, -0.200, -0.228, -0.248, -0.257, -0.255, -0.241, -0.216, null, -0.147, -0.108, -0.0697, -0.0338, 0.001, 0.0322, 0.0582, 0.0733, 0.0747, 0.0620, 0.0372, 0.00445, -0.0311, -0.0638, -0.0885, -0.101, -0.100, -0.0850, -0.0583, -0.0239, 0.0131, null, 0.0744, null, 0.0929, 0.0828, 0.0616, 0.0327, 0.004]
  const withZero = [-0.0000230, 0.00, -0.00176, -0.00540, 0.00, -0.0250, -0.0432, -0.0677, -0.0977, 0.00, 0.00, -0.200, -0.228, -0.248, -0.257, -0.255, -0.241, -0.216, 0.00, -0.147, -0.108, -0.0697, -0.0338, 0.001, 0.0322, 0.0582, 0.0733, 0.0747, 0.0620, 0.0372, 0.00445, -0.0311, -0.0638, -0.0885, -0.101, -0.100, -0.0850, -0.0583, -0.0239, 0.0131, 0.00, 0.0744, 0.00, 0.0929, 0.0828, 0.0616, 0.0327, 0.004]
  const highValues = map((d) => 100 + d, positiveData)
  const highNegativeValues = map((d) => -d, highValues)

  storiesOf('Numeric Chart', module)
  .add('with low positive values', () => (
    <Chart chartFn={numericChart} data={positiveData}/>
  ))
  .add('with high positive values', () => (
    <Chart chartFn={numericChart} data={highValues}/>
  ))
  .add('with low negative values', () => (
    <Chart chartFn={numericChart} data={negativeData}/>
  ))
  .add('with high negative values', () => (
    <Chart chartFn={numericChart} data={highNegativeValues}/>
  ))
  .add('with some negative values', () => (
    <Chart chartFn={numericChart} data={data}/>
  ))
  .add('sorted', () => (
    <Chart chartFn={numericChart} data={orderedData}/>
  ))
  .add('with x-y offset', () => (
    <Chart chartFn={numericChart} data={orderedData} config={{top: 20, left: 60}}/>
  ))
  .add('with different width', () => (
    <Chart chartFn={numericChart} data={orderedData} config={{width: 60}}/>
  ))
  .add('with nulls', () => (
    <Chart chartFn={numericChart} data={withNulls}/>
  ))
  .add('with zero', () => (
    <Chart chartFn={numericChart} data={withZero}/>
  ))
}

const categoricalStories = () => {
  const data = ['red', 'red', 'green', 'green', 'red', 'green', 'blue', 'red', 'blue', 'yellow', 'red', 'green', 'green', 'red', 'green', 'blue', 'red', 'green', 'yellow', 'red', 'blue', 'yellow', 'yellow', 'yellow', 'red', 'blue', 'red', 'blue', 'red', 'blue']
  const withNulls = ['red', 'red', null, 'green', 'red', 'green', null, 'red', 'blue', null, 'red', null, 'green', 'red', 'green', null, 'red', 'green', 'yellow', 'red', 'blue', 'yellow', 'yellow', 'yellow', 'red', null, null, null, 'red', 'blue']
  const orderedData = sort((a, b) => a.localeCompare(b), data)
  const keys = ['blue', 'green', 'red', 'yellow']
  storiesOf('Categorical Chart', module)
  .add('unordered', () => (
    <Chart chartFn={categoricalChart} data={data} config={{keys}}/>
  ))
  .add('ordered', () => (
    <Chart chartFn={categoricalChart} data={orderedData} config={{keys}}/>
  ))
  .add('with nulls', () => (
    <Chart chartFn={categoricalChart} data={withNulls} config={{keys}}/>
  ))
}

const booleanStories = () => {
  const data = [true, true, false, true, false, false, true, false, false, true, false, true, false, true, false, false, true, false, true, false, false, true, true, false, true, false, false]
  const orderedData = sort((a, b) => a === b ? 0 : a ? 1 : -1, data)
  const withNulls = [true, true, null, true, false, false, null, false, false, null, false, true, false, true, false, null, true, null, true, false, false, true, true, false, true, false, false]
  storiesOf('Boolean Chart', module)
  .add('unordered', () => (
    <Chart chartFn={booleanChart} data={data}/>
  ))
  .add('ordered', () => (
    <Chart chartFn={booleanChart} data={orderedData}/>
  ))
  .add('with nulls', () => (
    <Chart chartFn={booleanChart} data={withNulls}/>
  ))
}

const multichartStories = () => {
  const numericData = [-0.0000230, -0.000356, -0.00176, -0.00540, -0.0127, -0.0250, -0.0432, -0.0677, -0.0977, -0.132, -0.167, -0.200, -0.228, -0.248, -0.257, -0.255, -0.241, -0.216, -0.184, -0.147, -0.108, -0.0697, -0.0338, 0.001, 0.0322, 0.0582, 0.0733, 0.0747, 0.0620, 0.0372, 0.00445, -0.0311, -0.0638, -0.0885, -0.101, -0.100, -0.0850, -0.0583, -0.0239, 0.0131, 0.0475, 0.0744, 0.0901, 0.0929, 0.0828, 0.0616, 0.0327, 0.004]
  const categoricalData = ['red', 'red', 'green', 'green', 'red', 'green', 'blue', 'red', 'blue', 'yellow', 'red', 'green', 'green', 'red', 'green', 'blue', 'red', 'green', 'yellow', 'red', 'blue', 'yellow', 'yellow', 'yellow', 'red', 'blue', 'red', 'blue', 'red', 'blue', 'red', 'red', 'green', 'green', 'red', 'green', 'blue', 'red', 'blue', 'yellow', 'red', 'green', 'green', 'red', 'green', 'blue', 'red', 'green', 'yellow', 'red', 'blue', 'yellow']
  const booleanData = [true, true, false, true, false, false, true, false, false, true, false, true, false, true, false, false, true, false, true, false, false, true, true, false, true, false, false, true, false, false, true, false, true, false, true, false, false, true, false, true, false, false, true, true, false, true, false, false]
  const keys = ['blue', 'green', 'red', 'yellow']
  storiesOf('Multiple Charts', module)
  .add('with multiple charts', () => (
    <MultiChart
      chartFn={[numericChart, booleanChart, categoricalChart]}
      data={[numericData, booleanData, categoricalData]}
      config={[{className: 'c1', top: 20}, {className: 'c2', top: 20, left: 40}, {className: 'c3', top: 20, left: 80, keys}]}
    />
  ))
}

const dateStories = () => {
  storiesOf('Date Chart', module)
    .add('date chart', () => (
      <div>Coming Soon!</div>
    ))
}

numericStories()
categoricalStories()
booleanStories()
dateStories()
multichartStories()
