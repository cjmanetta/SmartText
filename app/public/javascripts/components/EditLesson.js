var React = require('react');
var Router = require('react-router');


var EditLesson = React.createClass({
  handleSubmit: function(event){
    var editLesson = this;
    event.preventDefault();
    debugger
    var action = 'put';
    var method = $(event.target).attr('method');
    // var data = $(event.target).serialize();
    var title = $("#title").val();
    var date = $("#date").val();
    var data = {title: title, date: date}

    $.ajax({
      url: action,
      method: method,
      data: data,
      dataType: "json",
      success: function(serverData) {
        debugger
        EditLesson.transitionTo('lessonPanel', {id: serverData.teacher._id});

      },
      error: function(serverData) {
        console.log(serverData);
      }
    });


  },
  render: function() {
    var formAction = '/teachers/' + this.props.teacher._id + '/lessons/55c802fb19979dd90fc7cc02'
    return (
      <form id="EditLesson" action={formAction} method="post" onSubmit={this.handleSubmit}>
        <input type="hidden" name="_method" value="put" />
        <div className="form-group">
          <label htmlFor="title">Lesson Title</label>
          <input type="text" className="form-control" name="title" id="title" value={} />
        </div>
        <div className="form-group">
          <label htmlFor="date">Lesson Date</label>
          <input type="date" className="form-control" name="date" id="date" placeholder="MM/DD/YYYY" />
        </div>

        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    );
  }
})

module.exports = EditLesson;