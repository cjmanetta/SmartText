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
  var name = req.body.name
  var pin = req.body.pin
  var teacher_id = req.params.id
  var students = []

  var klass = new Klass({
    _teacher_id: teacher_id,
    name: name,
    grade: grade,
    pin: pin,
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
  console.log(req.params.klass_id)
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

      Teacher.findOne({_id: req.params.id}, function(err, teacher){

        teacher.klasses.pop({_id: req.params.klass_id})
        
        teacher.save(function(err, teacher){
          res.format({
            'text/html': function(){
              res.redirect('/teachers/'+req.params.id+'/klasses')
            },
            'application/json': function(){
              res.sendStatus({klass: 'deleted'})
            }
          }) 
        }) 
      })
    }
  })
})

module.exports = router





  // Teacher.findOne({_id: req.params.id})
  //   .populate('klasses')
  //   .populate('students')
  //   .populate('answers')
  //   .exec(function(err, teacher){
  //     console.log(teacher)
  //     res.format({
  //       'text/html': function(){
  //         res.render('./teachers/show', { teacher: teacher})
  //       },
  //       'application/json': function(){
  //         res.send({teacher: teacher})
  //       }
  //   })
  // })   


  // Teacher.findOne({_id: req.params.id})
  //   .populate('klasses')
  //   .exec(function(err, teacher){
  //     for (var i=0; i<teacher.klasses.length; i++){
  //       Klass.findOne({_id: teacher.klasses[i]._id})
  //         .populate('students')
  //         .exec(function(err, klass){
  //           if (err){
  //             return console.error(err);
  //           } else {
  //             console.log(klass)
  //           }
  //         })
  //     }
  //   })
  // Teacher.findOne({_id: req.params.id}, function(err, teacher){
  //   console.log(teacher)
  //   res.format({
  //     'text/html': function(){
  //       res.render('./teachers/show', { teacher: teacher})
  //     },
  //     'application/json': function(){
  //       res.send({teacher: teacher})
  //     }
  //   })  
  // })  











