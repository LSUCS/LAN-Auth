var expect = require("chai").expect;
var when = require("when");

var sequelize = require("../../models/sequelize");
var models = require("../../models");
var makeLanApiServer = require("../../../test/lib/make-lan-api-server");
var process = require("../");
var deviceManager = require("../device-manager");

describe("Processor", function () {

  var oldFn;
  before(function (done) {
    oldFn = deviceManager.authenticate;
    deviceManager.authenticate = function (deviceOpts) {
      if (deviceOpts.name === "fail") {
        return when.reject(false);
      } else {
        return when.resolve(true);
      }
    };
    makeLanApiServer().then(function () {
      done();
    });
  });

  after(function () {
    deviceManager.authenticate = oldFn;
  });

  var server;
  beforeEach(function (done) {
    sequelize.sync({ force: true })
      .then(function () {
        return models.Device.create({
          host: "192.168.0.1",
          port: 22,
          name: "server1"
        });
      })
      .then(function () {
        done();
      });
  });

  it("should mark the device as authenticated", function (done) {
    var data = {
      ip: "192.168.0.1",
      lan: "48",
      username: "user"
    };
    models.Authentication.create(data)
      .then(process)
      .then(function () {
        return models.Authentication.find({
          where: data
        });
      })
      .then(function (auth) {
        return auth.getDevices();
      })
      .then(function (devices) {
        expect(devices).to.not.be.empty;
        done();
      });
  });

  it("should still process other devices if one errors", function (done) {
    var deviceData = {
      host: "127.0.0.1",
      port: 80,
      name: "fail"
    };
    var authData = {
      ip: "192.168.0.1",
      lan: "48",
      username: "user"
    };
    models.Device.create(deviceData)
      .then(function () {
        return models.Authentication.create(authData);
      })
      .then(process)
      .then(function () {
        return models.Authentication.find({ where: authData });
      })
      .then(function (auth) {
        return auth.getDevices();
      })
      .then(function (devices) {
        expect(devices).to.have.length(1);
        done();
      });
  });

});