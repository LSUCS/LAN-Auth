var makeApp   = require("../../../test/lib/make-app");
var sequelize = require("../../models/sequelize");
var models    = require("../../models");
var expect    = require("chai").expect;
var getLan    = require("../../util/get-lan");

describe("Status Routes", function () {

  var app, lan;
  before(function (done) {
    makeApp()
      .then(function (_app) {
        app = _app;
        return getLan();
      })
      .then(function (_lan) {
        lan = _lan;
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

  describe("GET /status", function (done) {

    var authData = {
      ip: "127.0.0.1",
      lan: null,
      username: "test",
      seat: "A1"
    };

    var deviceData = {
      host: "192.168.0.1",
      port: "23",
      name: "server"
    };

    it("should succeed", function (done) {
      app.request("get", "status")
        .then(function (res) {
          expect(res.body.code).to.equal(200);
          expect(res.body.status).to.equal("success");
          done();
        });
    });

    it("should return ip", function (done) {
      app.request("get", "status")
        .then(function (res) {
          expect(res.body.data.ip).to.equal("127.0.0.1");
          done();
        });
    });

    it("should return lan", function (done) {
      app.request("get", "status")
        .then(function (res) {
          expect(res.body.data.lan).to.exist;
          done();
        });
    });

    it("should return unauthorised if no authentication exists", function (done) {
      app.request("get", "status")
        .then(function (res) {
          expect(res.body.data.status).to.equal("unauthorised");
          done();
       });
    });

    it("should only look up against current lan", function (done) {
      authData.lan = lan - 1;
      models.Authentication.create(authData)
        .then(function () {
          return models.Device.create(deviceData);
        })
        .then(function () {
          app.request("get", "status")
            .then(function (res) {
              expect(res.body.data.status).to.equal("unauthorised");
              done();
            });
        });
    });

    it("should return processing if authentication exists but not all devices are done", function (done) {
      authData.lan = lan;
      models.Authentication.create(authData)
        .then(function () {
          return models.Device.create(deviceData);
        })
        .then(function () {
          app.request("get", "status")
            .then(function (res) {
              expect(res.body.data.status).to.equal("processing");
              done();
            });
        });
    });

    it("should return authorised if authentication exists and all devices are done", function (done) {
      authData.lan = lan;
      var auth;
      models.Authentication.create(authData)
        .then(function (_auth) {
          auth = _auth;
          return models.Device.create(deviceData);
        })
        .then(function (device) {
          return auth.addDevice(device);
        })
        .then(function () {
          app.request("get", "status")
            .then(function (res) {
              expect(res.body.data.status).to.equal("authorised");
              done();
            });
        });
    });

  });

});