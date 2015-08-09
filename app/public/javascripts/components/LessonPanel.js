var React = require("react");
var LessonPanel = React.createClass({

  render: function(){

    return (
      <div className="container">Lesson Panel
        {this.params.teacher.first_name}
        <NewLesson />
      </div>

    )
  }
});

module.exports = LessonPanel;