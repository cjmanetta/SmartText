var React = require("react");
var LessonSelect = require("./LessonSelect");

var LessonPanel = React.createClass({
  render: function(){

    return (
      <div className="container">
        <p>{ this.props.teacher.first_name }</p>
        <LessonSelect />
      </div>
    )
  }
});

module.exports = LessonPanel;