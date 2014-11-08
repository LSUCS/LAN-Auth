var TelnetClient = require("telnet-client");
var _            = require("lodash");
var when         = require("when");

module.exports = TelnetDevice;

/**
 * Abstract representation of a Telnet device
 * @param {Object} optionshah
 */
function TelnetDevice(options) {
  this._opts = _.extend({}, TelnetDevice.DEFAULTS, options);
  this._init();
}

TelnetDevice.DEFAULTS = {
  host: "127.0.0.1",
  port: 23,
  username: "root",
  password: "",
  timeout: 500,
  ors: "\r\n"
};

/**
 * Create telnet client
 */
TelnetDevice.prototype._init = function () {
  this._conn = new TelnetClient();
  this._bind();
};

/**
 * Bind listeners to client
 */
TelnetDevice.prototype._bind = function () {
  var self = this;

  var reject = function (err) {
    err = err || new Error("Telnet Connection Error");
    self._connected = false;
    self._connecting = false;
    self._setRejected(err);
  };

  //On success, resolve the ready promise
  this._conn.on("ready", function () {
    self._connected = true;
    self._connecting = false;
    self._setReady(self._conn);
  });
  
  //On error, reject
  this._conn.on("error", reject);
  this._conn.on("timeout", reject);
  this._conn.on("close", reject);
};

/**
 * Returns a promise that resolves once connection is established
 * @return {Promise}
 */
TelnetDevice.prototype._connect = function () {
  var dfrd = when.defer();
  if (this._connected) {
    dfrd.resolve(this._conn);
    return dfrd.promise;
  } if (this._connecting) {
    return this._ready;
  } else {
    this._ready = dfrd.promise;
    this._setReady = dfrd.resolve;
    this._setRejected = dfrd.reject;
    this._conn.connect(this._opts);
    this._connecting = true;
    return this._ready;
  }
};

/**
 * Execute a command
 * @param  {String} cmd
 * @return {Promise}
 */
TelnetDevice.prototype.exec = function (cmd) {
  return this._connect()
    .then(function (conn) {
      return when.promise(function (resolve) {
        conn.exec(cmd, function (data) {
          resolve(data);
        });
      });
    });
};