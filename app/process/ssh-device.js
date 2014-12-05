var sequest = require("sequest");
var when    = require("when");
var nodefn  = require("when/node");


function SSHDevice(options) {
  this._opts = _.extend({}, TelnetDevice.DEFAULTS, options);
  this._init();
}

SSHDevice.DEFAULTS = {
  host: "127.0.0.1",
  port: 22,
  username: "root",
  password: ""
};

SSHDevice.prototype._init = function () {
  this._seq = nodefn.lift(sequest.connect(this._opts));
};

SSHDevice.prototype.exec = function (cmd) {
  return this._seq(cmd);
};