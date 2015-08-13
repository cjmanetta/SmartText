var React = require("react");
var KlassBox = require("./KlassBox");
var Call = require("../call");

var StudentPanel = React.createClass({
  getInitialState: function() {
    return {
      klasses:[]
    };
  },
  componentDidMount: function() {
    this.getKlassList();
  },
  getKlassList: function(){
    var studentPanel = this;
    var path = "/teachers/"+ this.props.params.id +"/klasses"
    Call.call(path, 'get')
        .then(function(serverData){
          this.setState({
            klasses: serverData.klasses
          });
        }.bind(this))
        .catch(function(serverData){
          console.log('there was an error getting the klasses')
          console.log(serverData);
        });
  },
  handleSubmit: function(event){
    event.preventDefault();

    var form = event.target;
    var action = $(form).attr('action');
    var method = $(form).attr('method');
    var name = $(form).find('#name').val()
    var grade = $(form).find("#grade").val();
    var pin = $(form).find('#pin').val()
    var teacher_id = this.props.teacher._id
    var data = {name: name, grade: grade, pin: pin, teacher_id: teacher_id }

    Call.call(action, method, data)
        .then(function(serverData){
          form.reset();
          if(method === "post"){
            var newKlasses = this.state.klasses.concat(serverData.klass)
            this.setState({
              klasses: newKlasses
            });
          } else if (method === "put"){
            this.getKlassList();
          }
        }.bind(this))
        .catch(function(serverData){
          console.log('there was an error creating the class')
          console.log(serverData);
        });
  },
  handleDeleteKlass: function(klass_id){
    var action = '/teachers/' + this.props.teacher._id +"/klasses/" + klass_id;
    Call.call(action, 'delete')
        .then(function(serverData){
          this.getKlassList();
        }.bind(this))
        .catch(function(serverData){
          console.log('there was an error deleting the klass')
          console.log(serverData);
        });
  },
  render: function(){
    var klasses = this.state.klasses.map(function(klass){
      return (
        <div className="klassBox" key={klass._id}>
          <KlassBox klass={klass}
                    delete={this.handleDeleteKlass}
                    teacher={this.props.teacher}
                    update={this.handleSubmit} />
        </div>
      )
    }.bind(this))
    var path = "/teachers/"+ this.props.teacher._id +"/klasses"
    return (
      <div id="studentPanel">
        <h5>Student Panel</h5>
        <h6>New Class</h6>
        <form id="newKlass" action={path} method="post" onSubmit={this.handleSubmit}>
          <input id="name" type="text" name="name" placeholder="5C - Second Period" />
          <input id="grade" type="text" name="grade" placeholder="5" />
          <input id="pin" type="text" name="pin" placeholder="1234" />
          <input type="submit" value="Create Class" />
        </form>
        <div>
          { klasses}
        </div>
      </div>
    )
  }
});

module.exports = StudentPanel;
