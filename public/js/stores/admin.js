var Store      = require("../lib/store");
var Dispatcher = require("../dispatcher");
var Constants  = require("../constants");


function AdminStore() {

  var store = this;

  this.state = {
    authorised: true,
    password: null
  };

  Dispatcher.register(onEvent);

  function onEvent(action) {
    switch(action.type) {

      case Constants.STORAGE_GET_ADMINPASSWORD:
      case Constants.STORAGE_SET_ADMINPASSWORD:
        setPassword(action.payload);
        break;

      case Constants.STORAGE_CLEAR_ADMINPASSWORD:
        clearPassword();
        break;

      case Constants.API_ERROR_UNAUTHORISED:
        clearPassword();
        setAuthorised(false);
        break;

      default:

    }
  }

  function clearPassword() {
    setPassword(null);
  }

  function setPassword(password) {
    store.state.password = password;
    store.emitChange();
  }

  function setAuthorised(bool) {
    store.state.authorised = bool;
    store.emitChange();
  }

}

Store.extend(AdminStore);

module.exports = new AdminStore();