const { ensureG } = require('./utils')

const drawSelection = (g, selection, width, mouseUp, mouseDown, mouseMove) => {
  const top   = 20
  const left  = 0

  const myG = ensureG(g, 'selection', left, top)
  const update = myG.selectAll('rect')
    .data(selection, (d, i) => i)

  const enter = update.enter()
  enter
    .append('rect')
    .classed('hilite', true)
    .classed('selected',   d => d)
    .classed('unselected', d => !d)
    .style('y',      (d, i) => i)
    .style('x',      left)
    .style('width',  width)
    .style('height', 1)
    .on('mousedown', mouseDown)
    .on('mouseup', mouseUp)
    .on('mousemove', mouseMove)

  update
    .classed('selected',   d => d)
    .classed('unselected', d => !d)
    .style('y', (d, i) => i)
}

module.exports = {
  drawSelection
}
