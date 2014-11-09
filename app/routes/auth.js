var router = require("./router");

var AuthenticationModel = require("../models/authentication");
var lanApi = require("../util/lan-api");

router.route("/auth")

  //Create authentication
  .post(function (req, res, next) {
    AuthenticationModel.find({ where: { ip: req.ip, lan: req.lan }})
      .then(function (auth) {
        if (auth) {
          var err = new Error("IP already authenticated at LAN");
          err.status = 400;
          throw err;
        }
      })
      .then(function () {
        var data = {
          username: req.body.username,
          password: req.body.password,
          seat: req.body.seat
        };
        return lanApi.post("lanauth", data);
      })
      .then(function (response) {
        if (response.error) {
          var err = new Error(response.error);
          err.status = 400;
          throw err;
        } else if (response != 1) {
          throw new Error();
        } else {
          return AuthenticationModel.create({
            ip: req.ip,
            username: req.body.username,
            lan: req.lan
          });
        }
      })
      .then(res.json)
      .catch(next);
  });