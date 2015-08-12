var React = require('react');
var Router = require('react-router');

var AuthError = React.createClass ({
  render: function(){
    return (
      <div className="alert alert-danger mt10">
        <p>Oops!  You entered the wrong credentials. Try again.</p>
      </div>
    )
  }
})

module.exports = AuthError;
