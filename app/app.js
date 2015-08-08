import React from "react";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";
import _ from "underscore";

require("./application.css");

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
      page: 'student',
      user: null,
    }
  },
  render: function(){
    return (
      <div id="main">
        <Header />
        <Body page={this.state.page}/>
        <Footer />
      </div>
    )
  }
});


React.render(<App />, document.body);
