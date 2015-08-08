var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var klassSchema = Schema({
	grade: Number,
	password: String
	// students: [{
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'Student'
	// }]

})

var Klass = mongoose.model('Klass', klassSchema)
module.exports = {Klass: Klass}