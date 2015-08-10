var React = require('react');

var KlassBox = React.createClass({
  getInitialState: function() {
    return {
      display: 'panel'
    };
  },
  deleteClick: function(){
    this.props.delete(this.props.klass._id);
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
      display: panel
    });
  },
  render: function() {
    if(this.state.display === "panel"){
      var content = <div className="panel panel-default">
        <div className="panel-heading">
          <h5 className="panel-title">{this.props.klass.name}</h5>
          <p>Pin: {this.props.klass.pin}</p>
          <p>Grade: {this.props.klass.grade}</p>
          <button onClick={this.editClick}>Edit</button>
          <button onClick={this.deleteClick}>Delete</button>
        </div>
        <div className="panel-body">
          Panel content
        </div>
      </div>
    } else if (this.state.display === "edit"){
      var path = "/teachers/"+ this.props.teacher._id +"/klasses/" + this.props.klass._id
      var content = <div className="panel panel-default">
        <div className="panel-heading">
          <h5 className="panel-title">{this.props.klass.name}</h5>
          <p>Pin: {this.props.klass.pin}</p>
          <p>Grade: {this.props.klass.grade}</p>
          <button onClick={this.deleteClick}>Delete</button>
        </div>
        <div className="panel-body">
          <form action={path} method="put" onSubmit={this.handleSubmit}>
            <input id="name"
                   type="text"
                   name="name"
                   placeholder="5C - Second Period"
                   defaultValue={this.props.klass.name} />
            <input id="grade"
                   type="text"
                   name="grade"
                   placeholder="5"
                   defaultValue={this.props.klass.grade} />
            <input id="pin"
                   type="text"
                   name="pin"
                   placeholder="1234"
                   defaultValue={this.props.klass.pin} />
            <input type="submit" value="Update Class" />
          </form>
        </div>
      </div>
    }
    return (
      <div>
        { content }
      </div>
    );
  }

});

module.exports = KlassBox;
