var inherits     = require("inherits");
var EventEmitter = require("events").EventEmitter;

var CHANGE_EVENT = "change_event";

function Store() {

}

inherits(Store, EventEmitter);

Store.prototype.state = {};

Store.prototype.getState = function () {
  return this.state;
};

Store.prototype.removeChangeListener = function (callback) {
  this.removeListener(CHANGE_EVENT, callback);
};

Store.prototype.addChangeListener = function (callback) {
  this.on(CHANGE_EVENT, callback);
};

Store.prototype.emitChange = function () {
  this.emit(CHANGE_EVENT);
};

Store.extend = function (Child) {
  inherits(Child, Store);
};

module.exports = Store;