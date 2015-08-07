var teacherSchema = mongoose.Schema({
	username: String,
	password: String,
	first_name: String,
	last_name: String,
	//two ways to do the associations!
	klasses: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Klass'
	}]
	lessons: [LessonSchema]
})

model.exports = mongoose.model('Teacher', teacherSchema);