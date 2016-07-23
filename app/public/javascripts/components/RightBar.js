var React = require("react");
var QuestionBox = require("./QuestionBox");
var StudentTile = require("./StudentTile");

var RightBar = React.createClass({
  render: function() {
    if(this.props.show === true){
      var prompt = this.props.question.prompt
    } else {
      var prompt = ""
    }

    if (this.props.labelOne === "Display Question"){
      var buttonColor = "display"
    } else {
      var buttonColor = "finish"
    }
    if (this.props.showAnswer && this.props.teacher !== null && this.props.teacher._id !== 0 && this.props.article.content !== undefined && this.props.question.green_start !== undefined){
      var student = {start: this.props.question.green_start, end: this.props.question.green_end, first_name: this.props.teacher.first_name, last_initial: this.props.teacher.last_name}
      var answer = <StudentTile student={student} article={this.props.article}/>
    } else {
      var answer = <div></div>
    }

    return (
      <div id="rightBar" className="question-bar">
          <QuestionBox prompt={ prompt }/>
          {answer}
          <div className="btn-container">
            <div className={buttonColor} onClick={this.props.actionOne}>
                  {this.props.labelOne}
            </div>
            <div className="finish" onClick={this.props.actionTwo}>
              {this.props.labelTwo}
            </div>
          </div>
      </div>
    );
  },
});

module.exports = RightBar;
