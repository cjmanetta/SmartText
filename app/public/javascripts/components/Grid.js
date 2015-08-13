var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var Call = require('../call');

var Header = require("./Header");
var RightBar = require('./RightBar');

//Sockets
var StudentTile = require('./StudentTile');
var socket = io();

var Grid = React.createClass({
  mixins: [
    Router.Navigation,
    Router.State,
  ],
  getInitialState: function(){
    return {
      students: [],
      clickable: true,
      tileBig: false,
      showQuestion: true,
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
    var student =  this.findStudent(data.student);
    student.start = null;
    student.color = null;
    student.end = null
    this.forceUpdate();
  },
  updateStudentTile: function(data){
    var student = this.findStudent(data.student);
    student.start = data.start;
    student.end = data.end;
    student.color = data.color;
    this.forceUpdate();
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
    var student = this.findStudent(data.student);
    if (student === null){
      var newStudents = this.state.students.concat(data.student)
      this.setState({
        students: newStudents
      });
    }
  },
  findStudent: function(studentObj){
    var id = studentObj._id;
    var match = null;

    this.state.students.map(function(student){
      if(id === student._id){
        match = student
      }
    });

    return(match)
  },
  viewPrompt: function(){
    socket.emit('viewPrompt', this.props.question)
  },
  handleFinish: function(){
    socket.emit('finish');
    this.transitionTo('reviewPanel', {
                      id: this.props.teacher._id,
                      lesson_id: this.props.activeLesson._id
                    });
  },
  disableStudents: function(){
    socket.emit('finish')
  },
  render: function() {

    var that = this
    var students = this.state.students.map(function(student){
      return (
        <div  >
          <li id={student._id} className="w20" onClick={that.handleTileClick}>
            <StudentTile student={student}
                         article={that.props.article} />
          </li>
        </div>
      )
    })
    return (
      <div className="container">
        <h3>Teacher Dashboard</h3>
        <RouteHandler />
          {students}
        <RightBar question={this.props.question}
                  actionOne={this.viewPrompt}
                  actionTwo={this.handleFinish}
                  labelOne="view question"
                  labelTwo="finished"
                  show={this.state.showQuestion}/>
      </div>
    );
  },
});

module.exports = Grid;
