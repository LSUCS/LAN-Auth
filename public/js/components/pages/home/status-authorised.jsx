var React = require("react");
var mui   = require("material-ui");

var StatusAuthorised = React.createClass({

  render: function() {
    return (
      <mui.Paper zDepth={1} className="status-authorised">
        <mui.Icon icon="action-favorite-outline" />
        <h3>You're good to go!</h3>
        <mui.PaperButton type="RAISED" href="http://lan.lsucs.org.uk" label="LAN WEBSITE" primary={true} />
      </mui.Paper>
    );
  }

});

module.exports = StatusAuthorised;