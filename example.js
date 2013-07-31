var Writable = require('stream').Writable,
	Duplex = require('stream').Duplex,
	QueryStream = require('./index');


var out1 = Writable({ objectMode : true });
out1._write = function (chunk, enc, next) {
//	console.log('o1', chunk);
	next();
};

var out2 = Writable({ objectMode : true });
out2._write = function (chunk, enc, next) {
	console.log('o2', chunk);
	next();
};

var meta = Duplex({ objectMode : true });
meta._read = function () {};
meta._write = function (chunk, enc, next) {
	if (chunk === null) { this.push({}); }
	this.push(chunk);
	next();
};

var qs1 = QueryStream({
	x : { $gt : 50 }
});

var qs2 = QueryStream({
	x : { $lt : 50 }
});


var coords = [
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

var i = 0, len = coords.length;

var interval = setInterval(function () {
	if (i >= len) { return clearInterval(interval); }
	meta.write(coords[i]);
	i++;
}, 100);

meta.pipe(qs1);
meta.pipe(qs2);

qs1.pipe(out1);
qs2.pipe(out2);
