var expect = require("chai").expect;
var sinon  = require("sinon");

var process = require("../../../app/process");
var sequelize = require("../../../app/models/sequelize");
var models = require("../../../app/models");
var makeTelnetServer = require("../../lib/make-telnet-server");

describe("Processor", function () {

  var server;
  beforeEach(function (done) {
    sequelize.sync({ force: true })
      .then(makeTelnetServer)
      .then(function (_server) {
        server = _server;
        return models.Device.create({
          host: server.address().address,
          port: server.address().port,
          name: "server1"
        });
      })
      .then(function () {
        done();
      });
  });

  afterEach(function (done) {
    server.die().then(done);
  });

  it("should process unprocessed devices", function (done) {
    var commands = [
      "conf t",
      "access-list 1 permit 192.168.0.1",
      "end",
      "exit"
    ];
    server.onData(function (data) {
      expect(data).to.equal(commands[0]);
      commands.shift();
    });
    models.Authentication.create({
      ip: "192.168.0.1",
      lan: "48"
    })
    .then(process)
    .then(function () {
      if (commands.length === 0) {
        done();
      }
    });
  });

  it("should mark the device as authenticated", function (done) {
    var data = {
      ip: "192.168.0.1",
      lan: "48"
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

});