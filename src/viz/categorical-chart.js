const { DEFAULT_COLUMN_WIDTH } = require('../constants')

const categoricalChart = (g, data, config = {}) => {
  const top       = config.top   || 0
  const left      = config.left  || 0
  const width     = config.width || DEFAULT_COLUMN_WIDTH
  const keys      = config.keys  || []
  const className = config.className
  const barWidth  = Math.max(2, width / keys.length)
  const increment = width / keys.length

  const myG = g.append('g')
   .classed(className, true);
  myG.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .classed('stripe', true)
    .classed('null',        (d)    => d === null)
    .classed('categorical', (d)    => d !== null)
    .style('y',             (d, i) => top + i)
    .style('x',             (d)    => d === null ? left  : left + keys.indexOf(d) * increment)
    .style('width',         (d)    => d === null ? width : barWidth - 1)
}

module.exports = {
  categoricalChart
}
