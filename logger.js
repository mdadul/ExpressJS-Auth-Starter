// eslint-disable-next-line import/no-extraneous-dependencies
const bunyan = require('bunyan');

const loggerConfig = {
	name: 'skillibly-api',
	streams: [
		{
			type: 'stream',
			stream: process.stdout,
			level: 'debug',
		},
	],
};

const logger = bunyan.createLogger(loggerConfig);

module.exports = logger;
