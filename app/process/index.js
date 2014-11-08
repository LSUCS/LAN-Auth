var _       = require("lodash");
var when    = require("when");
var log     = require("../log");

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
            })
            .then(function () {
              log.info("Authenticated user %s with device %s:%s", auth.ip, device.host, device.port);
            })
            .catch(function (err) {
              log.error(err);
            });
        });
      });
  });
}

function process() {
  log.profile("Auth Process");
  return getLan()
    .then(function (lan) {
      //Retrieve all auths for the current LAN
      return models.Authentication.findAll({
        where: { lan: lan }
      });
    })
    .then(processAuths)
    .then(function () {
      log.profile("Auth Process");
    });
}