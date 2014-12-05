var expect        = require("chai").expect;
var SSHDevice     = require("../ssh-device");
var deviceManager = require("../device-manager");
var when          = require("when");
var _             = require("lodash");

describe("DeviceManager", function () {

  before(function () {
    deviceManager.knownDevices = [];
  });

  afterEach(function () {
    deviceManager.knownDevices = [];
  });

  it("should send command to SSHDevice", function (done) {
    var device = {
      host: "192.168.0.1",
      port: 22
    };
    var auth = {
      ip: "192.168.0.50",
      lan: "48",
      username: "test"
    };
    var sshDevice = new SSHDevice(device);
    sshDevice.init = function () { };
    sshDevice.exec = function (cmd) {
      expect(cmd).to.exist;
      return when.resolve(true);
    };
    deviceManager.knownDevices.push(sshDevice);
    deviceManager.authenticate(device, auth)
      .then(function () {
        _.defer(done);
      });
  });

  it("should reuse SSHDevice instances", function () {
    var device = {
      host: "192.168.0.1",
      port: 22
    };
    var d1 = new SSHDevice(device);
    d1.init = function () { };
    deviceManager.knownDevices.push(d1);
    var d2 = deviceManager.getDevice(device);
    expect(d1).to.equal(d2);
    expect(deviceManager.knownDevices).to.have.length(1);
  });

});