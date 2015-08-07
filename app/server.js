//when we go to deployment, switch to "express" as the server
var webpack = require('webpack-dev-server');
var app = webpack();
var port = 8080;

app.get('/', function(req, res){
	res.render('index');
})

var server = app.listen(port, function(){
	var host = server.address().address;
	var port = server.address().port;
});

console.log('Listening on http://' + host + port)
