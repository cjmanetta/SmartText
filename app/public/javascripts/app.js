var React = require("react");
var _ = require("underscore");
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
var Auth = require('./auth');
var Call = require('./call');

//functions defined in the global scope to be used in many components

// var requireAuth = function(component){
//   statics: {
//     willTransitionTo: function(transition) {
//       if (!auth.loggedIn()) {
//         transition.redirect('/', {}, {'nextPath' : transition.path});
//       }
//     },
//   },
//   render () {
//     console.log('inside requireAuth')
//     return <Component {...this.props}/>
//   }
// }

//add this to the desired route
// handler={requireAuth}

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
    loggedIn: auth.loggedIn()
    teacher: null
  },
  setStateOnAuth: function(){
    this.setState({
      loggedIn: loggedIn
    })
  },
  componentWillMount () {
    auth.onChange = this.setStateOnAuth.bind(this);
    auth.login();
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
