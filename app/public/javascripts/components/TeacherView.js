var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var Header = require("./Header");
var LessonPanel = require("./LessonPanel");

var TeacherView = React.createClass({
  getInitialState: function(){
    return {
      teacher: { _id: 0 }
    }
  },
  componentDidMount: function() {
    var teacherView = this;
    var action = '/teachers/' + this.props.params.id;
    var method = 'get';


    var request = $.ajax({
      url:      action,
      method:   method,
      dataType: "json"
    });

    request.done(function(serverData){
      console.log("success")
      teacherView.setState({
        teacher: serverData.teacher
      });
    });

    request.fail(function(serverData){
      console.log('There was an error getting the teacher')
      console.log(serverData);
    });
  },
  render: function() {
    return (
      <div className="container pt150px">
        <Header teacher={this.state.teacher}/>
        <h3>Welcome, { this.state.teacher.first_name}</h3>
      </div>
    );
  },
});

module.exports = TeacherView;
