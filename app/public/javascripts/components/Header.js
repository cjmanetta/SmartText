var React = require("react");

var Header = React.createClass({

  render: function(){
    var teacher = this.props.user.teacher
    var student = this.props.user.student
    var content = null

    if (teacher) {
      content = <p className="navbar-text">{teacher.first_name} {teacher.last_name}</p>
      }
    } else if (student) {
      content = <p className="navbar-text">{user.first_name}</p>
      }
    } else
      content = null
    }
    //
    //if props.user.teacher is not null make this content
    //else
    // if props.user.student is not null make this content
    //else
    //generic content
    return (
      //add full navbar components brand buttons etc
      <div>{content}</div>
    )
  }
});

module.exports = Header;

// var scores = this.props.scores.map(function(score) {
//       return <Score key={score.id} score={score} />
//     });