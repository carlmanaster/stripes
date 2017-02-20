const React = require('react')
const { Component, PropTypes } = React
const d3 = require('d3')
const { curry, clone } = require('ramda')
const table = require('../model/table')
const { ofLength, selectRange, sortedBy } = require('../model/selection')

const { reduce } = require('../utils/stripes-chart-helper')
const { drawTitle } = require('../viz/title')
const { drawSelection } = require('../viz/selection')

let dragStart = undefined

const dragBoundaries = i => {
  const low = Math.min(dragStart, i)
  const high = Math.max(dragStart, i)
  return { low, high }
}

class StripesChart extends Component {
  displayName: 'StripesChart'

  propTypes: {
    dataTable: PropTypes.array.isRequired,
    columnNames: PropTypes.array.isRequired
  }

  emptySelection() {
    return ofLength(table.height(this.dataTable))
  }

  setSelection(selection) {
    this.selection = selection
    const g = d3.select(this.refs.chart)
      .selectAll('svg')
      .selectAll('#root')
    this.drawMySelection(g)
  }

  drawMySelection(g) {
    const width = 50 * table.width(this.dataTable)
    const selection = this.selection
    const mouseDown = (d, i) => {
      dragStart = i
      this.setSelection(this.emptySelection())
    }
    const mouseUp = (d, i) => {
      const { low, high } = dragBoundaries(i)
      dragStart = undefined
      this.setSelection(selectRange(this.emptySelection(), low, high))
    }
    const mouseMove = (d, i) => {
      if (dragStart === undefined) return
      const { low, high } = dragBoundaries(i)
      this.setSelection(selectRange(this.emptySelection(), low, high))
    }

    drawSelection(g, selection, width, mouseUp, mouseDown, mouseMove)
  }

  drawChart(g) {
    const { columnNames } = this.props
    const c = curry(table.column)(this.dataTable, i => i)
    const packets = reduce(c, columnNames)
    packets.forEach(({ index, cf, column, config }) => {
      const click = () => {
        this.updateThings(index)
      }
      drawTitle(g, config.name, config.left, click)
      cf(g, column, config)
    })
  }

  componentDidMount() {
    this.dataTable = clone(this.props.dataTable)
    this.selection = this.emptySelection()
    this.doThings()
  }

  componentDidUpdate() {
    this.updateThings()
  }

  setContext() {
    return d3.select(this.refs.chart).append('svg')
    .attr('id', 'should-be-a-prop')
    .attr('width', table.width(this.dataTable) * 50)
    .attr('height', table.height(this.dataTable) + 50)
    .append('g')
    .attr('id', 'root')
  }

  doThings() {
    const g = this.setContext()
    this.drawMySelection(g)
    this.drawChart(g)
  }

  updateThings(index) {
    const rank = table.byColumn(this.dataTable, index)
    this.dataTable = table.sortedByColumn(this.dataTable, index)
    this.selection = sortedBy(rank, this.selection)
    const g = d3.select(this.refs.chart)
      .selectAll('svg')
      .selectAll('#root')
    this.drawMySelection(g)
    this.drawChart(g)
  }

  render() {
    return (
      <div ref='chart'></div>
    )
  }
}

export default StripesChart
