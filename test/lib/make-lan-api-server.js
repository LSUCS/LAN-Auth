var express    = require("express");
var bodyParser = require("body-parser");
var when       = require("when");

module.exports = makeLanApiapp;

function makeLanApiapp(port) {

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
    var server = app.listen(port, function () {
      resolve(server);
    });
  });

};