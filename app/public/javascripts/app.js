var _ = require("underscore");
var React = require('react')
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link, State } = Router;

var StudentView = require("./components/StudentView");
var TeacherView = require("./components/TeacherView");
var StudentPanel = require("./components/StudentPanel");
var LessonPanel = require("./components/LessonPanel");
var ReviewPanel = require("./components/ReviewPanel");
var Grid = require("./components/Grid");
var Home = require("./components/Home");
var Header = require("./components/Header");
var Call = require('./call');

//functions defined in the global scope to be used in many components

//Routes for the react router
var routes = (
  <Route handler={App}>
    <Route path="/"         name="home"     handler={Home} />
    <Route path="/students/:id" name="students" handler={StudentView}/>
    <Route path="teachers/:id" name="teachers" handler={TeacherView}>
      <Route path="student-panel" name="studentPanel" handler={StudentPanel}/>
      <Route path="lesson-panel" name="lessonPanel" handler={LessonPanel} />
      <Route path="grid" name="grid" handler={Grid} />
      <Route path="lessons/:lesson_id" name="reviewPanel" handler={ReviewPanel} />
    </Route>
  </Route>
);

//Top Level app component that manages whole app state
var App = React.createClass({
  getInitialState: function(){
    teacher: null
  },
  render: function(){
    return (
      <RouteHandler />
    )
  }
});

Router.run(routes, Router.HashLocation, function(Root, state){
  React.render(<Root />, document.body);
})
