var when    = require("when");
var request = require("request");
var url     = require("url");
var _       = require("lodash");
var config  = require("config");
var log     = require("../log");

module.exports = {
  get: _.partial(lanApi, "get"),
  post: _.partial(lanApi, "post")
};

function lanApi(method, action, data) {
  if (data) {
    data.api_key = config.lanApi.key;
  }
  return when.promise(function (resolve, reject) {
    request({
      method: method,
      url: url.resolve(config.lanApi.baseUrl, action),
      json: true,
      formData: data
    }, function (err, response) {
      if (err) {
        log.error(err);
        return reject(err);
      }
      resolve(response.body);
    });
  });
}