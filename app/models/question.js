var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
  prompt: String,
  green_start: String,
  green_end: String,
  blue_answer: String
})

var Question = mongoose.model('Question', questionSchema);

module.exports = { Question: Question }
