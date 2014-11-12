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

      default:

    }
  }

  function setDevices(devices) {
    store.state = devices;
    store.emitChange();
  }

}

Store.extend(DeviceStore);

module.exports = new DeviceStore();