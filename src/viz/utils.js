const d3 = require('d3')

const ensureG = (g, className, left, top) => {
  const existingSelection = g.selectAll(`#root_${className}`)
  if (existingSelection._groups[0][0]) return existingSelection

  d3.select('body')
    .on('keydown', () => {
      if (d3.event.keyCode === 78) { // Night
        d3.select('body')
          .classed('dark', true);
      }
      if (d3.event.keyCode === 68) { // Day
        d3.select('body')
          .classed('dark', false);
      }
    })

  return g.append('g')
   .classed(className, true)
   .attr('id', `root_${className}`)
   .attr('transform', () => `translate(${left}, ${top})`)
}

module.exports = {
  ensureG
}
