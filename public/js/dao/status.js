var inherits = require("inherits");
var DAO      = require("../lib/dao");

function StatusDAO() {
  this.base = "/status";
}

inherits(StatusDAO, DAO);

StatusDAO.prototype.getStatus = function () {
  return this.get("/");
};

module.exports = new StatusDAO();