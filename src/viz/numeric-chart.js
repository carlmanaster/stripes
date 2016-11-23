const d3 = require('d3')
const { LIGHT_GRAY, RED, GREEN, DEFAULT_COLUMN_WIDTH } = require('../constants')

const numericChart = (g, data, config = {}) => {
  const top   = config.top   || 0
  const left  = config.left  || 0
  const width = config.width || DEFAULT_COLUMN_WIDTH

  const scale = d3.scaleLinear()
    .domain([Math.min(0, d3.min(data)), Math.max(d3.max(data), 0)])
    .range([left, left + width])
  const origin = scale(0)

  g.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .style('height', '1px')
    .style('y',      (d, i) => top + i)
    .style('x',      (d)    => d === null ? left : d > 0 ? origin : scale(d))
    .style('width',  (d)    => d === null ? width : Math.abs(scale(d) - origin))
    .style('fill',   (d)    => d === null ? LIGHT_GRAY : d > 0 ? GREEN : RED)
}

module.exports = {
  numericChart
}
