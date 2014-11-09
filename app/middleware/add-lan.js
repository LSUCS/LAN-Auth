var getLan = require("../util/get-lan");

/**
 * Adds the LAN number onto the request
 */
module.exports = function addLan(req, res, next) {
  getLan()
    .then(function (lan) {
      req.lan = lan;
      next();
    })
    .catch(next);
};