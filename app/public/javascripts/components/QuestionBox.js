var React = require("react");

var QuestionBox = React.createClass({
  render: function() {
    return (
      <div id="questionBox">
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">Question:</h3>
          </div>
          <div className="panel-body">
            <p>{this.props.prompt}</p>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = QuestionBox;
