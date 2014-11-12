var request = require("superagent");
var when    = require("when");
var path    = require("path-browserify");
var _       = require("lodash");

module.exports = DAO;

function DAO() { }

var methods = ["get", "put", "post", "delete"];
methods.forEach(function (method) {

  DAO.prototype[method] = function (pathname, data) {
    var self = this;
    return when.promise(function (resolve) {
      var req = request[method](path.join("/api", self.base, pathname));
      if (data) {
        req.send(data);
      }
      req.end(resolve);
    });
  };

});