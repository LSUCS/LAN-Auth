var _       = require("lodash");
var when    = require("when");

var models        = require("../models");
var deviceManager = require("./device-manager");
var getLan        = require("./get-lan");

module.exports = process;

function processAuths(auths) {
  auths = auths || [];
  return when.map(auths, function (auth) {
    //Retrieve the unprocessed devices for the auth
    return auth.getUnprocessedDevices()
      .then(function (devices) {
        //Authenticate with each device
        return when.map(devices, function (device) {
          return deviceManager.authenticate(device.dataValues, auth.ip)
            .then(function () {
              //On success, add the device to the auth
              return auth.addDevice(device);
              //TODO: logging
            })
            .catch(function (err) {
              //TODO: logging
            });
        });
      });
  });
}

function process() {
  return getLan()
    .then(function (lan) {
      //Retrieve all auths for the current LAN
      return models.Authentication.findAll({
        where: { lan: lan }
      });
    })
    .then(processAuths);
}