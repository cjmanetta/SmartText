var express = require('express');
//not sure if webpack.router works
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
mongoose.createConnection('mongodb://localhost/test')
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override');

var Article = require('../models/article').Article

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
  Article.find({}, function(err, articles){
    res.render('./articles/index', { articles: articles });
  })
})
.post(function(req, res){
  var author = req.body.author
  var title = req.body.title
  var content = req.body.content

  Article.create({
    author: author,
    title: title,
    content: content
  }, function(err, article) {
    if (err) {
      console.log('error')
    } else {
      console.log('article created: ' + article)
      res.redirect('/articles')
    }
  })
})

router.get('/new', function(req, res) {
  res.render('./articles/new')
})

router.get('/:id/edit', function(req, res) {
  Article.findById(req.params.id, function(err, article){
    res.render('./articles/edit', { article: article })
  })
})

router.route('/:id')
.get(function(req, res){
  Article.findById(req.params.id, function(err, lesson){
    res.render('./articles/show', { article: article })
  })
})
.put(function(req, res){
  var title = req.body.title
  var author = req.body.author
  var content = req.body.content

  Article.findById(req.params.id, function(err, article){
    Article.update({
      title: title,
      author: author,
      content: content
    }, function(err, article){
      if (err) {
        return console.log(err)
      } else {
        console.log('edited: ' + article)
        res.redirect('/articles')
      }
    })
  })
})
.delete(function(req, res){
  Article.remove({_id: req.params.id}, function(err, article){
    if (err) {
      console.log(err)
    } else {
      console.log('deleted: ' + article)
      res.redirect('/articles')
    }
  })
})

module.exports = router