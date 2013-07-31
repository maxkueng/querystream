"use strict";

var Transform = require('readable-stream').Transform,
	inherits = require('util').inherits,
	qry = require('qry');

function QueryStream (query) {
	if (!(this instanceof QueryStream)) {
		return new QueryStream(query);
	}

	Transform.call(this, { objectMode : true });
	this.match = qry(query);
}

inherits(QueryStream, Transform);

QueryStream.prototype._transform = function (chunk, enc, next) {
	if (typeof chunk === 'undefined' || chunk === null) { this.push({}); }

	if (this.match(chunk)) {
		this.push(chunk);
	}

	next();
};

module.exports = QueryStream;
