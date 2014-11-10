var makeApp          = require("../../../test/lib/make-app");
var sequelize        = require("../../models/sequelize");
var expect           = require("chai").expect;
var log              = require("../../log");
var config           = require("config");
var requireAdminTest = require("../../../test/lib/require-admin");

describe("Logs Routes", function () {

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
  })

  describe("GET /logs", function (done) {

    it("should succeed", function (done) {
      app.request("get", "logs")
        .then(function (res) {
          expect(res.body.code).to.equal(200);
          expect(res.body.status).to.equal("success");
          done();
        });
    });

    it("should return logs", function (done) {
      log.info("testing123", function () {
        app.request("get", "logs")
          .then(function (res) {
            expect(res.body.data).to.be.instanceof(Array);
            var row = res.body.data[0];
            expect(row).to.exist;
            expect(row.level).to.equal("info");
            expect(row.message).to.equal("testing123");
            done();
          });
      });
    });

    it("should require admin access", function (done) {
      requireAdminTest(done, app, "get", "logs");
    });

  });

});