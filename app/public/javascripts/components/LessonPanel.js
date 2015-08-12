var React = require("react");
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var Call = require('../call');

var LessonSelect = require("./LessonSelect");
var NewLesson = require("./NewLesson");
var LessonBox = require("./LessonBox");
var MainText = require("./MainText");

var LessonPanel = React.createClass({
  mixins: [
    Router.Navigation,
    Router.State,
  ],
  getInitialState: function() {
    return {
      article: null,
      textBox: null,
      answer: null,
      question: null,
      answered: false,
      lessonPills: 'Lessons',
      selections: [],
    }
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

    this.props.newLesson(action, data);

    this.setState({
      article: null,
      textBox: null,
      answer: null,
      question: null,
      answered: false,
      lessonPills: 'Lessons'
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

    Call.call('/questions', 'post', {prompt: question})
        .then(function(serverData){
          this.setState({
            question: serverData.question
          });
        }.bind(this))
        .catch(function(serverData){
          console.log(serverData);
          console.log("failed to create question");
        });

    var data = {title: title, author: author, content: content}

    Call.call(action, method, data)
        .then(function(serverData){
          this.setState({
            article: serverData.article
          }.bind(this));
        })
        .catch(function(serverData){
          console.log(serverData);
          console.log("failed to create article");
        });
  },
  handleSelect: function(selection) {
    var green_start = selection.anchorOffset;
    var green_end = selection.focusOffset;
    var path = "/questions/" + this.state.question._id;
    var data = {prompt: this.state.question.prompt, green_start: green_start, green_end: green_end};
    Call.call(path, 'put', data)
        .then(function(serverData){
          this.setState({
            question: serverData.question,
            answered: true
          })
        }.bind(this))
        .catch(function(serverData){
          console.log('You have failed to answer the quesiton');
          console.log(serverData);
        });
  },
  handleDeleteLesson: function(lesson_id){
    var action = '/teachers/' + this.props.teacher._id +"/lessons/" + lesson_id;
    var method = 'delete';
    Call.call(action, method)
        .then(function(serverData){
          this.props.getLessonsList();
        }.bind(this))
        .catch(function(serverData){
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
  setActiveLesson: function(lesson_id){
    this.props.activate(lesson_id);
  },
  render: function(){
    if (this.state.article && this.state.answer) {
      var submitButton = <button type="submit" className="btn btn-default">Submit</button>
      var addButton = null;
    } else if (this.state.article !== null && this.state.answered === true) {
      var mainText = <MainText article={this.state.article} onSelect={this.handleSelect} selections={this.state.selections}/>
      var submitButton = <button type="submit" className="btn btn-default">Submit</button>;
      var addButton = null;
    } else if (this.state.article) {
      var mainText = <MainText article={this.state.article} onSelect={this.handleSelect} selections={this.state.selections}/>
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
    var lessons = this.props.lessons.map(
      function(lesson){
        return(
        <LessonBox lesson={lesson}
                   teacher={this.props.teacher }
                   delete={this.handleDeleteLesson}
                   activate={this.setActiveLesson} />
        )
      }.bind(this)
    );

    if(this.props.activeLesson){
      var activeLesson = <div className="panel panel-default">
          <div className="panel-heading">
            <h5 className="panel-title">Current Active Lesson:{ this.props.activeLesson.title }</h5>
            <p>{ this.props.activeLesson.date }</p>
            <div className="panel-body">
              <Link to="grid" params={{id: this.props.teacher._id }} className="btn btn-default navbar-btn">Go to Lesson</Link>
            </div>
          </div>
      </div>
    }

    var formAction = '/teachers/' + this.props.teacher._id + '/lessons'
    if(this.state.lessonPills === 'Lessons'){
      var lessonPills =
      <div>
        <ul className="nav nav-pills">
          <li role="presentation"><a href="#" onClick={ this.handlePillClick }>New Lesson</a></li>
          <li role="presentation" className="active"><a href="#" onClick={ this.handlePillClick }>Lessons</a></li>
        </ul>
        <div>
          {activeLesson}
          {lessons}
        </div>
      </div>
    } else if(this.state.lessonPills === 'New Lesson'){
      var lessonPills =
      <div>
        <ul className="nav nav-pills">
          <li role="presentation" className="active"><a href="#" onClick={ this.handlePillClick }>New Lesson</a></li>
          <li role="presentation"><a href="#" onClick={ this.handlePillClick }>Lessons</a></li>
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
      <div id="lessonPanel" className="container">
        <div className="row">
          {lessonPills}
        </div>
      </div>
    )
  }
});


module.exports = LessonPanel;
