var React = require("react");
var NewLesson = require("./NewLesson");
var EditLesson = require("./EditLesson");

var LessonPanel = React.createClass({

  render: function(){

    return (
      <div className="container">Lesson Panel
      {this.props.teacher.first_name}
      <NewLesson teacher={this.props.teacher}/>
      <EditLesson teacher={this.props.teacher}/>
      </div>


    )
  }
});

module.exports = LessonPanel;