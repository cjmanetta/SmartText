var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var Header = require("./Header");
var RightBar = require('./RightBar');

//Sockets
var StudentTile = require('./StudentTile');
var socket = io();
// var socket = io.connect('/https://smartext.herokuapp.com/#/');

var Grid = React.createClass({
  getInitialState: function(){
    return {
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
    console.log('inside update')
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
   students.push(data.user)
   console.log('students array: '+ students)
   this.setState({
      students: students
    })
  },
  viewPrompt: function(){
    socket.emit('viewPrompt', this.props.question.prompt)
  },
  disableStudents: function(){
    socket.emit('finish')
  },
  render: function() {

    var lesson = this.state.lesson
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
        <RightBar prompt={this.props.question.prompt} actionOne={this.viewPrompt} actionTwo={this.disableStudents} labelOne="view question" labelTwo="finished"/>
      </div>
    );
  },
});

module.exports = Grid;
