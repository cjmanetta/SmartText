var express = require('express');
//not sure if webpack.router works
var router = express.Router();
var mongoose = require('mongoose'); //mongo connection
mongoose.createConnection(process.env.MONGOHQ_URL || 'mongodb://localhost/test')
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
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./articles/index', { articles: articles });
        },
        'application/json': function(){
          res.send({articles: articles})
        }
      })
    }
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
      console.log('post created: ' + article)
      res.format({
        'text/html': function(){
          res.redirect('/articles')
        },
        'application/json': function(){
          res.send({article: article})
        }
      })
    }
  })
})

router.get('/new', function(req, res) {
  res.render('./articles/new')
})

router.get('/:id/edit', function(req, res) {
  Article.findById(req.params.id, function(err, article){
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./articles/edit', { article: article });
        },
        'application/json': function(){
          res.send({article: article})
        }
      })
    }
  })
})

router.route('/:id')
.get(function(req, res){
  Article.findById(req.params.id, function(err, article){
    if (err){
      return console.error(err);
    } else {
      res.format({
        'text/html': function(){
          res.render('./articles/show', { article: article })
        },
        'application/json': function(){
          res.send({article: article})
        }
      })
    }
  })
})

.put(function(req, res){
  Article.findById(req.params.id, function(err, article){
    if (err) {
      return console.error(err)
    } else {
      article.author = req.body.author;
      article.title = req.body.trile;
      article.content = req.body.content;

      article.save(function(err, article){
        console.log('edited: ' + article);
        res.format({
          'text/html': function(){
            res.redirect('/articles')
          },
          'application/json': function(){
            res.send({article: article})
          }
        })
      })
    }
  })
})

.delete(function(req, res){
  Article.remove({_id: req.params.id}, function(err, article){
    if (err) {
      return console.error(err)
    } else {
      console.log('deleted: ' + article)
      res.format({
        'text/html': function(){
          res.redirect('/articles')
        },
        'application/json': function(){
          res.send({article: 'deleted'})
        }
      })
    }
  })
})

module.exports = router
