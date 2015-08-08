var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
mongoose.createConnection('mongodb://localhost/test')
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override');

var Question = require('../models/question').Question

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
	Question.find({}, function(err, questions){
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
	var prompt = req.body.prompt
	var green_answer = req.body.green_answer
	var blue_answer = req.body.blue_answer

	Question.create({
		prompt: prompt,
		green_answer: green_answer,
		blue_answer: blue_answer
		}, function(err, question){
			if (err) {
				return console.error(err);
			} else {
				console.log('post created: ' + question)
				res.format({
					'text/html': function(){
		  			res.redirect('/questions')
					},
					'application/json': function(){
						res.send({question: question})
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

router.get('/:id/edit', function(req, res){
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

router.route('/:id')
.get(function(req, res){
	Question.findById(req.params.id, function(err, question){
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
	Question.findById(req.params.id, function(err, question){
		if (err) {
			return console.error(err)
		} else {
			question.prompt = req.body.prompt;
			question.green_answer = req.body.green_answer;
			question.blue_answer = req.body.blue_answer;

			question.save(function(err, question){
				console.log('edited: ' + question);
				res.format({
					'text/html': function(){
						res.redirect('/questions')
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
	Question.remove({_id: req.params.id}, function(err, question){
		if (err) {
			return console.error(err)
		} else {
			console.log('deleted: ' + question)
			res.format({
				'text/html': function(){
					res.redirect('/questions')
				},
				'application/json': function(){
					res.sendStatus(200)
				}
			})
		}
	})
})

module.exports = router


