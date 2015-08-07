import React from "react";
import Body from "./components/Body";

//functions defined in the global scope to be used in many components
var call = function(action, method, data){
  return new Promise(function(resolve, reject){
    request = $.ajax({
      url:      action,
      method:   method,
      data:     data,
      dataType: "json"
    });

    request.done(function(serverData){
      resolve(serverData)
    });

    request.fail(function(serverData){
      reject(serverData)
    });
  });
}

//Top Level app component that manages whole app state
var App = React.createClass({
  getInitialState: function(){
    return {
      page: 'home',
      user: null,
    }
  },
  render: function(){
    return (
      <div id="main">
        <Body />
      </div>
    )
  }
});


React.render(<App />, document.body);
