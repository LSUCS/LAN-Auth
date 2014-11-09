var express    = require("express");
var log        = require("./log");
var bodyParser = require("body-parser");

var sequelize = require("./models/sequelize");
var router    = require("./routes/router");

//Sync database
sequelize.sync();

//Load routes
var routes = ["auth", "status"];
routes.forEach(function (route) {
  require("./routes/" + route);
});

//Setup app
var app = express();
app.use(bodyParser.json());
app.enable("trust proxy");

//JSON wrapping
app.use("/api", function (req, res, next) {
  res._json = res.json.bind(res);
  res.json = function (data) {
    res._json({
      status: "success",
      code: res.statusCode || 200,
      data: data || {}
    });
  };
  next();
});

//Mount routes
app.use("/api", router);

//Error handling
app.use(function (err, req, res, next) {
  if (!err.status) {
    err.status = 500;
  }
  var msg
  if (err.status >= 500) {
    msg = {
      status: "fail",
      code: err.status,
      message: err.message || err.name || "Internal Server Error"
    };
    console.log(err.message || err.name);
    console.log(err.stack);
  } else if (err.status >= 400) {
    msg = {
      status: "error",
      code: err.status,
      message: err.message || err.name || "Unknown Request Error",
      data: err.data || ""
    };
  }
  res.status(err.status);
  res._json(msg);
});

//Start app
var server = app.listen(3000, function () {
  var address = server.address();
  log.info("LAN-Auth server started on %s:%s", address.address, address.port);
});