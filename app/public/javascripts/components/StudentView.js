var React = require("react");
var RightBar = require('./RightBar');
var MainText = require('./MainText');
var socket = io();
// var socket = io.connect('/https://smartext.herokuapp.com/#/');


var StudentView = React.createClass({
  getInitialState: function(){
    return {
      student: {},
      teacher: {},
      klass: {},
      article: {},
      highlightOn: false,
      activeLesson: {},
      question: {prompt: "none"},
      selection: [],
    }
  },
  componentDidMount: function(){
    this.getStudent();
    var that = this;
    socket.on('viewPrompt', function(data){
      that.updatePrompt(data)
    })
    socket.on('finish', function(){
      alert('Your teacher has ended the session.')
      this.saveAnswer();
      this.setState({
        highlightOn: false
      });
    }.bind(this));
    socket.emit('addStudent', {user: this.state.user})
  },
  updatePrompt: function(data){
    this.setState({
      prompt: data,
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
    }.bind(this));

    request.fail(function(serverData){
      console.log('Failed to find the question');
      console.log( serverData);
    });
  },
  handleClear: function(){
    // $('.highlight').removeClass('highlight')
    $('#maintext').find('#content').html(this.state.lesson.text)
    socket.emit('studentClear', {id: this.state.user.id})
  },
  handleSubmit: function(){
    if (confirm('Are you sure you want to submit your answer?  You will not be able to change it.')){
      this.setState({
        highlightOn: false
      });
    }
  },
  handleSelect: function(selection){
    // var socket = io('/teacher')
    if (this.state.highlightOn){
      //pass off the selection object to compare using the algorithym
      var correctColor = this.compareSelection(selection);
      var selectedRange = selection.getRangeAt(0);
      var selectedText = selectedRange.extractContents()

      var highlightSpan = $("<span class='highlight'>" +
                          selectedText.textContent + "</span>");

      selectedRange.insertNode(highlightSpan[0]);

      var highlightedText = $('#content').html()

      //can remove the console.log once it is tested over
      //the socket
      console.log({
        user: this.state.user,
        selection: highlightedText,
        color: correctColor
      });

      socket.emit('select', {
        user: this.state.user,
        selection: highlightedText,
        color: correctColor,
        id: this.state.user.id
      })
    }
  },
  compareSelection: function(selection){
    var student_start = selection.anchorOffset;
    var student_end = selection.focusOffset;
    var correct_start = this.state.lesson.correct.start;
    var correct_end = this.state.lesson.correct.end;

    //adjust start/end regardless of which way they highlight
    if(student_start > student_end){
      student_start = selection.focusOffset;
      student_end = selection.anchorOffset;
    }
    if(correct_start > correct_end){
      correct_start = this.state.lesson.correct.end;
      correct_end = this.state.lesson.correct.start;
    }

    var correct_length = correct_end - correct_start;
    var variance = Math.round(correct_length / 6);
    var correct_start_range_beginning = correct_start - variance;
    var correct_start_range_end = correct_start + variance;
    var correct_end_range_beginning = correct_end - variance;
    var correct_end_range_end = correct_end + variance;


    if(student_start > correct_start_range_beginning && student_start < correct_start_range_end){
      if(student_end > correct_end_range_beginning && student_end < correct_end_range_end){
        var color = '#76EE00'
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
    if(this.state.selection.length !== 0){
      var start = selection.anchorOffset;
      var end = selection.focusOffset;
      var color = this.compareSelection(this.state.selection[0]);
      if(color == "green"){
        var correct = 2;
      } else if(color === "blue"){
        var correct = 1;
      } else {
        var correct = 0;
      }
    } else {
      var start = 0;
      var end = 0;
      var correct = 0;
    }
    var _question_id = this.state.question._id;
    var _student_id = this.state.student._id;

    var data = {start: start, end: end, correct: correct, _question_id: _question_id, _student_id: _student_id};
    var path = "/answers"
    var request = $.ajax({
      url: path,
      method: 'post',
      data: data,
      dataType: 'json'
    });

    request.done(function(serverData){
      this.setState({
        answer: serverData.answer
      })
    }.bind(this));

    request.fail(function(serverData){
      console.log('Failed to post the answer');
      console.log( serverData);
    });

  },
  render: function() {
    return (
      <div className="container">
        <h1>Student View</h1>
        <MainText article={this.state.article} question={this.state.question} selectText={this.handleSelect}/>
        <RightBar prompt={this.state.question.prompt} actionOne={this.handleClear} actionTwo={this.handleSubmit} labelOne="clear" labelTwo="submit"/>
      </div>
    );
  },
});

module.exports = StudentView;
