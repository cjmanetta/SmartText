var express = require('express');
var router = express.Router({mergeParams: true});
var mongoose = require('mongoose');
mongoose.createConnection(process.env.MONGOLAB_URI || 'mongodb://localhost/test')
/* parses out body of the request */
var bodyParser = require('body-parser');

var methodOverride = require('method-override');

var Student = require('../models/student').Student
var Klass = require('../models/klass').Klass

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
  Student.find({_klass_id: req.params.klass_id}, function(err, students){
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./students/index', {id: req.params.id, klass_id: req.params.klass_id, students: students })
        },
        'application/json': function(){
          res.send({students: students})
        }
      })
    }
  });
})

.post(function(req, res){
  var first_name = req.body.first_name;
  var last_initial = req.body.last_initial;
  var username = req.body.username;
  var klass_id = req.params.klass_id;
  var answers = [];

  var student = new Student({
    _klass_id: klass_id,
    username: username,
    first_name: first_name,
    last_initial: last_initial,
    answers: answers
  })

  Klass.findById(req.params.klass_id, function(err, klass){
      if (err) {
        return console.error(err);
      } else {
        klass.students.push(student)
        console.log('new student: '+student)
        console.log('kladd: '+klass)

        klass.save(function(err, klass){
          if (err){
            return console.error(err)
          } else {
            student.save(function(err, student){
              if (err){
                return console.error(err)
              } else {
                res.format({
                  'text/html': function(){
                    res.redirect('/teachers/'+req.params.id+'/klasses/'+req.params.klass_id+'/students')
                  },
                  'application/json': function(){
                    res.send({student: student})
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
  console.log(req.params)
  res.render('./students/new', {id: req.params.id, klass_id: req.params.klass_id})
})

router.get('/:student_id/edit', function(req, res){
  Student.findById(req.params.student_id, function(err, student){
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

router.route('/:student_id')
.get(function(req, res) {
  Student.findOne({_id: req.params.student_id}, function(err, student) {
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./students/show', { student: student, id: req.params.id, klass_id: req.params.klass_id })
        },
        'application/json': function(){
          res.send({student: student})
        }
      })
    }
  })
})

.put(function(req, res){
  Student.findById(req.params.student_id, function(err, student){
    if (err) {
      return console.error(err)
    } else {
      student.first_name = req.body.first_name;
      student.last_initial = req.body.last_initial;
      student.username = req.body.username;
      //in params
      //student._klass_id = req.body.klass_id;

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
  Student.remove({_id: req.params.student_id}, function(err, student){
    if (err) {
      return console.error(err)
    } else {
      console.log('deleted: ' + student)

      Klass.findOne({_id: req.params.klass_id}, function(err, klass){

        klass.students.pop({_id: req.params.student_id})

        console.log(klass)

        klass.save(function(err, klass){
          res.format({
            'text/html': function(){
              res.redirect('/teachers/'+req.params.id+'/klasses/'+req.params.klass_id+'/students')
            },
            'application/json': function(){
              res.send({deleted: "deleted"});
            }
          })
        })
      })
    }
  })
})

module.exports = router







