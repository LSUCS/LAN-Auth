var React = require("react");

var Dialog = require("./dialog.jsx");

var Confirm = React.createClass({

  render: function() {
    var actions = [
      { text: "NO", onClick: this.props.onNo },
      { text: "YES", onClick: this.props.onYes }
    ];
    return (
      <Dialog
        title=""
        actions={actions}>
        {this.props.message}
      </Dialog>
    );
  }

});

module.exports = Confirm;