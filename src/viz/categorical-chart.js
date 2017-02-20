const { DEFAULT_COLUMN_WIDTH } = require('../constants')
const { ensureG, isNull, notNull, Y } = require('./utils')

const categoricalChart = (g, data, config = {}) => {
  const top       = config.top   || 0
  const left      = config.left  || 0
  const width     = config.width || DEFAULT_COLUMN_WIDTH
  const keys      = config.keys  || []
  const className = config.className
  const increment = width / keys.length
  const barWidth  = Math.max(2, increment)

  const X = d => d === null ? 0 : keys.indexOf(d) * increment
  const W = d => d === null ? width : barWidth - 1
  const L = d => config.name + ': ' + (d === null ? 'null' : d)

  const formatElements = elements => {
    elements
      .classed('stripe', true)
      .classed('null', isNull)
      .classed('categorical', notNull)
      .style('y', Y)
      .style('x', X)
      .style('width', W)
      .append('svg:title')
      .text(L)
  }

  const myG = ensureG(g, className, left, top)

  myG.selectAll('title').remove()

  const update = myG.selectAll('rect')
    .data(data, (d, i) => i)
  const enter = update.enter().append('rect')

  formatElements(enter)
  formatElements(update)
}

module.exports = {
  categoricalChart
}
