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
      student_ids: []
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
    $('#'+data._id).find('#content').html(this.props.article.content);
    $('#'+data._id).find('div').css("border-color", 'black')
  },
  updateStudentTile: function(data){
    var textFromStudent = data.selection;
    var borderColor = data.color;
    $('#'+data._id).find('#content').html(textFromStudent)
    $('#'+data._id).find('div').css("border-color", borderColor)
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
    if (!!this.state.student_ids.indexOf(data.student._id)){
      var student_ids = this.state.student_ids
      var students = this.state.students;
      student_ids.push(data.student._id)
      students.push(data.student)
      this.setState({
        students: students,
        student_ids: student_ids
      })
    }
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
        <li id={student._id} className='col-xs-6 col-sm-3 col-md-3 col-lg-2 w250px m-r10px' onClick={that.handleTileClick}><StudentTile student={student} article={that.props.article}/></li>
      )
    });
    return (
      <div>
        <Header teacher={this.props.teacher} />
        <h4>Teacher Dashboard</h4>
        <RouteHandler />
          {students}
        <RightBar question={this.props.question} actionOne={this.viewPrompt} actionTwo={this.handleFinish} labelOne="Display Question" labelTwo="Finish"/>
      </div>
    );
  },
});

module.exports = Grid;
