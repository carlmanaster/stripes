const { map, clone } = require('ramda')
const moment = require('moment')
const classifier = require('./classifier')
const table = require('./table')
const { DATE_FORMATS } = require ('../constants')

const toNumber = s => {
  const f = parseFloat(s)
  return isNaN(f) ? null : f
}

const toBoolean = s => {
  if (!s) return null
  switch (s.toLowerCase()) {
    case 'true':
    case '1':
      return true
    case 'false':
    case '0':
      return false
    default:
      return null
  }
}

const toDate = s => {
  if (!s) return null
  if (parseInt(s, 10).toString() === s) return null
  const m = moment(s, DATE_FORMATS)
  return m.isValid() ? m.toDate() : null
}

const toNumberArray = a => map(toNumber, a)

const toBooleanArray = a => map(toBoolean, a)

const toDateArray = a => map(toDate, a)

const toDataTable = t => {
  const o = n => n
  let result = clone(t)
  for (let i = 0; i < table.width(t); i++) {
    const c = table.column(t, o, i)
    if (classifier.representsBooleanArray(c)) {
      result = table.substituteColumn(result, i, toBooleanArray(c))
    } else if (classifier.representsDateArray(c)) {
      result = table.substituteColumn(result, i, toDateArray(c))
    } else if (classifier.representsNumberArray(c)) {
      result = table.substituteColumn(result, i, toNumberArray(c))
    }
  }
  return result
}

module.exports = {
  toNumber,
  toBoolean,
  toDate,
  toNumberArray,
  toBooleanArray,
  toDateArray,
  toDataTable
}
