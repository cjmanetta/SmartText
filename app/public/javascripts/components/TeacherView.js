var React = require("react");
var RightBar = require('./RightBar');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var Header = require("./Header");


var TeacherView = React.createClass({
  getInitialState: function(){
    return {
      lesson: {}
    }
  },
	handleSelect: function(){
    // io.connect('http://localhost:8080');
    // var socket = io('/teacher')
    socket.on('select', function(data){
			console.log(data.user);
			console.log(data.selectedText);
    })
	},
	handleStop: function(){
		//turn off listeners by calling off function
	},
  render: function() {
    var teacher = {_id: "22", first_name: "sally", last_name: "bates", username: "sbates", password: "1234"}
    var student = {_id: "24", first_name: "robert", username: "robertb", password: "1234"}
    return (

      <div className="container">
        <Header teacher={teacher} student={student} />
        <h3>Teacher View Component</h3>
        <RouteHandler />
        <RightBar lesson={this.state.lesson} user="" actionOne={this.handleStart} actionTwo={this.handleStop} labelOne="start" labelTwo="stop"/>
      </div>
    );
  },
});

module.exports = TeacherView;
