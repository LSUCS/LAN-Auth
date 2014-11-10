var expect = require("chai").expect;

var getLan = require("../get-lan");

describe("Get LAN number", function () {

  it("should return the lan number", function (done) {
    getLan().then(function (lan) {
      expect(lan).to.exist;
      done();
    });
  });

});