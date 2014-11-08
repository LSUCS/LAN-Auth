var winston = require("winston");
var _       = require("lodash");
var config  = require("config");

var transports = [];

transports.push(new(winston.transports.Console)(_.extend({
  level: "debug",
  colorize: true,
  timestamp: true,
  handleExceptions: true
}, config.log.console)));

transports.push(new(winston.transports.File)(_.extend({
  level: "error",
  timestamp: true,
  handleExceptions: true
}, config.log.file)));

module.exports = new winston.Logger({
  transports: transports
});