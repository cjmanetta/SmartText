var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
  prompt: String,
  green_answer: String,
  blue_answer: String
})

var Question = mongoose.model('Question', questionSchema);

module.exports = { Question: Question }
