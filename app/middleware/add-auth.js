var AuthenticationModel = require("../models/authentication");

/**
 * Looks up the authentication for the user and adds it to the request
 */
module.exports = function addAuth(req, res, next) {
  AuthenticationModel.find({ where: { ip: req.ip, lan: req.lan }})
    .then(function (auth) {
      req.auth = auth;
      next();
    })
    .catch(next);
};