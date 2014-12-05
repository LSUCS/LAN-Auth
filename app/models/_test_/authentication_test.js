var expect = require("chai").expect;
var _      = require("lodash");

var models = require("../index");
var sequelize = require("../sequelize");

describe("AuthenticationModel", function () {

  beforeEach(function (done) {
    sequelize.sync({ force: true })
      .done(function () {
        done();
      }, done);
  });

  it("should require ip field", function (done) {
    models.Authentication.create({}).catch(function (err) {
      err = _.findWhere(err.errors, { path: "ip" });
      expect(err).to.exist;
      done();
    });
  });

  it("should require lan field", function (done) {
    models.Authentication.create({}).catch(function (err) {
      err = _.findWhere(err.errors, { path: "lan" });
      expect(err).to.exist;
      done();
    });
  });

  it("should not allow duplicate ip+lan", function (done) {
    var data = {
      ip: "192.168.0.1",
      lan: "48",
      username: "user"
    };
    models.Authentication.create(data)
      .then(function () {
        return models.Authentication.create(data);
      })
      .catch(function () {
        done();
      });
  });

  it("should return unprocessed devices", function (done) {
    var data = {
      host: "127.0.0.1",
      port: 23,
      name: "Server1"
    };
    models.Device.create(data)
      .then(function () {
        return models.Authentication.create({
          ip: "192.168.0.1",
          lan: "48",
          username: "user"
        });
      })
      .then(function (auth) {
        return auth.getUnprocessedDevices();
      })
      .then(function (devices) {
        expect(devices).to.be.instanceof(Array);
        var device = devices[0];
        expect(device.host).to.equal(data.host);
        expect(device.port).to.equal(data.port);
        expect(device.name).to.equal(data.name);
        done();
      })
      .catch(done);
  });

});