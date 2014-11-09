var utils    = require("util");
var winston  = require("winston");
var LogModel = require("../models/log");

module.exports = MySQL;

function MySQL(options) {
  this.options = options || {};
}

utils.inherits(MySQL, winston.Transport);

winston.transports.MySQL = MySQL;

MySQL.prototype.name = "MySQL";

MySQL.prototype.log = function (level, msg, meta, callback) {
  if (!this.options.silent) {
    LogModel.create({
      message: msg,
      level: level,
      meta: JSON.stringify(meta)
    })
    .then(function () {
      callback(null, true);
    })
    .catch(function (err) {
      callback(err, false);
    });
  }
};
