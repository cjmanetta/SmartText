var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var answerSchema = Schema({
	_student_id: {type: String, unique: true},
	_question_id: String,
  start: Number,
  stop: Number,
  correct: Number,
  created_at: { type: Date }
})

answerSchema.plugin(uniqueValidator);
var Answer = mongoose.model('Answer', answerSchema)
module.exports = {Answer: Answer}
