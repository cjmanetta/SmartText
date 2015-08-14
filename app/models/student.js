var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var studentSchema = Schema({
	_klass_id: {type: String, ref: 'Klass'},
  username: {type: String, unique: true},
  first_name: String,
  last_initial: String,
  answers: [{
  	type: Schema.Types.ObjectId,
  	ref: 'Answer'
  }]
})

studentSchema.plugin(uniqueValidator);
var Student = mongoose.model('Student', studentSchema)

module.exports = {Student: Student}
