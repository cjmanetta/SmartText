var React = require("react");

var StudentTile = React.createClass({
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
  render: function() {
    var student = this.props.student

    if(student.color === "red"){
      var colorClass = "b1pxsr"
    } else if(student.color === "blue"){
      var colorClass = "b1pxsb"
    } else if(student.color === "green"){
      var colorClass = "b1pxsg"
    }  else {
      var colorClass = "b1pxsbk"
    }
    debugger
    if (this.props.student.start === undefined ){
      var content = this.props.article.content
      var paragraph = <div>
                        <p id="content">
                          {content}
                        </p>
                      </div>
    } else {
      var paragraph = <div>
                        <p id="content">
                          {this.getBeginning(this.props.student.start)}
                          <span className="highlight">
                          {this.updateContent(this.props.student.start, this.props.student.end)}
                          </span >
                          {this.getEnd(this.props.student.end)}
                        </p>
                      </div>
    }

    var classes = "bcb p15px fs10px scrol h350px w250px" + colorClass;

    return (
      <div id="clickable" className={classes} >
        <span className="fs14px">
          {this.props.student.first_name}{" "}
          {this.props.student.last_initial}
        </span>
        <h6>{this.props.article.title}</h6>
        <p id="author">{this.props.article.author}</p>
        <p id="content">{ paragraph }</p>
      </div>
    );
  },
});

module.exports = StudentTile;
