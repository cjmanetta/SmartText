var React = require("react");

var StudentTile = React.createClass({
  render: function() {
    return (
      <div id="studentText" className="w20 p15px b1pxsb fs8px scrol h350px bcb">
        <span className="fs14px">
          {this.props.student.first_name}
          {this.props.student.last_initial}
        </span>
        <h6>{this.props.lesson.title}</h6>
        <p>{this.props.lesson.author}</p>
        <p>{this.props.lesson.text}</p>
      </div>
    );
  },
});

module.exports = StudentTile;