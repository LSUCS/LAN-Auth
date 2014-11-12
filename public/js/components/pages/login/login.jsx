var React = require("react");
var mui   = require("material-ui");
var Router = require("react-router");

var AdminActions = require("../../../actions/admin");

var Login = React.createClass({

  mixins: [Router.Navigation],

  render: function() {
    return (
      <mui.Paper zDepth={1} className="admin-login">
        <mui.Input
          type="password"
          name="password"
          placeholder="Password"
          description="Admin Password"
          onChange={this._handlePasswordChange} />
        <mui.PaperButton type="RAISED" label="Login" primary={true} onClick={this._onButtonClick} />
      </mui.Paper>
    );
  },

  getInitialState: function () {
    return {
      password: null
    };
  },

  _handlePasswordChange: function (e) {
    var nextState = {};
    nextState.password = e.target.value;
    this.setState(nextState);
  },

  _onButtonClick: function () {
    AdminActions.setPassword(this.state.password);
    this.transitionTo("auth-list");
  }

});

module.exports = Login;