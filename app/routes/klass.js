var express = require('express');
var router = express.Router();

var mongoose = require('mongoose'); //mongo connection
mongoose.connect('mongodb://localhost/test')
var Klass = require('../models/klass').Klass

var bodyParser = require('body-parser'); //parses information from POST
router.use(bodyParser.urlencoded({ extended: true }))

var methodOverride = require('method-override');
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
  Klass.find({}, function(err, klasses){
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./klasses/index', { klasses: klasses })
        },
        'application/json': function(){
          res.send({klasses: klasses})
        }
      })
    }
  });
})

.post(function(req, res){
  var grade = req.body.grade
  var password = req.body.password

  Klass.create({
    grade: grade,
    password: password,
    }, function(err, klass){
      if (err) {
        return console.error(err);
      } else {
        console.log('post created: ' + klass)
        res.format({
          'text/html': function(){
            res.redirect('/klasses')
          },
          'application/json': function(){
            res.send({klass: klass})
          }
        })
      }
  })
})

router.get('/new', function(req, res){
  res.format({
    'text/html': function(){
      res.render('./klasses/new');
    }
  })
})

router.get('/:id/edit', function(req, res){
  Teacher.findById(req.params.id, function(err, klass){
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./klasses/edit', {klass: klass})
        },
        'application/json': function(){
          res.send({klass: klass})
        }
      })
    }
  })
})

router.route('/:id')
.get(function(req, res){
  Klass.findById(req.params.id, function(err, klass){
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./klasses/show', {klass: klass})
        },
        'application/json': function(){
          res.send({klass: klass})
        }
      })
    }
  })
})

.put(function(req, res){
  Klass.findById(req.params.id, function(err, klass){
    if (err) {
      return console.error(err)
    } else {
      grade: grade,
      password: password,

      klass.grade = req.body.grade;
      klass.password = req.body.password;

      klass.save(function(err, klass){
        console.log('edited: ' + klass);
        res.format({
          'text/html': function(){
            res.redirect('/klass')
          },
          'application/json': function(){
            res.send({klass: klass})
          }
        })
      })
    }
  })
})

.delete(function(req, res){
  Klass.remove({_id: req.params.id}, function(err, klass){
    if (err) {
      return console.error(err)
    } else {
      console.log('deleted: ' + klass)
      res.format({
        'text/html': function(){
          res.redirect('/klasses')
        },
        'application/json': function(){
          res.sendStatus(200)
        }
      })
    }
  })
})

module.exports = router