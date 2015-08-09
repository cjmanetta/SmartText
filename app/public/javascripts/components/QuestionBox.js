var React = require("react");

var QuestionBox = React.createClass({
  render: function() {
    return (
      <div id="questionBox" className="p15px db bcy mt10">
        <h3>Question:</h3>
        <p>{this.props.prompt}</p>
      </div>
    );
  },
});

module.exports = QuestionBox;
