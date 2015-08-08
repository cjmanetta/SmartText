var React = require('react');
var Router = require('react-router');

var SignUp = React.createClass({
  mixins: [
    Router.Navigation,
    Router.State,
  ],
  handleSubmit: function(event){

    event.preventDefault();
    var signUp = this;
    var action = $(event.target).attr('action');
    var method = $(event.target).attr('method');
    var username = $("#username").val();
    var first_name = $("#first_name").val();
    var last_name = $("#last_name").val();
    var password = $("#password").val();
    var data = {username: username, first_name: first_name, last_name: last_name, password: password}

    var request = $.ajax({
      url:      action,
      method:   method,
      data:     data,
      dataType: "json"
    });

    request.done(function(serverData){
      signUp.transitionTo('teachers', {id: serverData.teacher._id}, serverData);
    });

    request.fail(function(serverData){
      console.log(serverData);
    });
  },
  render: function() {
    return (
      <form id="signUp" action="/teachers" method="post" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input type="text" className="form-control" name="first_name" id="first_name" placeholder="Suzy" />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input type="text" className="form-control" name="last_name" id="last_name" placeholder="Que" />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" name="username" id="username" placeholder="SuzyQ86" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password" id="password" placeholder="*******" />
        </div>

        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    );
  }
});

module.exports = SignUp;
