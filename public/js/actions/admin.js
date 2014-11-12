var Dispatcher = require("../dispatcher");
var Constants  = require("../constants");

var AdminActions = {

  getPassword: function () {
    Dispatcher.dispatch(Constants.STORAGE_GET_ADMINPASSWORD, sessionStorage.getItem("adminpassword"));
  },

  setPassword: function (password) {
    sessionStorage.setItem("adminpassword", password);
    Dispatcher.dispatch(Constants.STORAGE_SET_ADMINPASSWORD, password);
  },

  clearPassword: function () {
    sessionStorage.removeItem("adminpassword");
    Dispatcher.dispatch(Constants.STORAGE_CLEAR_ADMINPASSWORD);
  }

};

module.exports = AdminActions;