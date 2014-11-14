var is = require("is-type");

module.exports = [
  {
    key: "auth_enabled",
    name: "Auth enabled",
    value: true,
    validate: function (val) {
      return is.boolean(val);
    }
  },
  {
    key: "auth_interval",
    name: "Auth processing interval (seconds)",
    type: "INTEGER",
    value: 30,
    validate: function (val) {
      return is.number(val);
    }
  }
];