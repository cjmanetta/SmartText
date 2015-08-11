var React = require("react");

var MainText = React.createClass({
  componentDidMount: function(){
    document.addEventListener('mouseup', this.handleMouseUp);
  },
  handleMouseUp: function(){
    var selection = window.getSelection()
    if (selection.isCollapsed === false) {
      this.props.selectText(selection)
    }
  },
  render: function() {
    return (
      <div id="mainText" className="w60 p15px ml5">
        <h3 id="title">{this.props.lesson.title}</h3>
        <p id="author">{this.props.lesson.author}</p>
        <p id="content">{this.props.lesson.text}</p>
      </div>
    );
  },
});

module.exports = MainText;
