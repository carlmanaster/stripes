const React = require('react')
const { Component, PropTypes } = React
const d3 = require('d3')
const { curry, uniq, clone } = require('ramda')
const { isNumberArray, isBooleanArray } = require('../model/classifier')
const { numericChart } = require('../viz/numeric-chart')
const { categoricalChart } = require('../viz/categorical-chart')
const { booleanChart } = require('../viz/boolean-chart')
const table = require('../model/table')
const { ofLength, selectRange, sortedBy } = require('../model/selection')
const { ensureG } = require('../viz/utils')

const chartFn = (column) => {
  if (isBooleanArray(column)) return booleanChart
  if (isNumberArray(column)) return numericChart
  return categoricalChart
}

const reduceOne = (c, name, index) => {
  const column = c(index)
  const cf = chartFn(column)
  const config = {name, className: name, top: 20, left: 50 * index}
  if (cf === categoricalChart) {
    config['keys'] = uniq(column).sort()
  }
  return { index, cf, column, config }
}

const reduce = (c, dataTable, columnNames) => {
  var packets = []
  for (var i = 0; i < table.width(dataTable); i++) {
    packets.push(reduceOne(c, columnNames[i], i))
  }
  return packets
}

const drawTitle = (g, name, left, click) => {
  const myG = g.append('g')
   .classed('title', true)
   .attr('transform', () => `translate(${left}, 15)`)
   .on('click', click)

  myG.selectAll('rect')
    .data([0])
    .enter().append('rect')
    .style('x', 0)
    .style('y', -10)
    .style('width', 40)
    .style('height', 10)
    .style('fill-opacity', 0)

  myG.selectAll('text')
    .data([name])
    .enter().append('text')
    .text((d) => d.substr(0, 7))
    .append('svg:title')
    .text((d) => d)
}

let dragStart = undefined

class StripesChart extends Component {
  displayName: 'StripesChart'

  propTypes: {
    dataTable: PropTypes.array.isRequired,
    columnNames: PropTypes.array.isRequired
  }

  setSelection(selection) {
    this.selection = selection
    const g = d3.select(this.refs.chart)
      .selectAll('svg')
      .selectAll('#root')
    this.drawSelection(g)
  }

  drawSelection(g) {
    const top   = 20
    const left  = 0
    const width = 50 * table.width(this.dataTable)

    const myG = ensureG(g, 'selection', left, top)
    const update = myG.selectAll('rect')
      .data(this.selection, (d, i) => i)

    const enter = update.enter()
    enter
      .append('rect')
      .classed('hilite', true)
      .classed('selected', d => d)
      .classed('unselected', d => !d)
      .style('y',      (d, i) => i)
      .style('x',      left)
      .style('width',  width)
      .style('height', 1)
      .on('mousedown', (d, i) => {
        dragStart = i
        this.setSelection(ofLength(table.height(this.dataTable)))
      })
      .on('mouseup', (d, i) => {
        const low = Math.min(dragStart, i)
        const high = Math.max(dragStart, i)
        dragStart = undefined
        this.setSelection(selectRange(ofLength(table.height(this.dataTable)), low, high))
      })

      .on('mousemove', (d, i) => {
        if (dragStart === undefined) return
        const low = Math.min(dragStart, i)
        const high = Math.max(dragStart, i)
        this.setSelection(selectRange(ofLength(table.height(this.dataTable)), low, high))
      })

    update
      .classed('selected', d => d)
      .classed('unselected', d => !d)
      .style('y',      (d, i) => i)
  }

  drawChart(g) {
    const { columnNames } = this.props
    const c = curry(table.column)(this.dataTable, i => i)
    const packets = reduce(c, this.dataTable, columnNames)
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
    this.selection = ofLength(table.height(this.dataTable))
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
    this.drawSelection(g)
    this.drawChart(g)
  }

  updateThings(index) {
    const rank = table.byColumn(this.dataTable, index)
    this.dataTable = table.sortedByColumn(this.dataTable, index)
    this.selection = sortedBy(rank, this.selection)
    const g = d3.select(this.refs.chart)
      .selectAll('svg')
      .selectAll('#root')
    this.drawSelection(g)
    this.drawChart(g)
  }

  render() {
    return (
      <div ref='chart'></div>
    )
  }
}

export default StripesChart
