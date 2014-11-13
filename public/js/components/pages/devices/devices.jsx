var React = require("react");
var mui   = require("material-ui");
var _     = require("lodash");

var DeviceStore   = require("../../../stores/device");
var DeviceActions = require("../../../actions/device");

var Table   = require("../../widgets/table.jsx");
var Editor  = require("./device-editor.jsx");
var Confirm = require("../../widgets/confirm.jsx");

var Devices = React.createClass({

  render: function() {
    
    //Table data
    var table;
    if (this.state.devices.length !== 0) {
      var headers = ["Name", "Host", "Port", "Username", ""];
      var tableData = _.map(this.state.devices, function (device) {
        var buttons = (
          <div>
            <mui.PaperButton type="FAB_MINI" icon="navigation-close" onClick={this._handleClickDeleteOne.bind(this, device)} />
            <mui.PaperButton type="FAB_MINI" icon="image-edit" onClick={this._setEditorState.bind(this, false, device)} />
          </div>
        );
        return [device.name, device.host, device.port, device.username, buttons];
      }, this);
      table = (
        <mui.Paper zDepth={1} className="device-table">
          <Table
            headers={headers}
            data={tableData} />
        </mui.Paper>
      );
    }

    //Editor
    var editor;
    if (this.state.editing) {
      editor = (
        <Editor
          title="Edit Device"
          data={this.state.editing}
          onClose={this._handleEditorClose}
          okText="SAVE"
          onOk={this._handleSaveDevice} />
      );
    } else if (this.state.creating) {
      editor = (
        <Editor
          title="Add Device"
          onClose={this._handleEditorClose}
          okText="ADD"
          onOk={this._handleAddDevice} />
      );
    }

    //Confirmation boxes
    var confirm;
    if (this.state.confirmingDeleteOne) {
      confirm = (
        <Confirm
          message="Are you sure you wish to delete this device?"
          onNo={this._onDeleteOneConfirmedNo}
          onYes={this._onDeleteOneConfirmedYes} />
      );
    }
    if (this.state.confirmingDeleteAll) {
      confirm = (
        <Confirm
          message="Are you sure you wish to delete ALL devices?"
          onNo={this._onDeleteAllConfirmedNo}
          onYes={this._onDeleteAllConfirmedYes} />
      );
    }
    return (
      <div className="devices">
        {editor}
        {confirm}
        <div className="button-bar">
          <mui.PaperButton type="RAISED" primary={true} label="ADD DEVICE" onClick={this._setEditorState.bind(this, true, false)} />
          <mui.PaperButton type="RAISED" primary={true} label="DELETE ALL" onClick={this._handleClickDeleteAll} />
        </div>
        {table}
      </div>
    );
  },

  getInitialState: function () {
    return {
      devices: [],
      editing: false,
      creating: false,
      editorDevice: {},
      confirmingDeleteAll: false,
      confirmingDeleteOne: false
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
  },

  _handleAddDevice: function (device) {
    DeviceActions.createDevice(device);
  },

  _handleSaveDevice: function (device) {
    DeviceActions.updateDevice(device);
  },

  _onDeleteOneConfirmedNo: function () {
    var nextState = {
      confirmingDeleteOne: false
    };
    this.setState(nextState);
  },

  _onDeleteOneConfirmedYes: function () {
    DeviceActions.deleteDevice(this.state.toDelete.id);
    var nextState = {
      confirmingDeleteOne: false,
      toDelete: null
    };
    this.setState(nextState);
  },

  _handleClickDeleteOne: function (device) {
    var nextState = {
      confirmingDeleteOne: true,
      toDelete: device
    };
    this.setState(nextState);
  },

  _onDeleteAllConfirmedNo: function () {
    var nextState = {
      confirmingDeleteAll: false
    };
    this.setState(nextState);
  },

  _onDeleteAllConfirmedYes: function () {
    DeviceActions.deleteDevices();
    var nextState = {
      confirmingDeleteAll: false
    };
    this.setState(nextState);
  },

  _handleClickDeleteAll: function () {
    var nextState = {
      confirmingDeleteAll: true
    };
    this.setState(nextState);
  },

  _setEditorState: function (creating, editing) {
    var nextState = {
      creating: creating,
      editing: editing
    };
    this.setState(nextState);
  },

  _handleEditorClose: function () {
    this._setEditorState(false, false);
  }

});

module.exports = Devices;