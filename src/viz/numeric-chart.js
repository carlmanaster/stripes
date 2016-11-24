const d3 = require('d3')
const { LIGHT_GRAY, RED, GREEN, DEFAULT_COLUMN_WIDTH } = require('../constants')

const height = 1
const fill   =          (d)    => d === null ? LIGHT_GRAY : d > 0 ? GREEN : RED
const y      = (top) => (d, i) => top + i

const chart = (g, data, config, fns) => {
  const { x, width } = fns
  const top  = config.top || 0
  g.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .style('height', height)
    .style('y',      y(top))
    .style('x',      x)
    .style('width',  width)
    .style('fill',   fill)
}

const x                = (scale, origin, left) => (d)    => d === null ? left : d > 0 ? origin : scale(d)
const xJaggedLeft      =                          (d, i) => d === null ? left : i % 4
const xJaggedRight     = (scale, left)         => (d)    => d === null ? left : scale(d)
const width            = (scale, origin, w)    => (d)    => d === null ? w : Math.abs(scale(d) - origin)
const widthJaggedLeft  = (scale, w)            => (d, i) => d === null ? w : scale(d) - i % 4
const widthJaggedRight = (scale, origin, w)    => (d, i) => d === null ? w : origin - scale(d) + 6 - i % 4

const makeScale = (domain, range) => {
  const scale = d3.scaleLinear()
    .domain(domain)
    .range(range)
  const origin = scale(0)
  return { scale, origin }
}

const aroundZero = (g, data, config) => {
  const { w, left, min, max } = config
  const { scale, origin } = makeScale([min, max], [left, left + w])
  const fns = {
    x: x(scale, origin, left),
    width: width(scale, origin, w)
  }
  chart(g, data, config, fns)
}

const lowPositives = (g, data, config) => {
  const { w, left, min, max } = config
  const { scale, origin } = makeScale([0, max], [left, left + w])
  const fns = {
    x: x(scale, origin, left),
    width: width(scale, origin, w)
  }
  chart(g, data, config, fns)
}

const lowNegatives = (g, data, config) => {
  const { w, left, min, max } = config
  const { scale, origin } = makeScale([min, 0], [left, left + w])
  const fns = {
    x: x(scale, origin, left),
    width: width(scale, origin, w)
  }
  chart(g, data, config, fns)
}

const highPositives = (g, data, config) => {
  const { w, left, min, max } = config
  const { scale, origin } = makeScale([min, max], [left + 10, left + w])
  const fns = {
    x: xJaggedLeft,
    width: widthJaggedLeft(scale, w)
  }
  chart(g, data, config, fns)
}

const highNegatives = (g, data, config) => {
  const { w, left, min, max } = config
  const { scale } = makeScale([min, max], [left, left + w - 10])
  const origin = scale(max)
  const fns = {
    x: xJaggedRight(scale, left),
    width: widthJaggedRight(scale, origin, w)
  }
  chart(g, data, config, fns)
}

const numericChart = (g, data, config = {}) => {
  const min = d3.min(data)
  const max = d3.max(data)
  config.left = config.left  || 0
  config.w    = config.width || DEFAULT_COLUMN_WIDTH
  config.min  = min
  config.max  = max
  if (min < 0 && max > 0 )       return aroundZero(g, data, config)
  if (min >= 0 && max / min > 2) return lowPositives(g, data, config)
  if (min >= 0)                  return highPositives(g, data, config)
  if (min / max > 2)             return lowNegatives(g, data, config)
  return highNegatives(g, data, config)
}

module.exports = {
  numericChart
}
