import React from "react";

export default React.createClass({
  componentDidMount: function(){
    document.addEventListener('mouseup', this.handleMouseUp);
  },
  handleMouseUp: function(){
    var selected = window.getSelection();
    this.setState({
      selection: selected,
    })
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
