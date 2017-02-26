const d3 = require('d3')
const { DEFAULT_COLUMN_WIDTH } = require('../constants')
const { niceNumber } = require('nice-number')
const { ensureG, isNull, Y } = require('./utils')

const xStandard         = (scale, origin) => (d)    => d === null ? 0 : d > 0 ? origin : scale(d)
const xPositive         = (scale, origin) => (d)    => d === null ? 0 : d > 0 ? 0 : scale(d)
const xJaggedLeft       = (scale, origin) => (d, i) => d === null ? 0 : i % 4

const widthStandard     = (scale, origin, w) => (d)    => d === null ? w : Math.abs(scale(d) - origin)
const widthJagged       = (scale, origin, w) => (d, i) => d === null ? w : Math.abs(scale(d) - origin) + 6 - i % 4

const domainStandard    = (min, max) => [min, max]
const domainNegative    = (min, max) => [min, 0]

const rangeStandard     = (left, w) => [left, left + w]
const rangeJaggedLeft   = (left, w) => [left + 10, left + w]
const rangeJaggedRight  = (left, w) => [left, left + w - 10]

const originStandard    = (scale, min, max) => scale(0)
const originJaggedLeft  = (scale, min, max) => scale(min)
const originJaggedRight = (scale, min, max) => scale(max)

const aroundZero = {
  xFn:      xStandard,
  widthFn:  widthStandard,
  domainFn: domainStandard,
  rangeFn:  rangeStandard,
  originFn: originStandard
}

const positive = {
  xFn:      xPositive,
  widthFn:  widthStandard,
  domainFn: domainStandard,
  rangeFn:  rangeStandard,
  originFn: originStandard
}

const negative = {
  xFn:      xStandard,
  widthFn:  widthStandard,
  domainFn: domainNegative,
  rangeFn:  rangeStandard,
  originFn: originStandard
}

const jaggedLeft = {
  xFn:      xJaggedLeft,
  widthFn:  widthJagged,
  domainFn: domainStandard,
  rangeFn:  rangeJaggedLeft,
  originFn: originJaggedLeft
}

const jaggedRight = {
  xFn:      xStandard,
  widthFn:  widthJagged,
  domainFn: domainStandard,
  rangeFn:  rangeJaggedRight,
  originFn: originJaggedRight
}

const chart = (functions, config, g, data, mouseUp, mouseDown, mouseMove) => {
  const { xFn, widthFn, domainFn, rangeFn, originFn } = functions
  const { w, left, min, max, className } = config
  const scale = d3.scaleLinear()
    .domain(domainFn(min, max))
    .range(rangeFn(left, w))
  const origin = originFn(scale, min, max)
  const top  = config.top || 0

  const L = d => config.name + ': ' + niceNumber(d)
  const P = d => d > 0
  const N = d => d < 0

  const formatElements = elements => {
    elements
      .classed('stripe', true)
      .classed('null', isNull)
      .classed('numeric-positive', P)
      .classed('numeric-negative', N)
      .style('y', Y)
      .style('x', xFn(scale, origin))
      .style('width', widthFn(scale, origin, w))
      .on('mousedown', mouseDown)
      .on('mouseup', mouseUp)
      .on('mousemove', mouseMove)
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

const pickFunctions = (min, max) => {
  if (min < 0 && max > 0 )       return aroundZero
  if (min >= 0 && max / min > 4) return positive
  if (min >= 0)                  return jaggedLeft
  if (min / max > 4)             return negative
  else                           return jaggedRight
}

const numericChart = (g, data, config = {}, mouseUp, mouseDown, mouseMove) => {
  const min = d3.min(data)
  const max = d3.max(data)
  const functions = pickFunctions(min, max)
  config.left = config.left  || 0
  config.w    = config.width || DEFAULT_COLUMN_WIDTH
  config.min  = min
  config.max  = max
  return chart(functions, config, g, data, mouseUp, mouseDown, mouseMove)
}

module.exports = {
  numericChart
}
