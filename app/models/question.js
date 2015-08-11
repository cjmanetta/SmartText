var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var questionSchema = Schema({
	_lesson_id: String,
  prompt: String,
  green_answer: String,
  blue_answer: String,
  answers: [{
    	type: Schema.Types.ObjectId,
    	ref: 'Answer'
  }]
})

var Question = mongoose.model('Question', questionSchema);

module.exports = { Question: Question }
