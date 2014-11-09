var router = require("./router");

var AuthenticationModel = require("../models/authentication");

router.route("/status")

  //Return auth status of the user
  .get(function (req, res, next) {
    var respond = function (status) {
      res.json({
        status: status,
        lan: req.lan,
        ip: req.ip
      });
    };
    AuthenticationModel.find({ where: { ip: req.ip, lan: req.lan } })
      .then(function (auth) {
        if (!auth) {
          respond("unauthorised");
        } else {
          auth.getUnprocessedDevices()
            .then(function (devices) {
              var status;
              if (devices.length > 0) {
                respond("processing");
              } else {
                respond("authorised");
              }
            })
            .catch(next);
        }
      })
      .catch(next);
  });