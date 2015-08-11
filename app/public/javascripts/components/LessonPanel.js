var React = require("react");
var Router = require('react-router');
var LessonBox = require("./LessonBox");
var MainText = require("./MainText");

var LessonPanel = React.createClass({
  mixins: [
    Router.Navigation,
    Router.State,
  ],
  getInitialState: function() {
    return {
      lessons: [],
      article: null,
      textBox: null,
      answer: null,
      question: null,
      answered: false,
      lessonPills: 'Lessons'
    }
  },
  componentDidMount: function() {
    this.getLessonsList();
  },
  getLessonsList: function(){
    var lessonPanel = this;
    var path = "/teachers/"+ this.props.params.id +"/lessons"
    var request = $.ajax({
      url:      path,
      method:   'get',
      dataType: "json"
    });

    request.done(function(serverData){
      var newLessons = serverData.lessons
      lessonPanel.setState({
        lessons: newLessons
      });
    });

    request.fail(function(serverData){
      console.log('there was an error getting the lessons')
      console.log(serverData);
    });
  },
  getArticle: function(){
    var article = $("#article").val();
  },
  handleSubmit: function(event){
    event.preventDefault();

  //here is where we need to use the question and answers in state
  //to make the lesson with all of the correct ids in it :-)
    var lessonPanel = this;
    var action = $(event.target).attr('action');
    var method = $(event.target).attr('method');
    var title = $("#title").val();
    var date = $("#date").val();
    // var standard = $("#standard").val();
    var text = $("#text").val();
    var question = $("#question").val();
    var answer = $("#answer").val();
    var article_id = this.state.article._id
    var question_id = this.state.question._id
    var data = {title: title, date: date, teacher_id: this.props.teacher._id, article_id: article_id, question_id: question_id}
    $.ajax({
      url: action,
      method: method,
      data: data,
      dataType: "json",
      success: function(serverData) {
        var newLessons = lessonPanel.state.lessons.concat(serverData.lesson)
        lessonPanel.setState({
          lessons: newLessons,
          article: null,
          textBox: null,
          answer: null,
          question: null,
          answered: false,
          lessonPills: 'Lessons'
        });

      },
      error: function(serverData) {
        console.log(serverData);
      }
    });
  },
  handleAddArticleClick: function() {
    this.setState({textBox: "input"})

  },
  handleArticleSubmit: function(event) {

    event.preventDefault();

    var lessonPanel = this;
    var action = $(event.target).attr('action');
    var method = $(event.target).attr('method');
    var title = $(event.target).find('#title').val()
    var question = $(event.target).find('#question').val()
    var author = $("#author").val();
    var content = $(event.target).find('#articleBody').val()

    $.ajax({
      url: '/questions',
      method: 'post',
      data: {prompt: question},
      dataType: "json",
      success: function(serverData) {
        lessonPanel.setState({
          question: serverData.question
        });

      },
      error: function(serverData) {
        console.log(serverData);
        console.log("failed to create question");
      }
    });


    var data = {title: title, author: author, content: content}

    $.ajax({
      url: action,
      method: method,
      data: data,
      dataType: "json",
      success: function(serverData) {
        lessonPanel.setState({
          article: serverData.article
        });

      },
      error: function(serverData) {
        console.log(serverData);
        console.log("failed to create article");
      }
    });

  },
  handleSelectedText: function(selection) {
    debugger
    var lessonPanel = this;
    var green_start = selection.anchorOffset;
    var green_end = selection.focusOffset;
    var path = "/questions/" + this.state.question._id
    var request = $.ajax({
      url: path,
      method: "put",
      data: {prompt: this.state.question.prompt, green_start: green_start, green_end: green_end},
      dataType: "json"
    }).done(function(serverData){
      lessonPanel.setState({
        question: serverData.question,
        answered: true
      })
    }).fail(function(serverData){
      console.log('You have failed to answer the quesiton');
      console.log(serverData);
    });
  },
  handleDeleteLesson: function(lesson_id){
    var action = '/teachers/' + this.props.teacher._id +"/lessons/" + lesson_id;
    var method = 'delete';
    var request = $.ajax({
      url:      action,
      method:   method,
      dataType: "json"
    });

    request.done(function(serverData){
      this.getLessonsList();
    }.bind(this));

    request.fail(function(serverData){
      console.log('there was an error deleting the class')
      console.log(serverData);
    });
  },
  handlePillClick: function(event){
    event.preventDefault();
    this.setState({
      lessonPills: $(event.target).text()
    })
  },
  render: function(){

    if (this.state.article && this.state.answer) {
      var submitButton = <button type="submit" className="btn btn-default">Submit</button>
      var addButton = null;
    } else if (this.state.article !== null && this.state.answered === true) {
      var mainText = <MainText selectText={this.handleSelectedText} lesson={this.state.article}/>
      var submitButton = <button type="submit" className="btn btn-default">Submit</button>;
      var addButton = null;
    } else if (this.state.article) {
      var mainText = <MainText selectText={this.handleSelectedText} lesson={this.state.article}/>
      var submitButton = null;
      var addButton = null;
    } else {
      var addButton = <button onClick={this.handleAddArticleClick} className="btn btn-default">Add Text</button>;
      var submitButton = null;
    }

    if (this.state.textBox === "input" && this.state.article === null) {

      var textBox = <form id="newArticle" action="/articles" method="post" onSubmit={this.handleArticleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Text Title</label>
                <input type="text" className="form-control" name="title" id="title" placeholder="Text Title" />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input type="text" className="form-control" name="author" id="author" placeholder="Author Name" />
              </div>
              <div className="form-group">
                <label htmlFor="author">Text</label>
                <textarea className="form-control" rows="3" placeholder="Text Body" name="articleBody" id="articleBody"></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="question">Question</label>
                <input type="text" className="form-control" name="question" id="question" placeholder="Question" />
              </div>
              <button type="submit" className="btn btn-default">Submit Text</button>
            </form>
    } else {
      var textBox = <div></div>
    }

    var lessons = this.state.lessons.map(
      function(lesson){
        return(
        <LessonBox lesson={lesson} teacher={this.props.teacher } delete={this.handleDeleteLesson} />
        )
      }.bind(this)
    );

    var formAction = '/teachers/' + this.props.teacher._id + '/lessons'
    if(this.state.lessonPills === 'Lessons'){
      var lessonPills =
      <div>
        <ul className="nav nav-pills">
          <li role="presentation" className="active"><a href="#" onClick={ this.handlePillClick }>Lessons</a></li>
          <li role="presentation"><a href="#" onClick={ this.handlePillClick }>New Lesson</a></li>
        </ul>
        <div>
          {lessons}
        </div>
      </div>
    } else if(this.state.lessonPills === 'New Lesson'){
      var lessonPills =
      <div>
        <ul className="nav nav-pills">
          <li role="presentation"><a href="#" onClick={ this.handlePillClick }>Lessons</a></li>
          <li role="presentation" className="active"><a href="#" onClick={ this.handlePillClick }>New Lesson</a></li>
        </ul>
        <form id="newLesson" action={formAction} method="post" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Lesson Title</label>
            <input type="text" className="form-control" name="title" id="title" placeholder="Lesson Title" />
          </div>
          <div className="form-group">
            <label htmlFor="date">Lesson Date</label>
            <input type="date" className="form-control" name="date" id="date" placeholder="MM/DD/YYYY" />
          </div>
          {submitButton}
        </form>
        {addButton}
        {textBox}
        {mainText}
      </div>
    }
    return (
      <div className="container">
        <div className="row">
          {lessonPills}
        </div>
      </div>
    )
  }
});

module.exports = LessonPanel;