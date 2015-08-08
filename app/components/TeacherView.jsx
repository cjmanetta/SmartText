var React = require("react");
import RightBar from './RightBar';

var TeacherView = React.createClass({
  render: function() {
    return (
      <div className="container">
        <h3>Teacher View Component</h3>
        <RightBar />
      </div>
    );
  },
});

module.exports = TeacherView;
