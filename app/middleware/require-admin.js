var config = require("config");

/**
 * Requires the user to be authenticated as an admin
 */
module.exports = function requireAdmin(req, res, next) {
  if (!config.admin.enable) {
    return next();
  }
  if (req.headers.authorization !== config.admin.key) {
    var err = new Error("Authentication required");
    err.status = 401;
    throw err;
  }
  next();
};