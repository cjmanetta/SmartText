var express = require('express');
//not sure if webpack.router works
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
mongoose.createConnection('mongodb://localhost/test')
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override');

var Text = require('../models/text').Text

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
.get(function(req, res){
  Text.find({}, function(err, texts){
    res.render('./texts/index', { texts: texts });
  })
})
.post(function(req, res){
  var author = req.body.author
  var title = req.body.title
  var content = req.body.content

  Text.create({
    author: author,
    title: title,
    content: content
  }, function(err, text) {
    if (err) {
      console.log('error')
    } else {
      console.log('text created: ' + text)
      res.redirect('/texts')
    }
  })
})

router.get('/new', function(req, res) {
  res.render('./texts/new')
})

module.exports = router
