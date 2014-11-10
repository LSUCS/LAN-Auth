var makeTelnetServer = require("../test/lib/make-telnet-server");

module.exports = function (grunt) {

  grunt.registerTask("telnet", function () {
    this.async();
    makeTelnetServer().then(function (server) {
      console.log("Telnet server started at", server.address().address + ":" + server.address().port);
    });
  });

};