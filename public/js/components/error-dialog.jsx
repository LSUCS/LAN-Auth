var React = require("react");
var _     = require("lodash");

var ErrorStore   = require("../stores/error");
var ErrorActions = require("../actions/error");

var Dialog       = require("./widgets/dialog.jsx");

var ErrorDialog = React.createClass({

  render: function() {
    if (!this.state.message) {
      return null;
    }
    var message = this.state.message;
    var data;
    if (this.state.message === "ValidationErrors") {
      message = null;
      var errs = _.chain(this.state.data)
        .pluck("msg")
        .map(function (msg) {
          return <li>{msg}</li>;
        });
      data = <ul>{errs}</ul>;
    } else if (this.state.message === "Validation error") {
      message = null;
      var errs = _.chain(this.state.data)
        .pluck("message")
        .map(function (msg) {
          return <li>{msg}</li>;
        });
      data = <ul>{errs}</ul>;
    }
    return (
      <Dialog
        title="Error"
        className="error-dialog"
        onClose={this._handleClose}
        actions={[{ text: "OK" }]}>
        {message}
        {data}
      </Dialog>
    );
  },

  getInitialState: function () {
    return {};
  },

  componentDidMount: function () {
    ErrorStore.addChangeListener(this.onErrorChanged);
  },

  componentWillUnmount: function () {
    ErrorStore.removeChangeListener(this.onErrorChanged);
  },

  _handleClose: function () {
    ErrorActions.dismissErrors();
  },

  onErrorChanged: function () {
    this.replaceState(ErrorStore.getState());
  }

});

module.exports = ErrorDialog;