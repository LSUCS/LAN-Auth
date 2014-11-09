var expect = require("chai").expect;
var sinon  = require("sinon");
var _      = require("lodash");

var models = require("../index");
var sequelize = require("../sequelize");

describe("Models", function () {

  beforeEach(function (done) {
    sequelize.sync({ force: true })
      .then(function () {
        done();
      });
  });

  describe("Authentication", function () {

    it("should require ip field", function (done) {
      models.Authentication.create({ lan: "48", username: "user" }).catch(function (err) {
        var err = _.findWhere(err.errors, { path: "ip" });
        expect(err).to.exist;
        done();
      });
    });

    it("should require lan field", function (done) {
      models.Authentication.create({ ip: "192.168.0.1", username: "user" }).catch(function (err) {
        var err = _.findWhere(err.errors, { path: "lan" });
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
        });
    });

  });

  describe("Device", function () {

    it("should require host", function (done) {
      models.Device.create({ name: "Server1" })
        .catch(function () {
          done();
        });
    });

    it("should require name", function (done) {
      models.Device.create({ host: "127.0.0.1" })
        .catch(function () {
          done();
        });
    });

    it("should have default port", function (done) {
      models.Device.create({ host: "127.0.0.1", name: "Server1" })
        .then(function (device) {
          expect(device.port).to.be.a("number");
          expect(device.port).to.be.above(0);
          done();
        });
    });

    it("should not allow duplicate host+port", function (done) {
      models.Device.create({ host: "127.0.0.1", name: "Server1" })
        .then(function () {
          return models.Device.create({ host: "127.0.0.1", name: "Server2" });
        })
        .catch(function () {
          done();
        });
    });

    it("should not allow duplicate name", function (done) {
      models.Device.create({ host: "127.0.0.1", name: "Server1" })
        .then(function () {
          return models.Device.create({ host: "127.0.0.2", name: "Server1" });
        })
        .catch(function () {
          done();
        });
    });

  });

});