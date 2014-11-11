var express    = require("express");
var bodyParser = require("body-parser");
var when       = require("when");
var config     = require("config");

module.exports = makeLanApiapp;

function makeLanApiapp() {

  var app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get("/lannumber", function (req, res) {
    res.send({
      lan: "48"
    });
  });

  app.post("/lanauth", function (req, res) {
    if (req.body.username === "error") {
      res.send({
        error: "Error response"
      });
    } else if (req.body.username === "fail") {
      res.send("-1");
    } else {
      res.send("1");
    }
  });

  return when.promise(function (resolve) {
    var server = app.listen(null, function () {
      var address = server.address();
      config.lanApi.baseUrl = "http://" + address.address + ":" + address.port;
      resolve(server);
    });
  });

}