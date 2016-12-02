const { DEFAULT_COLUMN_WIDTH } = require('../constants')

const booleanChart = (g, data, config = {}) => {
  const top   = config.top   || 0
  const left  = config.left  || 0
  const width = config.width || DEFAULT_COLUMN_WIDTH
  const keys  = [false, true]
  const className = config.className
  const barWidth = width / keys.length

  const myG = g.append('g')
   .classed(className, true);
  myG.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .classed('stripe', true)
    .classed('null', (d) => d === null)
    .classed('boolean-true', (d) => d === true)
    .classed('boolean-false', (d) => d === false)
    .style('y',      (d, i) => top + i)
    .style('x',      (d)    => d === null ? left : left + keys.indexOf(d) * barWidth)
    .style('width',  (d)    => d === null ? width : barWidth - 1)
}

module.exports = {
  booleanChart
}
