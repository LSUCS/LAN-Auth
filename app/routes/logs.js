var express      = require("express");
var LogModel     = require("../models/log");
var requireAdmin = require("../middleware/require-admin");
var _            = require("lodash");

var router = express.Router();

module.exports = {
  router: router,
  mount: "/logs"
};

//Require admin for all these routes
router.use(requireAdmin);

router.route("/")

  //List logs
  .get(function (req, res, next) {
    LogModel.all()
      .then(function (logs) {
        logs = _.chain(logs)
          .pluck("values")
          .each(function (log) {
            log.meta = JSON.parse(log.meta);
          })
          .value();
        res.json(logs);
      })
      .catch(next);
  })

  //Clear logs
  .delete(function (req, res, next) {
    LogModel.destroy()
      .then(res.json)
      .catch(next);
  });