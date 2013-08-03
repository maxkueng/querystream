var test = require('tap').test,
	QueryStream = require('../'),
	Readable = require('stream').Readable
	Writable = require('stream').Writable;


test('QueryStream', function (t) {
	var sampleData = [
		{ animal : 'Unicorn', type : 'wizard', magic : 100 },
		{ animal : 'Polycorn', type : 'wizard', magic : 120 },
		{ animal : 'Bear', type : 'furry', magic : 40 },
		{ animal : 'Panda', type : 'furry', magic : 60 },
		{ animal : 'Horse', type : 'jumpy', magic : 55 },
		{ animal : 'Gazelle', type : 'jumpy', magic : 90 },
		{ animal : 'Tiger', type : 'hungry', magic : 80 },
		{ animal : 'Locust', type : 'hungry', magic : 20 },
		{ animal : 'Kitten', type : 'wizard', magic : 110 },
		{ animal : 'Dog', type : 'wacky', magic : 30 }
	];

	var reader = new Readable({ objectMode : true }),
		writer = new Writable({ objectMode : true }),
		qs = QueryStream({ type : 'wizard' });
		results = [];

	reader._read = function () {
		reader.push(sampleData.shift());
	};

	writer._write = function (chunk, enc, callback) {
		results.push(chunk);
		callback();
	};

	reader
		.pipe(qs)
		.pipe(writer)
		.on('finish', function () {
			console.log(results);
			t.equal(3, results.length, '3 items from sample data should pass through');
			t.end();
		});

});
