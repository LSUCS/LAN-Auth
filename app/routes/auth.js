var express             = require("express");
var _                   = require("lodash");
var AuthenticationModel = require("../models/authentication");
var lanApi              = require("../util/lan-api");
var requireAdmin        = require("../middleware/require-admin");
var addAuth             = require("../middleware/add-auth");
var addLan              = require("../middleware/add-lan");

var router = express.Router();

module.exports = {
  router: router,
  mount: "/auth"
};

router.use(addLan);

router.route("/")

  //Create authentication
  .post(addAuth)
  .post(function (req, res, next) {
    //Check if existing auth
    if (req.auth) {
      var err = new Error("IP already authenticated at LAN");
      err.status = 400;
      throw err;
    }

    //Validate inputs
    req.checkBody("username", "Username required").notEmpty();
    req.checkBody("password", "Password required").notEmpty();
    req.checkBody("seat", "Seat required").notEmpty();
    req.validate();

    var data = {
      username: req.body.username,
      password: req.body.password,
      seat: req.body.seat
    };
    //Try and auth with the LAN API
    lanApi.post("lanauth", data)
      .then(function (response) {
        //Handle error responses
        if (response.error) {
          var err = new Error(response.error);
          err.status = 400;
          throw err;
        } else if (response != 1) {
          throw new Error();
        } else {
          //Otherwise add a new authentication
          return AuthenticationModel.create({
            ip: req.ip,
            username: req.body.username,
            seat: req.body.seat,
            lan: req.lan
          });
        }
      })
      .then(function (auth) {
        res.json(auth.values);
      })
      .catch(next);
  })

  //List authentications
  .get(requireAdmin)
  .get(function (req, res, next) {
    AuthenticationModel.findAll({ where: { lan: req.lan } })
      .then(function (auths) {
        res.json(_.pluck(auths, "values"));
      })
      .catch(next);
  })

  //Delete all authentications
  .delete(requireAdmin)
  .delete(function (req, res, next) {
    AuthenticationModel
      .destroy({ where: { lan: req.lan } })
      .then(res.json)
      .catch(next);
  })

  //Create authentication without LAN verification
  .put(requireAdmin)
  .put(function (req, res, next) {
    //Validate inputs
    req.checkBody("ip", "IP required").notEmpty().isIP();
    req.validate();

    AuthenticationModel.find({ where: { ip: req.body.ip, lan: req.lan } })
      .then(function (auth) {
        if (auth) {
          var err = new Error("IP already authenticated at LAN");
          err.status = 400;
          throw err;
        }
        return AuthenticationModel.create({
          ip: req.body.ip,
          username: "admin",
          seat: "-",
          lan: req.lan
        });
      })
      .then(function (auth) {
        res.json(auth.values);
      })
      .catch(next);
  });


router.route("/:authId")

  //Delete an individual authentication
  .delete(function (req, res, next) {
    //Validate
    req.checkParams("authId", "Invalid authId").notEmpty().isInt();
    req.validate();
    AuthenticationModel.destroy({ where: { id: req.params.authId } })
      .then(res.json)
      .catch(next);
  });