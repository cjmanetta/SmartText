var express = require('express');
//not sure if webpack.router works
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
mongoose.createConnection('mongodb://localhost/test')
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override');

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
  Lesson.find({}, function(err, lessons){
    res.render('./lessons/index', { lessons: lessons});
  });
})
.post(function(req, res){
  var title = req.body.title
  var date = req.body.date

  Lesson.create({
    title: title,
    date: date
  }, function(err, lesson) {
    if (err) {
      console.log('error')
    } else {
      console.log('post created: ' + lesson)
      res.redirect('/lessons')
    }
  })
})

router.get('/new', function(req, res) {
  res.render('./lessons/new')
})

router.get('/:id/edit', function(req, res) {
  Lesson.findById(req.params.id, function(err, lesson) {
    res.render('./lessons/edit', { lesson: lesson })
  })
})

router.route('/:id')
.get(function(req, res) {
  Lesson.findById(req.params.id, function(err, lesson) {
    res.render('./lessons/show', { lesson: lesson })
  })
})
.put(function(req, res){
  Lesson.findById(req.params.id, function(err, lesson){
    if (err) {
      return console.error(err)
    } else {
      lesson.first_name = req.body.first_name;
      lesson.last_name = req.body.last_name;
      lesson.username = req.body.username;
      lesson.password = req.body.password;

      lesson.save(function(err, lesson){
        console.log('edited: ' + lesson);
        res.format({
          'text/html': function(){
            res.redirect('/lessons')
          },
          'application/json': function(){
            res.send({lesson: lesson})
          }
        })
      })
    }
  })
})
.delete(function(req, res){
  Lesson.remove({_id: req.params.id}, function(err, lesson){
    if (err) {
      return console.log(err)
    } else {
      console.log('deleted: ' + lesson)
      res.redirect('/lessons')
    }
  })
})





module.exports = router