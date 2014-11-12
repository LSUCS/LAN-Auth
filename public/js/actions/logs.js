var Dispatcher = require("../dispatcher");
var LogsDAO  = require("../dao/logs");
var Constants  = require("../constants");

var LogsActions = {

  getLogs: function () {
    Dispatcher.dispatch(Constants.API_GET_LOGS_PENDING);
    LogsDAO.getLogs()
      .done(function (auths) {
        Dispatcher.dispatch(Constants.API_GET_LOGS, auths);
      }, function (err) {
        Dispatcher.dispatch(Constants.API_GET_LOGS_ERROR, err);
      });
  }

};

module.exports = LogsActions;