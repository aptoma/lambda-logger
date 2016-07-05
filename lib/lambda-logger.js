'use strict';

const log = require('./log');

/**
 * Service for logging from AWS Lambda to AWS CloudWatch Logs
 *
 * The actual logger is simply `console.[info|error|warn]`, so it works fine for local dev as well.
 *
 * If you provide an instance of GrimmPusher, timer events will be sent to Grimm.
 */
class LambdaLogger {
	/**
	 * @param {String} serviceName
	 * @param {GrimmPusher} [grimmService]
	 */
	constructor(serviceName, grimmService) {
		this.serviceName = serviceName;
		this.grimmService = grimmService;
	}

	/**
	 * @param {String} msg
	 * @param {Object} [meta]
	 */
	info(msg, meta) {
		log('info', msg, meta);
	}

	/**
	 * @param {String} msg
	 * @param {Object} [meta]
	 */
	error(msg, meta) {
		log('error', msg, meta);
	}

	/**
	 * @param {String} msg
	 * @param {Object} [meta]
	 */
	warn(msg, meta) {
		log('warn', msg, meta);
	}

	/**
	 *
	 * @param {TimerEvent} event
	 */
	timerEvent(event) {
		this.info(event.summary);

		if (this.grimmService) {
			const formattedEvent = {
				name: event.name,
				time: event.time,
				fields: {
					msec: parseFloat(event.msec.toFixed(3))
				},
				tags: {
					service: this.serviceName
				}
			};

			this.grimmService.add(formattedEvent);
		}
	}
}

module.exports = LambdaLogger;
