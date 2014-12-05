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
    device._seq = {
      write: function (cmd) {
        expect(cmd).to.equal("test");
        done();
      }
    };
    device.exec("test");
  });

  it("should return a promise", function () {
    device._seq = {
      write: function () { }
    };
    var res = device.exec("test");
    expect(when.isPromiseLike(res)).to.be.true;
  });

  /*it("should reject on error", function (done) {
    device._seq = {
      write: function (cmd) {
      }
    };
    device.exec("test")
      .then(function () {
        done(new Error("Promise resolved"));
      })
      .catch(function (err) {
        done();
      });
  });*/

  it("should resolve on success", function (done) {
    device._seq = {
      write: function (cmd) {
      }
    };
    device.exec("test")
      .then(function (res) {
        done();
      })
      .catch(done);
  });

  /*it("should process multiple commands in series", function (done) {
    var commands = [
      "test1",
      "test2",
      "test3"
    ];
    var len = commands.length;
    device._seq = {
      write: function (cmd, cb) {
        expect(commands.length).to.equal(len);
        len--;
        setTimeout(function () {
          commands.shift();
          cb(null, true);
        }, 10);
      }
    };
    when.map(commands, device.exec.bind(device))
      .then(function () {
        done();
      })
      .catch(done);
  });*/

});