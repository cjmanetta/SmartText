var React = require('react');
var StudentList = require('./StudentList')

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
      display: "panel"
    });
  },
  render: function() {
    var path = "/teachers/"
                 + this.props.teacher._id
                 +"/klasses/"
                 + this.props.klass._id
                 + "/students"

    if(this.state.display === "panel"){
      var content =
        <div className="col-xs-12 col-sm-4">
          <div className="row">
          <div className="panel panel-default panel-heading">
            <h1>{this.props.klass.name}</h1>
            <p className="lh8px">Pin: {this.props.klass.pin}</p>
            <p>Grade: {this.props.klass.grade}</p>
            <div className="panel-footer">
              <a className="lg-glyph" onClick={this.editClick}><i className="glyphicon glyphicon-pencil"></i></a>
              <a className="lg-glyph" onClick={this.deleteClick}><i className="glyphicon glyphicon-trash"></i></a>
            </div>
          </div>
          </div>
        </div>

    } else if (this.state.display === "edit"){
      var path = "/teachers/"+ this.props.teacher._id +"/klasses/" + this.props.klass._id
      var content = <div className="col-xs-12 col-sm-4">

        <h3>{this.props.klass.name}</h3>
        <p>Pin: {this.props.klass.pin}</p>
        <p>Grade: {this.props.klass.grade}</p>
        <form id="klassEdit" action={path} method="put" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="last_initial">Class Name</label>
            <input id="name"
                 type="text"
                 name="name"
                 className="form-control"
                 defaultValue={this.props.klass.name} />
          </div>
          <div className="form-group">
            <label htmlFor="last_initial">Grade</label>
            <input id="grade"
                  type="text"
                  name="grade"
                  className="form-control"
                  defaultValue={this.props.klass.grade} />
          </div>
          <div className="form-group">
            <label htmlFor="pin">Pin</label>
            <input id="pin"
                 type="text"
                 name="pin"
                 className="form-control"
                 defaultValue={this.props.klass.pin} />
          </div>
          <input type="submit" className="btn btn-primary btn-sm outline" value="Update Class" />
        </form>
      </div>
    }
    return (
      <div className="row">
          { content }
            <StudentList teacher={this.props.teacher}
                         klass={this.props.klass}/>
      </div>
    );
  }

});

module.exports = KlassBox;
