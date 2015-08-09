var React = require('react');

var KlassBox = React.createClass({

  render: function() {
    return (
      <div>
        <h5>{this.props.klass._id}</h5>
      </div>
    );
  }

});

module.exports = KlassBox;