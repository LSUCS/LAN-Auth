var expect = require("chai").expect;
var _      = require("lodash");

var models = require("../../models");
var sequelize = require("../../models/sequelize");

var addAuth = require("../add-auth");

describe("Add-Auth Middleware", function () {

  beforeEach(function (done) {
    sequelize.sync({ force: true })
      .then(function () {
        done();
      });
  });

  it("should add auth if exists", function (done) {
    var data = {
      ip: "192.168.0.1",
      lan: "48",
      username: "user"
    };
    models.Authentication.create(data)
      .then(function () {
        var req = { ip: data.ip, lan: data.lan };
        addAuth(req, {}, function () {
          expect(req.auth).to.exist;
          expect(req.auth.ip).to.eql(data.ip);
          expect(req.auth.username).to.eql(data.username);
          expect(req.auth.lan).to.eql(data.lan);
          done();
        });
      });
  });

  it("should not add auth if doesn't exists", function (done) {
    var req = { ip: "127.0.0.1", lan: "48" };
    addAuth(req, {}, function () {
      expect(req.auth).to.not.exist;
      done();
    });
  });

});