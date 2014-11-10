var connect          = require("connect");
var httpProxy        = require("http-proxy");
var serveStatic      = require("serve-static");
var liveReload       = require("connect-livereload");

module.exports = function (grunt) {

  grunt.registerTask("serve", function () {
    this.async();
    var server = connect();
    var proxy  = httpProxy.createProxyServer({ target: "http://localhost:3000" });
    proxy.on("error", function (err) {
      grunt.log.error(err);
    });
    server.use(serveStatic("public/build"));
    server.use("/", function (req, res) {
      proxy.web(req, res);
    });
    server.use(liveReload({ port: 9000 }));
    server.listen(8000);
    grunt.log.writeln("Application running on port 8000");
  });

};