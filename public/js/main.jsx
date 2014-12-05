var React         = require("react");
var Router        = require("react-router");

var Route         = Router.Route;
var Routes        = Router.Routes;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Redirect      = Router.Redirect;

var App      = require("./components/app.jsx");
var Home     = require("./components/pages/home/home.jsx");
var Logs     = require("./components/pages/logs/logs.jsx");
var Settings = require("./components/pages/settings/settings.jsx");
var AuthList = require("./components/pages/auth-list/auth-list.jsx");
var Login    = require("./components/pages/login/login.jsx");
var Devices  = require("./components/pages/devices/devices.jsx");

var StatusActions = require("./actions/status");
var AdminActions  = require("./actions/admin");

window.React = React;

window.constants = require("./constants");

require("react-tap-event-plugin")();

AdminActions.getPassword();
StatusActions.getStatus();

React.render((
  <Routes location="history">
    <Route name="app" path="/" handler={App}>
      <Route name="home" handler={Home} pageTitle="Home" />
      <Route name="auth-list" handler={AuthList} pageTitle="Auth List" />
      <Route name="settings" handler={Settings} pageTitle="Settings" />
      <Route name="logs" handler={Logs} pageTitle="Logs" />
      <Route name="login" handler={Login} pageTitle="Admin Login" />
      <Route name="devices" handler={Devices} pageTitle="Devices" />
      <Redirect from="/" to="home" />
    </Route>
  </Routes>
), document.body);