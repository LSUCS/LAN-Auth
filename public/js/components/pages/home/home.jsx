var React = require("react");
var StatusStore = require("../../../stores/status");

var Spinner            = require("../../widgets/spinner.jsx");
var StatusUnauthorised = require("./status-unauthorised.jsx");
var StatusAuthorised   = require("./status-authorised.jsx");

var Home = React.createClass({

  render: function() {
    switch (this.state.status) {
      case "unauthorised":
        return <StatusUnauthorised />;

      case "authorised":
        return <StatusAuthorised />;

      case "processing":
        return <Spinner title="Processing..." />;

      default:
        return <Spinner title="Loading..." />;
    }
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