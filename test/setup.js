process.env.NODE_ENV = "test";

//Ensure config directory is set
if (!process.env.NODE_CONFIG_DIR) {
  process.env.NODE_CONFIG_DIR = __dirname + "/../config";
}

var winston   = require("winston");
var chai      = require("chai");
var sinonChai = require("sinon-chai");
var path      = require("path");

winston.level = "warn";

chai.use(sinonChai);

require("blanket")({
  pattern: [
    path.resolve(__dirname, "..", "app"),
    path.resolve(__dirname, "..", "app/app.js")
  ]
});