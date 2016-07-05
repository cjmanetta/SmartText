var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

// (function(){ 
//   addLinkListener();
// })();

function addLinkListener() {
  var links = document.querySelector('.dashboard')
  links.addEventListener('click', handleLinkClick)
}

function handleLinkClick() {
  var active = document.querySelector('.active')
  active.classList.remove('active')
  event.target.classList.add('active')
}

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
    var student = this.props.student
    var username = null
    var dashboardLinks = null
    var logo = null
    var logout = null

    // addEventListener();

    if (teacher) {
      username = <p className="">{teacher.first_name}</p>
      dashboardLinks =
          <form className="dashboard-links">
            <Link to="grid" disabled={this.props.activeLesson !== null} params={{id: teacher._id }} onClick={this.handleNavClick} role="group">Dashboard</Link>
            <Link to="studentPanel" params={{id: teacher._id }} className="" role="group" onClick={this.handleNavClick}>Students</Link>
            <Link to="lessonPanel" params={{id: teacher._id }} className="" onClick={this.handleNavClick} role="group">Lessons</Link>
          </form>
      logout = <div className="logout-container">
            <Link to="/" className="btn btn-xs btn-warning outline" role="group">logout</Link>
          </div>
      logo = <Link to='lessonPanel' className="" params={{id: teacher._id }}><div className="logo"></div></Link>
    } else if (student) {
      content = <p className="navbar-text navbar-left">{student.first_name}</p>
      logo = <Link to='students' className="navbar-brand" params={{id: student._id }}><div className="logo"></div></Link>
    } else {
      logo = <Link to='/' className="navbar-brand"><div className="logo"></div></Link>
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
