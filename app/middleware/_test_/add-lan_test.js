var expect = require("chai").expect;

var addLan = require("../add-lan");
var getLan = require("../../util/get-lan");

describe("Add-LAN Middleware", function () {

  it("should add lan", function (done) {
    getLan()
      .then(function (lan) {
        var req = {};
        addLan(req, {}, function () {
          expect(req.lan).to.exist;
          expect(req.lan).to.equal(lan);
          done();
        });
      });
  });

});