const { DEFAULT_COLUMN_WIDTH } = require('../constants')
const { ensureG, isNull, Y } = require('./utils')

const booleanChart = (g, data, config = {}) => {
  const top   = config.top   || 0
  const left  = config.left  || 0
  const width = config.width || DEFAULT_COLUMN_WIDTH
  const keys  = [false, true]
  const className = config.className
  const barWidth = width / keys.length

  const X = d => d === null ? 0 : keys.indexOf(d) * barWidth
  const W = d => d === null ? width : barWidth - 1
  const T = d => d === true
  const F = d => d === false

  const formatElements = elements => {
    elements
      .classed('stripe', true)
      .classed('null', isNull)
      .classed('boolean-true', T)
      .classed('boolean-false', F)
      .style('y', Y)
      .style('x', X)
      .style('width', W)
  }

  const myG = ensureG(g, className, left, top)

  const update = myG.selectAll('rect')
    .data(data, (d, i) => i)
  const enter = update.enter().append('rect')

  formatElements(enter)
  formatElements(update)
}

module.exports = {
  booleanChart
}
