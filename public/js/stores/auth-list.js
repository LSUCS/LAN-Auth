var Store      = require("../lib/store");
var Dispatcher = require("../dispatcher");
var Constants  = require("../constants");

function AuthListStore() {

  var store = this;

  this.state = [];

  Dispatcher.register(onEvent);

  function onEvent(action) {
    switch(action.type) {

      case Constants.API_GET_AUTHS:
        setAuths(action.payload);
        break;

      default:

    }
  }

  function setAuths(auths) {
    store.state = auths;
    store.emitChange();
  }

}

Store.extend(AuthListStore);

module.exports = new AuthListStore();