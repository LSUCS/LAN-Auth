var React         = require("react");
var Router        = require("react-router");

var Route         = Router.Route;
var Routes        = Router.Routes;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Redirect      = Router.Redirect;

var App      = require("./components/app.jsx");
var Home     = require("./components/pages/home.jsx");
var Logs     = require("./components/pages/logs.jsx");
var Settings = require("./components/pages/settings.jsx");
var AuthList = require("./components/pages/auth-list.jsx");

window.React = React;

React.render((
  <Routes location="history">
    <Route name="app" path="/" handler={App}>
      <Route name="home" handler={Home} pageTitle="Home" />
      <Route name="auth-list" handler={AuthList} pageTitle="Auth List" />
      <Route name="settings" handler={Settings} pageTitle="Settings" />
      <Route name="logs" handler={Logs} pageTitle="Logs" />
      <Redirect from="/" to="home" />
    </Route>
  </Routes>
), document.body);