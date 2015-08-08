var express = require('express')
var app = express();
var path = require('path')

var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 8080;

server.listen(port);

var teachers_routes = require('./routes/teacher')
var lessons_routes = require('./routes/lesson')
var students_routes = require('./routes/student')

app.use('/teachers', teachers_routes)
app.use('/lessons', lessons_routes)
app.use('/students', students_routes)

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')


console.log('Listening on http://' + port)

io.of('teacher').on('connection', function(socket){
  console.log('data received');
  socket.on('start', function(data){
    io.emit('start', data);
  })

})


io.of('teacher').on('connection', function(socket){
  console.log('data received');
  socket.on('start', function(data){
    io.emit('start', data);
  })

})

