var express    = require("express");
var log        = require("./log");
var bodyParser = require("body-parser");
var sequelize  = require("./models/sequelize");
var _          = require("lodash");
var config     = require("config");
var when       = require("when");

//Load models - causes them to register with Sequelize
require("./models");

module.exports = LanAuth;

function LanAuth() {
  this.app = express();
  this.app.enable("trust proxy");
  this._mount();
}

LanAuth.prototype.init = function () {
  return sequelize.sync()
    .then(this._listen.bind(this));
};

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

LanAuth.prototype._mount = function () {

  //Body parsing
  this.app.use(bodyParser.json());

  //JSON output utility
  this.app.use("/api", function (req, res, next) {
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

  //Mount routes
  var routes = require("require-all")({
    dirname: __dirname + "/routes",
    filter: /(.+)\.js$/,
    excludeDirs: /^_test_$/,
    dependencies: {}
  });
  _.each(routes, function (route) {
    this.app.use("/api" + route.mount, route.router);
  }, this);

  //Error handling
  this.app.use(function (err, req, res, next) {
    if (!err.status) {
      err.status = 500;
    }
    var msg
    if (err.status >= 500) {
      msg = {
        status: "fail",
        code: err.status,
        message: err.message || err.name || "Internal Server Error"
      };
      log.err(err.message || err.name);
      log.err(err.stack);
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