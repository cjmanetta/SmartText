var React = require('react');
var Router = require('react-router');
var AuthError = require('./AuthError');
var Call = require("../call");
var TeacherAuthentication = require("./TeacherAuthentication");

var SignUp = React.createClass({
  mixins: [
    Router.Navigation,
    Router.State,
  ],
  getInitialState: function() {
    return {
      authBox: 'Students',
      error: false
    };
  },
  handleSubmit: function(event){
    event.preventDefault();
    var signUp = this;
    var action = $(event.target).attr('action');
    var method = $(event.target).attr('method');
    var username = $(event.target).find('#username').val()
    var first_name = $("#first_name").val();
    var last_name = $("#last_name").val();
    var password = $(event.target).find('#password').val()
    var pin = $(event.target).find('#pin').val()
    var data = {username: username, first_name: first_name, last_name: last_name, password: password, pin: pin}
    console.log("in here")
    Call.call(action, method, data)
        .then(function(serverData){
          debugger
          if(serverData.teacher === null || serverData.student === null){
            this.setState({
              error: true
            })
          } else if (serverData.student) {
            this.transitionTo('students', {id: serverData.student._id});
          } else {
            this.transitionTo('teachers', {id: serverData.teacher._id});
          }

        }.bind(this))
        .catch(function(serverData){
          console.log('failed authentication');
          console.log(serverData);
          debugger
        });
  },
  handlePillClick: function(event){
    event.preventDefault();
    this.setState({
      authBox: $(event.target).text()
    });
  },
  render: function() {
    if(this.state.authBox === 'Teachers'){
      var authBox = <TeacherAuthentication pillClick={this.handlePillClick} submit={this.handleSubmit} />
    } else if(this.state.authBox === 'Students'){
      var authBox = <div id="authBox" className="col-xs-12">
        <ul className="nav nav-tabs mbf20">
          <li role="presentation" className="active"><a href="#" onClick={ this.handlePillClick }>Students</a></li>
          <li role="presentation"><a href="#" onClick={ this.handlePillClick }>Teachers</a></li>
        </ul>
        <form id="studentLogIn" action="/students/login" method="post" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" name="username" id="username" placeholder="SuzyQ86" />
          </div>
          <div className="form-group">
            <label htmlFor="pin">Pin</label>
            <input type="text" className="form-control" name="pin" id="pin" placeholder="1234" />
          </div>
          <button type="submit" className="btn btn-primary outline">Log In</button>
        </form>
      </div>
    }
    if (this.state.error){
      var authError = <AuthError/>
    } else {
      var authError = <div></div>
    }
    return (
      <div className="row">
        <div className="col-xs-12 col-md-8 center-block">
          <div className="row">
            { authBox }
          </div>
          <div className="row">
            { authError }
          </div>
        </div>
       </div>
    );
  }
});

module.exports = SignUp;
