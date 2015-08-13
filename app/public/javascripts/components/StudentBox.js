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
        <div>
          <br/>
          <p>{this.props.student.first_name} {this.props.student.last_initial}</p>
          <p>Username: {this.props.student.username}</p>
          <button className="btn btn-custom mar3px" onClick={this.editClick}>Edit</button>
          <button className="btn btn-custom mar3px" onClick={this.deleteClick}>Delete</button>
        </div>
    } else if (this.state.display === "edit"){
      var path = "/teachers/"
                   + this.props.teacher._id
                   + "/klasses/"
                   + this.props.klass._id
                   +"/students/"
                   + this.props.student._id
      var content =
        <div>
          <form id="studentEdit" action={path} method="put" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input className="form-control" id="username" type="text" name="username" placeholder={this.props.student.username} />
            </div>
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input className="form-control" id="first_name" type="text" name="first_name" placeholder={this.props.student.first_name} />
            </div>
            <div className="form-group">
              <label htmlFor="last_initial">Last Initial</label>
              <input className="form-control" id="last_initial" type="text" name="last_initial" placeholder={this.props.student.last_initial} />
            </div>
            <input className="btn btn-custom" type="submit" value="Update Student" />
          </form>
        </div>
    }
    return (
      <div>
        { content }
      </div>
    );
  }

});

module.exports = StudentBox;

