//when we go to deployment, switch to "express" as the server
// var webpack = require('webpack-dev-server');
// var app = webpack();
var express = require('express')
var app = express();
var path = require('path')
var io = require('socket.io').listen(app);
var port = 8080;

var teachers_routes = require('./routes/teacher')
var students_routes = require('./routes/student')

console.log(teachers_routes)

app.use('/teachers', teachers_routes)
app.use('/students', students_routes)

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')

var server = app.listen(port, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Listening on http://', host, port)
});


io.of('teacher').on('connection', function(socket){
  console.log('data received');
  socket.on('start', function(data){
    io.emit('start', data);
  })

})

