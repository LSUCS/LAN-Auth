var flattenConstants = require("./util/flatten-constants");

var constants = {

  API: {
    GET: {
      STATUS: ["PENDING", "ERROR"],
      AUTHS: ["PENDING", "ERROR"],
      LOGS: ["PENDING", "ERROR"]
    },
    CREATE: {
      AUTH: ["PENDING", "ERROR"]
    },
    ERROR: {
      UNAUTHORISED: null
    }
  },

  STORAGE: {
    CLEAR: {
      ADMINPASSWORD: null
    },
    GET: {
      ADMINPASSWORD: null
    },
    SET: {
      ADMINPASSWORD: null
    }
  },

  UI: {
    ERRORS: {
      DISMISS: null
    }
  }

};

module.exports = flattenConstants(constants);