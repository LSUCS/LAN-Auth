var DataTypes = require("sequelize");
var sequelize = require("./sequelize");

var Device = sequelize.define("Device", {
  host: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: "deviceIndex"
  },
  port: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 23,
    unique: "deviceIndex"
  },
  username: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Device;