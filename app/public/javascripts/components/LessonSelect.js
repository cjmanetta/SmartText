var React = require("react");
//var LessonSelector = require("./LessonSelector");

var LessonSelect = React.createClass({
  getInitialState: function(){
    return {
    lessons: [{title: "Herman Melville biography", date: "08/09/2015"}, {title: "Walt Whitman biography", date: "08/10/2010"}]
    }
  },
  render: function(){
    var lessons = this.state.lessons.map(
      function(lesson){
        return(
        <li className="ui-widget-content">{ lesson.title } { lesson.date }</li>
        )
      }
    );

    return (
      <div className="container">
        <p id="feedback">
          <span>You have selected:</span> <span id="select-result">none</span>.
        </p>
        <ol>
          { lessons }
        </ol>
      </div>
    )
  }
});

module.exports = LessonSelect;
