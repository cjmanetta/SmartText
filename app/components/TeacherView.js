import React from "react";
import RightBar from './RightBar';

export default React.createClass({
  render: function() {
    return (
      <div className="container">
        <h3>Teacher View Component</h3>
        <RightBar />
      </div>
    );
  },
});
