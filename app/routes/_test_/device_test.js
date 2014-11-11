var makeApp          = require("../../../test/lib/make-app");
var sequelize        = require("../../models/sequelize");
var models           = require("../../models");
var expect           = require("chai").expect;
var log              = require("../../log");
var config           = require("config");
var requireAdminTest = require("../../../test/lib/require-admin");

describe("Device Routes", function () {

  var app;
  before(function (done) {
    makeApp()
      .then(function (_app) {
        app = _app;
        done();
      });
  });
  after(function (done) {
    app.server.close(done);
  });

  beforeEach(function (done) {
    sequelize.sync({ force: true })
      .then(function () {
        done();
      });
  });

  var deviceData = {
    host: "127.0.0.1",
    port: 23,
    name: "server"
  };

  describe("GET /device", function (done) {

    it("should return devices", function (done) {
      models.Device.create(deviceData)
        .then(function () {
          return app.request("get", "device");
        })
        .then(function (res) {
          expect(res.body.code).to.equal(200);
          expect(res.body.status).to.equal("success");
          expect(res.body.data).to.not.be.empty;
          var device = res.body.data[0];
          expect(device).to.exist;
          expect(device.host).to.equal(deviceData.host);
          expect(device.port).to.equal(deviceData.port);
          expect(device.name).to.equal(deviceData.name);
          done();
        });
    });

    it("should require admin access", function (done) {
      requireAdminTest(done, app, "get", "device");
    });

  });

  describe("POST /device", function (done) {

    it("should store device in database", function (done) {
      app.request("post", "device", deviceData)
        .then(function (res) {
          expect(res.body.code).to.equal(200);
          expect(res.body.status).to.equal("success");
          return models.Device.all();
        })
        .then(function (devices) {
          expect(devices.length).to.equal(1);
          expect(devices[0].host).to.equal(deviceData.host);
          expect(devices[0].port).to.equal(deviceData.port);
          expect(devices[0].name).to.equal(deviceData.name);
          done();
        });
    });

    it("should require admin access", function (done) {
      requireAdminTest(done, app, "post", "device", deviceData);
    });

  });

  describe("DELETE /device", function () {

    it("should delete all devices", function (done) {
      models.Device.create(deviceData)
        .then(function () {
          return app.request("delete", "device");
        })
        .then(function () {
          models.Device.all();
        })
        .then(function (devices) {
          expect(devices).to.be.empty;
          done();
        });
    });

    it("should require admin access", function (done) {
      requireAdminTest(done, app, "delete", "device", {});
    });

  });

  describe("PUT /device/:deviceId", function () {

    it("should update an existing device", function (done) {
      models.Device.create(deviceData)
        .then(function (device) {
          var updateData = {
            port: 22
          };
          return app.request("put", "device/" + device.id, updateData);
        })
        .then(function () {
          return models.Device.all();
        })
        .then(function (devices) {
          expect(devices.length).to.equal(1);
          expect(devices[0].port).to.equal(22);
          done();
        });
    });

    it("should require admin access", function (done) {
      requireAdminTest(done, app, "put", "device/1", {});
    });

  });

  describe("DELETE /device/:deviceId", function () {

    it("should delete an individual device", function (done) {
      var device;
      models.Device.create(deviceData)
        .then(function (_device) {
          device = _device;
          return app.request("delete", "device/" + device.id);
        })
        .then(function () {
          models.Device.find(device.id);
        })
        .then(function (foundDevice) {
          expect(foundDevice).to.not.exist;
          done();
        });
    });

    it("should not delete other devices", function (done) {
      var deviceData2 = {
        host: "127.0.0.2",
        port: 23,
        name: "server2"
      };
      models.Device.bulkCreate([deviceData, deviceData2])
        .then(function () {
          return models.Device.all();
        })
        .then(function (devices) {
          return app.request("delete", "device/" + devices[0].id);
        })
        .then(function () {
          return models.Device.all();
        })
        .then(function (devices) {
          expect(devices.length).to.equal(1);
          done();
        });
    });

    it("should require admin access", function (done) {
      requireAdminTest(done, app, "delete", "device/1", {});
    });

  });

});