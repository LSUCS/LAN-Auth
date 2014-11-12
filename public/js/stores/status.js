var Store      = require("../lib/store");
var Dispatcher = require("../dispatcher");
var Constants  = require("../constants");
var _          = require("lodash");

var StatusActions = require("../actions/status");

function StatusStore() {

  var store = this;

  Dispatcher.register(onEvent);

  function onEvent(action) {
    switch(action.type) {

      case Constants.API_GET_STATUS_PENDING:
        setStatus({});
        break;

      case Constants.API_GET_STATUS:
        setStatus(action.payload);
        if (action.payload.status === "processing") {
          setTimeout(StatusActions.getStatus, 3000);
        }
        break;

      default:

    }
  }

  function setStatus(status) {
    store.state = status;
    store.emitChange();
  }

}

Store.extend(StatusStore);

module.exports = new StatusStore();