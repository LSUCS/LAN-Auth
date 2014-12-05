var _         = require("lodash");
var SSHDevice = require("./ssh-device");
var when      = require("when");
var log       = require("../log");

function DeviceManager() {
  this.knownDevices = [];
}

/**
 * Returns a device instance matching inputted options
 * Will be created if not found
 * @param  {Object}    deviceOpts Device details object
 * @return {SSHDevice}
 */
DeviceManager.prototype.getDevice = function (deviceOpts) {

  //Find existing device
  var device = _.find(this.knownDevices, function (knownDevice) {
    return knownDevice.matches(deviceOpts);
  });
  
  //If no existing device, create new one
  if (!device) {
    device = new SSHDevice(deviceOpts);
    device.init();
    this.knownDevices.push(device);
  }

  return device;

};

/**
 * Adds an IP address to an EdgeOS device's firewall
 * @param  {Object} deviceOpts Device details object
 * @param  {String} authIP     IP Address
 * @return {Promise}
 */
DeviceManager.prototype.authenticate = function (deviceOpts, auth) {

  var device = this.getDevice(deviceOpts);

  //Execute command sequence
  var args = [
    auth.lan,
    auth.username,
    auth.ip
  ];
  var cmd = "sh /config/scripts/lan-auth.sh " + args.join(" ");
  return device.exec(cmd);
  
};

module.exports = new DeviceManager();