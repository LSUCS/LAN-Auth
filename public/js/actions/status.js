var Dispatcher = require("../dispatcher");
var StatusDAO  = require("../dao/status");
var Constants  = require("../constants");

var StatusActions = {

  getStatus: function () {
    Dispatcher.dispatch(Constants.API_GET_STATUS_PENDING);
    StatusDAO.getStatus()
      .then(function (status) {
        Dispatcher.dispatch(Constants.API_GET_STATUS, status);
      })
      .catch(function (err) {
        Dispatcher.dispatch(Constants.API_GET_STATUS_ERROR, err);
      });
  }

};

module.exports = StatusActions;