var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
  author: String,
  title: String,
  content: String

})

var Article = mongoose.model('Article', articleSchema);

module.exports = { Article: Article }
