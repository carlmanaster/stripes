const { selectRange, ofLength } = require('./selection')

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
    const s2 = selectRange(3, 4, s1)
    const expected = [F, F, F, T, F, F, F, F, F, F]
    expect(s2).toEqual(expected)
  })
  it('3 elements', () => {
    const s2 = selectRange(3, 6, s1)
    const expected = [F, F, F, T, T, T, F, F, F, F]
    expect(s2).toEqual(expected)
  })
  it('at start', () => {
    const s2 = selectRange(0, 3, s1)
    const expected = [T, T, T, F, F, F, F, F, F, F]
    expect(s2).toEqual(expected)
  })
  it('at end', () => {
    const s2 = selectRange(7, 10, s1)
    const expected = [F, F, F, F, F, F, F, T, T, T]
    expect(s2).toEqual(expected)
  })
})
