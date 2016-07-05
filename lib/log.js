'use strict';

/**
 *
 * @param {String} level
 * @param {String} msg
 * @param {Object} meta
 */
module.exports = function log(level, msg, meta) {
	if (['info', 'warn', 'error'].indexOf(level) === -1) {
		throw Error(`Unexpected log level '${level}', must be info, warn or error`);
	}
	const logData = Object.assign({msg}, meta, {_tags: ['log', level]});
	console[level](logData);
};
