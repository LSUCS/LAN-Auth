var expect       = require("chai").expect;
var requireAdmin = require("../require-admin");
var _            = require("lodash");
var config       = require("config");

describe("Require-Admin Middleware", function () {

  var backupConfig = _.cloneDeep(config);

  afterEach(function () {
    _.assign(config, backupConfig);
  });

  it("should reject invalid key", function (done) {
    config.admin.key = "rightkey";
    config.admin.enable = true;
    var req = { headers: { authorization: "wrongkey" } };
    try {
      requireAdmin(req, {}, function () { });
    } catch (e) {
      done();
    }
  });

  it("should accept valid key", function (done) {
    config.admin.key = "rightkey";
    config.admin.enable = true;
    var req = { headers: { authorization: "rightkey" } };
    requireAdmin(req, {}, done);
  });

  it("should not do admin check if disabled", function (done) {
    config.admin.key = "rightkey";
    config.admin.enable = false;
    var req = { headers: { authorization: "wrongkey" } };
    requireAdmin(req, {}, done);
  });

});