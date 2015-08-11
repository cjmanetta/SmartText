var React = require("react");

var LessonSelect = require("./LessonSelect"); // Duplication: Nick's code
var NewLesson = require("./NewLesson"); // Duplication: Adam's code

var LessonPanel = React.createClass({
  render: function(){

    return (
      <div id="lessonPanel">
        // Duplication: Nick's code
        <div className="container">
          <p>{ this.props.teacher.first_name }</p>
          <LessonSelect />
        </div>
        // Duplication: Adam's code
        <div className="container">Lesson Panel
        {this.props.teacher.first_name}
        <NewLesson teacher={this.props.teacher}/>
        </div>
      </div>
    )
  }
});

module.exports = LessonPanel;
