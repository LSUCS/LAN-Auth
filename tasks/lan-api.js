var express    = require("express");
var bodyParser = require("body-parser");

module.exports = function (grunt) {

  grunt.registerTask("lan-api", function () {
    this.async();

    var server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));

    server.get("/lannumber", function (req, res) {
      res.send({
        lan: "48"
      });
    });

    server.post("/lanauth", function (req, res) {
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

    server.listen(8001);
    grunt.log.writeln("Fake LAN API listening on port 8001");
  });

};