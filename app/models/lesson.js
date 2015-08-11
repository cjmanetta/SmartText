var mongoose = require('mongoose');

var lessonSchema = mongoose.Schema({
	teacher_id: Number,
	title: String,
	date: Date,
  question: String

})

var Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = { Lesson: Lesson }
