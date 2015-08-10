var React = require("react");
var KlassBox = require("./KlassBox");

var StudentPanel = React.createClass({
  getInitialState: function() {
    return {
      klasses:[]
    };
  },
  componentDidMount: function() {

    var studentPanel = this;
    var path = "/teachers/"+ this.props.params.id +"/klasses"
    var request = $.ajax({
      url:      path,
      method:   'get',
      dataType: "json"
    });

    request.done(function(serverData){
      var newKlasses = studentPanel.state.klasses.concat(serverData.klasses)
      studentPanel.setState({
        klasses: newKlasses
      });
    });

    request.fail(function(serverData){
      console.log('there was an error getting the lessons')
      console.log(serverData);
    });

  },
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
    var request = $.ajax({
      url:      action,
      method:   method,
      data:     data,
      dataType: "json"
    });

    request.done(function(serverData){
      var newKlasses = studentPanel.state.klasses.concat(serverData.klass)
      studentPanel.setState({
        klasses: newKlasses
      });
    });

    request.fail(function(serverData){
      console.log('there was an error creating that lesson')
      console.log(serverData);
    });
  },
  handleDeleteKlass: function(klass_id){
    //actually delete the component
    console.log('delete' + klass_id);
  },
  render: function(){
    var klasses = this.state.klasses.map(function(klass){
      return (
        <li key={klass._id}>
          <KlassBox klass={klass} delete={this.handleDeleteKlass}/>
        </li>
      )
    }.bind(this))
    var path = "/teachers/"+ this.props.teacher._id +"/klasses"
    return (
      <div>
        <h5>Student Panel</h5>
        <h6>New Class</h6>
        <form action={path} method="post" onSubmit={this.handleSubmit}>
          <input id="name" type="text" name="name" placeholder="5C - Second Period" />
          <input id="grade" type="text" name="grade" placeholder="5" />
          <input id="pin" type="text" name="pin" placeholder="1234" />
          <input type="submit" value="Create Class" />
        </form>
        <ul>
          { klasses}
        </ul>
      </div>
    )
  }
});

module.exports = StudentPanel;