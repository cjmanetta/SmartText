var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var Header = require("./Header");
var RightBar = require('./RightBar');

//Sockets
var StudentTile = require('./StudentTile');
var socket = io();

var Grid = React.createClass({
  getInitialState: function(){
    return {
      article: {author: "Charlotte Manetta", title: "The Amazing Zamboni", content: "Lars Brandsson was up on the ladder, on the tall and abrupt roof of the house, with a couple of nails between his lips, knockingwith hammer in hand. The sun, gleaming in white hue, had justslid above the distant mountain ridges in the East. A robinshrilled hidden in some trees nearby, its chirping covered by theinterrupted pounding of the hammer. Trampling of hooves soundedfrom the road and a young man of about seventeen approached onhorse, dressed in thin linen shirt opened at the chest, with an axe girded at the waist and fishing utensils arrayed on the saddle. It was Helgi Dagsson. Lars Brandsson glanced to the sidea moment, wiping some loose strands of hair off his face andarranging them behind his ears, then went on to hammer the nailinto the wood."},
      question: {prompt: "How are you?", green_start: 241, green_end: 284},
      students: [],
      clickable: true,
      tileBig: false
    }
  },
  componentDidMount: function(){
    var that = this;
    socket.on('select', function(data){
      that.updateStudentTile(data)
    });
    socket.on('addStudent', function(data){
      console.log('made it into the socket')
      that.addStudent(data)
    });
    socket.on('studentClear', function(data){
      that.clearStudentTile(data)
    })
  },
  clearStudentTile: function(data){
    $('#'+data.id).find('#content').html(this.state.article.content);
    $('#'+data.id).find('div').css("border-color", 'black')
  },
  updateStudentTile: function(data){
    var textFromStudent = data.selection;
    var borderColor = data.color;
    $('#'+data.id).find('#content').html(textFromStudent)
    $('#'+data.id).find('div').css("border-color", borderColor)
  },
  handleTileClick: function(event){

    if (event.target.id === "clickable" && this.state.clickable){
      $(event.target).animate({width: "900px", height: "600px", fontSize: "20px"}, 1000)
      this.state.clickable = false
      $(event.target).attr('id', "clickedBig")
    } else if (event.target.id === "clickedBig"){
      $(event.target).animate({width: "250px", height: "350px", fontSize: "10px"}, 1000)
      $(event.target).attr('id', "clickable")
      this.state.clickable = true
    }
  },
  addStudent: function(data){
   var students =  this.state.students;
   students.push(data.student)
   console.log('students array: '+ students)
   this.setState({
      students: students
    })
  },
  viewPrompt: function(){
    socket.emit('viewPrompt', this.state.question)
  },
  disableStudents: function(){
    socket.emit('finish')
  },
  render: function() {

    var that = this
    var students = this.state.students.map(function(student){
      return (
        <div  >
          <li id={student.id} className="w20" onClick={that.handleTileClick}>
            <StudentTile student={student} article={that.state.article}/>
          </li>
        </div>
      )
    })
    return (
      <div className="container">
        <Header teacher={this.props.teacher} />
        <h3>Teacher Dashboard</h3>
        <RouteHandler />
          {students}
        <RightBar question={this.state.question} actionOne={this.viewPrompt} actionTwo={this.disableStudents} labelOne="view question" labelTwo="finished"/>
      </div>
    );
  },
});

module.exports = Grid;
