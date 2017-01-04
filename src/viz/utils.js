const ensureG = (g, className, left, top) => {
  const existingSelection = g.selectAll(`#root_${className}`)
  if (existingSelection._groups[0][0]) return existingSelection
  return g.append('g')
   .classed(className, true)
   .attr('id', `root_${className}`)
   .attr('transform', () => `translate(${left}, ${top})`)
}

module.exports = {
  ensureG
}
