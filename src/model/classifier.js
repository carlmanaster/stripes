const { all, anyPass } = require('ramda')
const moment = require('moment')
const { DATE_FORMATS } = require ('../constants')

const isNull = (x) => {
  return x === null || x === undefined || x === ''
}

const isNumber = (s) => {
  const f = parseFloat(s)
  return !isNaN(f)
}

const isBoolean = (s) => {
  return !!s && ['true', 'false', '1', '0'].indexOf(s.toLowerCase()) > -1
}

const isDate = (s) => {
  return parseInt(s, 10).toString() !== s && moment(s, DATE_FORMATS).isValid()
}

const isNumberArray = (a) => {
  return all(anyPass([isNull, isNumber]))(a)
}

const isBooleanArray = (a) => {
  return all(anyPass([isNull, isBoolean]))(a)
}

const isDateArray = (a) => {
  return all(anyPass([isNull, isDate]))(a)
}

module.exports = {
  isNumber,
  isBoolean,
  isDate,
  isNumberArray,
  isBooleanArray,
  isDateArray
}
