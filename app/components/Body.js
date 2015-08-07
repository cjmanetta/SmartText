import React from "react";
//below this import follow this syntax to add
//a new component. Save it in this file with capital
//file names to show that it is a react file
import Footer from "./Footer"


export default React.createClass({
  render: function() {
    return (
      <div className="greeting">
        <h3>Hello, there!</h3>
        <Footer />
      </div>
    );
  },
});
