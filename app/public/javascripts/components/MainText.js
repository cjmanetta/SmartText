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
      this.getDOMNode().removeEventListener('mouseup', this.handleMouseUp);
    }
  },
  componentDidMount: function(){
    this.getDOMNode().addEventListener('mouseup', this.handleMouseUp);
  },
  componentWillUnmount: function(){
    this.getDOMNode().removeEventListener('mouseup', this.handleMouseUp);
  },
  getBeginning: function(selections) {
    var originalContent = this.props.article.content
    var beginningText = originalContent.slice(0,selections[0].startOffset)
    return beginningText
  },
  updateContent: function(selections){
    var originalContent = this.props.article.content
    var highlightedText = originalContent.slice(selections[0].startOffset, selections[0].endOffset)
    return highlightedText
  },
  getEnd: function(selections) {
    var originalContent = this.props.article.content
    var endText = originalContent.slice(selections[0].endOffset, originalContent.length )
    return endText
  },
  render: function() {

    var selections = this.props.selections

    if (selections.length === 0 ){
      var content = this.props.article.content
      var paragraph = <div><p id="content">{content}</p></div>
    } else {
      var paragraph = <div><p id="content">{this.getBeginning(selections)}<span className="highlight">{this.updateContent(selections)}</span >{this.getEnd(selections)}</p></div>
    }

    return (
      <div id="mainText" className="w60 p15px ml5">
        <h3 id="title">{this.props.article.title}</h3>
        <p id="author">{this.props.article.author}</p>
        {paragraph}
      </div>
    );
  },
});

module.exports = MainText;
