var React = require("react");

var MainText = React.createClass({
  componentDidMount: function(){
    document.addEventListener('mouseup', this.handleMouseUp);
  },
  handleMouseUp: function(){
    var selectedText = window.getSelection();
    this.props.selectText(selectedText)
  },
  render: function() {
    return (
      <div id="mainText" className="w60 p15px ml5">
        <h3>{this.props.lesson.title}</h3>
        <p>{this.props.lesson.author}</p>
        <p>{this.props.lesson.text}</p>
      </div>
    );
  },
});

module.exports = MainText;
