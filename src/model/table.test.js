const { curry } = require('ramda')
const table = require('./table')

describe('table', () => {
  const data = [
    [1, 6, 3, null, 5],
    [2, 2, 6, 8, 10],
    [3, 4, null, 12, 15]]

  const standardOrder = n => n
  const rearranged = n => [2, 0, 1][n]

  describe('geometry', () => {
    it('should have width', () => {
      expect(table.width(data)).toBe(5)
    })
    it('should have width of 0 for empty table', () => {
      expect(table.width([])).toBe(0)
    })
    it('should have height', () => {
      expect(table.height(data)).toBe(3)
    })
  })

  describe('row', () => {
    it('should get row', () => {
      expect(table.row(data, standardOrder, 0)).toEqual([1, 6, 3, null, 5])
    })
    it('should get rearranged row', () => {
      expect(table.row(data, rearranged, 0)).toEqual([3, 4, null, 12, 15])
    })
    it('should not get row for index > N', () => {
      expect(table.row(data, standardOrder, 7)).toBe(undefined)
    })
  })

  describe('column', () => {
    it('should get column', () => {
      expect(table.column(data, standardOrder, 3)).toEqual([null, 8, 12])
    })
    it('should not get column for index > N', () => {
      expect(table.column(data, standardOrder, 5)).toBe(undefined)
    })
    it('should get ordered column', () => {
      expect(table.column(data, rearranged, 3)).toEqual([12, null, 8])
    })
  })

  describe('substitute column', () => {
    it('should substitute column', () => {
      const c = ['a', 'b', 'c']
      const d = table.substituteColumn(data, 1, c)
      expect(table.column(d, standardOrder, 1)).toEqual(c)
      expect(table.column(data, standardOrder, 1)).toEqual([6, 2, 4])
    })
  })

  describe('byColumn', () => {
    it('should order by column', () => {
      const byColumn1 = table.byColumn(data, 1)
      expect(table.column(data, byColumn1, 0)).toEqual([2, 3, 1])
    })
  })


  describe('curried', () => {
    const r = curry(table.row)(data, rearranged)
    const c = curry(table.column)(data, rearranged)
    it('should get row', () => {
      expect(r(0)).toEqual([3, 4, null, 12, 15])
    })
    it('should get column', () => {
      expect(c(3)).toEqual([12, null, 8])
    })
  })
})
