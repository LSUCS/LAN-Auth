var DataTypes = require("sequelize");
var sequelize = require("./sequelize");

var Setting = sequelize.define("Setting", {
  key: {
    primary: true,
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Setting;