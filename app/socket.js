/* eslint-env es6 */

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const robot = require('robotjs');


app.get('/', function(req, res){
	res.sendFile( __dirname + '/index.html' );

});

io.on('connection', function(socket){
	console.log('new client');

	socket.on('keyDown',function(key){
		console.log('key down : '+key);
		robot.keyToggle(key, 'down');
	});
	socket.on('keyUp', function(key){
		console.log('key up : '+key);
		robot.keyToggle(key, 'up');
	});

});
io.on('disconnect', function(){
	console.log(' user disconnected');

});




http.listen(3000, function(){
	console.log('listening on *:3000');


});
