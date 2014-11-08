var React         = require("react");
var Router        = require('react-router');

var Route         = Router.Route;
var Routes        = Router.Routes;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Redirect      = Router.Redirect;

var App          = require("./components/app.jsx");

window.React = React;

React.renderComponent((
  <Routes location="hash">
    <Route name="app" path="/" handler={App}>
    </Route>
  </Routes>
), document.body);