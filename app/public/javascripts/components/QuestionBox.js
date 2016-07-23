var React = require("react");

var QuestionBox = React.createClass({
  render: function() {
    return (
      <div id="questionBox" className="question-panel">
          <div className="label">
            <h4>QUESTION :</h4>
          </div>
          <div className="info">
            <p>{this.props.prompt}</p>
          </div>
      </div>
    );
  },
});

module.exports = QuestionBox;
