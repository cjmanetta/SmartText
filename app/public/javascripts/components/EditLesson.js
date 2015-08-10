var React = require('react');
var Router = require('react-router');


var EditLesson = React.createClass({
  getInitialState: function(){
    debugger
    return {
      lesson:  {title: "Character Traits", date: "11/24/2015", teacher_id: "0"}
    }

  },

  handleSubmit: function(event){
    var editLesson = this;
    debugger
    event.preventDefault();
    var action = $(event.target).attr('action');
    var method = 'put';
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
        EditLesson.transitionTo('lessonPanel', {id: serverData.teacher._id});
        EditLesson.setState({title: serverData.lesson.title})

      },
      error: function(serverData) {
        console.log(serverData);
      }
    })

  },
  render: function() {
    var formAction = '/teachers/' + this.props.teacher._id + '/lessons/55c76b967cb7dabcaaccd7e3'
    debugger
    return (
      <div className="row">
        <h1>Edit Lesson</h1>
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


// var mongoose = require('mongoose');

// var Schema = mongoose.Schema;

// var teacherSchema = Schema({
//   username: String,
//   password: String,
//   first_name: String,
//   last_name: String,
//   klasses: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Klass'
//   }],
//   lessons: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Lesson'
//   }]
// })
