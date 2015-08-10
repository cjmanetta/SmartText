var React = require('react');
var Router = require('react-router');


var NewLesson = React.createClass({
  mixins: [
    Router.Navigation,
    Router.State,
  ],
  handleSubmit: function(event){
    var newLesson = this;
    event.preventDefault();
    var action = $(event.target).attr('action');
    var method = $(event.target).attr('method');
    // var data = $(event.target).serialize();
    var title = $("#title").val();
    var date = $("#date").val();
    var data = {title: title, date: date, teacher_id: this.props.teacher._id}

    $.ajax({
      url: action,
      method: method,
      data: data,
      dataType: "json",
      success: function(serverData) {
        newLesson.transitionTo('lessonPanel', {id: newLesson.props.teacher._id});

      },
      error: function(serverData) {
        console.log(serverData);
      }
    });


  },
  render: function() {
    var formAction = '/teachers/' + this.props.teacher._id + '/lessons'
    return (
      <div className="row">
        <h1>New Lesson</h1>
        <form id="newLesson" action={formAction} method="post" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Lesson Title</label>
            <input type="text" className="form-control" name="title" id="title" placeholder="Lesson Title" />
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

module.exports = NewLesson;