@aptoma/lambda-logger
=====================

Lambda logger is Node.js module for logging events on AWS Lambda, designed for use with AWS CloudWatch Logs.

Installation
------------

    $ npm install --save @aptoma/lambda-logger

Usage
-----

```js
const createLogger = require('@aptoma/lambda-logger');
const log = createLogger('my-service-name');

log.info('Hello World!', {meta: 'data'});
// { msg: 'Hello World!', _tags: [ 'log', 'info' ] }
```

### Log Timer Events

You can use [@aptoma/node-timer](https://github.com/aptoma/node-timer) to log duration of some process:

```js
const createLogger = require('@aptoma/lambda-logger');
const log = createLogger('my-service-name');

const timer = require('@aptoma/node-timer');
const elapsed = timer('SomeEvent');
// Do something slow ...

log.timerEvent(elapsed());
// { msg: 'SomeEvent: 215.489ms', _tags: [ 'log', 'info' ] }
```

### Grimm Integration

For extra cred, send your timer events to Grimm, using [@aptoma/grimm-pusher](https://github.com/aptoma/grimm-pusher):

```js
const createLogger = require('@aptoma/lambda-logger');
const createGrimmService = require('@aptoma/grimm-pusher').createService;

const grimmService = createGrimmService({
	host: 'https://grimm.example.com',
	apikey: 'reaper'
});

const log = createLogger('my-service-name', grimmService);

const timer = require('@aptoma/node-timer');
const elapsed = timer('SomeEvent');

// Do something slow ...

log.timerEvent(elapsed());
```
