var express = require('express');
var router = express.Router({mergeParams: true});

var mongoose = require('mongoose'); //mongo connection
mongoose.createConnection(process.env.MONGOHQ_URL || 'mongodb://localhost/test');
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override');

var Klass = require('../models/klass').Klass
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
  Klass.find({_teacher_id: req.params.id}, function(err, klasses){
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./klasses/index', {id: req.params.id, klasses: klasses })
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
  var teacher_id = req.params.id
  var students = null

  var klass = new Klass({
    _teacher_id: teacher_id, 
    grade: grade,
    password: password,
    students: students
  });

  Teacher.findOne({_id: req.params.id}, function(err, teacher){
      if (err) {
        return console.error(err);
      } else {
        teacher.klasses.push(klass)
        console.log(teacher)
        
        teacher.save(function(err, teacher){
          if (err){
            return console.error(err)
          } else {
            klass.save(function(err, klass){
              if (err){
                return console.error(err)
              } else {
                res.format({
                  'text/html': function(){
                    res.redirect('/teachers/'+req.params.id+'/klasses')
                  },
                  'application/json': function(){
                    res.send({klass: klass})
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
      res.render('./klasses/new', {id: req.params.id});
    }
  })
})

router.get('/:klass_id/edit', function(req, res){
  Klass.findById(req.params.klass_id, function(err, klass){
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./klasses/edit', {id: req.params.id, klass: klass})
        },
        'application/json': function(){
          res.send({klass: klass})
        }
      })
    }
  })
})

router.route('/:klass_id')
.get(function(req, res){
  Klass.findById(req.params.klass_id, function(err, klass){
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
  Klass.findById(req.params.klass_id, function(err, klass){
    if (err) {
      return console.error(err)
    } else {
      klass.teacher_id = req.params.id
      klass.grade = req.body.grade;
      klass.password = req.body.password;

      klass.save(function(err, klass){
        console.log('edited: ' + klass);
        res.format({
          'text/html': function(){
            res.redirect('/teachers/'+req.params.id+'/klasses')
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
  Klass.remove({_id: req.params.klass_id}, function(err, klass){
    if (err) {
      return console.error(err)
    } else {
      console.log('deleted: ' + klass)
      res.format({
        'text/html': function(){
          res.redirect('/teachers/'+req.params.id+'/klasses')
        },
        'application/json': function(){
          res.sendStatus(200)
        }
      })
    }
  })
})

module.exports = router




















