var Store      = require("../lib/store");
var Dispatcher = require("../dispatcher");
var Constants  = require("../constants");

function ErrorStore() {

  var store = this;

  Dispatcher.register(onEvent);

  function onEvent(action) {
    switch(action.type) {

      case Constants.API_CREATE_AUTH:
      case Constants.API_CREATE_AUTH_PENDING:
      case Constants.UI_ERRORS_DISMISS:
      case Constants.API_CREATE_DEVICE:
      case Constants.API_CREATE_DEVICE_PENDING:
      case Constants.API_UPDATE_DEVICE:
      case Constants.API_UPDATE_DEVICE_PENDING:
        clearError();
        break;

      case Constants.API_CREATE_DEVICE_ERROR:
      case Constants.API_CREATE_AUTH_ERROR:
      case Constants.API_UPDATE_DEVICE_ERROR:
        setError(action.payload);
        break;

      default:

    }
  }

  function clearError() {
    store.state = {};
    store.emitChange();
  }

  function setError(err) {
    store.state = {
      message: err.message,
      data: err.data
    };
    store.emitChange();
  }

}

Store.extend(ErrorStore);

module.exports = new ErrorStore();