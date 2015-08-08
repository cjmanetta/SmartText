var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
  username: String,
  first_name: String,
  last_initial: String
  //we may want to just not have the ids here and instead do the typical array method that we are using with the other schemas
  // students: [{
  //  type: mongoose.Schema.Types.ObjectId,
  //  ref: 'Student'
  // }]
})

var Student = mongoose.model('Student', studentSchema)
module.exports = {Student: Student}