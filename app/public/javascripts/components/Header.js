var React = require("react");

var Header = React.createClass({

  render: function(){
    var teacher = this.props.teacher
    var student = this.props.student
    var content = null
    var buttons = null

    if (teacher) {
      content = <p className="navbar-text navbar-left">{teacher.first_name} {teacher.last_name}</p>
      buttons = <a className="navbar-btn navbar-right" href="#">teachery things</a>
      }
    } else if (student) {
      content = <p className="navbar-text navbar-left">{student.first_name}</p>
      buttons = <a className="navbar-btn navbar-right" href="#">studenty things</a>
      }
    } else
      content = null
    }

    return (
      //add full navbar components brand buttons etc
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">SmartText</a>
          {content}
          {buttons}
        </div>
      </nav>
    )
  }
});

module.exports = Header;