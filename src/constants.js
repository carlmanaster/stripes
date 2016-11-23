const moment = require('moment')

const DEFAULT_COLUMN_WIDTH = 40
const DATE_FORMATS = ['DDMMMMY', 'MMMMDDY', moment.ISO_8601]
const LIGHT_GRAY = '#d8d8d8'
const RED = '#ff7f7f'
const GREEN = '#59ce4e'
const BLUE = '#4e83d8'

module.exports = {
  DATE_FORMATS,
  DEFAULT_COLUMN_WIDTH,
  LIGHT_GRAY,
  RED,
  GREEN,
  BLUE
}
