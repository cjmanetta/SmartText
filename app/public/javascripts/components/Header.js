var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var Header = React.createClass({
  mixins: [
    Router.Navigation,
    Router.State,
  ],
  render: function(){
    var teacher = this.props.teacher
    var student = this.props.student
    var content = null
    var buttons = null

    if (teacher) {
      content = <p className="navbar-text navbar-left">{teacher.first_name} {teacher.last_name}</p>
      buttons = <div>
      <Link to="studentPanel" params={{id: "1"}}>student panel</Link>
      <Link to="lessonPanel" params={{id: "1"}}>lesson panel</Link>
      </div>

    } else if (student) {
      content = <p className="navbar-text navbar-left">{student.first_name}</p>
      buttons = <a className="navbar-btn navbar-right" href="#">studenty things</a>
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