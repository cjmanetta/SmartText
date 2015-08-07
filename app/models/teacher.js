var mongoose = require('mongoose');

var teacherSchema = mongoose.Schema({
	username: String,
	password: String,
	first_name: String,
	last_name: String
	//two ways to do the associations!
	// klasses: [{
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'Klass'
	// }],
	// lessons: [{	
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'Klass'
	// }]
})

var Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = {Teacher: Teacher}