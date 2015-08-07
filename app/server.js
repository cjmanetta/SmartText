//when we go to deployment, switch to "express" as the server
var webpack = require('webpack-dev-server');
var app = webpack();
var path = require('path')
var port = 8080;



var teachers = require('models/teacher')
app.use('/teachers', teachers)


app.use(express.static(path.join(__dirname, 'public')));

//need to include react and jsx as view engine.

var server = app.listen(port, function(){
	var host = server.address().address;
	var port = server.address().port;
});

console.log('Listening on http://' + host + port)
