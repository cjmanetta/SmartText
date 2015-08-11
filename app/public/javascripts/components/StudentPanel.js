var React = require("react");
var KlassBox = require("./KlassBox");


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
    var request = $.ajax({
      url:      path,
      method:   'get',
      dataType: "json"
    });

    request.done(function(serverData){
      var newKlasses = serverData.klasses
      studentPanel.setState({
        klasses: newKlasses
      });
    });

    request.fail(function(serverData){
      console.log('there was an error getting the klasses')
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

    debugger
    var request = $.ajax({
      url:      action,
      method:   method,
      data:     data,
      dataType: "json"
    });

    request.done(function(serverData){
      if(method === "post"){
        var newKlasses = studentPanel.state.klasses.concat(serverData.klass)
        studentPanel.setState({
          klasses: newKlasses
        });
      } else if (method === "put"){
        this.getKlassList();
      }
    }.bind(this));

    request.fail(function(serverData){
      console.log('there was an error creating that klass')
      console.log(serverData);
    });
  },
  handleDeleteKlass: function(klass_id){
    var action = '/teachers/' + this.props.teacher._id +"/klasses/" + klass_id;
    var method = 'delete';
    var request = $.ajax({
      url:      action,
      method:   method,
      dataType: "json"
    });

    request.done(function(serverData){
      this.getKlassList();
    }.bind(this));

    request.fail(function(serverData){
      console.log('there was an error deleting the class')
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
