var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var studentSchema = Schema({
	_klass_id: {type: String, ref: 'Klass'},
  username: String,
  first_name: String,
  last_initial: String,
  answers: [{
  	type: Schema.Types.ObjectId,
  	ref: 'Answer'
  }]
})

var Student = mongoose.model('Student', studentSchema)

module.exports = {Student: Student}