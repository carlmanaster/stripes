const { selectRange, ofLength, sortedBy, isSelected } = require('./selection')

const T = true
const F = false

describe('ofLength', () => {
  it('produces a selection', () => {
    const s = ofLength(3)
    const expected = [F, F, F]
    expect(s).toEqual(expected)
  })
})

describe('selectRange', () => {
  const s1 = ofLength(10)
  it('1 element', () => {
    const s2 = selectRange(s1, 3, 4)
    const expected = [F, F, F, T, F, F, F, F, F, F]
    expect(s2).toEqual(expected)
  })
  it('3 elements', () => {
    const s2 = selectRange(s1, 3, 6)
    const expected = [F, F, F, T, T, T, F, F, F, F]
    expect(s2).toEqual(expected)
  })
  it('at start', () => {
    const s2 = selectRange(s1, 0, 3)
    const expected = [T, T, T, F, F, F, F, F, F, F]
    expect(s2).toEqual(expected)
  })
  it('at end', () => {
    const s2 = selectRange(s1, 7, 10)
    const expected = [F, F, F, F, F, F, F, T, T, T]
    expect(s2).toEqual(expected)
  })
  it('curries', () => {
    const select = selectRange(s1)
    const expected = [F, F, F, F, F, F, F, T, T, T]
    expect(select(7, 10)).toEqual(expected)
  })
})

describe('sortedBy', () => {
  it('sorts', () => {
    const rank = i => [1, 3, 2, 4, 0][i]
    const s1 = [F, F, T, T, F]
    const s2 = sortedBy(rank, s1)
    const expected = [F, T, T, F, F]
    expect(s2).toEqual(expected)
  })
})

describe('isSelected', () => {
  it('works', () => {
    const s = [F, F, T, T, F]
    expect(isSelected(s, 0)).toBe(false)
    expect(isSelected(s, 2)).toBe(true)
  })
  it('curries', () => {
    const s = [F, F, T, T, F]
    const q = isSelected(s)
    expect(q(0)).toBe(false)
    expect(q(2)).toBe(true)
  })
})
