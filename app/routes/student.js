var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.createConnection(process.env.MONGOHQ_URL || 'mongodb://localhost/test')
/* parses out body of the request */
var bodyParser = require('body-parser');

var methodOverride = require('method-override');
var Student = require('../models/student').Student

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body){
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

router.route('/')
.get(function(req, res) {
  Student.find({}, function(err, students){
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./students/index', { students: students })
        },
        'application/json': function(){
          res.send({students: students})
        }
      })
    }
  });
})

.post(function(req, res){
  var first_name = req.body.first_name
  var last_initial = req.body.last_initial
  var username = req.body.username

  Student.create({
    username: username,
    first_name: first_name,
    last_initial: last_initial
    }, function(err, student){
    if (err){
      return console.error(err);
    } else {
      console.log('post created: ' + student)
      res.format({
        'text/html': function(){
          res.redirect('/students')
        },
        'application/json': function(){
          res.send({student: student})
        }
      })
    }
  })
})

router.get('/new', function(req, res){
  res.render('./students/new')
})

router.get('/:id/edit', function(req, res){
  Student.findById(req.params.id, function(err, student){
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./students/edit', {student: student})
        },
        'application/json': function(){
          res.send({student: student})
        }
      })
    }
  })
})

router.route('/:id')
.get(function(req, res) {
  Student.findById(req.params.id, function(err, student) {
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./students/show', { student: student })
        },
        'application/json': function(){
          res.send({student: student})
        }
      })
    }
  })
})

.put(function(req, res){
  Student.findById(req.params.id, function(err, student){
    if (err) {
      return console.error(err)
    } else {
      student.first_name = req.body.first_name;
      student.last_name = req.body.last_name;
      student.username = req.body.username;
      student.password = req.body.password;

      student.save(function(err, student){
        console.log('edited: ' + student);
        res.format({
          'text/html': function(){
            res.redirect('/students')
          },
          'application/json': function(){
            res.send({student: student})
          }
        })
      })
    }
  })
})

.delete(function(req, res){
  Student.remove({_id: req.params.id}, function(err, student){
    if (err) {
      return console.error(err)
    } else {
      console.log('deleted: ' + student)
      res.format({
        'text/html': function(){
          res.redirect('/students')
        },
        'application/json': function(){
          res.sendStatus(200)
        }
      })
    }
  })
})

module.exports = router