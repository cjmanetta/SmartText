var React = require("react");
//below this import follow this syntax to add
//a new component. Save it in this file with capital
//file names to show that it is a react file
var Header = require("./Header");
var SignUp = require("./SignUp");


var Body = React.createClass({
  render: function() {
    var teacher = {_id: "22", first_name: "sally", last_name: "bates", username: "sbates", password: "1234"}
    return (
      <div id="main" className="container">
        <Header teacher={teacher}/>
        <SignUp />
      </div>
    );
  },
});

module.exports = Body;
