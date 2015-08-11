
var React = require("react");
//var LessonSelector = require("./LessonSelector");

var LessonSelect = React.createClass({
  getInitialState: function(){
    return {
    lessons: [{title: "Herman Melville biography", date: "08/09/2015"}, {title: "Walt Whitman biography", date: "08/10/2010"}]
    }
  },
  handleSelection: function(event){
    console.log("HELLOW");
  },
  render: function(){
    var index = 0;
    console.log(this);
    var self = this.state;

    var lessons = this.state.lessons.map(
      function(lesson){
        var attributeId = "list-group-item_";
        attributeId+= index;
        index+=1;
        return(
        <li onClick={this.handleSelection} id={attributeId} key={lesson.id} data={lesson}>{ lesson.title } { lesson.date }</li>
        )
      }.bind(this)
    );

    return (
      <div className="container">
        <p id="feedback">
          <span>You have selected:</span> <span id="select-result">none</span>
        </p>
        <ul className="list-group">
          { lessons }
        </ul>
      </div>
    )
  }
});

module.exports = LessonSelect;

// $("list-group").on('click', function(){
//   var selection = $('select-result').val();
//   $('list-group-item').text(selection);
// });