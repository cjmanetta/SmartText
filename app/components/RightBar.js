import React from "react";
import QuestionBox from "./QuestionBox"

export default React.createClass({

  render: function() {
    return (
      <div id="rightBar" className="pf w20 bcp tal t0 r0 h100 p15px">
        <div className="pr db h90">
          <QuestionBox question={ this.props.lesson.prompt }/>
          <div className="button-group pa b0 r0">
            <Button onClick={this.props.actionOne}>
              {this.props.labelOne}
            </Button>
            <Button onClick={this.props.actionTwo}>
              {this.props.labelTwo}
            </Button>
          </div>
        </div>
      </div>
    );
  },
});
