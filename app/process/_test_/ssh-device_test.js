var expect = require("chai").expect;
var _ = require("lodash");
var when = require("when");

var SSHDevice = require("./../ssh-device");

describe("SSHDevice", function () {

  var device;

  beforeEach(function () {
    device = new SSHDevice();
  });

  it("should send commands", function (done) {
    device._seq = function (cmd) {
      expect(cmd).to.equal("test");
      done();
    };
    device.exec("test");
  });

  it("should return a promise", function () {
    device._seq = function () { };
    var res = device.exec("test");
    expect(when.isPromiseLike(res)).to.be.true;
  });

  it("should reject on error", function (done) {
    device._seq = function (cmd, cb) {
      cb(new Error("test"));
    };
    device.exec("test")
      .then(function () {
        done(new Error("Promise resolved"));
      })
      .catch(function (err) {
        expect(err.message).to.equal("test");
        done();
      });
  });

  it("should resolve on success", function (done) {
    device._seq = function (cmd, cb) {
      cb(null, "test");
    };
    device.exec("test")
      .then(function (res) {
        expect(res).to.equal("test");
        done();
      })
      .catch(done);
  });

  it("should process multiple commands in series", function (done) {
    var commands = [
      "test1",
      "test2",
      "test3"
    ];
    var len = commands.length;
    device._seq = function (cmd, cb) {
      expect(commands.length).to.equal(len);
      commands.shift();
      setTimeout(function () {
        len--;
        cb(null, true);
      }, 10);
    };
    when.map(commands, device.exec.bind(device))
      .then(function () {
        done();
      })
      .catch(done);
  });

});