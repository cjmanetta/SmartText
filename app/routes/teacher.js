var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection

mongoose.createConnection(process.env.MONGOHQ_URL || 'mongodb://localhost/test')
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
			console.log(teachers)
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
	var klasses = []

	Teacher.create({
		first_name: first_name,
		last_name: last_name,
		username: username,
		password: password,
		klasses: klasses
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

router.route('/login')
.post(function(req, res){
	Teacher.findOne({"username" : req.body.username}, function(err, teacher){
		console.log(teacher);
		if (err){
			return console.error(err);
		} else if (teacher.password === req.body.password){
			res.format({
				'text/html': function(){
					res.render('./teachers/show', {teacher: teacher})
				},
				'application/json': function(){
					res.send({teacher: teacher})
				}
			})
		} else {
		  res.sendStatus(401);
		}
	})
})

router.route('/:id')
.get(function(req, res){
   Teacher.findOne({_id: req.params.id}, function(err, teacher){
   	if (err){
   	  return console.error(err);
   	} else {
     console.log(teacher)
     res.format({
       'text/html': function(){
         res.render('./teachers/show', { teacher: teacher})
       },
       'application/json': function(){
         res.send({teacher: teacher})
     		}
      })
    }
  })
})

.put(function(req, res){
	Teacher.findById(req.params.id, function(err, teacher){
		if (err) {
			return console.error(err)
		} else {
			teacher.first_name = req.body.first_name;
			teacher.last_name = req.body.last_name;
			teacher.username = req.body.username;
			teacher.password = req.body.password;

			teacher.save(function(err, teacher){
				console.log('edited: ' + teacher);
				res.format({
					'text/html': function(){
						res.redirect('/teachers')
					},
					'application/json': function(){
						res.send({teacher: teacher})
					}
				})
			})
		}
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



