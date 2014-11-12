var React = require("react");
var mui   = require("material-ui");
var _     = require("lodash");

var AuthActions = require("../../../actions/auth");

var StatusUnauthorised = React.createClass({

  render: function() {
    var err;
    if (this.state.error) {
      err = <ErrorDialog message={this.state.error.message} />;
    }
    return (
      <mui.Paper zDepth={1} className="status-unauthorised">
        <mui.Input
          type="text"
          name="username"
          placeholder="Username"
          description="Your forum username."
          onChange={this._handleChange.bind(this, "username")} />
        <mui.Input
          type="password"
          name="password"
          placeholder="Password"
          description="Your forum password."
          onChange={this._handleChange.bind(this, "password")} />
        <mui.Input
          type="text"
          name="seat"
          placeholder="Seat"
          description="Seat number of the desk you are sitting at."
          onChange={this._handleChange.bind(this, "seat")} />
        <mui.PaperButton type="RAISED" label="Login" primary={true} onClick={this._onButtonClick} />
      </mui.Paper>
    );
  },

  getInitialState: function () {
    return {
      fields: {
        username: "",
        password: "",
        seat: ""
      },
      error: null
    };
  },

  _handleChange: function (field, e) {
    var nextState = _.extend(this.state);
    nextState.fields[field] = e.target.value;
    this.setState(nextState);
  },

  _onButtonClick: function () {
    AuthActions.createAuth(this.state.fields);
  }

});

module.exports = StatusUnauthorised;