var express      = require("express");
var DeviceModel  = require("../models/device");
var requireAdmin = require("../middleware/require-admin");
var _            = require("lodash");

var router = express.Router();

module.exports = {
  router: router,
  mount: "/device"
};

//Require admin for all these routes
router.use(requireAdmin);

router.route("/")

  //List devices
  .get(function (req, res, next) {
    DeviceModel.all()
      .then(function (devices) {
        res.json(_.pluck(devices, "values"));
      })
      .catch(next);
  })

  //Create device
  .post(function (req, res, next) {
    DeviceModel.create(req.body)
      .then(function (device) {
        res.json(device.values);
      })
      .catch(next);
  })

  //Delete all devices
  .delete(function (req, res, next) {
    DeviceModel.destroy()
      .then(res.json)
      .catch(next);
  });

router.route("/:deviceId")

  //Update device
  .put(function (req, res, next) {
    DeviceModel.find(req.params.deviceId)
      .then(function (device) {
        if (!device) {
          var err = new Error("Device not found");
          err.status = 400;
          throw err;
        }
        return device.updateAttributes(req.body);
      })
      .then(res.json)
      .catch(next);
  })

  //Delete an individual device
  .delete(function (req, res, next) {
    DeviceModel.destroy(req.params.deviceId)
      .then(res.json)
      .catch(next);
  });