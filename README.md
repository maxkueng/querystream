querystream
===========

[![Build Status](https://secure.travis-ci.org/maxkueng/querystream.png?branch=master)](http://travis-ci.org/maxkueng/querystream)

A streams2 stream that filters incoming data based on MongoDB-compatible queries (using [qry](https://github.com/manuelstofer/qry)). It uses `objectMode = true` and only works with JavaScript objects as MongoDB queries can't be applied to strings and such.

It's backwards compatible with old streams thanks to [readable-stream](https://github.com/isaacs/readable-stream).

## Methods

### var qs = QueryStream(query [, options])

Create a new QueryStream `qs` (optionally use `new`) with the first argument being a MongoDB query and an optional second argument being a regular stream options object. Note that the `options.objectMode` property can not be changed and is always `true`.

## Example

Here's an example of using QueryStream to filter some data using a MongoDB query. Letting only data through which has an `x` property greater than 50.

```javascript
var Writable = require('stream').Writable,
	Readable = require('stream').Readable,
	QueryStream = require('querystream');

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
```

Output:

```
{ x: 60, y: 150 }
{ x: 70, y: 140 }
{ x: 80, y: 130 }
{ x: 90, y: 120 }
{ x: 100, y: 110 }
```

## License

MIT License

Copyright (c) 2011 Max Kueng (http://maxkueng.com/)
 
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
