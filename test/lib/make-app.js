var LanAuth = require("../../app/lan-auth");
var config  = require("config");
var request = require("request");
var url     = require("url");
var path    = require("path");
var when    = require("when");

module.exports = makeApp;

/**
 * Creates an instance of the app, either on the specified port or on the first available
 * @param  {int} port
 * @return {Object}
 */
function makeApp(port) {

  //Override port
  config.app.port = port;

  var lanAuth = new LanAuth();
  return lanAuth.init()
    .then(function (server) {
      var address = server.address();
      return {
        host: address.address,
        port: address.port,
        server: server,
        lanAuth: lanAuth,
        request: makeRequest
      };
    });
}

/**
 * Makes a request to the app
 * @param  {String} method HTTP method
 * @param  {String} path   Request path
 * @param  {Object} data   Optional data for POST/PUT request etc
 * @return {Promise}       Promise for the request response object
 */
function makeRequest(method, pathname, data) {
  var urlObj = {
    protocol: "http",
    hostname: this.host,
    port: this.port,
    pathname: path.join("/", config.app.apiBase, pathname)
  };
  return when.promise(function (resolve, reject) {
    request({
      method: method,
      url: url.format(urlObj),
      json: true,
      body: data
    }, function (err, res) {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
}