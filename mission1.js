"use strict";

var autonomy = require('ardrone-autonomy');
var mission  = autonomy.createMission();
var LogToSocket = require("./LogToSocket");

var logger = new LogToSocket(3000,1);

mission.takeoff()
	.zero()       // Sets the current state as the reference
	.altitude(0.25)
	.go({x:2,y:0,z:-0.25,yaw:0,pitch:0})
	.go({x:-2,y:0,z:-0.25,yaw:0,pitch:0})
	.go({x:2,y:0,z:-0.25,yaw:0,pitch:0})
	.go({x:-2,y:0,z:-0.25,yaw:0,pitch:0})
	.go({x:0,y:0,z:0,yaw:0,pitch:0})
	.land();

mission.client().on("navdata",function(event){
	logger.emit(event.demo);
});

mission.run(function(err) {
	if (err) {
		console.trace("Oops, something bad happened: %s", err.message);
		mission.client().stop();
		mission.client().land();
	} else {
		console.log("Mission success!");
		process.exit(0);
	}
});
