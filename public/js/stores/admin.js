var Store      = require("../lib/store");
var Dispatcher = require("../dispatcher");
var Constants  = require("../constants");


function AdminStore() {

  var store = this;

  this.state = {
    authorised: true
  };

  Dispatcher.register(onEvent);

  function onEvent(action) {
    switch(action.type) {

      case Constants.API_ERROR_UNAUTHORISED:
        setAuthorised(false);
        break;

      default:

    }
  }

  function setAuthorised(bool) {
    store.state.authorised = bool;
    store.emitChange();
  }

}

Store.extend(AdminStore);

module.exports = new AdminStore();