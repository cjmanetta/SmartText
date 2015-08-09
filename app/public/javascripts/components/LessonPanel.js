var React = require("react");
var NewLesson = require("./NewLesson");

var LessonPanel = React.createClass({

  render: function(){

    return (
      <div className="container">Lesson Panel
      <NewLesson />
      </div>

    )
  }
});

module.exports = LessonPanel;