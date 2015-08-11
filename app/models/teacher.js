var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var teacherSchema = Schema({
	username: String,
	password: String,
	first_name: String,
	last_name: String,
	active_lesson: String,
	klasses: [{
		type: Schema.Types.ObjectId,
		ref: 'Klass'
	}],
	lessons: [{
		type: Schema.Types.ObjectId,
		ref: 'Lesson'
	}]
})

var Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = {Teacher: Teacher}
