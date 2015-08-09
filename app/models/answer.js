var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var answerSchema = Schema({
	_student_id: String,
  text_snippet: String
})

var Answer = mongoose.model('Answer', answerSchema)
module.exports = {Answer: Answer}