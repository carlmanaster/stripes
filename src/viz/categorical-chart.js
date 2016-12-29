const { DEFAULT_COLUMN_WIDTH } = require('../constants')

const categoricalChart = (g, data, config = {}) => {
  const top       = config.top   || 0
  const left      = config.left  || 0
  const width     = config.width || DEFAULT_COLUMN_WIDTH
  const keys      = config.keys  || []
  const className = config.className
  const increment = width / keys.length
  const barWidth  = Math.max(2, increment)

  const myG = g.append('g')
   .classed(className, true)
   .attr('transform', (d, i) => `translate(${left}, ${top})`)

  myG.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .classed('stripe', true)
    .classed('null',        (d)    => d === null)
    .classed('categorical', (d)    => d !== null)
    .style('y',             (d, i) => i)
    .style('x',             (d)    => d === null ? 0  : keys.indexOf(d) * increment)
    .style('width',         (d)    => d === null ? width : barWidth - 1)
    .append('svg:title')
    .text(                  (d)    => config.name + ': ' + (d === null ? 'null' : d))
}

module.exports = {
  categoricalChart
}
