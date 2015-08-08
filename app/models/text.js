var mongoose = require('mongoose');

var textSchema = mongoose.Schema({
  author: String,
  title: String,
  body: String

})

var Text = mongoose.model('Text', textSchema);

module.exports = { Text: Text }
