//when we go to deployment, switch to "express" as the server
// var webpack = require('webpack-dev-server');
// var app = webpack();
var express = require('express')
var app = express();
var path = require('path')
var port = 8080;


var teachers_routes = require('./routes/teacher')
var lessons_routes = require('./routes/lesson')

console.log(teachers_routes)

app.use('/teachers', teachers_routes)
app.use('/lessons', lessons_routes)

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')

var server = app.listen(port, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Listening on http://', host, port)
});

