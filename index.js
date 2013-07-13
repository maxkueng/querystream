"use strict";

var Duplex = require('stream').Duplex,
	inherits = require('util').inherits,
	qry = require('qry');

function QueryStream (query) {
	if (!(this instanceof QueryStream)) {
		return new QueryStream(query);
	}

	Duplex.call(this, { objectMode : true });
	this.match = qry(query);
}

inherits(QueryStream, Duplex);

QueryStream.prototype._read = function () {};

QueryStream.prototype._write = function (chunk, enc, next) {
	if (chunk === null) { this.push({}); }

	if (this.match(chunk)) {
		this.push(chunk);
	}

	next();
};

module.exports = QueryStream;
