var when    = require("when");
var request = require("request");

module.exports = getLan;

/**
 * Retrieves the current LAN number from the LAN Website API
 * @return {Promise}
 */
function getLan() {
  return when.promise(function (resolve, reject) {
    request.get({
      url: "http://lan.lsucs.org.uk/api/lannumber",
      json: true
    }, function (err, response) {
      if (err) {
        return reject(err);
      }
      resolve(response.body.lan);
    });
  });
}