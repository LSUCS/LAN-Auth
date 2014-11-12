var React = require("react");
var mui   = require("material-ui");
var _     = require("lodash");
var $     = require("jquery");

var ErrorStore   = require("../stores/error");
var ErrorActions = require("../actions/error");

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
    }
    return (
      <div className="error-dialog">
        <div className="dialog show">
          <mui.Paper zDepth={4}>
            <h3 className="dialog-title">Error</h3>
            <div className="dialog-content">
              {message}
              {data}
            </div>
            <div className="dialog-actions">
              <div className="actions-right">
                <div className="action" onClick={this._handleClose}>OK</div>
              </div>
            </div>
          </mui.Paper>
          <div className="dialog-overlay" onClick={this._handleClose}></div>
        </div>
      </div>
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

  componentDidUpdate: function () {
    var $el = $(this.getDOMNode()),
      height = $el.innerHeight();

    $el.css('margin-top', -height / 2);
  },

  _handleClose: function () {
    ErrorActions.dismissErrors();
  },

  onErrorChanged: function () {
    this.replaceState(ErrorStore.getState());
  }

});

module.exports = ErrorDialog;