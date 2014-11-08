var express    = require("express");
var log        = require("./log");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());
app.use("/api", function (req, res) {
  res.json({ yep: "its working" });
});

var server = app.listen(3000, function () {
  var address = server.address();
  log.info("LAN-Auth server started on %s:%s", address.address, address.port);
});