var express = require("express");

var router = express.Router();
var getLan = require("../util/get-lan");

//Populate request with LAN number
router.use(function (req, res, next) {
  getLan()
    .then(function (lan) {
      req.lan = lan;
      next();
    })
    .catch(next);
});

module.exports = router;