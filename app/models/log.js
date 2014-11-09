var DataTypes = require("sequelize");
var sequelize = require("./sequelize");

var Log = sequelize.define("Log", {
  level: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false
  },
  meta: {
    type: DataTypes.STRING
  },
  hostname: {
    type: DataTypes.STRING
  }
});

module.exports = Log;