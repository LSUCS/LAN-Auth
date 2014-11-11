var expect = require("chai").expect;
var _      = require("lodash");

var models = require("../index");
var sequelize = require("../sequelize");

describe("LogModel", function () {

  beforeEach(function (done) {
    sequelize.sync({ force: true })
      .then(function () {
        done();
      });
  });

  it("should require level", function (done) {
    models.Log.create({})
      .catch(function (err) {
        err = _.findWhere(err.errors, { path: "level" });
        expect(err).to.exist;
        done();
      });
  });

  it("should require message", function (done) {
    models.Log.create({})
      .catch(function (err) {
        err = _.findWhere(err.errors, { path: "message" });
        expect(err).to.exist;
        done();
      });
  });

});