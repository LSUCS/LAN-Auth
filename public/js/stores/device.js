var Store      = require("../lib/store");
var Dispatcher = require("../dispatcher");
var Constants  = require("../constants");

function DeviceStore() {

  var store = this;

  this.state = [];

  Dispatcher.register(onEvent);

  function onEvent(action) {
    switch(action.type) {

      case Constants.API_GET_DEVICES:
        setDevices(action.payload);
        break;

      case Constants.API_DELETE_DEVICE:
        removeDevice(action.payload);
        break;

      case Constants.API_DELETE_DEVICES:
        setDevices([]);
        break;

      case Constants.API_CREATE_DEVICE:
      case Constants.API_UPDATE_DEVICE:
        addDevice(action.payload);
        break;

      default:

    }
  }

  function removeDevice(deviceId) {
    store.state = store.state.filter(function (device) {
      return device.id !== deviceId;
    });
    store.emitChange();
  }

  function addDevice(device) {
    var nextDevices = store.state.filter(function (oldDevice) {
      return oldDevice.id !== device.id;
    });
    nextDevices.push(device);
    setDevices(nextDevices);
  }

  function setDevices(devices) {
    store.state = devices;
    store.emitChange();
  }

}

Store.extend(DeviceStore);

module.exports = new DeviceStore();