var inherits = require("inherits");
var DAO      = require("../lib/dao");

function DeviceDAO() {
  this.base = "/device";
}

inherits(DeviceDAO, DAO);

DeviceDAO.prototype.getDevices = function () {
  return this.get("/");
};

DeviceDAO.prototype.createDevice = function (Device) {
  return this.post("/", Device);
};

DeviceDAO.prototype.deleteDevices = function () {
  return this.delete("/");
};

DeviceDAO.prototype.updateDevice = function (device) {
  return this.put("/" + device.id, device);
};

DeviceDAO.prototype.deleteDevice = function (deviceId) {
  return this.delete("/" + deviceId);
};

module.exports = new DeviceDAO();