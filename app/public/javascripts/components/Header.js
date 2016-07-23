var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var Header = React.createClass({

  mixins: [
    Router.Navigation,
    Router.State,
  ],
  handleNavClick: function(event){
    var active = document.querySelector('.active')
    active.classList.remove('active')
    event.target.classList.add('active')
  },
  render: function(){
    
    var teacher = this.props.teacher
    var teacherName = ""
    var student = this.props.student
    var username = null
    var dashboardLinks = null
    var logo = null
    var logout = null


    if (teacher) {
      var teacherName = ""
      if(teacher.first_name) {
        teacherName = teacher.first_name.toUpperCase()
      }
      username = <h4 className="">{teacherName}'S CLASSROOM</h4>
      dashboardLinks =
          <form className="dashboard-links">
            <Link to="teacherHome" disabled={this.props.activeLesson !== null} params={{id: teacher._id }} onClick={this.handleNavClick} role="group">HOME</Link>
            <Link to="studentPanel" params={{id: teacher._id }} className="" role="group" onClick={this.handleNavClick}>CLASSES</Link>
            <Link to="lessonPanel" params={{id: teacher._id }} className="" onClick={this.handleNavClick} role="group">LESSONS</Link>
          </form>
      logout = <div className="logout-container">
            <Link to="/" className="" role="group"><i className="glyphicon glyphicon-log-out"></i></Link>
          </div>
      logo = <Link to='lessonPanel' className="logo" params={{id: teacher._id }}></Link>
    } else if (student) {
      content = <p className="navbar-text navbar-left">{student.first_name}</p>
      logo = <Link to='students' className="navbar-brand" params={{id: student._id }}><div className="logo"></div></Link>
    } else {
      logo = <Link to='/'><div className="logo"></div></Link>
    }

    return (
      <nav className="dashboard-nav">
        <div className="logo-container">
          {logo}
          {username}
        </div>
        {dashboardLinks}
        {logout}
      </nav>
    )
  }
});

module.exports = Header;
