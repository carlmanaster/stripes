const React = require('react')
const FauxDom = require('react-faux-dom')
const d3 = require('d3')

const Chart = React.createClass({
  propTypes: {
    data:    React.PropTypes.array,
    config:  React.PropTypes.array,
    chartFn: React.PropTypes.array.isRequired
  },

  render: function() {
    const { chartFn, data, config } = this.props
    const node = FauxDom.createElement('svg')
    const g = d3.select(node)
    .attr('width', 300)
    .attr('height', 300)
    .append('g')

    for (let i = 0; i < data.length; i++) {
      chartFn[i](g, data[i], config[i])
    }

    return node.toReact()
  }
})

export default Chart
