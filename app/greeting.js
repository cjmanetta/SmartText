import React from "react";

export default React.createClass({
  render: function() {
    return (
      <div className="greeting">
        <h3>Hello, there {this.props.name}!</h3>
      </div>
    );
  },
});


React.render(
  <Greeting name="World"/>,
  document.body
);