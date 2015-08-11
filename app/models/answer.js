var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var answerSchema = Schema({
	_student_id: String,
	_question_id: String,
  start: Number,
  stop: Number,
  correct: Number
})

var Answer = mongoose.model('Answer', answerSchema)
module.exports = {Answer: Answer}
