const React = require('react')
const FauxDom = require('react-faux-dom')
const d3 = require('d3')

const Chart = React.createClass({
  propTypes: {
    data:    React.PropTypes.array.isRequired,
    config:  React.PropTypes.object,
    chartFn: React.PropTypes.func.isRequired
  },

  render: function() {
    const { chartFn, data, config } = this.props
    const node = FauxDom.createElement('svg')
    const g = d3.select(node)
    .attr('width', 80)
    .attr('height', 60)
    .append('g')

    chartFn(g, data, config)

    return node.toReact()
  }
})

export default Chart
