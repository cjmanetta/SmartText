var React = require('react');

var LessonBox = React.createClass({


  render: function() {
    return (
      <div key={this.props.lesson._id}>
        <li className="list-group-item">{ this.props.lesson.title } { this.props.lesson.date }</li>
      </div>
    )
  }
})

module.exports = LessonBox;