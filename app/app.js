var express    = require("express");
var log        = require("./log");
var bodyParser = require("body-parser");

var app = express();

app.use(express.static(__dirname + "/../public/build"));
app.use(bodyParser.json());

var server = app.listen(3000, function () {
  var address = server.address();
  log.info("LAN-Auth server started on %s:%s", address.address, address.port);
});