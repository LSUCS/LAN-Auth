var expect = require("chai").expect;
var sinon  = require("sinon");

var TelnetDevice     = require("./../telnet-device");
var makeTelnetServer = require("../../../test/lib/make-telnet-server");
var TelnetClient     = require("telnet-client");


describe("TelnetDevice", function () {

  var server, device;

  beforeEach(function (done) {
    makeTelnetServer().then(function (_server) {
      server = _server;
      var address = server.address();
      device = new TelnetDevice({
        host: address.address,
        port: address.port
      });
      done();
    });
  });

  afterEach(function (done)  {
    server.die().then(done);
  });

  it("should create telnet connection", function () {
    expect(device._conn).to.be.instanceof(TelnetClient);
  });

  it("should reject on error", function (done) {
    server.close(function () {
      device.exec("test").catch(function () {
        done()
      });
    });
  });

  it("should connect to servers", function (done) {
    device.exec("test").then(function (data) {
      done();
    });
  });

  it("should transmit data", function (done) {
    server.onData(function (data) {
      expect(data).to.equal("test");
      done();
    });
    device.exec("test");
  });

});