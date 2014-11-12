var request    = require("superagent");
var when       = require("when");
var path       = require("path-browserify");
var _          = require("lodash");
var Dispatcher = require("../dispatcher");
var Constants  = require("../constants");

module.exports = DAO;

function DAO() { }

var methods = ["get", "put", "post", "delete"];
methods.forEach(function (method) {

  DAO.prototype[method] = function (pathname, data) {
    var self = this;
    return when.promise(function (resolve, reject) {
      var req = request[method](path.join("/api", self.base, pathname));
      if (data) {
        req.send(data);
      }
      req.end(function (err, res) {
        switch (res.body.status) {

          case "success":
            resolve(res.body.data);
            break;

          case "error":
          case "fail":
            err = new Error(res.body.message);
            err.data = res.body.data;
            if (err.code === 401) {
              Dispatcher.dispatch(Constants.API_ERROR_UNAUTHORISED);
            }
            reject(err);
            break;

          default:
            reject(new Error(err || "Unknown Error"));
            break;

        }
      });
    });
  };

});