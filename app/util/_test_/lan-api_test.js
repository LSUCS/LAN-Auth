var expect = require("chai").expect;
var lanApi = require("../lan-api");

describe("LAN API", function () {

  it("should get", function (done) {
    lanApi.get("lannumber")
      .then(function (body) {
        done();
      });
  });

  it("should post", function (done) {
    var data = {
      username: "testing",
      password: "testing",
      seat: "testing"
    };
    lanApi.post("lanauth", data)
      .then(function (body) {
        done();
      });
  });


});