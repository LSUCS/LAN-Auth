var makeLanApiServer = require("./lib/make-lan-api-server");
var config           = require("config");

var lanServer;

before(function (done) {
  makeLanApiServer().then(function (server) {
    lanServer = server;
    var address = server.address();
    config.lanApi.baseUrl = "http://" + address.address + ":" + address.port;
    done();
  });
});

after(function (done) {
  lanServer.close(done);
});