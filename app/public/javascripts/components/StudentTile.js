var React = require("react");

var StudentTile = React.createClass({
  render: function() {
    return (
      <div id="clickable" className="bcb p15px b1pxsb fs10px scrol h350px w250px">
        <span className="fs14px">
          {this.props.student.first_name}
          {this.props.student.last_initial}
        </span>
        <h6>{this.props.article.title}</h6>
        <p id="author">{this.props.article.author}</p>
        <p id="content">{this.props.article.content}</p>
      </div>
    );
  },
});

module.exports = StudentTile;
