process.env.NODE_ENV = "test";

//Ensure config directory is set
if (!process.env.NODE_CONFIG_DIR) {
  process.env.NODE_CONFIG_DIR = __dirname + "/../config";
}

var chai      = require("chai");
var sinonChai = require("sinon-chai");
var path      = require("path");
var config    = require("config");

chai.use(sinonChai);

if (config.test.coverage) {
  require("blanket")({
    pattern: [
      path.resolve(__dirname, "..", "app"),
      path.resolve(__dirname, "..", "app/app.js")
    ]
  });
}