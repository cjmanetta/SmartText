var React = require("react");
var RightBar = require('./RightBar');
var MainText = require('./MainText');
var socket = io.connect('http://localhost:8080');


var StudentView = React.createClass({
  getInitialState: function(){
    return {
      lesson: {text:"", author: "", title: ""},
      user: {first_name: "Aaron", last_name: "J", username: "hello", id: '123'},
      highlightOn: true,
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
      prompt: data
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
      var selectedRange = selection.getRangeAt(0);
      var selectedText = selectedRange.extractContents()
      var highlightSpan = $("<span class='highlight'>" + 
                          selectedText.textContent + "</span>");
      selectedRange.insertNode(highlightSpan[0]);  
      
      // I need to add the clear selection functionality here
      console.log($('#mainText').html())
      var highlightedText = $('#mainText').html()
      socket.emit('select', {
        user: this.state.user,
        selection: highlightedText
      })
    }
  },
  getLesson: function(){
    //here is where the api call would happen
    //to recieve the lesson which is active
    //for that class

    //stubbed for right now
    var newLesson = {text: "Lars Brandsson was up on the ladder, on the tall and abrupt roof of the house, with a couple of nails between his lips, knockingwith hammer in hand. The sun, gleaming in white hue, had justslid above the distant mountain ridges in the East. A robinshrilled hidden in some trees nearby, its chirping covered by theinterrupted pounding of the hammer. Trampling of hooves soundedfrom the road and a young man of about seventeen approached onhorse, dressed in thin linen shirt opened at the chest, with an axe girded at the waist and fishing utensils arrayed on the saddle. It was Helgi Dagsson. Lars Brandsson glanced to the sidea moment, wiping some loose strands of hair off his face andarranging them behind his ears, then went on to hammer the nailinto the wood.Lars Brandsson was up on the ladder, on the tall and abrupt roof of the house, with a couple of nails between his lips, knockingwith hammer in hand. The sun, gleaming in white hue, had justslid above the distant mountain ridges in the East. A robinshrilled hidden in some trees nearby, its chirping covered by theinterrupted pounding of the hammer. Trampling of hooves soundedfrom the road and a young man of about seventeen approached onhorse, dressed in thin linen shirt opened at the chest, with an axe girded at the waist and fishing utensils arrayed on the saddle. It was Helgi Dagsson. Lars Brandsson glanced to the sidea moment, wiping some loose strands of hair off his face andarranging them behind his ears, then went on to hammer the nailinto the wood.Lars Brandsson was up on the ladder, on the tall and abrupt roof of the house, with a couple of nails between his lips, knockingwith hammer in hand. The sun, gleaming in white hue, had justslid above the distant mountain ridges in the East. A robinshrilled hidden in some trees nearby, its chirping covered by theinterrupted pounding of the hammer. Trampling of hooves soundedfrom the road and a young man of about seventeen approached onhorse, dressed in thin linen shirt opened at the chest, with an axe girded at the waist and fishing utensils arrayed on the saddle. It was Helgi Dagsson. Lars Brandsson glanced to the sidea moment, wiping some loose strands of hair off his face andarranging them behind his ears, then went on to hammer the nailinto the wood.Lars Brandsson was up on the ladder, on the tall and abrupt roof of the house, with a couple of nails between his lips, knockingwith hammer in hand. The sun, gleaming in white hue, had justslid above the distant mountain ridges in the East. A robinshrilled hidden in some trees nearby, its chirping covered by theinterrupted pounding of the hammer. Trampling of hooves soundedfrom the road and a young man of about seventeen approached onhorse, dressed in thin linen shirt opened at the chest, with an axe girded at the waist and fishing utensils arrayed on the saddle. It was Helgi Dagsson. Lars Brandsson glanced to the sidea moment, wiping some loose strands of hair off his face andarranging them behind his ears, then went on to hammer the nailinto the wood.Lars Brandsson was up on the ladder, on the tall and abrupt roof of the house, with a couple of nails between his lips, knockingwith hammer in hand. The sun, gleaming in white hue, had justslid above the distant mountain ridges in the East. A robinshrilled hidden in some trees nearby, its chirping covered by theinterrupted pounding of the hammer. Trampling of hooves soundedfrom the road and a young man of about seventeen approached onhorse, dressed in thin linen shirt opened at the chest, with an axe girded at the waist and fishing utensils arrayed on the saddle. It was Helgi Dagsson. Lars Brandsson glanced to the sidea moment, wiping some loose strands of hair off his face andarranging them behind his ears, then went on to hammer the nailinto the wood.", author: "Charlotte Manetta", title: "The Amazing Zamboni"}

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
