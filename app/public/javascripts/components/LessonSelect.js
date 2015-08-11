
var $ = require('jquery');
require('jquery-ui');
require('jquery-ui/selectable')
var React = require("react");
//var LessonSelector = require("./LessonSelector");

var LessonSelect = React.createClass({
  getInitialState: function(){
    return {
    lessons: [{title: "Herman Melville biography", date: "08/09/2015"}, {title: "Walt Whitman biography", date: "08/10/2010"}]
    }
  },
  handleSelection: function(event){
    var selection = $(event.target).text();
    $('#select-result').text(selection);
  },
  render: function(){
    var index = 0;
    console.log(this);
    var self = this;

    var lessons = this.state.lessons.map(
      function(lesson){
        var attributeId = "list-group-item_";
        attributeId+= index;
        index+=1;
        return(
        <li role="presentation" onClick={this.handleSelection} id={attributeId} key={lesson.id} data={lesson}><a className="lesson"><span className="l-title">{ lesson.title }</span><span className="r-date">{ lesson.date }</span></a></li>
        )
      }.bind(this)
    );

    return (
      <div className="container">
        <p id="feedback">
          <span>You have selected:</span> <span id="select-result">none</span>
        </p>
        <ul className="nav nav-pills nav-stacked">
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