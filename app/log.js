var winston = require("winston");
var _       = require("lodash");
var config  = require("config");
require("./util/winston-mysql");

var transports = [];

transports.push(new(winston.transports.Console)(_.extend({
  level: "debug",
  colorize: true,
  timestamp: true
}, config.log.console)));

transports.push(new(winston.transports.File)(_.extend({
  level: "error",
  timestamp: true
}, config.log.file)));

transports.push(new(winston.transports.MySQL)(config.log.mysql));

module.exports = new winston.Logger({
  transports: transports
});