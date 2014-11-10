var makeLanApiServer = require("../test/lib/make-lan-api-server");

module.exports = function (grunt) {

  grunt.registerTask("lan-api", function () {
    this.async();
    var port = grunt.config("lanApi.port");
    makeLanApiServer(port);
    grunt.log.writeln("Fake LAN API listening on port " + port);
  });

};