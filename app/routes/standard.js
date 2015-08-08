var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
mongoose.createConnection('mongodb://localhost/test')
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override');

var Standard = require('../models/standard').Standard

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
  Standard.find({}, function(err, standards){
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./standards/index', { standards: standards })
        },
        'application/json': function(){
          res.send({standards: standards})
        }
      })
    }
  });
})

.post(function(req, res){
  var grade = req.body.grade
  var description = req.body.description

  Standard.create({
    grade: grade,
    description: description
    }, function(err, standard){
      if (err) {
        return console.error(err);
      } else {
        console.log('post created: ' + standard)
        res.format({
          'text/html': function(){
            res.redirect('/standards')
          },
          'application/json': function(){
            res.send({standard: standard})
          }
        })
      }
  })
})

router.get('/new', function(req, res){
  res.format({
    'text/html': function(){
      res.render('./standards/new');
    }
  })
})

router.get('/:id/edit', function(req, res){
  Standard.findById(req.params.id, function(err, standard){
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./standards/edit', {standard: standard})
        },
        'application/json': function(){
          res.send({standard: standard})
        }
      })
    }
  })
})

router.route('/:id')
.get(function(req, res){
  Standard.findById(req.params.id, function(err, standard){
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./standards/show', {standard: standard})
        },
        'application/json': function(){
          res.send({standard: standard})
        }
      })
    }
  })
})
.put(function(req, res){
  Standard.findById(req.params.id, function(err, standard){
    if (err) {
      return console.error(err)
    } else {
      standard.grade = req.body.grade;
      standard.description = req.body.description;

      standard.save(function(err, standard){
        console.log('edited: ' + standard);
        res.format({
          'text/html': function(){
            res.redirect('/standards')
          },
          'application/json': function(){
            res.send({standard: standard})
          }
        })
      })
    }
  })
})
.delete(function(req, res){
  Standard.remove({_id: req.params.id}, function(err, standard){
    if (err) {
      return console.error(err)
    } else {
      console.log('deleted: ' + standard)
      res.format({
        'text/html': function(){
          res.redirect('/standards')
        },
        'application/json': function(){
          res.sendStatus(200)
        }
      })
    }
  })
})

module.exports = router