var express = require('express');
var router = express.Router({mergeParams: true});
var mongoose = require('mongoose');
mongoose.createConnection(process.env.MONGOHQ_URL || 'mongodb://localhost/test');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var Answer = require('../models/answer').Answer
var Student = require('../models/student').Student

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body){
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

router.route('/')
.get(function(req, res) {
  Answer.find({_student_id: req.params.student_id}, function(err, answers){
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./answers/index', {id: req.params.id, klass_id: req.params.klass_id, student_id: req.params.student_id, answers: answers })
        },
        'application/json': function(){
          res.send({answers: answers})
        }
      })
    }
  });
})

.post(function(req, res){
  var text_snippet = req.body.text_snippet;
  var student_id = req.params.student_id;

  var answer = new Answer({
    _student_id: student_id,
    text_snippet: text_snippet
  });

  Student.findOne({_id: req.params.student_id}, function(err, student){
      if (err) {
        return console.error(err);
      } else {
        student.answers.push(answer)

        console.log(student)
        
        student.save(function(err, student){
          if (err){
            return console.error(err)
          } else {
            answer.save(function(err, answer){
              if (err){
                return console.error(err)
              } else {
                res.format({
                  'text/html': function(){
                    res.redirect('/teachers/'+req.params.id+'/klasses/'+req.params.klass_id+'/students/'+req.params.student_id+'/answers')
                  },
                  'application/json': function(){
                    res.send({answer: answer})
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
      res.render('./answers/new', {id: req.params.id, klass_id: req.params.klass_id, student_id: req.params.student_id})
    }
  })
})

router.get('/:student_id/edit', function(req, res){
  Answer.findById(req.params.id, function(err, answer){
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./answers/edit', {answer: answer})
        },
        'application/json': function(){
          res.send({answer: answer})
        }
      })
    }
  })
})

router.route('/:answer_id')
.get(function(req, res){
  Answer.findById(req.params.id, function(err, answer){
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./answers/show', {answer: answer})
        },
        'application/json': function(){
          res.send({answer: answer})
        }
      })
    }
  })
})

.put(function(req, res){
  Answer.findById(req.params.id, function(err, answer){
    if(err) {
      return console.error(err);
    } else {
      answer.text_snippet = req.body.text_snippet;

      answer.save(function(err, answer){
        console.log('edited: ' + answer);
        res.format({
          'text/html': function(){
            res.redirect('/answers')
          },
          'application/json': function(){
            res.send({answer: answer})
          }
        })
      })
    }
  })
})

.delete(function(req, res){
  Answer.remove({_id: req.params.id}, function(err, answer){
    if (err) {
      return console.error(err)
    } else {
      console.log('deleted: ' + answer)

      Student.findOne({_id: req.params.student_id}, function(err, student){

        student.answers.pop({_id: req.params.answer_id})

        console.log(answer)

        student.save(function(err, student){
          res.format({
            'text/html': function(){
              res.redirect('/teachers/'+req.params.id+'/klasses/'+req.params.klass_id+'/students/'+res.params.student_id+'/answers')
            },
            'application/json': function(){
              res.send({answer: 'deleted'})
            }
          })
        })
      })
    }
  })
})

module.exports = router


















