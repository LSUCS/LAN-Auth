var inherits = require("inherits");
var DAO      = require("../lib/dao");

function AuthDAO() {
  this.base = "/auth";
}

inherits(AuthDAO, DAO);

AuthDAO.prototype.getAuths = function () {
  return this.get("/");
};

AuthDAO.prototype.createAuth = function (auth) {
  return this.post("/", auth);
};

AuthDAO.prototype.deleteAuths = function () {
  return this.delete("/");
};

AuthDAO.prototype.createUnverifiedAuth = function (auth) {
  return this.put("/", auth);
};

AuthDAO.prototype.deleteAuth = function (authId) {
  return this.delete("/" + authId);
};

module.exports = new AuthDAO();