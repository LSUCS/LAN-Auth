var expect = require("chai").expect;
var sinon  = require("sinon");

var deviceManager    = require("../../../app/process/device-manager");
var makeTelnetServer = require("../../lib/make-telnet-server");

describe("DeviceManager", function () {

  var server, receivedData, address;

  beforeEach(function (done) {
    makeTelnetServer().then(function (_server) {
      server = _server;
      address = server.address();
      done();
    });
  });

  afterEach(function (done) {
    server.die().then(done);
  });

  it("should send command sequence to server", function (done) {
    var commands = [
      "conf t",
      "access-list 1 permit 192.168.0.50",
      "end",
      "exit"
    ];
    server.onData(function (data) {
      expect(data).to.equal(commands[0]);
      commands.shift();
      if (commands.length === 0) {
        done();
      }
    });
    deviceManager.authenticate({
      host: address.address,
      port: address.port
    }, "192.168.0.50");
  });

});