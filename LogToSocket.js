"use strict";

var Express = require('express');
var SocketIO = require('socket.io');
var HTTP = require("http");

var LogToSocket = function(port,fps){
	var app,server,io;
	var connected = false;

	port = port || 3000;
	var last = Date.now();
	var period = 1000/fps;

	var init = function() {
		app = Express();
		server = HTTP.createServer(app);
		io = SocketIO(server);

		io.on('connection', function(){
			console.log("Connected to "+port+".");
			connected = true;
		});
		server.listen(port);

		console.log("Listening on "+port+".");
	};

	var isConnected = function() {
		return connected;
	};
	this.isConnected = isConnected;

	var emit = function(msg) {
		var since = Date.now()-last;
		if(since<period) return;

		last = Date.now();

		// if (!connected) {
		// 	console.log("No connection, no data sent.");
		// 	return;
		// }

		var json = JSON.stringify(msg);

		io.emit("drone",JSON.stringify(msg));
		console.log("Sent "+Buffer.byteLength(json,{encoding:"utf8"})+" bytes.");
	};
	this.emit = emit;

	init();
};

module.exports = LogToSocket;
