var express = require('express');
var router = express.Router({mergeParams: true});
var mongoose = require('mongoose'); //mongo connection
mongoose.createConnection(process.env.MONGOHQ_URL || 'mongodb://localhost/test')
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override');

var Question = require('../models/question').Question
var Lesson = require('../models/lesson').Lesson

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

router.route('/')
.get(function(req, res) {
	Question.find({_student_id: req.params.student_id}, function(err, questions){
		if (err){
			return console.error(err);
		} else {
			res.format({
				'text/html': function(){
	  			res.render('./questions/index', { questions: questions })
				},
				'application/json': function(){
					res.send({questions: questions})
				}
			})
		}
  });
})

.post(function(req, res){
	var lesson_id = req.params.lesson_id;
	var prompt = req.body.prompt;
	var green_answer = req.body.green_answer;
	var blue_answer = req.body.blue_answer;
	var answers = []

	var question = new Question({
		_lesson_id: lesson_id,
		prompt: prompt,
		green_answer: green_answer,
		blue_answer: blue_answer,
		answer: answer
	})
	
  Lesson.findOne({_id: req.params.lesson_id}, function(err, lesson){
    if (err){
      return console.error(err);
    } else {
      lesson.questions.push(question)
      console.log(question)

      lesson.save(function(err, lesson){
        if (err){
          return console.error(err);
        } else {
          question.save(function(err, question){
            if (err){
              return console.error(err)
            } else {
              res.format({
                'text/html': function(){
                  res.redirect('/teachers/'+req.params.id+'/lessons'+req.params.lesson_id+'/questions')
                },
                'application/json': function(){
                  res.send({question: question})
                }
              })
            }
          })
        }
      })
    }
  })
})



router.get('/new', function(req, res){
	res.format({
		'text/html': function(){
			res.render('./questions/new');
		}
	})
})

router.get('/:question_id/edit', function(req, res){
	Question.findById(req.params.id, function(err, question){
		if (err){
			return console.error(err);
		} else {
			res.format({
				'text/html': function(){
					res.render('./questions/edit', {question: question})
				},
				'application/json': function(){
					res.send({question: question})
				}
			})
		}
	})
})

router.route('/:question_id')
.get(function(req, res){
	Question.findById(req.params.question_id, function(err, question){
		if (err){
			return console.error(err);
		} else {
			res.format({
				'text/html': function(){
					res.render('./questions/show', {question: question})
				},
				'application/json': function(){
					res.send({question: question})
				}
			})
		}
	})
})

.put(function(req, res){
	Question.findById(req.params.question_id, function(err, question){
		if (err) {
			return console.error(err)
		} else {
			question._lesson_id = req.params.lesson_id
			question.prompt = req.body.prompt;
			question.green_start = req.body.green_start;
			question.green_end = req.body.green_end;

			question.save(function(err, question){
				console.log('edited: ' + question);
				res.format({
					'text/html': function(){
						res.redirect('/teachers/'+req.params.id+'/lessons'+req.params.lesson_id+'/questions')
					},
					'application/json': function(){
						res.send({question: question})
					}
				})
			})
		}
	})
})

.delete(function(req, res){
	Question.remove({_id: req.params.question_id}, function(err, question){
		if (err) {
			return console.error(err)
		} else {

			Lesson.findOne({_id: req.params.lesson_id}, function(err, lesson){
				lesson.questions.pop({_id: req.params.question_id})

				lesson.save(function(err, lesson){
					console.log('deleted: ' + question)
					res.format({
						'text/html': function(){
							res.redirect('/teachers/'+req.params.id+'/lessons'+req.params.lesson_id+'/questions')
						},
						'application/json': function(){
							res.send({question: 'deleted'})
						}
					})
				})
			})			
		}
	})
})

module.exports = router


