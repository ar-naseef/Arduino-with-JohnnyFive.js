var five = require('johnny-five');
var express = require('express');
var app = express();

var board = new five.Board();

board.on("ready", function() {
	console.log('led is ready...');
	var k = "0";
	var led = new five.Led(9);
	
	//switch on LED
	app.get('/on', function (req, res) {
		if(board.isReady) {
			k = "1";
			led.on();
		}
		res.send(k);
	});

	//add the LED brightness functionality
	app.get('/:num', function (req, res) {
		var bri_ness = req.params.num;
		if (board.isReady) {
			led.brightness(bri_ness);
		}
		res.send(bri_ness);
	});

	// switch off LED
	app.get('/off', function(req, res) {
		if(board.isReady) {
			k = "0";
			led.off();
		}
		res.send(k);
	});
});

app.listen('3222', function(err) {
	if (err) 
		throw err

	console.log('server running on port 3222');
});