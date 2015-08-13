var React = require("react");
var QuestionBox = require("./QuestionBox");

var RightBar = React.createClass({
  render: function() {
    if(this.props.show){
      var prompt = this.props.question.prompt
    } else {
      var prompt = ""
    }

    return (
      <div id="rightBar" className="pf w20 bcp tal t0 r0 h100 p15px">
        <div className="pr db h90">
          <QuestionBox prompt={ prompt }/>
          <div className="button-group pa b0 r0">
            <button onClick={this.props.actionOne}>
              {this.props.labelOne}
            </button>
            <button onClick={this.props.actionTwo}>
              {this.props.labelTwo}
            </button>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = RightBar;
