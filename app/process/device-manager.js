var _            = require("lodash");
var SSHDevice = require("./ssh-device");
var when         = require("when");

var knownDevices = [];

/**
 * Adds an IP address to a Cisco device's ACL
 * @param  {Object} deviceOpts Device details object
 * @param  {String} authIP     IP Address
 * @return {Promise}
 */
function authenticate(deviceOpts, authIP) {

  //Find existing device
  var device = _.findWhere(knownDevices, { host: deviceOpts.host, port: deviceOpts.port });
  //If no existing device, create new one
  if (!device) {
    device = new SSHDevice(deviceOpts);
    knownDevices.push(device);
  }

  //Execute command sequence
  return device.exec("/config/scripts/lan-auth.sh");
  
}

module.exports = {
  authenticate: authenticate
};