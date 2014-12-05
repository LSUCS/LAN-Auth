

function authenticate(device, auth) {

  //Execute command sequence
  var args = [
    auth.lan,
    auth.username,
    auth.ip
  ];
  var cmd = "sh /config/scripts/lan-auth.sh " + args.join(" ");

  return device.exec(cmd);

}


module.exports = {
  authenticate: authenticate
};