var expect = require("chai").expect;
var sinon  = require("sinon");

var getLan = require("../../../app/process/get-lan");

describe("Get LAN number", function () {

  it("should return the lan number", function (done) {
    getLan().then(function (lan) {
      expect(lan).to.exist;
      done();
    });
  });

});