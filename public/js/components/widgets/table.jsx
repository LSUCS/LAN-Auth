var React = require("react");

var Tr = React.createClass({
  render: function () {
    var cells = this.props.cells.map(function (cell) {
      return <td>{cell}</td>;
    });
    return <tr>{cells}</tr>;
  }
});

var Table = React.createClass({

  render: function() {
    var rows = this.props.data.map(function (rowData) {
      return <Tr cells={rowData} />;
    });
    return (
      <table className="reactable">
        <thead><Tr cells={this.props.headers} /></thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }

});

module.exports = Table;