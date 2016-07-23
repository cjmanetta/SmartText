var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var TeacherHome = React.createClass({
  mixins: [
    Router.Navigation,
    Router.State,
  ],

  getPanelInfo: function(){
    if(this.props.lessons[0]) {
      var lesson = this.props.lessons[0]
      var date = new Date(lesson.date)
      this.props.getArticle(lesson.article_id)
      var articleTitle = ""
      if (this.props.article) {
        articleTitle = this.props.article.title
      }
      return (
        <div className="info">
          <h4>{lesson.title.toUpperCase()}</h4>
          <p className="date"><small>{date.getMonth() + 1}/{date.getDay()}/{date.getYear()}</small></p>
          <p class="descript">{articleTitle}</p>
        </div>
      )
    } else {
      return <div className="info"><h3>CREATE A LESSON</h3></div>
    }
  },
  getActiveLesson: function() {
    if(this.props.activeLesson)
    return (
    <Link to="grid" params={{id: this.props.teacher._id }} role="group" className="live-lesson">GO TO LIVE LESSON<span className="glyphicon glyphicon-chevron-right"></span></Link>
    )
  },
	render: function(){
    var panelInfo = this.getPanelInfo() 
    var activeLesson = this.getActiveLesson()
		return (
			<div className="wrapper">
        <div className="sidebar">
          {activeLesson}
        </div>
        <div className="dashboard-container">
        <div className="panel-row">
          <Link className="custom-panel" to="lessonPanel" params={{id: this.props.teacher._id }}>
            <div className="label">
              <h4>LESSONS</h4>
            </div>
            {panelInfo}
          </Link>
          <Link id="yellow" ref="klassPanel" className="custom-panel" to="lessonPanel" params={{id: this.props.teacher._id }}>
            <div className="label">
              <h4>CLASSES</h4>
            </div>
            <div className="info">
              <h4>4th PERIOD</h4>
              <p className="date"><small>11:30 - 12:30</small></p>
              <p class="descript">10 STUDENTS</p>
            </div>
          </Link>
        </div>
        <div className="panel-row">
          <Link id="green" className="custom-panel" to="teacherHome" params={{id: this.props.teacher._id }}>
            <div className="label">
              <h4>REPORTS</h4>
            </div>
            <div className="info">
              <h4>PREVIOUS LESSON</h4>
              <p className="date"><small>15 STUDENTS on 11/1/16</small></p>
              <p class="descript">ROMEO & JULIET</p>
            </div>
          </Link>
        </div>
          
          
        </div>
      </div>
		);
	}


});

module.exports = TeacherHome;