var makeLanApiServer = require("./lib/make-lan-api-server");
var config           = require("config");
var _                = require("lodash");

/**
 * Global before/after statements
 */

//Add mocha jshint tests
require('mocha-jshint')();

//Fake LAN API Server
var lanServer;
before(function (done) {
  makeLanApiServer().then(function (server) {
    lanServer = server;
    done();
  });
});
after(function (done) {
  lanServer.close(done);
});

//Config recovery
var backupConfig;
beforeEach(function () {
  backupConfig = _.cloneDeep(config);
});
afterEach(function () {
  _.assign(config, backupConfig);
});