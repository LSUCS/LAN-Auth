var makeLanApiServer = require("../test/lib/make-lan-api-server");

module.exports = function (grunt) {

  grunt.registerTask("lan-api", function () {
    this.async();
    makeLanApiServer(grunt.config("lanApi.port"));
    grunt.log.writeln("Fake LAN API started");
  });

};