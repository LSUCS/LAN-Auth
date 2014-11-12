var Dispatcher = require("flux").Dispatcher;

var dispatcher = new Dispatcher();

dispatcher._dispatch = dispatcher.dispatch;

dispatcher.dispatch = function (type, payload) {
  var action = {
    type: type,
    payload: payload
  };
  console.log(action);
  this._dispatch(action);
};

module.exports = dispatcher;