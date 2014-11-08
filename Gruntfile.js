var telnet = require("telnet");

module.exports = function (grunt) {


  grunt.registerTask("telnet", function () {
    this.async();
    var server = telnet.createServer(function (client) {
      client.do.transmit_binary();
      client.do.window_size();

      client.on("data", function (b) {
        client.write("ok\n");
        client.write("# ");
        console.log(b.toString());
      });
      client.write("# ");
    });
    server.listen(8081);
  });

};