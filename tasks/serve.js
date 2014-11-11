var express     = require("express");
var httpProxy   = require("http-proxy");
var serveStatic = require("serve-static");
var liveReload  = require("connect-livereload");
var path        = require("path");

module.exports = function (grunt) {

  grunt.registerTask("serve", function () {
    this.async();
    var server = express();
    var proxy  = httpProxy.createProxyServer({ target: grunt.config("serve.appRoot") });
    proxy.on("error", function (err) {
      grunt.log.error(err);
    });
    server.use(serveStatic("public/build"));
    server.use("/", function (req, res) {
      if (/^\/api/.test(req.url)) {
        proxy.web(req, res);
      } else {
        res.sendFile(path.resolve(__dirname, "../public/build/index.html"));
      }
    });
    server.use(liveReload({ port: grunt.config("serve.livereload") }));
    server.listen(grunt.config("serve.port"));
    grunt.log.writeln("Application running on port 8000");
  });

};