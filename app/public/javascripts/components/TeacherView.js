var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var Header = require("./Header");
var LessonPanel = require("./LessonPanel");

var TeacherView = React.createClass({
  getInitialState: function(){
    return {
      teacher: { _id: 0 },
      activeLesson: null
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
      teacherView.getActiveLesson(serverData.teacher);
      teacherView.setState({
        teacher: serverData.teacher
      });
    });

    request.fail(function(serverData){
      console.log('There was an error getting the teacher')
      console.log(serverData);
    });
  },
  handleUpdateTeacher: function(serverData){
    this.setState({
      teacher: serverData.teacher
    });
  },
  getActiveLesson: function(teacher){
    var teacherView = this;
    var path = "/teachers/"
                + this.props.params.id
                +"/lessons/"
                + teacher.active_lesson

    var request = $.ajax({
      url:      path,
      method:   'get',
      dataType: "json"
    });

    request.done(function(serverData){
      teacherView.setState({
        activeLesson: serverData.lesson
      });
    });

    request.fail(function(serverData){
      console.log('there was an error getting the active lesson')
      console.log(serverData);
    });
  },
  setActiveLesson: function(lesson_id){
    var path = "/teachers/"
                 + this.state.teacher._id
                 + "/lessons/"
                 + lesson_id
                 + "/activate"
    var request = $.ajax({
      url: path,
      method: "get",
      dataType: 'json'
    });

    request.done(function(serverData){
      this.setState({
        activeLesson: serverData.lesson
      })
    }.bind(this));

    request.fail(function(serverData){
      console.log('failed to set the active lesson');
      console.log(serverData);
    });
  },
  render: function() {
    return (
      <div className="container pt150px">
        <Header teacher={this.state.teacher}/>
        <h3>Welcome, { this.state.teacher.first_name}</h3>
        <RouteHandler teacher={this.state.teacher}
                      update={this.handleUpdateTeacher}
                      activeLesson={this.state.activeLesson}
                      activate={this.setActiveLesson} />
      </div>
    );
  },
});

module.exports = TeacherView;
