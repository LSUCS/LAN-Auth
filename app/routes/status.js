var express             = require("express");
var AuthenticationModel = require("../models/authentication");
var addAuth             = require("../middleware/add-auth");
var addLan              = require("../middleware/add-lan");

var router = express.Router();

module.exports = {
  router: router,
  mount: "/status"
};

router.use(addLan);
router.use(addAuth);

router.route("/")

  //Return auth status of the user
  .get(addAuth)
  .get(function (req, res, next) {
    var respond = function (status) {
      res.json({
        status: status,
        lan: req.lan,
        ip: req.ip
      });
    };
    if (!req.auth) {
      respond("unauthorised");
    } else {
      req.auth.getUnprocessedDevices()
        .then(function (devices) {
          var status;
          if (devices.length > 0) {
            respond("processing");
          } else {
            respond("authorised");
          }
        })
        .catch(next);
    }
  });