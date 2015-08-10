var React = require("react");
var StudentPanel = React.createClass({
  handleSubmit: function(event){
    event.preventDefault();

    var studentPanel = this;
    var action = $(event.target).attr('action');
    var method = $(event.target).attr('method');
    var name = $(event.target).find('#name').val()
    var grade = $(event.target).find("#grade").val();
    var pin = $(event.target).find('#pin').val()
    var teacher_id = this.props.teacher._id
    var data = {name: name, grade: grade, pin: pin, teacher_id: teacher_id }
    debugger
    var request = $.ajax({
      url:      action,
      method:   method,
      data:     data,
      dataType: "json"
    });

    request.done(function(serverData){
      studentPanel.props.update(serverData);
    });

    request.fail(function(serverData){
      console.log('there was an error creating that lesson')
      console.log(serverData);
    });
  },
  render: function(){
    var path = "/teachers/"+ this.props.teacher._id +"/klasses"
    return (
      <div>
        <h5>Student Panel</h5>
        <form action={path} method="post" onSubmit={this.handleSubmit}>
          <input id="name" type="text" name="name" placeholder="5C - Second Period" />
          <input id="grade" type="text" name="grade" placeholder="5" />
          <input id="pin" type="text" name="pin" placeholder="1234" />
          <input type="submit" value="Create Class" />
        </form>
      </div>
    )
  }
});

module.exports = StudentPanel;