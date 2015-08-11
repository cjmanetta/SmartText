var React = require("react");
var RightBar = require('./RightBar');
var MainText = require('./MainText');
var socket = io();
// var socket = io.connect('/https://smartext.herokuapp.com/#/');


var StudentView = React.createClass({
  getInitialState: function(){
    return {
      student: {first_name: "Aaron", last_name: "J", username: "Janet", id: '1'},
      teacher: {},
      klass: {},
      article: {content: "Lars Brandsson was up on the ladder, on the tall and abrupt roof of the house, with a couple of nails between his lips, knockingwith hammer in hand. The sun, gleaming in white hue, had justslid above the distant mountain ridges in the East. A robinshrilled hidden in some trees nearby, its chirping covered by theinterrupted pounding of the hammer. Trampling of hooves soundedfrom the road and a young man of about seventeen approached onhorse, dressed in thin linen shirt opened at the chest, with an axe girded at the waist and fishing utensils arrayed on the saddle. It was Helgi Dagsson. Lars Brandsson glanced to the sidea moment, wiping some loose strands of hair off his face andarranging them behind his ears, then went on to hammer the nailinto the wood.", author: "Charlotte Manetta", title: "The Amazing Zamboni"},
      highlightOn: false,
      activeLesson: {},
      question: {prompt: "", green_start: null, green_end: null},
      // lesson: new Lession(),
      selections: [],
    }
  },
  // lessonChanged:function(){
  //   this.forceUpdate();
  // },
  componentDidMount: function(){
    // this.state.lesson.on('change', this.lessonChanged)

    this.getStudent();

    var that = this;
    socket.on('viewPrompt', function(data){
      that.updatePrompt(data)
    })
    socket.on('finish', function(){
      alert('Your teacher has ended the session.')
      that.setState({
        highlightOn: false
      });
    })
    socket.emit('addStudent', {student: this.state.student})
  },
  // componentWillUnmount: function() {
  //   this.state.lesson.off('change', this.lessonChanged)
  // },
  updatePrompt: function(data){
    this.setState({
      question: data,
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
    debugger
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
      // var correctColor = this.compareSelection(selection);
      var correctColor = 'blue'
      var selectedRange = selection.getRangeAt(0);
      this.state.selections.push(selectedRange);
      this.forceUpdate();

      var highlightedText = $('#content').html()

      socket.emit('select', {
        student: this.state.student,
        selection: highlightedText,
        color: correctColor,
        id: this.state.student.id
      })
    }
  },
  // compareSelection: function(selection){
  //   var student_start = selection.anchorOffset;
  //   var student_end = selection.focusOffset;
  //   var correct_start = this.state.lesson.correct.start;
  //   var correct_end = this.state.lesson.correct.end;

  //   //adjust start/end regardless of which way they highlight
  //   if(student_start > student_end){
  //     student_start = selection.focusOffset;
  //     student_end = selection.anchorOffset;
  //   }
  //   if(correct_start > correct_end){
  //     correct_start = this.state.lesson.correct.end;
  //     correct_end = this.state.lesson.correct.start;
  //   }

  //   var correct_length = correct_end - correct_start;
  //   var variance = Math.round(correct_length / 6);
  //   var correct_start_range_beginning = correct_start - variance;
  //   var correct_start_range_end = correct_start + variance;
  //   var correct_end_range_beginning = correct_end - variance;
  //   var correct_end_range_end = correct_end + variance;


  //   if(student_start > correct_start_range_beginning && student_start < correct_start_range_end){
  //     if(student_end > correct_end_range_beginning && student_end < correct_end_range_end){
  //       var color = '#76EE00'
  //     } else {
  //       var color = 'blue'
  //     }
  //   } else if(student_end > correct_end_range_beginning && student_end < correct_end_range_end){
  //     var color = 'blue'
  //   } else if(student_start > correct_start && student_start < correct_end){
  //     var color = 'blue'
  //   } else if(student_end > correct_start && student_end < correct_end){
  //     var color = 'blue'
  //   } else if(student_start < correct_start && student_end > correct_end){
  //     var color = 'blue'
  //   } else {
  //     var color = 'red'
  //   }

  //   return color;
  // },
  render: function() {
    return (
      <div className="container">
        <h1>Student View</h1>
        <MainText article={this.state.article} onSelect={this.handleSelect} selections={this.state.selections}/>
        <RightBar question={this.state.question} actionOne={this.handleClear} actionTwo={this.handleSubmit} labelOne="clear" labelTwo="submit"/>
      </div>
    );
  },
});

module.exports = StudentView;
