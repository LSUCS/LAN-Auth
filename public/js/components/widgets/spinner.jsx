var React        = require("react");
var ReactSpinner = require("react-spinner");

var Spinner = React.createClass({

  render: function() {
    return (
      <div className="spinner">
        <h3>{this.props.title}</h3>
        <ReactSpinner />
      </div>
    );
  }

});

module.exports = Spinner;