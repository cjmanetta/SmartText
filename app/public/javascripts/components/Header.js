var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var Auth = require('../auth.js')

var Header = React.createClass({

  mixins: [
    Router.Navigation,
    Router.State,
  ],
  confirmLogout: function(){
    if (confirm("Are you sure you want to log out?")){
      Auth.logout();
    }
  },
  render: function(){
    var teacher = this.props.teacher
    var student = this.props.student
    var content = null
    var buttons = null

    if (teacher) {
      content = <p className="navbar-text navbar-left">{teacher.first_name} {teacher.last_name}</p>
      buttons = <div>
        <Link to="studentPanel" params={{id: teacher._id }} className="btn btn-default navbar-btn">Students Panel</Link>
        <Link to="lessonPanel" params={{id: teacher._id }} className="btn btn-default navbar-btn">Lessons Panel</Link>
        <div onClick={this.confirmLogout} className="btn btn-default navbar-btn">Log Out</div>
        <Link to="grid" params={{id: teacher._id }} className="btn btn-default navbar-btn">teacher dashboard</Link>
      </div>
    } else if (student) {
      content = <p className="navbar-text navbar-left">{student.first_name}</p>
    } else {
      content = null
    }

    return (
      //add full navbar components brand buttons etc
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">SmartText</a>
          {content}
          {buttons}
        </div>
      </nav>
    )
  }
});

module.exports = Header;
