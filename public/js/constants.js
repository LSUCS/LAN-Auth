var flattenConstants = require("./util/flatten-constants");

var constants = {

  API: {
    GET: {
      STATUS: ["PENDING", "ERROR"]
    }
  }

};

module.exports = flattenConstants(constants);