var expect = require("chai").expect;
var config = require("config");

module.exports = function (done, app) {
  var args = [].slice.call(arguments, 2);
  config.admin.enable = true;
  config.admin.key = "test";
  app.request.apply(app, args)
    .then(function (res) {
      expect(res.body.code).to.equal(401);
      expect(res.body.status).to.equal("error");
      done();
    });
};