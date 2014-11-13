var Dispatcher = require("../dispatcher");
var DeviceDAO = require("../dao/device");
var Constants  = require("../constants");

var DeviceActions = {

  createDevice: function (device) {
    Dispatcher.dispatch(Constants.API_CREATE_DEVICE_PENDING);
    DeviceDAO.createDevice(device)
      .done(function (device) {
        Dispatcher.dispatch(Constants.API_CREATE_DEVICE, device);
      }, function (err) {
        Dispatcher.dispatch(Constants.API_CREATE_DEVICE_ERROR, err);
      });
  },

  updateDevice: function (device) {
    Dispatcher.dispatch(Constants.API_UPDATE_DEVICE_PENDING);
    DeviceDAO.updateDevice(device)
      .done(function (device) {
        Dispatcher.dispatch(Constants.API_UPDATE_DEVICE, device);
      }, function (err) {
        Dispatcher.dispatch(Constants.API_UPDATE_DEVICE_ERROR, err);
      });
  },

  getDevices: function () {
    Dispatcher.dispatch(Constants.API_GET_DEVICES_PENDING);
    DeviceDAO.getDevices()
      .done(function (devices) {
        Dispatcher.dispatch(Constants.API_GET_DEVICES, devices);
      }, function (err) {
        Dispatcher.dispatch(Constants.API_GET_DEVICES_ERROR, err);
      });
  },

  deleteDevice: function (deviceId) {
    Dispatcher.dispatch(Constants.API_DELETE_DEVICE_PENDING);
    DeviceDAO.deleteDevice(deviceId)
      .done(function () {
        Dispatcher.dispatch(Constants.API_DELETE_DEVICE, deviceId);
      }, function (err) {
        Dispatcher.dispatch(Constants.API_DELETE_DEVICE_ERROR, err);
      });
  },

  deleteDevices: function () {
    Dispatcher.dispatch(Constants.API_DELETE_DEVICES_PENDING);
    DeviceDAO.deleteDevices()
      .done(function () {
        Dispatcher.dispatch(Constants.API_DELETE_DEVICES);
      }, function (err) {
        Dispatcher.dispatch(Constants.API_DELETE_DEVICES_ERROR, err);
      });
  }

};

module.exports = DeviceActions;