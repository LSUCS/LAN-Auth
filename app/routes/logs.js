var express      = require("express");
var LogModel     = require("../models/log");
var requireAdmin = require("../middleware/require-admin");

var router = express.Router();

module.exports = {
  router: router,
  mount: "/logs"
};

//Require admin for all these routes
router.use(requireAdmin);

router.route("/")

  //List devices
  .get(function (req, res, next) {
    LogModel.all()
      .then(function (logs) {
        res.json(_.pluck(logs, "values"));
      })
      .catch(next);
  });