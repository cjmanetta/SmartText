var React = require('react');

var TeacherAuthentication = React.createClass({

  render: function() {
    return (
      <div id="authBox" className="col-xs-12">
        <ul className="nav nav-tabs mbf20">
          <li role="presentation"><a href="#" onClick={ this.props.pillClick }>Students</a></li>
          <li role="presentation" className="active"><a href="#" onClick={ this.props.pillClick }>Teachers</a></li>
        </ul>
        <form id="teacherLoginForm" className="col-sm-4" action="/teachers/login" method="post" onSubmit={this.submit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" name="username" id="username" placeholder="SuzyQ86" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" id="password" placeholder="*******" />
          </div>
          <button type="submit" className="btn btn-primary outline">Log In</button>
        </form>

        <form id="signUp" className="col-sm-8" action="/teachers" method="post" onSubmit={this.props.submit}>
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
          <button type="submit" className="btn btn-primary outline">Sign Up</button>
        </form>
      </div>
    );
  }

});

module.exports = TeacherAuthentication;