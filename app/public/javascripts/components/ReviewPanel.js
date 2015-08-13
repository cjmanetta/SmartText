var React = require('react');
var Call = require('../call');

var ReviewPanel = React.createClass({
  getInitialState: function() {
    return {
      green: [],
      blue: [],
      red: [],
    };
  },
  componentDidMount: function(){
    this.props.updateAnswers();
  },
  componentWillReceiveProps: function(nextProps){
    if(nextProps.answers.length > 0){
      nextProps.answers.map(function(answer){
        var path = '/students/lookup/' + answer._student_id
        if(answer.correct === 2){
          Call.call(path, 'get')
              .then(function(serverData){
                var newGreen = this.state.green.concat(serverData.student)
                this.setState({
                  green: newGreen
                });
              }.bind(this))
              .catch(function(serverData){
                console.log('There was an error getting that student');
                console.log(serverData);
              });
        } else if(answer.correct === 1){
          Call.call(path, 'get')
              .then(function(serverData){
                var newBlue = this.state.blue.concat(serverData.student)
                  this.setState({
                    blue: newBlue
                  });
              }.bind(this))
              .catch(function(serverData){
                console.log('There was an error getting that student');
                console.log(serverData);
              });
        } else {
          Call.call(path, 'get')
              .then(function(serverData){
                var newRed = this.state.red.concat(serverData.student)
                  this.setState({
                    red: newRed
                  });
              }.bind(this))
              .catch(function(serverData){
                console.log('There was an error getting that student');
                console.log(serverData);
              });
        }
      }.bind(this));
    }
  },
  render: function() {
    var redLi = this.state.red.map(function(student){
      return(
        <li>{ student.username }: {student.first_name}</li>
      )
    });

    var blueLi = this.state.blue.map(function(student){
      return(
        <li>{ student.username }: {student.first_name}</li>
      )
    });
    var greenLi = this.state.green.map(function(student){
      return(
        <li>{ student.username }: {student.first_name}</li>
      )
    });
    return (
      <div>
        <div>Review Panel</div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Green Group</h3>
          </div>
          <div className="panel-body">
            { greenLi }
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Blue Group</h3>
          </div>
          <div className="panel-body">
            { blueLi }
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Red Group</h3>
          </div>
          <div className="panel-body">
            { redLi }
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ReviewPanel;
