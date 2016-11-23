const d3 = require('d3')
const { LIGHT_GRAY, RED, GREEN, DEFAULT_COLUMN_WIDTH } = require('../constants')

const aroundZero = (g, data, config = {}) => {
  const top   = config.top   || 0
  const left  = config.left  || 0
  const width = config.width || DEFAULT_COLUMN_WIDTH

  const scale = d3.scaleLinear()
    .domain([d3.min(data), d3.max(data)])
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

const lowPositives = (g, data, config = {}) => {
  const top   = config.top   || 0
  const left  = config.left  || 0
  const width = config.width || DEFAULT_COLUMN_WIDTH

  const scale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([left, left + width])

  g.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .style('height', '1px')
    .style('y',      (d, i) => top + i)
    .style('x',      left)
    .style('width',  (d)    => d === null ? width : scale(d))
    .style('fill',   (d)    => d === null ? LIGHT_GRAY : GREEN)
}

const lowNegatives = (g, data, config = {}) => {
  const top   = config.top   || 0
  const left  = config.left  || 0
  const width = config.width || DEFAULT_COLUMN_WIDTH

  const scale = d3.scaleLinear()
    .domain([d3.min(data), 0])
    .range([left, left + width])
  const origin = scale(0)

  g.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .style('height', '1px')
    .style('y',      (d, i) => top + i)
    .style('x',      (d)    => d === null ? left : scale(d))
    .style('width',  (d)    => d === null ? width : origin - scale(d))
    .style('fill',   (d)    => d === null ? LIGHT_GRAY : RED)
}

const highPositives = (g, data, config = {}) => {
  const top   = config.top   || 0
  const left  = config.left  || 0
  const width = config.width || DEFAULT_COLUMN_WIDTH

  const scale = d3.scaleLinear()
    .domain([d3.min(data), d3.max(data)])
    .range([left + 10, left + width])

  g.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .style('height', '1px')
    .style('y',      (d, i) => top + i)
    .style('x',      (d, i) => i % 4)
    .style('width',  (d, i) => d === null ? width : scale(d) - i % 4)
    .style('fill',   (d)    => d === null ? LIGHT_GRAY : GREEN)
}

const highNegatives = (g, data, config = {}) => {
  const top   = config.top   || 0
  const left  = config.left  || 0
  const width = config.width || DEFAULT_COLUMN_WIDTH

  const scale = d3.scaleLinear()
    .domain([d3.min(data), d3.max(data)])
    .range([left, left + width - 10])
  const origin = scale(d3.max(data))

  g.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .style('height', '1px')
    .style('y',      (d, i) => top + i)
    .style('x',      (d)    => d === null ? left : scale(d))
    .style('width',  (d, i) => d === null ? width : origin - scale(d) + 6 - i % 4)
    .style('fill',   (d)    => d === null ? LIGHT_GRAY : RED)
}

const numericChart = (g, data, config = {}) => {
  const min = d3.min(data)
  const max = d3.max(data)
  if (min < 0 && max > 0 ) return aroundZero(g, data, config)

  if (min >= 0) {
    const nearZero = Math.abs(max) / Math.abs(min) > 2
    if (nearZero) return lowPositives(g, data, config)
    return highPositives(g, data, config)
  } else {
    const nearZero = Math.abs(min) / Math.abs(max) > 2
    if (nearZero) return lowNegatives(g, data, config)
    return highNegatives(g, data, config)
  }

}

module.exports = {
  numericChart
}
