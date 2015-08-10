var React = require("react");
var NewLesson = require("./NewLesson");
var Router = require('react-router');


var LessonSelect = require("./LessonSelect"); // Duplication: Nick's code
var NewLesson = require("./NewLesson"); // Duplication: Adam's code

var LessonPanel = React.createClass({
  render: function(){

    return (
        <div className="container">Lesson Panel
	        {this.props.teacher.first_name}
	        <LessonSelect teacher={this.props.teacher} />
	        <NewLesson teacher={this.props.teacher}/>
        </div>
    )
  }
});

module.exports = LessonPanel;