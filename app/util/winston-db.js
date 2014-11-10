var utils    = require("util");
var winston  = require("winston");
var LogModel = require("../models/log");

module.exports = DB;

function DB(options) {
  this.options = options || {};
}

utils.inherits(DB, winston.Transport);

winston.transports.DB = DB;

DB.prototype.name = "DB";

DB.prototype.log = function (level, msg, meta, callback) {
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
