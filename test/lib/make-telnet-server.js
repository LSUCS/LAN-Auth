var telnet = require("telnet");
var when   = require("when");

module.exports = makeTelnetServer;

function makeTelnetServer() {

  return when.promise(function (resolve) {

    var cbs = [];
    var clients = [];

    var server = telnet.createServer(function (client) {
      clients.push(client);
      client.do.transmit_binary();
      client.do.window_size();

      client.on("data", function (b) {
        var data = b.toString().replace(/\r?\n$/, "").split(/\r\n/g);
        cbs.forEach(function (cb) {
          data.forEach(cb);
        });
        client.write("# ");
      });
      client.write("# ");
    });

    server.on("close", function () {
      server.closed = true;
    });

    server.onData = function (cb) {
      cbs.push(cb);
    };

    server.die = function () {
      return when.promise(function (resolve) {
        clients.forEach(function (client) {
          client.destroy();
        });
        if (server.closed) {
          resolve();
        } else {
          server.close(resolve);
        }
      });
    };

    server.listen(function () {
      resolve(server);
    });
  });

}