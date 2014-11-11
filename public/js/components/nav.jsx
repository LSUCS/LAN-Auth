var React  = require("react");
var mui    = require("material-ui");
var Router = require("react-router");

var menuItems = [
  { route: "home", text: "Home" },
  { type: mui.MenuItem.Types.SUBHEADER, text: "Admin" },
  { route: "auth-list", text: "Auth List" },
  { route: "settings", text: "Settings" },
  { route: "logs", text: "Logs" }
];

var Nav = React.createClass({

  mixins: [Router.Navigation, Router.ActiveState],

  getInitialState: function () {
    return {
      selectedIndex: null
    };
  },

  render: function () {
    return (
      <mui.LeftNav
        ref="nav"
        docked={false}
        menuItems={menuItems}
        isInitiallyOpen={true}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onNavChange} />
    );
  },

  toggle: function () {
    this.refs.nav.toggle();
  },

  _getSelectedIndex: function () {
    for (var i = 0; i < menuItems.length; i++) {
      var item = menuItems[i];
      if (item.route && this.isActive(item.route)) {
        return i;
      }
    }
  },

  _onNavChange: function (e, key, payload) {
    this.transitionTo(payload.route);
  }

});

module.exports = Nav;