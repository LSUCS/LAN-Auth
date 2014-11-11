var expect = require("chai").expect;

var models = require("../../models");
var sequelize = require("../../models/sequelize");

var winston = require("winston");

describe("Winston DB", function () {

  var log;
  beforeEach(function (done) {
    log = new winston.Logger({
      transports: [new(winston.transports.DB)({ silent: false })]
    });
    sequelize.sync({ force: true })
      .then(function () {
        done();
      });
  });

  it("should store logs", function (done) {
    log.info("testing123", function () {
      models.Log.findAll()
        .then(function (logs) {
          expect(logs).to.not.be.empty;
          expect(logs[0].level).to.equal("info");
          expect(logs[0].message).to.equal("testing123");
          done();
        });
    });
  });


});