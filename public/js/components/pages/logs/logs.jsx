var React = require("react");
var mui   = require("material-ui");
var _     = require("lodash");

var LogsStore   = require("../../../stores/logs");
var LogsActions = require("../../../actions/logs");

var Spinner = require("../../widgets/spinner.jsx");
var Table   = require("../../widgets/table.jsx");

function formatMessage(msg) {
  if (msg.length > 150) {
    return msg.substr(0, 150) + "...";
  }
  return msg;
}

var Logs = React.createClass({

  render: function() {

    if (this.state.logs.length === 0) {
      return <Spinner title="Loading..." />;
    }
    var headers = ["Level", "Message", "Date"];
    var tableData = _.chain(this.state.logs)
      .map(function (log) {
        return [
          log.level,
          formatMessage(log.message),
          new Date(log.timestamp).toUTCString()
        ];
      })
      .reverse()
      .value();
    return (
      <mui.Paper zDepth={1} className="logs-table">
        <Table
          headers={headers}
          data={tableData} />
      </mui.Paper>
    );
  },

  getInitialState: function () {
    return {
      logs: []
    };
  },

  componentDidMount: function () {
    LogsActions.getLogs();
    LogsStore.addChangeListener(this.onLogsChange);
  },

  componentWillUnmount: function () {
    LogsStore.removeChangeListener(this.onLogsChange);
  },

  onLogsChange: function () {
    var nextState = {};
    nextState.logs = LogsStore.getState();
    this.setState(nextState);
  }

});

module.exports = Logs;