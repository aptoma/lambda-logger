'use strict';

const LambdaLogger = require('./lib/lambda-logger');

/**
 * @param {String} serviceName Name of this service, used for tagging Grimm events
 * @param {GrimmPusher} [grimmService]
 * @return {LambdaLogger}
 */
module.exports = (serviceName, grimmService) => {
	return new LambdaLogger(serviceName, grimmService);
};
