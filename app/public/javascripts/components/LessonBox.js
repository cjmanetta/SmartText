var React = require('react');
var EditLesson = require("./EditLesson");
var Router = require('react-router');
var { Link } = Router;



var LessonBox = React.createClass({
  mixins: [
    Router.Navigation,
    Router.State,
  ],
  getInitialState: function() {
    return {
      display: 'panel',
      active: this.props.active
    };
  },
  editClick: function(){
    this.setState({
      display: "edit"
    });
  },
  deleteClick: function(){
    this.props.delete(this.props.lesson._id);
  },
  makeActive: function(){
    this.props.activate(this.props.lesson._id)
    this.setState({active: true})
  },
  handleSuccessfulUpdate: function(){
    this.setState({
      display: 'panel'
    });
  },
  render: function() {
    if(this.state.active === false) {
      var activeButton = <button type="button" className="btn btn-primary btn-xs outline" onClick={this.makeActive}>ACTIVATE LESSON</button>
    } else {
      var activeButton = <Link to="grid" params={{id: this.props.teacher._id }} role="group" className="live-lesson">GO TO LIVE LESSON<span className="glyphicon glyphicon-chevron-right"></span></Link>
    }
    if(this.state.display === "panel"){
      var content = <div className="panel panel-default">
          <div className="panel-heading">
            <p className="panel-title">{ this.props.lesson.title }   <span><a onClick={this.editClick}>
          <i className="glyphicon glyphicon-pencil"></i></a></span><span><a onClick={this.deleteClick}>
          <i className="glyphicon glyphicon-trash"></i></a></span></p>
            <p>{ this.props.lesson.date }</p>
            <div className="btn-group">
              {activeButton}
          </div>
        </div>
      </div>
    } else if (this.state.display === "edit") {
      var path = "/teachers/" + this.props.teacher._id + "/lessons" + this.props.lesson._id
      var content = <div className="panel panel-default">
          <div className="panel-heading">
            <h5 className="panel-title">{ this.props.lesson.title }</h5>
            <p>{ this.props.lesson.date }</p>
            <div className="btn-group">
              <button type="button" className="btn btn-primary btn-sm raised">Delete</button>
            </div>
            <div className="panel-body">
              <EditLesson teacher={this.props.teacher}
                          lesson={this.props.lesson}
                          getLessonsList={this.props.getLessonsList}
                          successfulUpdate={this.handleSuccessfulUpdate} />
            </div>
          </div>
      </div>
    }
    return (
      <div key={this.props.lesson._id}>
        {content}
      </div>
    )
  }
})

module.exports = LessonBox;
