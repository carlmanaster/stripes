const moment = require('moment')

const DEFAULT_COLUMN_WIDTH = 40
const DATE_FORMATS = ['DDMMMMY', 'MMMMDDY', moment.ISO_8601]

module.exports = {
  DATE_FORMATS,
  DEFAULT_COLUMN_WIDTH
}
