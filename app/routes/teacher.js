var express = require('express');
//not sure if webpack.router works
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
mongoose.connect('mongodb://localhost/test')
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override');

var Teacher = require('../models/teacher').Teacher

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
	Teacher.find({}, function(err, teachers){
		if (err){
			return console.error(err);
		} else {
			res.format({
				'text/html': function(){
	  			res.render('./teachers/index', { teachers: teachers })
				},
				'application/json': function(){
					res.send({teachers: teachers})
				}
			})
		}
  });
})
.post(function(req, res){
	var first_name = req.body.first_name
	var last_name = req.body.last_name
	var username = req.body.username
	var password = req.body.password

	Teacher.create({
		first_name: first_name,
		last_name: last_name,
		username: username,
		password: password
		}, function(err, teacher){
			if (err) {
				return console.error(err);
			} else {
				console.log('post created: ' + teacher)
				res.format({
					'text/html': function(){
		  			res.redirect('/teachers')
					},
					'application/json': function(){
						res.send({teacher: teacher})
					}
				})
			}
	})
})

router.get('/new', function(req, res){
	res.format({
		'text/html': function(){
			res.render('./teachers/new');		
		}
	})	
})

router.get('/:id/edit', function(req, res){
	Teacher.findById(req.params.id, function(err, teacher){
		if (err){
			return console.error(err);
		} else {
			res.format({
				'text/html': function(){
					res.render('./teachers/edit', {teacher: teacher})
				},
				'application/json': function(){
					res.send({teacher: teacher})
				}
			})
		}
	})
})

router.route('/:id')
.get(function(req, res){
	Teacher.findById(req.params.id, function(err, teacher){
		if (err){
			return console.error(err);
		} else {
			res.format({
				'text/html': function(){
					res.render('./teachers/show', {teacher: teacher})
				},
				'application/json': function(){
					res.send({teacher: teacher})
				}
			})
		}
	})
})
.put(function(req, res){

	var first_name = req.body.first_name
	var last_name = req.body.last_name
	var username = req.body.username
	var password = req.body.password

	Teacher.findById(req.params.id, function(err, teacher){
		Teacher.update({
			first_name: first_name,
			last_name: last_name,
			username: username,
			password: password
		}, function(err, teacher){
			if (err) {
				return console.error(err)
			} else {
				console.log('edited: ' + teacher);
				res.format({
					'text/html': function(){
						res.redirect('/teachers')
					},
					'application/json': function(){
						res.send({teacher: teacher})
					}
				})
			}
		})
	})
})
.delete(function(req, res){
	Teacher.remove({_id: req.params.id}, function(err, teacher){
		if (err) {
			return console.error(err)
		} else {
			console.log('deleted: ' + teacher)
			res.format({
				'text/html': function(){
					res.redirect('/teachers')
				},
				'application/json': function(){
					res.sendStatus(200)
				}
			})
		}
	})
})

module.exports = router


