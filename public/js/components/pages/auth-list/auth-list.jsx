var React = require("react");
var mui   = require("material-ui");

var AuthListStore   = require("../../../stores/auth-list");
var AuthActions = require("../../../actions/auth");

var Spinner = require("../../widgets/spinner.jsx");
var Table   = require("../../widgets/table.jsx");

var AuthList = React.createClass({

  render: function() {

    if (this.state.auths.length === 0) {
      return <Spinner title="Loading..." />;
    }
    var headers = ["Username", "IP", "Seat"];
    var tableData = this.state.auths.map(function (auth) {
      return [auth.username, auth.ip, auth.seat];
    });
    return (
      <mui.Paper zDepth={1} className="auth-table">
        <Table
          headers={headers}
          data={tableData} />
      </mui.Paper>
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
    AuthListStore.removeChangeListener(this.onAuthListChange);
  },

  onAuthListChange: function () {
    var nextState = {};
    nextState.auths = AuthListStore.getState();
    this.setState(nextState);
  }

});

module.exports = AuthList;