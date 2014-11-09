var DataTypes = require("sequelize");
var when      = require("when");
var sequelize = require("./sequelize");
var _         = require("lodash");

var Device = require("./device");

var Authentication = sequelize.define("Authentication", {
  ip: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: "authIndex"
  },
  lan: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: "authIndex"
  },
  username: {
    type: DataTypes.STRING
  },
  seat: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false,
  instanceMethods: {
    getUnprocessedDevices: function () {
      return when.join(this.getDevices(), Device.all())
        .spread(function (processedDevices, devices) {
          return _.filter(devices, function (device) {
            return !_.findWhere(processedDevices, { host: device.host, port: device.port });
          });
        });
    }
  }
});

Authentication.hasMany(Device);
Device.hasMany(Authentication);

module.exports = Authentication;