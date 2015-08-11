var express = require('express');
var router = express.Router({mergeParams: true});
var mongoose = require('mongoose');
mongoose.createConnection(process.env.MONGOHQ_URL || 'mongodb://localhost/test')
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
.post(function(req, res){
  Student.findOne({username : req.body.username}, function(err, student){
    console.log("student: " + student);
    Klass.findOne({_id: student._klass_id}, function(err, klass){
    console.log("klass: " + klass);
    console.log("klass pin: " + klass.pin);
    console.log("submitted pin: " + req.body.pin);

      if (err){
        return console.error(err);
      } else if ( klass.pin === req.body.pin){

        res.format({
          'text/html': function(){
            res.render('./teachers/show', {student: student})
          },
          'application/json': function(){
            res.send({student: student})
          }
        })
      } else {
        res.sendStatus(401);
      }
    })
  })
})

router.route('/:id')
.get(function(req, res) {
  Student.findById(req.params.id, function(err, student){
    console.log("Logged in student: " + student);
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./students/show', {id: req.params.id, klass_id: req.params.klass_id, students: students })
        },
        'application/json': function(){
          res.send({student: student})
        }
      })
    }
  });
})

router.route('/klasses/:klass_id')
.get(function(req, res){
  Klass.findOne({_id: req.params.klass_id}, function(err, klass){
    if (err){
      return console.error(err);
    } else {
      console.log('klass: ' + klass)
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

module.exports = router;
