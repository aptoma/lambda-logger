'use strict';

const assert = require('chai').assert;
const td = require('testdouble');
const log = td.replace('./log');

const LambdaLogger = require('./lambda-logger');

describe('constructor()', () => {
	it('should create an instance', () => {
		const subject = new LambdaLogger('test');
		assert.instanceOf(subject, LambdaLogger);
	});
});

describe('logging', () => {
	afterEach(() => {
		td.reset();
	});

	describe('info()', () => {
		it('should log an info message', () => {
			const subject = new LambdaLogger('test');

			subject.info('foo', {foo: true});

			td.verify(log('info', 'foo', {foo: true}));
		});
	});

	describe('warn()', () => {
		it('should log a warn message', () => {
			const subject = new LambdaLogger('test');

			subject.warn('foo', {foo: true});

			td.verify(log('warn', 'foo', {foo: true}));
		});
	});

	describe('error()', () => {
		it('should log an error message', () => {
			const subject = new LambdaLogger('test');

			subject.error('foo', {foo: true});

			td.verify(log('error', 'foo', {foo: true}));
		});
	});

	describe('timerEvent', () => {
		it('should log an info message', () => {
			const subject = new LambdaLogger('test');

			subject.timerEvent({summary: 'foo'});

			td.verify(log('info', 'foo', undefined));
		});

		it('should forward event to GrimmService if configured', () => {
			const grimmService = td.object(['add']);
			const subject = new LambdaLogger('test', grimmService);

			const now = Date.now();
			const timerEvent = {
				name: 'foo',
				time: now,
				msec: 12.4321
			};
			subject.timerEvent(timerEvent);

			td.verify(grimmService.add({
				name: 'foo',
				time: now,
				fields: {
					msec: 12.432
				},
				tags: {
					service: 'test'
				}
			}));
		});
	});
});
