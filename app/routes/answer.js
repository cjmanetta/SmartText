var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/test');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var Answer = require('../models/answer').Answer

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
  Answer.find({}, function(err, answers){
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./answers/index', { answers: answers })
        },
        'application/json': function(){
          res.send({teachers: teachers})
        }
      })
    }
  });
})

.post(function(req, res){
  var text_snippet = req.body.text_snippet

  Answer.create({
    text_snippet: text_snippet
  }, function(err, answer){
    if (err) {
      return console.error(err);
    } else {
      console.log('post created: ' + answer)
      res.format({
        'text/html': function(){
          res.redirect('/answers')
        },
        'application/json': function(){
          res.send({answer: answer})
        }
      })
    }
  })
})

router.get('/new', function(req, res){
  res.format({
    'text/html': function(){
      res.render('./answers/new')
    }
  })
})

router.get('/:id/edit', function(req, res){
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

router.route('/:id')
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
      res.format({
        'text/html': function(){
          res.redirect('/answers')
        },
        'application/json': function(){
          res.sendStatus(200)
        }
      })
    }
  })
})

module.exports = router