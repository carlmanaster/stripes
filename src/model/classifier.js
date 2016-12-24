const { all, anyPass } = require('ramda')
const moment = require('moment')
const { DATE_FORMATS } = require ('../constants')

const satisfy                = (fs, a) => all(anyPass(fs))(a)
const isNull                 = (x)     => x === null || x === undefined
const isNumber               = (x)     => typeof(x) === 'number'
const isBoolean              = (x)     => typeof(x) === 'boolean'
const isNumberArray          = (a)     => satisfy([isNull, isNumber], a)
const isBooleanArray         = (a)     => satisfy([isNull, isBoolean], a)
const representsNull         = (s)     => isNull(s) || s === ''
const representsNumber       = (s)     => !isNaN(parseFloat(s))
const representsBoolean      = (s)     => !!s && ['true', 'false', '1', '0'].indexOf(s.toLowerCase()) > -1
const representsDate         = (s)     => parseInt(s, 10).toString() !== s && moment(s, DATE_FORMATS).isValid()
const representsNumberArray  = (a)     => satisfy([representsNull, representsNumber], a)
const representsBooleanArray = (a)     => satisfy([representsNull, representsBoolean], a)
const representsDateArray    = (a)     => satisfy([representsNull, representsDate], a)

module.exports = {
  representsNumber,
  representsBoolean,
  representsDate,
  representsNumberArray,
  representsBooleanArray,
  representsDateArray,
  isNumber,
  isNumberArray,
  isBoolean,
  isBooleanArray
}
