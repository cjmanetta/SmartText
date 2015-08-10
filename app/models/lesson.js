var mongoose = require('mongoose');

var Schema = mongoose.Schema

var lessonSchema = Schema({
	_teacher_id: String,
	title: String,
	date: Date,
	standard_id: String,
	article_id: String,
	questions: [{
		type: Schema.Types.ObjectId,
		ref: 'Lesson'
	}]

})

var Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = { Lesson: Lesson }
