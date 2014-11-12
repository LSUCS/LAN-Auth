var Actions = require("../lib/actions");

var StatusDAO = require("../dao/status");

Actions.extend({

  getStatus: function () {
    return StatusDAO.getStatus();
  }

});