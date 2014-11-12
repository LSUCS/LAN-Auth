var Dispatcher = require("flux").Dispatcher;

var dispatcher = new Dispatcher();

dispatcher._dispatch = dispatcher.dispatch;

dispatcher.dispatch = function (type, payload) {
  this._dispatch({
    type: type,
    payload: payload
  });
};

module.exports = dispatcher;