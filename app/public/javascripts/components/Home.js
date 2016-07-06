var React = require("react");
//below this import follow this syntax to add
//a new component. Save it in this file with capital
//file names to show that it is a react file
var Header = require("./Header");
var SignUp = require("./SignUp");


var Body = React.createClass({
  render: function() {
    return (
    	<div>
      <Header />
      <div id="main" className="container pt150px">
        <SignUp />
      </div>
      </div>
    );
  },
});

module.exports = Body;
//<Header />
