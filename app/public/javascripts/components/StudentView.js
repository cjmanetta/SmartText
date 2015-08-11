var React = require("react");
var RightBar = require('./RightBar');
var MainText = require('./MainText');
var socket = io.connect('http://localhost:8080');
// var socket = io.connect('/https://smartext.herokuapp.com/#/');


var StudentView = React.createClass({
  getInitialState: function(){
    return {
      lesson: {text:"", author: "", title: ""},
      teacher: {},
      student: {},
      highlightOn: false,
      prompt: ''
    }
  },
  componentDidMount: function(){
    this.getLesson();
    var that = this;
    socket.on('viewPrompt', function(data){
      that.updatePrompt(data)
    })
    socket.on('finish', function(){
      alert('Your teacher has ended the session.')
      that.setState({
        highlightOn: false
      });
    })
  },
  updatePrompt: function(data){
    this.setState({
      prompt: data,
      highlightOn: true
    })
  },
  handleClear: function(){
    $('.highlight').removeClass('highlight')
  },
  handleSubmit: function(){
    if (confirm('Are you sure you want to submit your answer?  You will not be able to change it.')){
      this.setState({
        highlightOn: false
      });
    }
  },
  handleSelect: function(selection){
    // var socket = io('/teacher')
    if (this.state.highlightOn){
      //pass off the selection object to compare using the algorithym
      var correctColor = this.compareSelection(selection);
      var selectedRange = selection.getRangeAt(0);
      var selectedText = selectedRange.extractContents()

      var highlightSpan = $("<span class='highlight'>" +
                          selectedText.textContent + "</span>");

      selectedRange.insertNode(highlightSpan[0]);

      // I need to add the clear selection functionality here
      console.log($('#mainText').html())
      var highlightedText = $('#mainText').html()

      //can remove the console.log once it is tested over
      //the socket
      console.log({
        user: this.state.user,
        selection: highlightedText,
        color: correctColor
      });

      socket.emit('select', {
        user: this.state.user,
        selection: highlightedText,
        color: correctColor
      })
    }
  },
  compareSelection: function(selection){
    var student_start = selection.anchorOffset;
    var student_end = selection.focusOffset;
    var correct_start = this.state.lesson.correct.start;
    var correct_end = this.state.lesson.correct.end;

    //adjust start/end regardless of which way they highlight
    if(student_start > student_end){
      student_start = selection.focusOffset;
      student_end = selection.anchorOffset;
    }
    if(correct_start > correct_end){
      correct_start = this.state.lesson.correct.end;
      correct_end = this.state.lesson.correct.start;
    }

    var correct_length = correct_end - correct_start;
    var variance = Math.round(correct_length / 6);
    var correct_start_range_beginning = correct_start - variance;
    var correct_start_range_end = correct_start + variance;
    var correct_end_range_beginning = correct_end - variance;
    var correct_end_range_end = correct_end + variance;


    if(student_start > correct_start_range_beginning && student_start < correct_start_range_end){
      if(student_end > correct_end_range_beginning && student_end < correct_end_range_end){
        var color = '#76EE00'
      } else {
        var color = 'blue'
      }
    } else if(student_end > correct_end_range_beginning && student_end < correct_end_range_end){
      var color = 'blue'
    } else if(student_start > correct_start && student_start < correct_end){
      var color = 'blue'
    } else if(student_end > correct_start && student_end < correct_end){
      var color = 'blue'
    } else if(student_start < correct_start && student_end > correct_end){
      var color = 'blue'
    } else {
      var color = 'red'
    }

    return color;
  },
  getLesson: function(){
    //here is where the api call would happen
    //to recieve the lesson which is active
    //for that class

    //stubbed for right now
    var newLesson = {text: "Lars Brandsson was up on the ladder, on the tall and abrupt roof of the house, with a couple of nails between his lips, knockingwith hammer in hand. The sun, gleaming in white hue, had justslid above the distant mountain ridges in the East. A robinshrilled hidden in some trees nearby, its chirping covered by theinterrupted pounding of the hammer. Trampling of hooves soundedfrom the road and a young man of about seventeen approached onhorse, dressed in thin linen shirt opened at the chest, with an axe girded at the waist and fishing utensils arrayed on the saddle. It was Helgi Dagsson. Lars Brandsson glanced to the sidea moment, wiping some loose strands of hair off his face andarranging them behind his ears, then went on to hammer the nailinto the wood.Lars Brandsson was up on the ladder, on the tall and abrupt roof of the house, with a couple of nails between his lips, knockingwith hammer in hand. The sun, gleaming in white hue, had justslid above the distant mountain ridges in the East. A robinshrilled hidden in some trees nearby, its chirping covered by theinterrupted pounding of the hammer. Trampling of hooves soundedfrom the road and a young man of about seventeen approached onhorse, dressed in thin linen shirt opened at the chest, with an axe girded at the waist and fishing utensils arrayed on the saddle. It was Helgi Dagsson. Lars Brandsson glanced to the sidea moment, wiping some loose strands of hair off his face andarranging them behind his ears, then went on to hammer the nailinto the wood.Lars Brandsson was up on the ladder, on the tall and abrupt roof of the house, with a couple of nails between his lips, knockingwith hammer in hand. The sun, gleaming in white hue, had justslid above the distant mountain ridges in the East. A robinshrilled hidden in some trees nearby, its chirping covered by theinterrupted pounding of the hammer. Trampling of hooves soundedfrom the road and a young man of about seventeen approached onhorse, dressed in thin linen shirt opened at the chest, with an axe girded at the waist and fishing utensils arrayed on the saddle. It was Helgi Dagsson. Lars Brandsson glanced to the sidea moment, wiping some loose strands of hair off his face andarranging them behind his ears, then went on to hammer the nailinto the wood.Lars Brandsson was up on the ladder, on the tall and abrupt roof of the house, with a couple of nails between his lips, knockingwith hammer in hand. The sun, gleaming in white hue, had justslid above the distant mountain ridges in the East. A robinshrilled hidden in some trees nearby, its chirping covered by theinterrupted pounding of the hammer. Trampling of hooves soundedfrom the road and a young man of about seventeen approached onhorse, dressed in thin linen shirt opened at the chest, with an axe girded at the waist and fishing utensils arrayed on the saddle. It was Helgi Dagsson. Lars Brandsson glanced to the sidea moment, wiping some loose strands of hair off his face andarranging them behind his ears, then went on to hammer the nailinto the wood.Lars Brandsson was up on the ladder, on the tall and abrupt roof of the house, with a couple of nails between his lips, knockingwith hammer in hand. The sun, gleaming in white hue, had justslid above the distant mountain ridges in the East. A robinshrilled hidden in some trees nearby, its chirping covered by theinterrupted pounding of the hammer. Trampling of hooves soundedfrom the road and a young man of about seventeen approached onhorse, dressed in thin linen shirt opened at the chest, with an axe girded at the waist and fishing utensils arrayed on the saddle. It was Helgi Dagsson. Lars Brandsson glanced to the sidea moment, wiping some loose strands of hair off his face andarranging them behind his ears, then went on to hammer the nailinto the wood.", author: "Charlotte Manetta", title: "The Amazing Zamboni", correct: { start: 241, end: 284, string: "A robinshrilled hidden in some trees nearby"}}

    this.setState({
      lesson: newLesson
    });
  },
  render: function() {
    return (
      <div className="container">
        <h1>Student View</h1>
        <MainText lesson={this.state.lesson} selectText={this.handleSelect}/>
        <RightBar prompt={this.state.prompt} actionOne={this.handleClear} actionTwo={this.handleSubmit} labelOne="clear" labelTwo="submit"/>
      </div>
    );
  },
});

module.exports = StudentView;
