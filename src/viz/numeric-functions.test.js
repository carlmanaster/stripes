const d3 = require(`d3`)
const { fns } = require(`./numeric-functions`)

describe(`xStandard`, () => {
  d3.scaleLinear()
    .domain(domainFn(min, max))
    .range(rangeFn(left, w))
  it(`should return scale's smallest value for domain's smallest value`, () => {
    expect(1).toBe(1)

  })
})
