const d3 = require('d3')
const { BLUE, LIGHT_GRAY, DEFAULT_COLUMN_WIDTH } = require('../constants')

const ordinalChart = (g, data, config = {}) => {
  const top   = config.top   || 0
  const left  = config.left  || 0
  const width = config.width || DEFAULT_COLUMN_WIDTH
  const keys  = config.keys  || []

  const scale = d3.scaleLinear()
    .domain(0, keys.length)
    .range([left, left + width])
  const origin = scale(0)
  const barWidth = width / keys.length

  g.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .style('height', '1px')
    .style('y',      (d, i) => top + i)
    .style('x',      (d)    => d === null ? left : keys.indexOf(d) * barWidth)
    .style('width',  (d)    => d === null ? width : barWidth - 1)
    .style('fill',   (d)    => d === null ? LIGHT_GRAY : BLUE)
}

module.exports = {
  ordinalChart
}
