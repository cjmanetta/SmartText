var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var Header = require("./Header");

var TeacherView = React.createClass({
  getInitialState: function(){
    return {
      teacher: {}
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
    var teacher = this.state.teacher

    return (
      <div className="container pt150px">
        <Header teacher={teacher}/>
        <h3>Welcome, { teacher.first_name}</h3>

        <RouteHandler />
      </div>
    );
  },
});

module.exports = TeacherView;
