var React = require("react");
//below this import follow this syntax to add
//a new component. Save it in this file with capital
//file names to show that it is a react file
var Footer = require("./Footer");


var Body = React.createClass({
  render: function() {
    return (
      <div id="main" className="container">
        <h3>Hello, Screw the browser!</h3>
        <Footer />
      </div>
    );
  },
});

module.exports = Body;
