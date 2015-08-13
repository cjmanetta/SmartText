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
  getBeginning: function(start) {
    var originalContent = this.props.article.content
    var beginningText = originalContent.slice(0, start)
    return beginningText
  },
  updateContent: function(start, end){
    var originalContent = this.props.article.content
    var highlightedText = originalContent.slice(start, end)
    return highlightedText
  },
  getEnd: function(end) {
    var originalContent = this.props.article.content
    var endText = originalContent.slice(end, originalContent.length )
    return endText
  },
  componentDidUpdate: function(){
    this.getDOMNode().addEventListener('mouseup', this.handleMouseUp);
  },
  updateTeacher: function(start, end){
    this.props.updateTeacher(start, end);
  },
  render: function() {
    if (this.props.start === null ){
      var content = this.props.article.content
      var paragraph = <div>
                        <p id="content">
                          {content}
                        </p>
                      </div>
    } else {
      this.updateTeacher(this.props.start, this.props.end);
      var paragraph = <div>
                        <p>Selection: start= {this.props.start} end={this.props.end} </p>
                        <p id="content">
                          {this.getBeginning(this.props.start)}
                          <span className="highlight">
                          {this.updateContent(this.props.start, this.props.end)}
                          </span >
                          {this.getEnd(this.props.end)}
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
