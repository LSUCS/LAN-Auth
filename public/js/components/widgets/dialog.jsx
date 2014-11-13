var React = require("react");
var mui   = require("material-ui");
var _     = require("lodash");
var $     = require("jquery");

/**
 * className, children, onClose, title, actions
 */
var Dialog = React.createClass({

  render: function() {
    var actions = _.map(this.props.actions, function (action, i) {
      return (
        <div className="action" key={i} onClick={this._handleClose.bind(this, action.onClick)}>
          {action.text}
        </div>
      );
    }, this);
    return (
      <div className={this.props.className}>
        <div className="dialog show">
          <mui.Paper zDepth={4} className="dialog-inner">
            <h3 className="dialog-title">{this.props.title}</h3>
            <div className="dialog-content">
              {this.props.children}
            </div>
            <div className="dialog-actions">
              <div className="actions-right">
                {actions}
              </div>
            </div>
          </mui.Paper>
          <div className="dialog-overlay" onClick={this._handleClose}></div>
        </div>
      </div>
    );
  },

  componentDidUpdate: function () {
    var $el = $(this.getDOMNode()),
      height = $el.innerHeight();

    $el.css('margin-top', -height / 2);
  },

  _handleClose: function (cb) {
    if (this.props.onClose) {
      this.props.onClose();
    }
    if (cb) {
      cb();
    }
  }

});

module.exports = Dialog;