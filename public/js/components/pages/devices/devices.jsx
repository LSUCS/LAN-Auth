var React = require("react");
var mui   = require("material-ui");

var DeviceStore   = require("../../../stores/device");
var DeviceActions = require("../../../actions/device");

var Spinner = require("../../widgets/spinner.jsx");
var Table   = require("../../widgets/table.jsx");

var Devices = React.createClass({

  render: function() {

    if (this.state.devices.length === 0) {
      return <Spinner title="Loading..." />;
    }
    var headers = ["Name", "Host", "Port", "Username"];
    var tableData = this.state.devices.map(function (device) {
      return [device.name, device.host, device.port, device.username];
    });
    return (
      <mui.Paper zDepth={1} className="device-table">
        <Table
          headers={headers}
          data={tableData} />
      </mui.Paper>
    );
  },

  getInitialState: function () {
    return {
      devices: []
    };
  },

  componentDidMount: function () {
    DeviceActions.getDevices();
    DeviceStore.addChangeListener(this.onDevicesChange);
  },

  componentWillUnmount: function () {
    DeviceStore.removeChangeListener(this.onDevicesChange);
  },

  onDevicesChange: function () {
    var nextState = {};
    nextState.devices = DeviceStore.getState();
    this.setState(nextState);
  }

});

module.exports = Devices;