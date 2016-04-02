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

module.exports = router;
