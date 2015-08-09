var React = require('react');
var Router = require('react-router');


var NewLesson = React.createClass({
  handleSubmit: function(event){
    event.preventDefault();
  },
  render: function() {
    return (
      <form id="newLesson" action="/lessons" method="post" onSubmit={this.handleSubmit}>
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
    );
  }
})

module.exports = NewLesson;