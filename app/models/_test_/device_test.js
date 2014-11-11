var expect = require("chai").expect;
var _      = require("lodash");

var models = require("../index");
var sequelize = require("../sequelize");

describe("DeviceModel", function () {

  beforeEach(function (done) {
    sequelize.sync({ force: true })
      .then(function () {
        done();
      });
  });

  it("should require host", function (done) {
    models.Device.create({})
      .catch(function (err) {
        err = _.findWhere(err.errors, { path: "host" });
        expect(err).to.exist;
        done();
      });
  });

  it("should require name", function (done) {
    models.Device.create({})
      .catch(function (err) {
        err = _.findWhere(err.errors, { path: "name" });
        expect(err).to.exist;
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