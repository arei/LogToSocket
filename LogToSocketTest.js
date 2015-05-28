"use strict";

var LogToSocket = require("./LogToSocket");

var logger = new LogToSocket(3000,1);

var tester = function() {
	logger.emit({
		one: 1,
		two: 2,
		three: {
			one: 31,
			two: 32
		}
	});
	setTimeout(tester,25);
};

tester();
