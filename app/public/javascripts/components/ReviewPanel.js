var React = require('react');

var ReviewPanel = React.createClass({

  render: function() {
    var green = [];
    var blue = [];
    var red = [];

    if(this.props.answers){
      this.props.answers.map(function(answer){
        if(answer.correct === 2){
          green.push(answer);
        } else if(answer.correct === 1){
          blue.push(answer);
        } else {
          red.push(answer);
        }
      });
    }
    var redLi = red.map(function(answer){
      <li>answer._id</li>
    });

    var blueLi = blue.map(function(answer){
      <li>answer._id</li>
    });
    var greenLi = green.map(function(answer){
      <li>answer._id</li>
    });
    return (
      <div>
        <div>Review Panel</div>
        { greenLi }
        { blueLi }
        { redLi }
      </div>
    );
  }
});

module.exports = ReviewPanel;
