const drawTitle = (g, name, left, click) => {
  const myG = g.append('g')
   .classed('title', true)
   .attr('transform', () => `translate(${left}, 15)`)
   .on('click', click)

  myG.selectAll('rect')
    .data([0])
    .enter().append('rect')
    .style('x', 0)
    .style('y', -10)
    .style('width', 40)
    .style('height', 10)
    .style('fill-opacity', 0)

  myG.selectAll('text')
    .data([name])
    .enter().append('text')
    .text((d) => d.substr(0, 7))
    .append('svg:title')
    .text((d) => d)
}

module.exports = {
  drawTitle
}
