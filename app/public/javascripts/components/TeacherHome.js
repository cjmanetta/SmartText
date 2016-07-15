var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var TeacherHome = React.createClass({
  mixins: [
    Router.Navigation,
    Router.State,
  ],

  getPanelInfo: function(){
    var klassPanel = this.refs.klassPanel
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
	render: function(){
    var panelInfo = this.getPanelInfo()
		return (
			<div className="wrapper">
        <div className="sidebar"></div>
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
            {panelInfo}
          </Link>
        </div>
        <div className="panel-row">
          <Link className="custom-panel" to="lessonPanel" params={{id: this.props.teacher._id }}>
            <div className="label">
              <h4>LESSONS</h4>
            </div>
            {panelInfo}
          </Link>
          <Link className="custom-panel" to="teacherHome" params={{id: this.props.teacher._id }}>
            <div className="label">
              <h4>REPORTS</h4>
            </div>
            {panelInfo}
          </Link>
        </div>
          
          
        </div>
      </div>
		);
	}


});

module.exports = TeacherHome;