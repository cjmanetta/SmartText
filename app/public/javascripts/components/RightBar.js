var React = require("react");
var QuestionBox = require("./QuestionBox");

var RightBar = React.createClass({
  render: function() {

    if (this.props.labelOne === "Display Question"){
      var buttonColor = "btn btnxl pr btn-success"
    } else {
      var buttonColor = "btn btnxl pr btn-primary"
    }

    return (
      <div id="rightBar" className="pf wf300px bcg r5 tal h100 p15px tp50px">
        <div className="row">
          <div className="col-md-12">
            <QuestionBox prompt={ this.props.question.prompt }/>
          </div>
        </div>
        <div className="pa b0 h30 btns">
          <div className="row cntr">
            <div className="col-md-12">
              <button className={buttonColor} onClick={this.props.actionOne}>
                {this.props.labelOne}
              </button>
            </div>
          </div>
          <div className="row cntr">
            <div className="col-md-12">
              <button className="btn btn-danger btnxl pr" onClick={this.props.actionTwo}>
                {this.props.labelTwo}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

module.exports = RightBar;
