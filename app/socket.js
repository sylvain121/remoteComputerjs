/* eslint-env es6 */
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const robot = require('robotjs');


app.use(express.static('public'));

app.get('/keyBoards', function(req, res){
	 
});

io.on('connection', function(socket){
//TODO count socket connexion
	socket.on('keyDown',function(key){
		console.log('down : ' + key);
		robot.keyToggle(key, 'down');
	});
	socket.on('keyUp', function(key){
		robot.keyToggle(key, 'up');
	});

});
io.on('disconnect', function(){
//TODO count socket disconnect
});




http.listen(3000, function(){
	console.log('listening on *:3000');
//TODO display http server ready

});
