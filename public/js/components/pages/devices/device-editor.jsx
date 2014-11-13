var React = require("react");
var mui   = require("material-ui");

var Dialog = require("../../widgets/dialog.jsx");

var DeviceEditor = React.createClass({

  render: function() {
    var actions = [
      { text: "CANCEL", onClick: this.props.onClose },
      { text: this.props.okText, onClick: this._handleOk }
    ];
    return (
      <Dialog
        title={this.props.title}
        onClose={this.props.onClose}
        className="device-editor"
        actions={actions}>
        <mui.Input
          type="text"
          name="name"
          placeholder="Name"
          description="Name (e.g. CORE1)"
          defaultValue={this.state.name}
          onChange={this._handleChange.bind(this, "name")} />
        <mui.Input
          type="text"
          name="host"
          placeholder="Host"
          description="Hostname of device (without port)"
          defaultValue={this.state.host}
          onChange={this._handleChange.bind(this, "host")} />
        <mui.Input
          type="text"
          name="port"
          placeholder="Port"
          description="Telnet port of the device"
          defaultValue={this.state.port}
          onChange={this._handleChange.bind(this, "port")} />
        <mui.Input
          type="text"
          name="username"
          placeholder="Username"
          description="Username to access the device (optional)"
          defaultValue={this.state.username}
          onChange={this._handleChange.bind(this, "username")} />
        <mui.Input
          type="password"
          name="password"
          placeholder="Password"
          description="Password to access the device (optional)"
          defaultValue={this.state.password}
          onChange={this._handleChange.bind(this, "password")} />
      </Dialog>
    );
  },

  getInitialState: function () {
    return this.props.data || {};
  },

  _handleOk: function () {
    this.props.onOk(this.state);
  },

  _handleChange: function (field, e) {
    var nextState = {};
    nextState[field] = e.target.value;
    this.setState(nextState);
  }

});

module.exports = DeviceEditor;