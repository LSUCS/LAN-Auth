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
    defaultValue: DataTypes.NOW
  },
  meta: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false
});

module.exports = Log;