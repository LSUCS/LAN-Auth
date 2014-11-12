var Dispatcher = require("../dispatcher");
var Constants  = require("../constants");

var ErrorActions = {

  dismissErrors: function (auth) {
    Dispatcher.dispatch(Constants.UI_ERRORS_DISMISS);
  }

};

module.exports = ErrorActions;