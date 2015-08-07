var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var lessonSchema = Schema({
	teacher_id: Number,
	title: Number,
	data: Date
	//we may want to just not have the ids here and instead do the typical array method that we are using with the other schemas
	// students: [{
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'Student'
	// }]

})

model.exports = mongoose.model('Lesson', lessonSchema);