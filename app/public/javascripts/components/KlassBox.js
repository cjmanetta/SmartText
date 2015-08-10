var React = require('react');

var KlassBox = React.createClass({
  deleteClick: function(){
    console.log('clicked' + this.props.klass._id)
  },
  render: function() {
    return (
      <div>
        <h5>{this.props.klass._id}</h5>
        <button onClick={this.deleteClick}>Delete</button>
      </div>
    );
  }

});

module.exports = KlassBox;