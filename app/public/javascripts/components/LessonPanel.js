var React = require("react");

var LessonSelect = require("./LessonSelect"); // Duplication: Nick's code
var NewLesson = require("./NewLesson"); // Duplication: Adam's code

var LessonPanel = React.createClass({
  render: function(){

    return (
      <div>
        <div className="container">
          <p>{ this.props.teacher.first_name }</p>
          <LessonSelect />
        </div>
        <div className="container">Lesson Panel
        <NewLesson teacher={this.props.teacher}/>
        </div>
      </div>
    )
  }
});

module.exports = LessonPanel;