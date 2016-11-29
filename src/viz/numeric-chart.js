const d3 = require('d3')
const { LIGHT_GRAY, RED, GREEN, DEFAULT_COLUMN_WIDTH } = require('../constants')

const xStandard        = (scale, origin, left) => (d)    => d === null ? left : d > 0 ? origin : scale(d)
const xJaggedLeft      = (scale, origin, left) => (d, i) => d === null ? left : i % 4
const xJaggedRight     = (scale, origin, left) => (d)    => d === null ? left : scale(d)

const widthStandard    = (scale, origin, w)    => (d)    => d === null ? w : Math.abs(scale(d) - origin)
const widthJaggedLeft  = (scale, origin, w)    => (d, i) => d === null ? w : scale(d) - i % 4
const widthJaggedRight = (scale, origin, w)    => (d, i) => d === null ? w : origin - scale(d) + 6 - i % 4

const domainStandard   = (min, max) => [min, max]
const domainPositive   = (min, max) => [0, max]
const domainNegative   = (min, max) => [min, 0]

const rangeStandard    = (left, w) => [left, left + w]
const rangeJaggedLeft  = (left, w) => [left + 10, left + w]
const rangeJaggedRight = (left, w) => [left, left + w - 10]

const scaleStandard    = (scale, max) => scale(0)
const scaleJaggedRight = (scale, max) => scale(max)

const aroundZero = {
  xFn:      xStandard,
  widthFn:  widthStandard,
  domainFn: domainStandard,
  rangeFn:  rangeStandard,
  scaleFn:  scaleStandard
}

const jaggedLeft = {
  xFn:      xJaggedLeft,
  widthFn:  widthJaggedLeft,
  domainFn: domainStandard,
  rangeFn:  rangeJaggedLeft,
  scaleFn:  scaleStandard
}

const negative = {
  xFn:      xStandard,
  widthFn:  widthStandard,
  domainFn: domainNegative,
  rangeFn:  rangeStandard,
  scaleFn:  scaleStandard
}

const jaggedRight = {
  xFn:      xJaggedRight,
  widthFn:  widthJaggedRight,
  domainFn: domainStandard,
  rangeFn:  rangeJaggedRight,
  scaleFn:  scaleJaggedRight
}

const chart = (functions, config, g, data) => {
  const { xFn, widthFn, domainFn, rangeFn, scaleFn } = functions
  const { w, left, min, max, className } = config
  const scale = d3.scaleLinear()
    .domain(domainFn(min, max))
    .range(rangeFn(left, w))
  const origin = scaleFn(scale, max)
  const top  = config.top || 0
  const myG = g.append('g')
   .classed(className, true);
  myG.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .classed('stripe', true)
    .classed('null', (d) => d === null)
    .classed('numeric-positive', (d) => d > 0)
    .classed('numeric-negative', (d) => d < 0)
    .style('y',      (d, i) => top + i)
    .style('x',      xFn(scale, origin, left))
    .style('width',  widthFn(scale, origin, w))
}

const pickFunctions = (min, max) => {
  if (min < 0 && max > 0 )       return aroundZero
  if (min >= 0 && max / min > 2) return aroundZero
  if (min >= 0)                  return jaggedLeft
  if (min / max > 2)             return negative
  else                           return jaggedRight
}

const numericChart = (g, data, config = {}) => {
  const min = d3.min(data)
  const max = d3.max(data)
  const functions = pickFunctions(min, max)
  config.left = config.left  || 0
  config.w    = config.width || DEFAULT_COLUMN_WIDTH
  config.min  = min
  config.max  = max
  return chart(functions, config, g, data)
}

module.exports = {
  numericChart
}
