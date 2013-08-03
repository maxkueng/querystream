"use strict";

var Transform = require('readable-stream').Transform,
	inherits = require('util').inherits,
	qry = require('qry');

function QueryStream (query, options) {
	if (!(this instanceof QueryStream)) {
		return new QueryStream(query, options);
	}

	if (!(options instanceof Object)) {
		options = {};
	}

	options.objectMode = true;

	Transform.call(this, options);
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
