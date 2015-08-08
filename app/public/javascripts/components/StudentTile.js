var React = require("react");

var StudentTile = React.createClass({
  render: function() {
    return (
      <div id="studentText" className="w20 p15px b1pxsb fs8px">
        <p>{this.props.student.username}</p>
        <p>{this.props.student.first_name}</p>
        <p>{this.props.student.last_initial}</p>
        <p>{this.props.lesson.text}</p>
      </div>
    );
  },
});

module.exports = StudentTile;