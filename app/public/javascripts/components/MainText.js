var React = require("react");

var MainText = React.createClass({
  propTypes: {
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
  getBeginning: function(range) {
    var originalContent = this.props.article.content
    var beginningText = originalContent.slice(0, range.startOffset)
    return beginningText
  },
  updateContent: function(range){
    var originalContent = this.props.article.content
    var highlightedText = originalContent.slice(range.startOffset, range.endOffset)
    return highlightedText
  },
  getEnd: function(range) {
    var originalContent = this.props.article.content
    var endText = originalContent.slice(range.endOffset, originalContent.length )
    return endText
  },
  componentDidUpdate: function(){
    this.getDOMNode().addEventListener('mouseup', this.handleMouseUp);
  },
  updateTeacher: function(){
    var start = this.props.selections[0].getRangeAt(0).startOffset;
    var end = this.props.selections[0].getRangeAt(0).endOffset;

    this.props.updateTeacher(start, end);
  },
  render: function() {
    var selections = this.props.selections
    if (selections.length === 0 ){
      var content = this.props.article.content
      var paragraph = <div>
                        <p id="content">
                          {content}
                        </p>
                      </div>
    } else {
      this.updateTeacher();
      var paragraph = <div>
                        <p>Selection: start= {selections[0].anchorOffset} end={selections[0].focusOffset} </p>
                        <p id="content">
                          {this.getBeginning(selections[0].getRangeAt(0))}
                          <span className="highlight">
                          {this.updateContent(selections[0].getRangeAt(0))}
                          </span >
                          {this.getEnd(selections[0].getRangeAt(0))}
                        </p>
                      </div>
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
