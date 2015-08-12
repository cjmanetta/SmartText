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
      buttons = <div>
        <Link to="/" className="l-out btn btn-danger navbar-btn">Log Out</Link>
        <Link to="grid" params={{id: teacher._id }} className="t-p btn btn-default navbar-btn">Teacher Dashboard</Link>
        <Link to="studentPanel" params={{id: teacher._id }} className="s-p btn btn-default navbar-btn">Students Panel</Link>
        <Link to="lessonPanel" params={{id: teacher._id }} className="l-p btn btn-default navbar-btn">Lessons Panel</Link>
        <span className="clear"/>
      </div>
      logo = <Link to='lessonPanel' className="navbar-brand" params={{id: teacher._id }}><img src="../../../images/smartext_final.png" className="logo" alt="SmartText" / ></Link>
    } else if (student) {
      content = <p className="navbar-text navbar-left">{student.first_name}</p>
      logo = <Link to='students' className="navbar-brand" params={{id: student._id }}><img src="../../../images/smartext_final.png" className="logo" alt="SmartText" / ></Link>
    } else {
      logo = <Link to='/' className="navbar-brand"><img src="../../../images/smartext_final.png" className="logo" alt="SmartText" / ></Link>
    }

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          {logo}
          {content}
          {buttons}
        </div>
      </nav>
    )
  }
});

module.exports = Header;
