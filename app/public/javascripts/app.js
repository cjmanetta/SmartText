var React = require("react");
var StudentView = require("./components/StudentView");
var TeacherView = require("./components/TeacherView");
var Home = require("./components/Home");
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

//Routes for the react router
var routes = (
  <Route handler={App}>
    <Route path="/"         name="home"     handler={Home} />
    <Route path="/students" name="students" handler={StudentView}/>
    <Route path="/teachers" name="teachers" handler={TeacherView}/>
  </Route>
);

//Top Level app component that manages whole app state
var App = React.createClass({
  getInitialState: function(){
    user: null
  },
  render: function(){
    return (
      <RouteHandler />
    )
  }
});

Router.run(routes, Router.HashLocation, function(Root){
  React.render(<Root />, document.body);
})
