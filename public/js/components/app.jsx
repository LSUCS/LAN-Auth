var React  = require("react");
var mui    = require("material-ui");
var Router = require("react-router");

var AdminStore = require("../stores/admin");

var Nav         = require("./nav.jsx");
var ErrorDialog = require("./error-dialog.jsx");
var Logout      = require("./logout.jsx");

var App = React.createClass({

  mixins: [Router.Navigation, Router.ActiveState],

  render: function () {
    var title = "LAN Auth - " + this.props.activeRouteHandler().props.pageTitle;
    return (
      <mui.AppCanvas predefinedLayout={1}>
        <ErrorDialog />
        <mui.AppBar onMenuIconClick={this._onMenuIconClick} title={title} zDepth={0}>
          <Logout />
        </mui.AppBar>
        <Nav ref="nav" />
        <div className="mui-app-content-canvas">
          <this.props.activeRouteHandler />
        </div>
      </mui.AppCanvas>
    );
  },

  componentDidMount: function () {
    AdminStore.addChangeListener(this.onAdminChanged);
  },

  componentWillUnmount: function () {
    AdminStore.removeChangeListener(this.onAdminChanged);
  },

  onAdminChanged: function () {
    if (!AdminStore.getState().authorised) {
      this.transitionTo("login");
    }
  },

  _onMenuIconClick: function () {
    this.refs.nav.toggle();
  }

});

module.exports = App;