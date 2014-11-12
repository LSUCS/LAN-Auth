var flattenConstants = require("./util/flatten-constants");

var constants = {

  API: {
    GET: {
      STATUS: ["PENDING", "ERROR"],
      AUTHS: ["PENDING", "ERROR"]
    },
    CREATE: {
      AUTH: ["PENDING", "ERROR"]
    },
    ERROR: {
      UNAUTHORISED: null
    }
  },

  UI: {
    ERRORS: {
      DISMISS: null
    }
  }

};

module.exports = flattenConstants(constants);