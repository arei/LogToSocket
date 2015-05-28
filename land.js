"use strict";

var autonomy = require('ardrone-autonomy');
var mission  = autonomy.createMission();

mission.land();

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
