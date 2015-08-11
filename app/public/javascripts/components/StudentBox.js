var React = require('react');

var StudentBox = React.createClass({
  getInitialState: function() {
    return {
      display: "panel"
    };
  },
  deleteClick: function(){
    this.props.delete(this.props.student._id);
  },
  editClick: function(){
    this.setState({
      display: "edit"
    });
  },
  handleSubmit: function(event){
    event.preventDefault();
    this.props.update(event);
    this.setState({
      display: "panel"
    });
  },
  render: function() {
    if(this.state.display === "panel"){
      var content =
        <li>
          <p>Username: {this.props.student.username}</p>
          <p>First Name: {this.props.student.first_name}</p>
          <p>Last Initial: {this.props.student.last_initial}</p>
          <button onClick={this.editClick}>Edit</button>
          <button onClick={this.deleteClick}>Delete</button>
        </li>
    } else if (this.state.display === "edit"){
      var path = "/teachers/"
                   + this.props.teacher._id
                   + "/klasses/"
                   + this.props.klass._id
                   +"/students/"
                   + this.props.student._id
      var content =
        <li>
          <p>Username: {this.props.student.username}</p>
          <p>First Name: {this.props.student.first_name}</p>
          <p>Last Initial: {this.props.student.last_initial}</p>
          <button onClick={this.deleteClick}>Delete</button>
          <form action={path} method="put" onSubmit={this.handleSubmit}>
            <input id="username" type="text" name="username" placeholder={this.props.student.username} />
            <input id="first_name" type="text" name="first_name" placeholder={this.props.student.first_name} />
            <input id="last_initial" type="text" name="last_initial" placeholder={this.props.student.last_initial} />
            <input type="submit" value="Create Student" />
          </form>
        </li>
    }
    return (
      <div>
        { content }
      </div>
    );
  }

});

module.exports = StudentBox;

