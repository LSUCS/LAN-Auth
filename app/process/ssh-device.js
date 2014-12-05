var sequest = require("sequest");
var when    = require("when");
var _       = require("lodash");
var log     = require("../log");

function SSHDevice(options) {
  this._opts = _.extend({}, SSHDevice.DEFAULTS, options);
  this._queue = [];
}

SSHDevice.DEFAULTS = {
  host: "127.0.0.1",
  port: 22,
  username: "root",
  password: ""
};

SSHDevice.prototype.init = function () {
  this._seq = sequest(this._opts.username + "@" + this._opts.host + ":" + this._opts.port, this._opts);
};

SSHDevice.prototype.matches = function (deviceOpts) {
  return _.every(deviceOpts, function (value, key) {
    return this._opts[key] == value;
  }, this);
};

SSHDevice.prototype.exec = function (cmd) {
  this._seq.write(cmd);
  return when.resolve(true);
  /*var self = this;
  var dfrd = when.defer();
  var fn = function () {
    self._seq(cmd, function (err, stdout) {
      if (err) {
        dfrd.reject(err);
      } else {
        dfrd.resolve(stdout);
      }
      self._shiftQueue();
      self._processQueue();
    });
  };
  this._pushQueue(fn);
  return dfrd.promise;*/
};

SSHDevice.prototype._pushQueue = function (fn) {
  this._queue.push(fn);
  if (this._queue.length === 1) {
    this._processQueue();
  }
};

SSHDevice.prototype._shiftQueue = function () {
  this._queue.shift();
};

SSHDevice.prototype._processQueue = function () {
  if (this._queue.length > 0) {
    this._queue[0]();
  }
};

module.exports = SSHDevice;