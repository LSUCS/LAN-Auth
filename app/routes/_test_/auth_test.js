var makeApp          = require("../../../test/lib/make-app");
var sequelize        = require("../../models/sequelize");
var models           = require("../../models");
var expect           = require("chai").expect;
var log              = require("../../log");
var config           = require("config");
var requireAdminTest = require("../../../test/lib/require-admin");
var getLan           = require("../../util/get-lan");

describe("Auth Routes", function () {

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


  describe("POST /auth", function (done) {

    it("should error if auth already exists for current lan", function (done) {
      var authData = {
        ip: "127.0.0.1",
        username: "test",
        password: "test",
        seat: "A8",
        lan: lan
      };
      models.Authentication.create(authData)
        .then(function () {
          return app.request("post", "auth", authData);
        })
        .then(function (res) {
          expect(res.body.code).to.equal(400);
          expect(res.body.status).to.equal("error");
          done();
        })
        .catch(done);
    });

    it("should not reject if auth exists for old lan", function (done) {
      var authData = {
        ip: "127.0.0.1",
        username: "test",
        password: "test",
        seat: "A8",
        lan: lan - 1
      };
      models.Authentication.create(authData)
        .then(function () {
          authData.lan = lan;
          return app.request("post", "auth", authData);
        })
        .then(function (res) {
          expect(res.body.code).to.equal(200);
          expect(res.body.status).to.equal("success");
          done();
        })
        .catch(done);
    });

    it("should error if LAN api errors", function (done) {
      var authData = {
        username: "error",
        password: "test",
        seat: "A8"
      };
      app.request("post", "auth", authData)
        .then(function (res) {
          expect(res.body.code).to.equal(400);
          expect(res.body.status).to.equal("error");
          done();
        })
        .catch(done);
    });

    it("should fail if LAN api fails", function (done) {
      var authData = {
        username: "fail",
        password: "test",
        seat: "A8"
      };
      app.request("post", "auth", authData)
        .then(function (res) {
          expect(res.body.code).to.equal(500);
          expect(res.body.status).to.equal("fail");
          done();
        })
        .catch(done);
    });

    it("should store new auths in database", function (done) {
      var authData = {
        username: "test",
        password: "test",
        seat: "A8"
      };
      app.request("post", "auth", authData)
        .then(function (res) {
          return models.Authentication.all();
        })
        .then(function (auths) {
          expect(auths).to.be.instanceof(Array);
          var auth = auths[0];
          expect(auth).to.exist;
          expect(auth.username).to.equal(authData.username);
          expect(auth.seat).to.equal(authData.seat);
          expect(auth.lan).to.equal(lan);
          done();
        })
        .catch(done);
    });

  });

  describe("GET /auth", function (done) {

    it("should return auths", function (done) {
      var authData = {
        ip: "127.0.0.1",
        username: "test",
        seat: "A8",
        lan: lan
      };
      models.Authentication.create(authData)
        .then(function () {
          return app.request("get", "auth");
        })
        .then(function (res) {
          expect(res.body.code).to.equal(200);
          expect(res.body.status).to.equal("success");
          expect(res.body.data).to.not.be.empty;
          var auth = res.body.data[0];
          expect(auth).to.exist;
          expect(auth.ip).to.equal(authData.ip);
          expect(auth.username).to.equal(authData.username);
          expect(auth.seat).to.equal(authData.seat);
          expect(auth.lan).to.equal(authData.lan);
          done();
        })
        .catch(done);
    });

    it("should only return auths for current lan", function (done) {
      var authData = {
        ip: "127.0.0.1",
        username: "test",
        seat: "A8",
        lan: lan - 1
      };
      models.Authentication.create(authData)
        .then(function () {
          return app.request("get", "auth");
        })
        .then(function (res) {
          expect(res.body.data).to.be.empty;
          done();
        })
        .catch(done);
    });

    it("should require admin access", function (done) {
      requireAdminTest(done, app, "get", "auth");
    });

  });

  describe("DELETE /auth", function (done) {

    it("should delete auths of current lan", function (done) {
      var authData = {
        ip: "127.0.0.1",
        username: "test",
        seat: "A8",
        lan: lan
      };
      models.Authentication.create(authData)
        .then(function () {
          return app.request("delete", "auth");
        })
        .then(function () {
          return models.Authentication.all();
        })
        .then(function (auths) {
          expect(auths).to.be.empty;
          done();
        })
        .catch(done);
    });

    it("should not delete auths of other lans", function (done) {
      var authData = {
        ip: "127.0.0.1",
        username: "test",
        seat: "A8",
        lan: lan - 1
      };
      models.Authentication.create(authData)
        .then(function () {
          return app.request("delete", "auth");
        })
        .then(function () {
          return models.Authentication.all();
        })
        .then(function (auths) {
          expect(auths).to.not.be.empty;
          done();
        })
        .catch(done);
    });

  });

  describe("PUT /auth", function (done) {

    it("should create auth with custom IP", function (done) {
      app.request("put", "auth", { ip: "192.168.0.1" })
        .then(function () {
          return models.Authentication.all();
        })
        .then(function (auths) {
          expect(auths).to.not.be.empty;
          expect(auths[0]).to.exist;
          expect(auths[0].ip).to.equal("192.168.0.1");
          expect(auths[0].lan).to.equal(lan);
          done();
        })
        .catch(done);
    });

  });

  describe("DELETE /auth/:authId", function (done) {

    it("should delete a specific auth id", function (done) {
      var authData = {
        ip: "127.0.0.1",
        username: "test",
        seat: "A8",
        lan: lan
      };
      models.Authentication.create(authData)
        .then(function (auth) {
          return app.request("delete", "auth/" + auth.id);
        })
        .then(function () {
          return models.Authentication.all();
        })
        .then(function (auths) {
          expect(auths).to.be.empty;
          done();
        })
        .catch(done);
    });

    it("should not delete other auths", function (done) {
      var authData = [{
        ip: "127.0.0.1",
        username: "test",
        seat: "A8",
        lan: lan
      }, {
        ip: "127.0.0.2",
        username: "test2",
        seat: "A9",
        lan: lan
      }];
      models.Authentication.bulkCreate(authData)
        .then(function () {
          return models.Authentication.all();
        })
        .then(function (auths) {
          return app.request("delete", "auth/" + auths[0].id);
        })
        .then(function () {
          return models.Authentication.all();
        })
        .then(function (auths) {
          expect(auths.length).to.equal(1);
          done();
        })
        .catch(done);
    });

  });

});