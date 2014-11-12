var React  = require("react");
var mui    = require("material-ui");
var Router = require("react-router");

var AdminActions = require("../actions/admin");
var AdminStore   = require("../stores/admin");

var Logout = React.createClass({

  mixins: [Router.Navigation],

  render: function () {
    if (!this.state.password) {
      return <div/>;
    }
    return (
      <mui.PaperButton className="admin-logout" type="FLAT" label="Logout" onClick={this._handleButtonClick} />
    );
  },

  getInitialState: function () {
    return {
      password: AdminStore.getState().password
    };
  },

  componentDidMount: function () {
    AdminStore.addChangeListener(this.handleAdminChange);
  },

  componentWillUnmount: function () {
    AdminStore.removeChangeListener(this.handleAdminChange);
  },

  handleAdminChange: function () {
    var nextState = {};
    nextState.password = AdminStore.getState().password;
    this.setState(nextState);
  },

  _handleButtonClick: function () {
    AdminActions.clearPassword();
    this.transitionTo("home");
  }

});

module.exports = Logout;