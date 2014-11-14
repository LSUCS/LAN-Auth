var SettingModel = require("../models/setting");
var settings     = require("./settings");
var when         = require("when");
var _            = require("lodash");

function checkDefaults() {
  return when.map(settings, function (setting) {
    SettingModel
      .findOrCreate({
        where: {  key: setting.key },
        defaults: { value: setting.value }
      });
  });
}

module.exports = {

  init: function () {
    return checkDefaults();
  },

  get: function (key) {
    return SettingModel.find({ where: { key: key } })
      .then(function (setting) {
        return _.extend({}, settings[key], setting);
      });
  },

  getAll: function () {
    return SettingModel.all()
      .then(function (all) {
        return _.map(all, function (setting) {
          return _.extend({}, settings[key], setting);
        });
      });
  },

  validate: function (key, value) {
    return settings[key].validate(value);
  },

  set: function (key, value) {
    return SettingModel.find({ where: { key: key } })
      .then(function (setting) {
        return setting.updateAttributes({ value: value });
      });
  }

};