var webpack = require('webpack-dev-server');
//not sure if webpack.router works
var router = webpack.Router();
var mongoose = require('mongoose'); //mongo connection
var bodyParser = require('body-parser'); //parses information from POST
var methodOverride = require('method-override');
var Teacher = require('../models/teacher')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))


router.route('/')
	.get(function(req, res) {
		Teacher.find({}, function(err, teachers){
	  	res.render('index', { teachers: teachers })
	  });
	})
	.post(function(req, res){
		var description = req.body.description

		Teacher.create({description: description}, function(err, teacher){
			if (err) {
				return console.error(err)
			} else {
				console.log('post created: ' + teacher)
				res.redirect('/')
			}
		})
	})

router.get('/:id/edit', function(req, res){
	Teacher.findById(req.params.id, function(err, teacher){
		res.render('edit', {teacher: teacher})
	})
})

router.route('/:id')
	.put(function(req, res){

		var description = req.body.description

		Teacher.findById(req.params.id, function(err, teacher){
			Teacher.update({
				description: description
			}, function(err, teacher){
				if (err) {
					return console.error(err)
				} else {
					console.log('edited: ' + teacher)
					res.redirect('/')
				}
			})
		})
	})
	.delete(function(req, res){
		Teacher.findById(req.params.id, function(err, teacher){
			Teacher.remove(function(err, teacher){
				if (err) {
					return console.error(err)
				} else {
					console.log('deleted: ' + teacher)
					res.redirect('/')
				}
			})
		})
	})


module.exports = router;


