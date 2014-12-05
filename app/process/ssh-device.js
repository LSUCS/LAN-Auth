var sequest = require("sequest");
var when    = require("when");
var nodefn  = require("when/node");
var _       = require("lodash");

function SSHDevice(options) {
  this._opts = _.extend({}, SSHDevice.DEFAULTS, options);
  this._init();
  this._queue = [];
}

SSHDevice.DEFAULTS = {
  host: "127.0.0.1",
  port: 22,
  username: "root",
  password: ""
};

SSHDevice.prototype.matches = function (deviceOpts) {
  return _.every(deviceOpts, function (value, key) {
    return this._opts[key] == value;
  }, this);
};

SSHDevice.prototype.exec = function (cmd) {
  var self = this;
  var dfrd = when.defer();
  var fn = function () {
    self._seq(cmd)
      .tap(self._shiftQueue.bind(self))
      .tap(self._processQueue.bind(self))
      .done(dfrd.resolve, dfrd.reject);
  };
  this._pushQueue(fn);
  return dfrd.promise;
};

SSHDevice.prototype._init = function () {
  this._seq = nodefn.lift(sequest.connect(this._opts));
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