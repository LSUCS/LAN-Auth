var React = require("react");
var mui = require("material-ui");
var Nav      = require("./nav.jsx");

var App = React.createClass({

  render: function () {
    var title = "LAN Auth - " + this.props.activeRouteHandler().props.pageTitle;
    return (
      <mui.AppCanvas predefinedLayout={1}>
        <mui.AppBar onMenuIconClick={this._onMenuIconClick} title={title} zDepth={0} />
        <Nav ref="nav" />
        <div className="mui-app-content-canvas">
          <this.props.activeRouteHandler />
        </div>
      </mui.AppCanvas>
    );
  },

  _onMenuIconClick: function () {
    this.refs.nav.toggle();
  }

});

module.exports = App;