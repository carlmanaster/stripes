const converter = require('./converter')
const moment = require('moment')
const { DATE_FORMATS } = require ('../constants')

describe('converter', () => {
  describe('number', () => {
    it('should convert number', () => {
      expect(converter.toNumber('7')).toBe(7)
      expect(converter.toNumber('7.2')).toBe(7.2)
      expect(converter.toNumber('a7')).toBe(null)
      expect(converter.toNumber(null)).toBe(null)
      expect(converter.toNumber(undefined)).toBe(null)
    })
    it('should convert number array', () => {
      expect(converter.toNumberArray(['7', '-5'])).toEqual([7, -5])
      expect(converter.toNumberArray([null, '-5'])).toEqual([null, -5])
    })
  })

  describe('boolean', () => {
    it('should convert boolean', () => {
      expect(converter.toBoolean('true')).toBe(true)
      expect(converter.toBoolean('false')).toBe(false)
      expect(converter.toBoolean('1')).toBe(true)
      expect(converter.toBoolean('0')).toBe(false)
      expect(converter.toBoolean(null)).toBe(null)
      expect(converter.toBoolean(undefined)).toBe(null)
    })
    it('should convert boolean array', () => {
      expect(converter.toBooleanArray(['true', '0'])).toEqual([true, false])
      expect(converter.toBooleanArray([null, 'FALSE'])).toEqual([null, false])
    })
  })

  describe('date', () => {
    it('should convert date', () => {
      expect(converter.toDate('1/1/2010')).toEqual(toDate('1/1/2010'))
      expect(converter.toDate('1')).toBe(null)
      expect(converter.toDate(null)).toBe(null)
      expect(converter.toDate(undefined)).toBe(null)
    })
    it('should convert date array', () => {
      expect(converter.toDateArray(['1/1/2015', '1/1/2010'])).toEqual([toDate('1/1/2015'), toDate('1/1/2010')])
      expect(converter.toDateArray([null, '1/1/2015'])).toEqual([null, toDate('1/1/2015')])
    })
  })

  describe('table', () => {
    it('should convert string table to data', () => {
      const stringTable = [
        [null, 'true', '17', '01/01/2014'],
        ['a', null, '36', null],
        ['b', 'false', null, '01/01/2019']]
      const expected = [
        [null, true, 17, toDate('01/01/2014')],
        ['a', null, 36, null],
        ['b', false, null, toDate('01/01/2019')]]
      expect(converter.toDataTable(stringTable)).toEqual(expected)
    })

  })
})

const toDate = (s) => {
  return moment(s, DATE_FORMATS).toDate()
}
