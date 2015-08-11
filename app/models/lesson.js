var mongoose = require('mongoose');

var lessonSchema = mongoose.Schema({
	teacher_id: String,
	title: String,
	date: Date,
  	question_id: String,
	standard_id: String,
  	article_id: String
})

var Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = { Lesson: Lesson }
