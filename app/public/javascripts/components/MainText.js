var React = require("react");

var MainText = React.createClass({
  propTypes: {
    lesson: React.PropTypes.object.isRequired,
    onSelect: React.PropTypes.func.isRequired,
  },
  handleMouseUp: function(){
    var selection = window.getSelection()
    if (selection.isCollapsed === false) {
      this.props.onSelect(selection)
    }
  },
  componentDidMount: function(){
    this.getDOMNode().addEventListener('mouseup', this.handleMouseUp);
  },
  componentWillUnmount: function(){
    this.getDOMNode().removeEventListener('mouseup', this.handleMouseUp);
  },
  render: function() {
    return (
      <div id="mainText" className="w60 p15px ml5">
        <h3 id="title">{this.props.article.title}</h3>
        <p id="author">{this.props.article.author}</p>
        <p id="content">{this.props.article.content}</p>
      </div>
    );
  },
});

module.exports = MainText;
