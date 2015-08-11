var React = require("react");

var LessonSelect = require("./LessonSelect");
var NewLesson = require("./NewLesson");

var LessonPanel = React.createClass({
  render: function(){

    return (
      <div className="container">
        <div className="select-lesson">
          <p>{ this.props.teacher.first_name }</p>
          <LessonSelect />
        </div>
        <div className="new-lesson">
          <h3>New Lesson</h3>
          <p>{this.props.teacher.first_name}</p>
        <NewLesson teacher={this.props.teacher}/>
        </div>
      </div>
    )
  }
});

module.exports = LessonPanel;