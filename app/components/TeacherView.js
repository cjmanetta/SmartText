import React from "react";
import RightBar from './RightBar';

export default React.createClass({
	handleStart: function(){
			//turn on listeners for sockets by calling the start function in each stuentview.js 
	    io.connect('http://localhost:8080');
	    var socket = io('/teacher')
	    socket.on('start', function(data){
	    })
	},
	handleStop: function(){
			//turn off listeners by calling off function
	},
  render: function() {
    return (
      <div className="container">
        <h3>Teacher View Component</h3>
        <RightBar lesson={this.state.lesson} user="" actionOne={this.handleStart} actionTwo={this.handleStop} labelOne="start" labelTwo="stop"/>
      </div>
    );
  },
});
