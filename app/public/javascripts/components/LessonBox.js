var React = require('react');
var EditLesson = require("./EditLesson");


var LessonBox = React.createClass({
  getInitialState: function() {
    return {
      display: 'panel'
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
  render: function() {
    debugger

    if(this.state.display === "panel"){
      var content = <div className="panel panel-default">
          <div className="panel-heading">
            <h5 className="panel-title">{ this.props.lesson.title }</h5>
            <p>{ this.props.lesson.date }</p>
            <div className="btn-group">
              <button type="button" className="btn btn-default" onClick={this.editClick}>Edit</button>
              <button type="button" className="btn btn-default" onClick={this.deleteClick}>Delete</button>
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
              <button type="button" className="btn btn-default">Delete</button>
            </div>
            <div className="panel-body">
              <EditLesson teacher={this.props.teacher}/>
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