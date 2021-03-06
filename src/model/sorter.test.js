const { rank } = require('./sorter')

describe('sorter', () => {
  it('should return a rank order', () => {
    const column = [5, 1, 3, 2, 4]
    const expected = [1, 3, 2, 4, 0]
    expect(rank(column)).toEqual(expected)
  })
  it('should be stable', () => {
    const column = [5, 1, 1, 1, 4, 4, 4, 5, 1, 4, 5, 1, 1, 4, 1, 5, 5]
    const expected = [1, 2, 3, 8, 11, 12, 14, 4, 5, 6, 9, 13, 0, 7, 10, 15, 16]
    expect(rank(column)).toEqual(expected)
  })
  it('should sort numerically', () => {
    const column = [1, 2, 10]
    const expected = [0, 1, 2]
    expect(rank(column)).toEqual(expected)
  })
  it('should sort nulls to the top', () => {
    const column = [5, 1, null, 2, 4]
    const expected = [2, 1, 3, 4, 0]
    expect(rank(column)).toEqual(expected)
  })
  it('should sort strings', () => {
    const column = ['a', 'b', 'd', 'e', 'c']
    const expected = [0, 1, 4, 2, 3]
    expect(rank(column)).toEqual(expected)
  })
  it('should sort booleans', () => {
    const t = true
    const f = false
    const column = [t, f, f, t, f, t]
    const expected = [1, 2, 4, 0, 3, 5]
    expect(rank(column)).toEqual(expected)
  })
})
