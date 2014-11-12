var React = require("react");

var StatusStore = require("../../../stores/status");

var Home = React.createClass({

  render: function() {
    var msg;
    if (this.state.loading) {
      msg = "Loading...";
    } else {
      msg = JSON.stringify(this.state.status);
    }
    return (
      <div>{msg}</div>
    );
  },

  getInitialState: function () {
    return this.getState();
  },

  componentDidMount: function () {
    StatusStore.addChangeListener(this.onStatusChanged);
  },

  componentWillUnmount: function () {
    StatusStore.removeChangeListener(this.onStatusChanged);
  },

  onStatusChanged: function () {
    this.setState(this.getState());
  },

  getState: function () {
    return StatusStore.getState();
  }

});

module.exports = Home;