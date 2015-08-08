var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var studentSchema = Schema({
  student_id: Number,
  username: String,
  firstname: String,
  last_initial: String,
  date: Date
  //we may want to just not have the ids here and instead do the typical array method that we are using with the other schemas
  // students: [{
  //  type: mongoose.Schema.Types.ObjectId,
  //  ref: 'Student'
  // }]
})

var Student = mongoose.model('Student', studentSchema)
module.exports = {Student: Student}