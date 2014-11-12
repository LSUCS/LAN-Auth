var Store      = require("../lib/store");
var Dispatcher = require("../dispatcher");
var Constants  = require("../constants");


function StatusStore() {

  var store = this;

  this.state = {
    loading: true,
    status: null
  };

  Dispatcher.register(onEvent);

  function onEvent(action) {
    switch(action.type) {

      case Constants.API_GET_STATUS_PENDING:
        setLoading(true);
        break;

      case Constants.API_GET_STATUS:
        setLoading(false);
        setStatus(action.payload);
        break;

      default:

    }
  }

  function setLoading(bool) {
    store.state.loading = bool;
    store.emitChange();
  }

  function setStatus(status) {
    store.state.status = status;
    store.emitChange();
  }

}

Store.extend(StatusStore);

module.exports = new StatusStore();