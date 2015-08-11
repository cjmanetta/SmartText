var express = require('express');
//not sure if webpack.router works
var router = express.Router({mergeParams: true});
var mongoose = require('mongoose'); //mongo connection
mongoose.createConnection(process.env.MONGOHQ_URL || 'mongodb://localhost/test')
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override');

var Lesson = require('../models/lesson').Lesson
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
  Lesson.find({_teacher_id: req.params.teacher_id}, function(err, lessons){
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./lessons/index', { lessons: lessons});
        },
        'application/json': function(){
          res.send({lessons: lessons})
        }
      })
    }
  });
})

.post(function(req, res){
  var title = req.body.title
  var date = req.body.date
  var teacher_id = req.body.teacher_id
  var article_id = req.body.article_id
  var question_id = req.body.question_id
  var standard_id = req.body.standard_id;
  
  var lesson = new Lesson({
    _teacher_id: teacher_id,
    title: title,
    date: date,
    article_id: article_id,
    question_id: question_id
    standard_id: standard_id,

  }, function(err, lesson) {
    if (err) {
      console.log('error')
  })

  Teacher.findOne({_id: req.params.id}, function(err, teacher){
    if (err){
      return console.error(err);
    } else {
      teacher.lessons.push(lesson)
      console.log(lesson)

      teacher.save(function(err, teacher){
        if (err){
          return console.error(err);
        } else {
          lesson.save(function(err, lesson){
            if (err){
              return console.error(err)
            } else {
              res.format({
                'text/html': function(){
                  res.redirect('/teachers/'+req.params.id+'/lessons')
                },
                'application/json': function(){
                  res.send({lesson: lesson})
                }
              })
            }
          })
        }
      })
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
  Lesson.findById(req.params.lesson_id, function(err, lesson) {
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./lessons/show', { lesson: lesson });
        },
        'application/json': function(){
          res.send({lesson: lesson})
        }
      })
    }
  })
})

.put(function(req, res){
  Lesson.findById(req.params.lesson_id, function(err, lesson){
    if (err) {
      return console.error(err)
    } else {
      lesson._teacher_id = req.params.id;
      lesson.title = req.body.title;
      lesson.date = req.body.date;
      lesson.standard_id = req.body.standard_id;
      lesson.article_id = req.body.article_id
      lesson.questions = req.body.questions

      lesson.save(function(err, lesson){
        console.log('edited: ' + lesson);
        res.format({
          'text/html': function(){
            res.redirect('/teachers/'+req.params.id+'/lessons')
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
  Lesson.remove({_id: req.params.lesson_id}, function(err, lesson){
    if (err) {
      return console.log(err)
    } else {
      console.log('deleted: ' + lesson)
      res.format({
        'text/html': function(){
          res.redirect('/lessons')
        },
        'application/json': function(){
          res.send({status: 200})
        }

      Teacher.findOne({_id: req.params.id}, function(err, teacher){

        teacher.lessons.pop({_id: req.params.lesson_id})
        
        teacher.save(function(err, teacher){
          res.format({
            'text/html': function(){
              res.redirect('/teachers/'+req.params.id+'/lessons')
            },
            'application/json': function(){
              res.send({lesson: 'deleted'})
            }
          }) 
        }) 
      })
    }
  })
})





module.exports = router





