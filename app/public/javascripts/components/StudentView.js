var React = require("react");
var Call = require('../call');
var RightBar = require('./RightBar');
var MainText = require('./MainText');
var Header = require('./Header');
var socket = io();
var StudentView = React.createClass({
  getInitialState: function(){
    return {
      student: {first_name: "", last_name: "", username: "", _id: ''},
      teacher: {},
      klass: {},
      article: {content: "", author: "", title: ""},
      highlightOn: false,
      showQuestion: false,
      activeLesson: {},
      start: null,
      end: null,
      question: {prompt: "", green_start: null, green_end: null},
      showAnswer: false,
    }
  },

  componentDidMount: function(){
    this.getStudent();

    socket.on('viewPrompt', function(data){
      this.updatePrompt(data)
    }.bind(this))
    socket.on('finish', function(){
      this.saveAnswer();
      this.showAnswer();
      this.setState({
        highlightOn: false,
      });
    }.bind(this));
  },
  updatePrompt: function(data){
    this.setState({
      showQuestion: true,
      highlightOn: true
    })
  },
  getStudent: function(){
    var path = "/students/login/" + this.props.params.id
    var request = $.ajax({
      url: path,
      method: 'get',
      dataType: 'json'
    });

    request.done(function(serverData){
      this.getKlass(serverData.student._klass_id);
      this.setState({
        student: serverData.student
      })
    }.bind(this));

    request.fail(function(serverData){
      console.log('Failed to find logged in student');
      console.log( serverData);
    });
  },
  getKlass: function(klass_id){
    var path = "/students/login/klasses/" + klass_id
    var request = $.ajax({
      url: path,
      method: 'get',
      dataType: 'json'
    });

    request.done(function(serverData){
      this.getTeacher(serverData.klass._teacher_id);
      this.setState({
        klass: serverData.klass
      })
    }.bind(this));

    request.fail(function(serverData){
      console.log('Failed to find students klass');
      console.log( serverData);
    });
  },
  getTeacher: function(teacher_id){
    var path = "/teachers/" + teacher_id
    var request = $.ajax({
      url: path,
      method: 'get',
      dataType: 'json'
    });

    request.done(function(serverData){
      this.getActiveLesson(serverData.teacher._id, serverData.teacher.active_lesson);
      this.setState({
        teacher: serverData.teacher
      })
    }.bind(this));

    request.fail(function(serverData){
      console.log('Failed to find the students teacher');
      console.log( serverData);
    });
  },
  getActiveLesson: function(teacher_id, lesson_id){
    var path = "/teachers/" + teacher_id + "/lessons/" + lesson_id
    var request = $.ajax({
      url: path,
      method: 'get',
      dataType: 'json'
    });

    request.done(function(serverData){
      this.getArticle(serverData.lesson.article_id);
      this.getQuestion(serverData.lesson.question_id);
      this.setState({
        activeLesson: serverData.lesson
      })
    }.bind(this));

    request.fail(function(serverData){
      console.log('Failed to find the active lesson');
      console.log( serverData);
    });
  },
  getArticle: function(article_id){
    var path = "/articles/" + article_id
    var request = $.ajax({
      url: path,
      method: 'get',
      dataType: 'json'
    });

    request.done(function(serverData){
      this.setState({
        article: serverData.article
      })
    }.bind(this));

    request.fail(function(serverData){
      console.log('Failed to find the article');
      console.log( serverData);
    });
  },
  getQuestion: function(question_id){
    var path = "/questions/" + question_id
    var request = $.ajax({
      url: path,
      method: 'get',
      dataType: 'json'
    });

    request.done(function(serverData){
      this.setState({
        question: serverData.question
      })
      socket.emit('addStudent', {student: this.state.student})
    }.bind(this));

    request.fail(function(serverData){
      console.log('Failed to find the question');
      console.log( serverData);
    });
  },
  handleSubmit: function(){
    if (confirm('Are you sure you want to submit your answer?  You will not be able to change it.')){
      this.setState({
        highlightOn: false
      });
    }
  },
  handleClear: function(){
    socket.emit('studentClear', {student: this.state.student})
    this.setState({
      start: null,
      end: null,
    })
  },
  handleSelect: function(selection){
    // var socket = io('/teacher')
    if (this.state.highlightOn){
      var start = selection.getRangeAt(0).startOffset;
      var end = selection.getRangeAt(0).endOffset;

      this.setState({
        start: start,
        end: end,
      });
    }
  },
  updateTeacherSocket: function(start, end){
    if(this.state.start !== null){
      var correctColor = this.compareSelection(start, end);
      socket.emit('select', {
        student: this.state.student,
        start: start,
        end: end,
        color: correctColor,
      })
    }
  },
  compareSelection: function(start, end){
    debugger
    var student_start = start;
    var student_end = end;
    var correct_start = parseInt(this.state.question.green_start, 10);
    var correct_end = parseInt(this.state.question.green_end, 10);

    if(correct_start > correct_end){
      var correct_end = parseInt(this.state.question.green_start, 10);
      var correct_start = parseInt(this.state.question.green_end, 10);
    }

    var correct_length = correct_end - correct_start;
    var variance = Math.round(correct_length / 6);
    var correct_start_range_beginning = correct_start - variance;
    var correct_start_range_end = correct_start + variance;
    var correct_end_range_beginning = correct_end - variance;
    var correct_end_range_end = correct_end + variance;


    if(student_start > correct_start_range_beginning && student_start < correct_start_range_end){
      if(student_end > correct_end_range_beginning && student_end < correct_end_range_end){
        var color = 'green'
      } else {
        var color = 'blue'
      }
    } else if(student_end > correct_end_range_beginning && student_end < correct_end_range_end){
      var color = 'blue'
    } else if(student_start > correct_start && student_start < correct_end){
      var color = 'blue'
    } else if(student_end > correct_start && student_end < correct_end){
      var color = 'blue'
    } else if(student_start < correct_start && student_end > correct_end){
      var color = 'blue'
    } else {
      var color = 'red'
    }

    return color;
  },
  saveAnswer: function(){
    if(this.state.start !== null){
      var start = this.state.start;
      var stop = this.state.end;
      var color = this.compareSelection(start, stop);
      if(color == "green"){
        var correct = 2;
      } else if(color === "blue"){
        var correct = 1;
      } else {
        var correct = 0;
      }
    } else {
      var start = 0;
      var stop = 0;
      var correct = 0;
    }
    var _question_id = this.state.question._id;
    var _student_id = this.state.student._id;

    var data = {start: start, stop: stop, correct: correct, _question_id: _question_id, _student_id: _student_id};

    Call.call("/answers", "post", data)
        .then(function(serverData){
          this.setState({
            answer: serverData.answer
          })
        }.bind(this))
        .catch(function(serverData){
          console.log('Failed to post the answer');
          console.log( serverData);
        });
  },
  showAnswer: function(){
    var color = this.compareSelection(this.state.start, this.state.end);
    if(color === "green"){
      $('.highlight').addClass('cg');
    } else if(color === "blue"){
      $('.highlight').addClass('cb');
    } else if(color === "red"){
      $('.highlight').addClass('cr');
    }
  },
  render: function() {
    return (
      <div id="studentMain" className="container">
        <h1>Student View</h1>
        <MainText article={this.state.article}
                  onSelect={this.handleSelect}
                  start={this.state.start}
                  end={this.state.end}
                  updateTeacher={this.updateTeacherSocket}/>

        <RightBar question={this.state.question}
                  actionOne={this.handleClear}
                  actionTwo={this.handleSubmit}
                  labelOne="Clear"
                  labelTwo="Submit"
                  show={this.state.showQuestion}
                  showAnswer={this.state.showAnswer}/>
      </div>
    );
  },
});

module.exports = StudentView;
