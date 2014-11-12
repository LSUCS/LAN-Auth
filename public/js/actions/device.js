var Dispatcher = require("../dispatcher");
var DeviceDAO = require("../dao/device");
var Constants  = require("../constants");

var DeviceActions = {

  getDevices: function () {
    Dispatcher.dispatch(Constants.API_GET_DEVICES_PENDING);
    DeviceDAO.getDevices()
      .done(function (devices) {
        Dispatcher.dispatch(Constants.API_GET_DEVICES, devices);
      }, function (err) {
        Dispatcher.dispatch(Constants.API_GET_DEVICES_ERROR, err);
      });
  }

};

module.exports = DeviceActions;