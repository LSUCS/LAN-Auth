var Dispatcher = require("../dispatcher");
var AuthDAO  = require("../dao/auth");
var Constants  = require("../constants");

var StatusActions = require("./status");

var AuthActions = {

  createAuth: function (auth) {
    Dispatcher.dispatch(Constants.API_CREATE_AUTH_PENDING);
    AuthDAO.createAuth(auth)
      .done(function (status) {
        Dispatcher.dispatch(Constants.API_CREATE_AUTH, status);
        StatusActions.getStatus();
      }, function (err) {
        Dispatcher.dispatch(Constants.API_CREATE_AUTH_ERROR, err);
      });
  },

  getAuths: function () {
    Dispatcher.dispatch(Constants.API_GET_AUTHS_PENDING);
    AuthDAO.getAuths()
      .done(function (auths) {
        Dispatcher.dispatch(Constants.API_GET_AUTHS, auths);
      }, function (err) {
        Dispatcher.dispatch(Constants.API_GET_AUTHS_ERROR, err);
      });
  }

};

module.exports = AuthActions;