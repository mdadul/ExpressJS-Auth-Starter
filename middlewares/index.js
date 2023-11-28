const validationMiddleware = require('./validation.middleware');
const authMiddleware = require('./auth.middleware');
const rateLimiter = require('./rateLimiter.middleware');
const role = require('./roles.middleware');

module.exports = {
	validationMiddleware,
	authMiddleware,
	rateLimiter,
	role,
};
