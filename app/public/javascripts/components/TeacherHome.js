var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var TeacherHome = React.createClass({
	getKlassLength: function() {
		if (this.props.teacher.klasses) {
			return this.props.teacher.klasses.length
		} else {
			return 0
		}
	},

	render: function(){
		var klasses = this.getKlassLength()
		

		return (
			<div className="wrapper">
        <div className="sidebar"></div>
        <div className="dashboard-container">
					{this.props.teacher.first_name} teacher has {klasses} class
        </div>
      </div>
		);
	}


});

module.exports = TeacherHome;