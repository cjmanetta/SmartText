var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var Header = require("./Header");

var TeacherView = React.createClass({
  getInitialState: function(){
    return { 
    }
  },
  render: function() {
    var teacher = {_id: "22", first_name: "sally", last_name: "bates", username: "sbates", password: "1234"}
    var student = {_id: "24", first_name: "robert", username: "robertb", password: "1234"}

    return (

      <div className="container">
        <Header teacher={teacher} student={student} />
        <h3>Teacher View Component</h3>
        <RouteHandler />
      </div>
    );
  },
});

module.exports = TeacherView;
