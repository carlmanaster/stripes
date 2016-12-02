const xStandard        = (scale, origin, left) => (d)    => d === null ? left : d > 0 ? origin : scale(d)
const xPositive        = (scale, origin, left) => (d)    => d === null ? left : d > 0 ? left : scale(d)
const xJaggedLeft      = (scale, origin, left) => (d, i) => d === null ? left : origin + i % 4
const xJaggedRight     = (scale, origin, left) => (d)    => d === null ? left : scale(d)

const widthStandard    = (scale, origin, w)    => (d)    => d === null ? w : Math.abs(scale(d) - origin)
const widthJaggedLeft  = (scale, origin, w)    => (d, i) => d === null ? w : Math.abs(scale(d) - origin - i % 4)
const widthJaggedRight = (scale, origin, w)    => (d, i) => d === null ? w : origin - scale(d) + 6 - i % 4

const domainStandard   = (min, max) => [min, max]
const domainNegative   = (min, max) => [min, 0]

const rangeStandard    = (left, w) => [left, left + w]
const rangeJaggedLeft  = (left, w) => [left + 10, left + w]
const rangeJaggedRight = (left, w) => [left, left + w - 10]

const scaleStandard    = (scale, max) => scale(0)
const scaleJaggedRight = (scale, max) => scale(max)

module.exports = {
  xStandard,
  xPositive,
  xJaggedLeft,
  xJaggedRight,
  widthStandard,
  widthJaggedLeft,
  widthJaggedRight,
  domainStandard,
  domainNegative,
  rangeStandard,
  rangeJaggedLeft,
  rangeJaggedRight,
  scaleStandard,
  scaleJaggedRight
}
