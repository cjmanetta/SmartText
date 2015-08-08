import React from "react";

export default React.createClass({
  render: function() {
    return (
      <div id="questionBox" className="p15px db bcy mt10">
        <h3>Question:</h3>
        <p>{this.props.question}</p>
      </div>
    );
  },
});
