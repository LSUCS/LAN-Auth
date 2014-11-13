var flattenConstants = require("./util/flatten-constants");

var constants = {

  API: {
    GET: {
      STATUS: ["PENDING", "ERROR"],
      AUTHS: ["PENDING", "ERROR"],
      LOGS: ["PENDING", "ERROR"],
      DEVICES: ["PENDING", "ERROR"]
    },
    CREATE: {
      AUTH: ["PENDING", "ERROR"],
      DEVICE: ["PENDING", "ERROR"]
    },
    ERROR: {
      UNAUTHORISED: null
    },
    UPDATE: {
      DEVICE: ["PENDING", "ERROR"]
    },
    DELETE: {
      DEVICE: ["PENDING", "ERROR"],
      DEVICES: ["PENDING", "ERROR"]
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