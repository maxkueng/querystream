querystream
===========

A streams2 duplex stream that filters incoming data based on
MongoDB-compatible queries (using
[qry](https://github.com/manuelstofer/qry)). Uses `objectMode = true`
and only works with JavaScript objects.

## Example

A QueryStream filter stream that only lets objects through that have an
`x` property greater than 50.

```javascript
var Writable = require('stream').Writable,
	QueryStream = require('querystream');

var out = Writable({ objectMode : true });
out._write = function (chunk, enc, next) {
	console.dir(chunk);
	next();
};

var qs = QueryStream({
	x : { $gt : 50 }
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
	qs.write(coords[i]);
	i++;
}, 50);

qs.pipe(out);
```
