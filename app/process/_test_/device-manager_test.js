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
    var command = "/config/scripts/lan-auth.sh " + args.join(" ");
    var sshDevice = new SSHDevice(device);
    sshDevice.exec = function (cmd) {
      expect(cmd).to.equal(command);
      done();
    };
    deviceManager.knownDevices.push(sshDevice);
    deviceManager.authenticate(device, auth);
  });

  it("should reuse SSHDevice instances");

});