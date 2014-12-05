

function authenticate(device, auth) {

  return device.exec("conf t")
    .then(function () {
      return device.exec("access-list 1 permit " + auth.ip);
    })
    .then(function () {
      return device.exec("end");
    })
    .then(function () {
      return device.exec("exit");
    });

}


module.exports = {
  authenticate: authenticate
};