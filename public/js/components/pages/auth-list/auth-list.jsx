var React = require("react");
var Table = require("react-table-component").Table;
var mui   = require("material-ui");

var AuthListStore   = require("../../../stores/auth-list");
var AuthActions = require("../../../actions/auth");

var Spinner = require("../../spinner.jsx");

var AuthList = React.createClass({

  render: function() {

    if (this.state.auths.length === 0) {
      return <Spinner title="Loading..." />;
    }
    var tableData = this.state.auths.map(function (auth) {
      return {
        Username: auth.username,
        IP: auth.ip,
        Seat: auth.seat
      };
    });
    return (
      <mui.Paper zDepth={1}>
        <Table
          className="auth-table reactable"
          sortable={true}
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