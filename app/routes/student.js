var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test')
/* parses out body of the request */
var bodyParser = require('body-parser');

var methodOverride = require('method-override');
var Student = require('../models/student').Student

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body){
    var method = req.body_method
    delete req.body._method
    return method
  }
}))

router.route('/')
.get(function(req, res) {
  Student.find({}, function(err, students){
    res.render('./students/index', { students: students })
  });
})

.post(function(req, res){
  var firstname = req.body.firstname
  var last_initial = req.body.last_initial
  var username = req.body.username
  var today = new Date();

  Student.create({
    username: username,
    firstname: firstname,
    last_initial: last_initial,
    date: today
    }, function(err, student){
    if (err){
      console.log('error!!!')
    } else {
      console.log('post created: ' + student)
      res.redirect('/students')
    }
  })
})

router.get('/new', function(req, res){
  res.render('./students/new')
})

router.get('/:id/edit', function(req, res){
  Student.findById(req.params.id, function(err, student){
  res.render('./students/edit', {student: student})
})
})

router.route('/:id')
.put(function(req,res){

  var firstname = req.body.firstname
  var last_initial = req.body.last_initial
  var username = req.body.username
  var today = new Date();

Student.findById(req.params.id, function(err, student){
  Student.update({
    username: username,
    firstname: firstname,
    last_initial: last_initial,
    date: today
  }, function(err, student){
    if (err){
      return console.error(err)
    } else {
      console.log('edited: ' + teacher)
      res.redirect('/students')
    }
  })
})
})
.delete(function(req, res){
  Student.remove({_id: req.params.id}, function(err, student){
    if (err) {
      return console.error(err)
    } else {
      console.log('deleted: ' + student)
      res.redirect('/student')
    }
  })
})

module.exports = router