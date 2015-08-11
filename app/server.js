var express = require('express')
var app = express();
var mongoose = require('mongoose')
mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/test')
// mongoose.connect(process.env.MONGOLAB_uri || 'mongodb://localhost:8080')
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 8080;
var path = require('path')

server.listen(port);

var teachers_routes = require('./routes/teacher')
var lessons_routes = require('./routes/lesson')
var articles_routes = require('./routes/article')
var students_routes = require('./routes/student')
var answers_routes = require('./routes/answer')
var klasses_routes = require('./routes/klass')
var questions_routes = require('./routes/question')
var student_login_routes = require('./routes/studentLogin')
var standards_routes = require('./routes/standard')

app.use('/teachers', teachers_routes)
app.use('/teachers/:id/klasses', klasses_routes)
app.use('/teachers/:id/lessons/', lessons_routes)
app.use('/teachers/:id/klasses/:klass_id/students', students_routes)
app.use('/students/login', student_login_routes)


app.use('/answers', answers_routes)
app.use('/articles', articles_routes)
app.use('/questions', questions_routes)
app.use('/standards', standards_routes)


app.use(express.static(path.join(__dirname, 'public')));
app.set('routes', __dirname + '/routes');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')

console.log('Listening on http://' + port)


// io.of('teacher').on('connection', function(socket){
//   console.log('data received');
//   socket.on('select', function(data){
//     io.emit('select', data);
//   })
// })

io.on('connection', function(socket){
  socket.on('select', function(data){
    console.log('inside select')
    console.log('id: '+data.id)
    io.emit('select', data);
  });
  socket.on('viewPrompt', function(data){
  	io.emit('viewPrompt', data);
  });
  socket.on('finish', function(){
  	io.emit('finish');
  });
  socket.on('addStudent', function(data){
    io.emit('addStudent', data);
  })
  socket.on('studentClear', function(data){
    io.emit('studentClear', data);
  })
})

app.get("/", function(req, res){
  res.render('index');
});


