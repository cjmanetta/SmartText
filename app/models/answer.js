var mongoose = require('mongoose');

var answerSchema = mongoose.Schema({
  text_snippet: String
  //we may want to just not have the ids here and instead do the typical array method that we are using with the other schemas
  // students: [{
  //  type: mongoose.Schema.Types.ObjectId,
  //  ref: 'Student'
  // }]
})

var Answer = mongoose.model('Answer', answerSchema)
module.exports = {Answer: Answer}