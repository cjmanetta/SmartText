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
      showAnswer: true,
    }
  },
  componentDidMount: function(){
    socket.on('select', function(data){
      this.updateStudentTile(data)
    }.bind(this));
    socket.on('addStudent', function(data){
      console.log('made it into the socket')
      this.addStudent(data)
    }.bind(this));
    socket.on('studentClear', function(data){
      this.clearStudentTile(data)
    }.bind(this))
  },
  clearStudentTile: function(data){
    var student =  this.findStudent(data.student);
    if(student._teacher_id === this.state.teacher._id){
      student.start = null;
      student.color = null;
      student.end = null
      this.forceUpdate();
    }
  },
  updateStudentTile: function(data){
    var student = this.findStudent(data.student);
    if(student._teacher_id === this.state.teacher._id){
      student.start = data.start;
      student.end = data.end;
      student.color = data.color;
      this.forceUpdate();
    }
  },
  handleTileClick: function(event){

    if (event.target.id === "clickable" && this.state.clickable){
      $(event.target).animate({position: "absolute", width: "900px", height: "600px", fontSize: "20px", backgroundColor: "white"}, 1000)
      this.state.clickable = false
      $(event.target).attr('id', "clickedBig")
    } else if (event.target.id === "clickedBig"){
      $(event.target).animate({width: "250px", height: "350px", fontSize: "10px"}, 1000)
      $(event.target).attr('id', "clickable")
      this.state.clickable = true
    }
  },
  addStudent: function(data){
    debugger
    var student = this.findStudent(data.student);
    if (student === null && data.teacher_id === this.props.teacher._id){
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

    var that = this;

    var students = this.state.students.map(function(student){
      return (
        <div>
          <li id={student._id} className='col-xs-6 col-sm-3 col-md-3 col-lg-2 w250px m-r10px' onClick={that.handleTileClick}>
            <StudentTile student={student}
                         article={that.props.article} />
          </li>
        </div>
      )
    });
    return (
      <div className="wrapper">
        <div className="sidebar">
          <RightBar question={this.props.question}
                actionOne={this.viewPrompt}
                actionTwo={this.handleFinish}
                labelOne="Display Question"
                labelTwo="Finish"
                show={this.state.showQuestion}
                showAnswer={this.state.showAnswer}
                teacher={this.props.teacher}
                article={this.props.article}/>
        </div>
        <div className="dashboard-container container">
          {students}
          <RouteHandler />
        </div>
      </div>
    );
  },
});

module.exports = Grid;
