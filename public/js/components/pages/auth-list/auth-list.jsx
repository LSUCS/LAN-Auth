var React = require("react");

var AuthListStore   = require("../../../stores/auth-list");
var AuthActions = require("../../../actions/auth");

var AuthList = React.createClass({

  render: function() {
    return (
      <div>{JSON.stringify(this.state.auths)}</div>
    );
  },

  getInitialState: function () {
    return {
      auths: []
    };
  },

  componentDidMount: function () {
    AuthActions.getAuths();
    AuthListStore.addChangeListener(this.onAuthListChange);
  },

  componentWillUnmount: function () {
    AuthListStore.removeChangeListner(this.onAuthListChange);
  },

  onAuthListChange: function () {
    var nextState = {};
    nextState.auths = AuthListStore.getState();
    this.setState(nextState);
  }

});

module.exports = AuthList;