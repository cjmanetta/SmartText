var mongoose = require('mongoose');

var standardSchema = mongoose.Schema({
  grade: Number,
  description: String
})

var Standard = mongoose.model('Standard', standardSchema);

module.exports = { Standard: Standard }
