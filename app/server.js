//when we go to deployment, switch to "express" as the server
// var webpack = require('webpack-dev-server');
// var app = webpack();
var express = require('express')
var app = express();
var path = require('path')
var port = 8080;


var teachers_routes = require('./routes/teacher')

console.log(teachers_routes)

app.use('/teachers', teachers_routes)

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')

var server = app.listen(port, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Listening on http://', host, port)
});

var io = require('socket.io')();

io.sockets.on('connection', function(socket){
		// EXAMPLE connection below
		// socket.on('draw', function(data){
		// 	io.emit('draw', data);
		// });
});

// EXAMPLE namespaced connection and emit
// var nsp = io.of('/my-namespace');
// nsp.on('connection', function(socket){
//   console.log('someone connected'):
// });
// nsp.emit('hi', 'everyone!');

// EXAMPLE CLIENTSIDE CONNECTION
// var socket = io('/my-namespace');

