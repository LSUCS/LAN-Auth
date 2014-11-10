var makeLanApiServer = require("./lib/make-lan-api-server");
var config           = require("config");

/**
 * Global before/after statements
 */

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