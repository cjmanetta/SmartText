var React = require("react");
var NewLesson = require("./NewLesson");

var LessonPanel = React.createClass({

  render: function(){

    return (
      <div className="container">Lesson Panel
      {this.props.teacher.first_name}
      <NewLesson teacher={this.props.teacher}/>
      </div>

    )
  }
});

module.exports = LessonPanel;