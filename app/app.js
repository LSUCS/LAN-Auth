
var models    = require("./models/index");
var sequelize = require("./models/sequelize");
var process   = require("./process");

sequelize.sync();

/*models.Device.create({
  host: "127.0.0.1",
  username: "root",
  password: "password",
  name: "Yoloswag router"
});

/*models.Authentication.create({
  ip: "192.168.0.58",
  lan: "48"
}).catch(function (err) {
  console.log(err);
});*/

process();