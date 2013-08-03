var Writable = require('stream').Writable,
	Readable = require('stream').Readable,
	QueryStream = require('./index');

// Some sample data
var sampleData = [
	{ x : 10, y : 200 },
	{ x : 20, y : 190 },
	{ x : 30, y : 180 },
	{ x : 40, y : 170 },
	{ x : 50, y : 160 },
	{ x : 60, y : 150 },
	{ x : 70, y : 140 },
	{ x : 80, y : 130 },
	{ x : 90, y : 120 },
	{ x : 100, y : 110 }
];

// Create a readable stream that provides the sample data
var inputStream = new Readable({ objectMode : true });
inputStream._read = function (size) {
	sampleData.forEach(function(data) {
		inputStream.push(data);
	});
	inputStream.push(null);
};

// Create a writable stream that prints the data to the console
var outputStream = new Writable({ objectMode : true });
outputStream._write = function (chunk, encoding, next) {
	console.log(chunk);
	next();
};

// Create a new QueryStream that only emits data with 
// an `x` property greater than 50
var greater50Stream = new QueryStream({
	x : { $gt : 50 }
});

// Pipe it all together
inputStream
	.pipe(greater50Stream)
	.pipe(outputStream);
