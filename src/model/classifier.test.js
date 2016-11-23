const { isNumber, isNumberArray,
        isBoolean, isBooleanArray,
        isDate, isDateArray } = require('./classifier')

describe('classifier', () => {
  describe('number', () => {
    it('should classify number', () => {
      expect(isNumber('7')).toBe(true)
      expect(isNumber('7.2')).toBe(true)
      expect(isNumber('a7')).toBe(false)
      expect(isNumber(null)).toBe(false)
      expect(isNumber(undefined)).toBe(false)
    })
    it('should classify number array', () => {
      expect(isNumberArray(['7', '-5'])).toBe(true)
      expect(isNumberArray([null, '-5'])).toBe(true)
      expect(isNumberArray(['7', 'a'])).toBe(false)
    })
  })

  describe('boolean', () => {
    it('should classify boolean', () => {
      expect(isBoolean('true')).toBe(true)
      expect(isBoolean('false')).toBe(true)
      expect(isBoolean('0')).toBe(true)
      expect(isBoolean('1')).toBe(true)
      expect(isBoolean('2')).toBe(false)
      expect(isBoolean('a')).toBe(false)
      expect(isBoolean(null)).toBe(false)
      expect(isBoolean(undefined)).toBe(false)
    })
    it('should classify boolean array', () => {
      expect(isBooleanArray(['true', 'false'])).toBe(true)
      expect(isBooleanArray(['1', '0'])).toBe(true)
      expect(isBooleanArray([null, 'false'])).toBe(true)
      expect(isBooleanArray(['7', 'a'])).toBe(false)
      expect(isBooleanArray(['1', '2'])).toBe(false)
    })
  })

  describe('date', () => {
    it('should classify date', () => {
      expect(isDate('1/1/2010')).toBe(true)
      expect(isDate('01/01/2010')).toBe(true)
      expect(isDate('01/01/97')).toBe(true)
      expect(isDate('2016-01-01')).toBe(true)
      expect(isDate('2016-01-01 11:31:23 PM')).toBe(false) // not sure
      expect(isDate('not 1 date')).toBe(false)
      expect(isDate('a')).toBe(false)
      expect(isDate(null)).toBe(false)
      expect(isDate(undefined)).toBe(false)
      expect(isDate('2')).toBe(false)
      expect(isDate('1e3')).toBe(false)
    })
    it('should classify date array', () => {
      expect(isDateArray(['1/1/2010', '01/01/97'])).toBe(true)
      expect(isDateArray([null, '1/1/2010'])).toBe(true)
      expect(isDateArray(['1/1/2010', 'a'])).toBe(false)
      expect(isDateArray(['1/1/2010', 'false'])).toBe(false)
    })
  })
})
