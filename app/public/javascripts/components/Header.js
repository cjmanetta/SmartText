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
    var logo = null

    if (teacher) {
      content = <p className="navbar-text navbar-left">{teacher.first_name} {teacher.last_name}</p>
      buttons = <div id="buttons">
        <Link to="/" className="l-out btn btn-danger navbar-btn">Log Out</Link>
        <Link to="grid" disabled={this.props.activeLesson !== null} params={{id: teacher._id }} className="t-p btn btn-custom navbar-btn">Teacher Dashboard</Link>
        <Link to="studentPanel" params={{id: teacher._id }} className="s-p btn btn-custom navbar-btn">Students Panel</Link>
        <Link to="lessonPanel" params={{id: teacher._id }} className="l-p btn btn-custom navbar-btn">Lessons Panel</Link>
        <span className="clear"/>
      </div>
      logo = <Link to='lessonPanel' className="navbar-brand" params={{id: teacher._id }}><img src="../../../images/smartext_final.png" className="logo" alt="SmartText" / ></Link>
    } else if (student) {
      content = <p className="navbar-text navbar-left">{student.first_name}</p>
      logo = <Link to='students' className="navbar-brand" params={{id: student._id }}><img src="../../../images/smartext_final.png" className="logo" alt="SmartText" / ></Link>
    } else {
      logo = <Link to='/' className="navbar-brand"><img src="../../../images/smartext_final3.png" className="logo" alt="SmartText" / ></Link>
    }

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">{logo}</a>
          {content}
          {buttons}
        </div>
      </nav>
    )
  }
});

module.exports = Header;
