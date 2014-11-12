var Store      = require("../lib/store");
var Dispatcher = require("../dispatcher");
var Constants  = require("../constants");

function LogsStore() {

  var store = this;

  this.state = [];

  Dispatcher.register(onEvent);

  function onEvent(action) {
    switch(action.type) {

      case Constants.API_GET_LOGS:
        setLogs(action.payload);
        break;

      default:

    }
  }

  function setLogs(logs) {
    store.state = logs;
    store.emitChange();
  }

}

Store.extend(LogsStore);

module.exports = new LogsStore();