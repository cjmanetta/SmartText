var React = require('react');
var Router = require('react-router');
var Call = require('../call');

var EditLesson = React.createClass({
  getInitialState: function(){
    return {
      lesson:  {}
    }

  },

  handleSubmit: function(event){
    event.preventDefault();
    var action = $(event.target).attr('action');
    var method = 'put';
    var title = $("#title").val();
    var date = $("#date").val();
    var data = {title: title, date: date}

    Call.call(action, method, data)
        .then(function(serverData){
          this.props.getLessonsList();
          this.props.successfulUpdate();
        }.bind(this))
        .catch(function(serverData){
          console.log('failed to update the lesson');
          console.log(serverData);
        });
  },
  render: function() {
    var formAction = '/teachers/' + this.props.teacher._id + '/lessons/' + this.props.lesson._id
    return (
      <div className="row">
        <form id="EditLesson" action={formAction} method="post" onSubmit={this.handleSubmit}>
          <input type="hidden" name="_method" value="put" />
          <div className="form-group">
            <label htmlFor="title">Lesson Title</label>
            <input type="text" className="form-control" name="title" id="title" value={this.state.lesson.title} />
          </div>
          <div className="form-group">
            <label htmlFor="date">Lesson Date</label>
            <input type="date" className="form-control" name="date" id="date" placeholder="MM/DD/YYYY" />
          </div>

          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  }
})

module.exports = EditLesson;
