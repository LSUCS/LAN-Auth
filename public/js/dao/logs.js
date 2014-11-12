var inherits = require("inherits");
var DAO      = require("../lib/dao");

function LogsDAO() {
  this.base = "/logs";
}

inherits(LogsDAO, DAO);

LogsDAO.prototype.getLogs = function () {
  return this.get("/");
};

module.exports = new LogsDAO();