var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var klassSchema = Schema({
  name: String,
	grade: String,
	pin: String,
  teacher_id: String
	// students: [{
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'Student'
	// }]
})

var Klass = mongoose.model('Klass', klassSchema)
module.exports = {Klass: Klass}