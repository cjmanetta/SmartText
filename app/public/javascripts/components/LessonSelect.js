var React = require("react");
var LessonBox = require("./LessonBox");

var LessonSelect = React.createClass({
  getInitialState: function() {
    return {
    lessons: [{title: "Herman Melville biography", date: "08/09/2015"}, {title: "Walt Whitman biography", date: "08/10/2010"}]
    }
  },
  render: function(){
    var lessons = this.state.lessons.map(
      function(lesson){
        return(
        <LessonBox lesson={lesson} teacher={this.props.teacher }/>
        )
      }.bind(this)
    );

    return (
      <div className="container">
        <p id="feedback">
          <span>You have selected:</span> <span id="select-result">none</span>.
        </p>
        <ul className="list-group">
          { lessons }
        </ul>
      </div>
    )
  }
});

module.exports = LessonSelect;