const { representsNumber, representsNumberArray,
        representsBoolean, representsBooleanArray,
        representsDate, representsDateArray,
        isNumber, isNumberArray,
        isBoolean, isBooleanArray } = require('./classifier')

describe('classifier', () => {
  describe('representsNumber', () => {
    it('should classify number', () => {
      expect(representsNumber('7')).toBe(true)
      expect(representsNumber('7.2')).toBe(true)
      expect(representsNumber('a7')).toBe(false)
      expect(representsNumber(null)).toBe(false)
      expect(representsNumber(undefined)).toBe(false)
    })
    it('should classify number array', () => {
      expect(representsNumberArray(['7', '-5'])).toBe(true)
      expect(representsNumberArray([null, '-5'])).toBe(true)
      expect(representsNumberArray(['', '-5'])).toBe(true)
      expect(representsNumberArray(['7', 'a'])).toBe(false)
    })
  })

  describe('representsBoolean', () => {
    it('should classify boolean', () => {
      expect(representsBoolean('true')).toBe(true)
      expect(representsBoolean('false')).toBe(true)
      expect(representsBoolean('0')).toBe(true)
      expect(representsBoolean('1')).toBe(true)
      expect(representsBoolean('2')).toBe(false)
      expect(representsBoolean('a')).toBe(false)
      expect(representsBoolean(null)).toBe(false)
      expect(representsBoolean(undefined)).toBe(false)
    })
    it('should classify boolean array', () => {
      expect(representsBooleanArray(['true', 'false'])).toBe(true)
      expect(representsBooleanArray(['1', '0'])).toBe(true)
      expect(representsBooleanArray([null, 'false'])).toBe(true)
      expect(representsBooleanArray(['7', 'a'])).toBe(false)
      expect(representsBooleanArray(['1', '2'])).toBe(false)
    })
  })

  describe('representsDate', () => {
    it('should classify date', () => {
      expect(representsDate('1/1/2010')).toBe(true)
      expect(representsDate('01/01/2010')).toBe(true)
      expect(representsDate('01/01/97')).toBe(true)
      expect(representsDate('2016-01-01')).toBe(true)
      expect(representsDate('2016-01-01 11:31:23 PM')).toBe(false) // not sure
      expect(representsDate('not 1 date')).toBe(false)
      expect(representsDate('a')).toBe(false)
      expect(representsDate(null)).toBe(false)
      expect(representsDate(undefined)).toBe(false)
      expect(representsDate('2')).toBe(false)
      expect(representsDate('1e3')).toBe(false)
    })
    it('should classify date array', () => {
      expect(representsDateArray(['1/1/2010', '01/01/97'])).toBe(true)
      expect(representsDateArray([null, '1/1/2010'])).toBe(true)
      expect(representsDateArray(['1/1/2010', 'a'])).toBe(false)
      expect(representsDateArray(['1/1/2010', 'false'])).toBe(false)
    })
  })

  describe('isNumber', () => {
    it('should classify number', () => {
      expect(isNumber(7)).toBe(true)
      expect(isNumber(7.2)).toBe(true)
      expect(isNumber('a7')).toBe(false)
      expect(isNumber(null)).toBe(false)
      expect(isNumber(undefined)).toBe(false)
    })

    it('should classify number array', () => {
      expect(isNumberArray([7, -5])).toBe(true)
      expect(isNumberArray([null, -5])).toBe(true)
      expect(isNumberArray([7, 'a'])).toBe(false)
    })
  })

  describe('isBoolean', () => {
    it('should classify boolean', () => {
      expect(isBoolean(true)).toBe(true)
      expect(isBoolean(false)).toBe(true)
      expect(isBoolean('0')).toBe(false)
      expect(isBoolean('1')).toBe(false)
      expect(isBoolean('2')).toBe(false)
      expect(isBoolean('a')).toBe(false)
      expect(isBoolean(null)).toBe(false)
      expect(isBoolean(undefined)).toBe(false)
    })

    it('should classify boolean array', () => {
      expect(isBooleanArray([true, false])).toBe(true)
      expect(isBooleanArray([null, false])).toBe(true)
      expect(isBooleanArray(['1', '0'])).toBe(false)
      expect(isBooleanArray(['7', 'a'])).toBe(false)
      expect(isBooleanArray(['1', '2'])).toBe(false)
    })
  })
})
