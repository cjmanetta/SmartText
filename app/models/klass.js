var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var klassSchema = Schema({
  _teacher_id: {type: String, ref: 'Teacher'},
  name: String,
	grade: String,
  pin: String,
	students: [{
		type: Schema.Types.ObjectId,
		ref: 'Student'
	}]
})

var Klass = mongoose.model('Klass', klassSchema)

module.exports = {Klass: Klass}
