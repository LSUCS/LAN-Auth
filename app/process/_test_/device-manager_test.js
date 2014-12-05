var expect        = require("chai").expect;
var SSHDevice     = require("../ssh-device");
var deviceManager = require("../device-manager");

describe("DeviceManager", function () {

  before(function () {
    deviceManager.knownDevices = [];
  });

  afterEach(function () {
    deviceManager.knownDevices = [];
  });

  it("should send correct command to SSHDevice", function (done) {
    var device = {
      host: "192.168.0.1",
      port: 22
    };
    var auth = {
      ip: "192.168.0.50",
      lan: "48",
      username: "test"
    };
    var args = [auth.lan, auth.username, auth.ip];
    var command = "sh /config/scripts/lan-auth.sh " + args.join(" ");
    var sshDevice = new SSHDevice(device);
    sshDevice.init = function () { };
    sshDevice.exec = function (cmd) {
      expect(cmd).to.equal(command);
      done();
    };
    deviceManager.knownDevices.push(sshDevice);
    deviceManager.authenticate(device, auth);
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