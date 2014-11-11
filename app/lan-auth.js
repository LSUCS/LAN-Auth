var express    = require("express");
var log        = require("./log");
var bodyParser = require("body-parser");
var sequelize  = require("./models/sequelize");
var validator  = require("express-validator");
var _          = require("lodash");
var config     = require("config");
var when       = require("when");
var path       = require("path");

//Load models - causes them to register with Sequelize
require("./models");

module.exports = LanAuth;

/**
 * Responsible for booting the app, mounting middleware and routes
 * and then starting the server.
 */
function LanAuth() {
  this.app = express();
  this.app.enable("trust proxy");
  this._mount();
}

/**
 * Initialise the server
 * @return {Promise}
 */
LanAuth.prototype.init = function () {
  return sequelize.sync()
    .then(this._listen.bind(this));
};

/**
 * Set the server to listen
 * @return {Promise}
 */
LanAuth.prototype._listen = function () {
  var self = this;
  return when.promise(function (resolve) {
    self.server = self.app.listen(config.app.port, function () {
      var address = self.server.address();
      log.info("LAN-Auth server started on %s:%s", address.address, address.port);
      resolve(self.server);
    });
  });
};

/**
 * Mount middleware/routes on the app
 */
LanAuth.prototype._mount = function () {

  //Body parsing
  this.app.use(bodyParser.json());
  this.app.use(validator());

  //JSON output utility
  this.app.use(config.app.apiBase, function (req, res, next) {
    res._json = res.json.bind(res);
    res.json = function (data) {
      res._json({
        status: "success",
        code: res.statusCode || 200,
        data: data || {}
      });
    };
    next();
  });

  //Validation helper
  this.app.use(config.app.apiBase, function (req, res, next) {
    req.validate = function () {
      var errors = req.validationErrors();
      if (errors) {
        var err = new Error("ValidationErrors");
        err.status = 400;
        err.data = errors;
        throw err;
      }
    };
    next();
  });

  //Mount routes
  var routes = require("require-all")({
    dirname: __dirname + "/routes",
    filter: /(.+)\.js$/,
    excludeDirs: /^_test_$/,
    dependencies: {}
  });
  _.each(routes, function (route) {
    this.app.use(path.join("/", config.app.apiBase, route.mount), route.router);
  }, this);

  //Error handling
  this.app.use(config.app.apiBase, function (err, req, res, next) {
    if (!err.status) {
      err.status = 500;
    }
    var msg;
    if (err.status >= 500) {
      msg = {
        status: "fail",
        code: err.status,
        message: err.message || err.name || "Internal Server Error"
      };
      log.error(err.message || err.name);
      log.error(err.stack);
    } else if (err.status >= 400) {
      msg = {
        status: "error",
        code: err.status,
        message: err.message || err.name || "Unknown Request Error",
        data: err.data || ""
      };
    }
    res.status(err.status);
    res._json(msg);
  });

};
