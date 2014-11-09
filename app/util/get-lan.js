var when    = require("when");
var request = require("request");
var config  = require("config");

var lanApi = require("./lan-api");

module.exports = getLan;

var lastUpdated;
var lastResult;

/**
 * Retrieves the current LAN number from the LAN Website API. Result is cached.
 * @return {Promise}
 */
function getLan() {
  var now = new Date();
  if (now.getTime() - lastUpdated < config.lanApi.lanNumber.cache * 1000) {
    return when.resolve(lastResult);
  } else {
    return lanApi.get("lannumber")
      .then(function (data) {
        lastUpdated = new Date().getTime();
        lastResult = data.lan;
        return data.lan;
      });
  }
}