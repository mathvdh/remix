'use strict'
var React = require('react')

module.exports = React.createClass({
  contextTypes: {
    traceManager: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      currentStepIndex: -1
    }
  },

  getInitialState: function () {
    return {
      step: '',
      addmemory: '',
      gas: '',
      remainingGas: ''
    }
  },

  render: function () {
    return (
      <div>
        <table>
          <tbody>
            <tr key='step'>
              <td>
                step
              </td>
              <td>
                {this.state.step}
              </td>
            </tr>
            <tr key='addmemory'>
              <td>
                add memory
              </td>
              <td>
                {this.state.addmemory}
              </td>
            </tr>
            <tr key='gas'>
              <td>
                gas
              </td>
              <td>
                {this.state.gas}
              </td>
            </tr>
            <tr key='remaininggas'>
              <td>
                remaining gas
              </td>
              <td>
                {this.state.remainingGas}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  },

  renderItems: function () {
    if (this.state.data) {
      var ret = []
      for (var key in this.state.data) {
        ret.push(
          <tr key={key}>
            <td>
              {this.props.data[key]}
            </td>
          </tr>)
      }
      return ret
    }
    return null
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.currentStepIndex < 0) return

    var self = this
    this.context.traceManager.getCurrentStep(nextProps.currentStepIndex, function (error, step) {
      if (error) {
        console.log(error)
      } else {
        self.setState({
          step: step
        })
      }
    })

    this.context.traceManager.getMemExpand(nextProps.currentStepIndex, function (error, addmem) {
      if (error) {
        console.log(error)
      } else {
        self.setState({
          addmemory: addmem
        })
      }
    })

    this.context.traceManager.getStepCost(nextProps.currentStepIndex, function (error, gas) {
      if (error) {
        console.log(error)
      } else {
        self.setState({
          gas: gas
        })
      }
    })

    this.context.traceManager.getRemainingGas(nextProps.currentStepIndex, function (error, remaingas) {
      if (error) {
        console.log(error)
      } else {
        self.setState({
          remainingGas: remaingas
        })
      }
    })
  }
})
