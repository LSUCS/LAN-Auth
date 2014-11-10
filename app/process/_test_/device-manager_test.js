var expect = require("chai").expect;
var deviceManager    = require("../device-manager");
var makeTelnetServer = require("../../../test/lib/make-telnet-server");

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

  it("should reject on telnet issues", function (done) {
    deviceManager.authenticate({
      host: "127.0.0.1",
      port: "80"
    }).catch(function () {
      done();
    });
  });

});