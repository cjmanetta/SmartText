var React = require("react");
var Body = require("./components/Body");
var _ = require("underscore");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

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
        <RouteHandler />
      </div>
    )
  }
});


var routes = (
  <Route handler={App}>
  //add default handler!
    <DefaultRoute >
    <Route name="login" path = "/login" handler={loginHandler}/>
  </Route>
);


Router.run(routes, function(Handler){
  React.render(<Handler />, document.body);
})
