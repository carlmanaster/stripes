const React = require('react')
const { Component, PropTypes } = React
const d3 = require('d3')
const { curry, uniq } = require('ramda')
const { isNumberArray, isBooleanArray } = require('../model/classifier')
const { numericChart } = require('../viz/numeric-chart')
const { categoricalChart } = require('../viz/categorical-chart')
const { booleanChart } = require('../viz/boolean-chart')
const table = require('../model/table')

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

class StripesChart extends Component {
  displayName: 'StripesChart'

  propTypes: {
    dataTable: PropTypes.array.isRequired,
    columnNames: PropTypes.array.isRequired,
    sortColumn: PropTypes.number
  }

  drawChart(g, realSortColumn) {
    const { dataTable, columnNames, sortColumn } = this.props
    realSortColumn = realSortColumn || sortColumn
    const ordered = table.byColumn(dataTable, realSortColumn)
    const c = curry(table.column)(dataTable, ordered)
    const packets = reduce(c, dataTable, columnNames)
    packets.forEach(({ index, cf, column, config }) => {
      const click = () => {
        this.updateThings(index)
      }
      drawTitle(g, config.name, config.left, click)
      cf(g, column, config)
    })
  }

  componentDidMount() {
    this.doThings()
  }

  componentDidUpdate() {
    this.updateThings()
  }

  setContext() {
    const { dataTable } = this.props
    return d3.select(this.refs.chart).append('svg')
    .attr('id', 'should-be-a-prop')
    .attr('width', table.width(dataTable) * 50)
    .attr('height', table.height(dataTable) + 50)
    .append('g')
    .attr('id', 'root')
  }

  doThings() {
    const g = this.setContext();
    this.drawChart(g)
  }

  updateThings(index) {
    const g = d3.select(this.refs.chart)
    .selectAll('svg')
    .selectAll('#root')
    this.drawChart(g, index);
  }

  render() {
    return (
      <div ref='chart'></div>
    )
  }
}

export default StripesChart
